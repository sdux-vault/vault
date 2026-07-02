import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FlexSearch, { Document as FlexDocument } from 'flexsearch';
import { firstValueFrom } from 'rxjs';
import { SearchDocumentShape } from '../shapes/search-document.shape';
import { SearchIndexJsonShape } from '../shapes/search-index-json.shape';
import { SearchResultShape } from '../shapes/search-result.shape';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private index!: FlexDocument<SearchDocumentShape>;
  private docsById = new Map<string, SearchDocumentShape>();
  private initialized = false;
  private initPromise?: Promise<void>;

  #KIND_PRIORITY: Record<string, number> = {
    behavior: 100,
    controller: 80,
    class: 50,
    service: 45,
    component: 40,
    pipe: 30,
    directive: 30,
    const: 20,
    type: 10,
    interface: 10,
    enum: 10
  };

  constructor(private readonly http: HttpClient) {}

  /**
   * Runs a fuzzy search against the SDuX documentation index.
   */
  async search(query: string, limit = 20): Promise<SearchResultShape[]> {
    if (!query.trim()) return [];

    await this.ensureInitialized();

    // ---- FIXED: removed invalid generic type argument ----
    const hits = await this.index.searchAsync({
      query,
      limit,
      index: ['title', 'symbols', 'content']
    });

    /**
     * FlexSearch Document mode returns an array of:
     *   [{ field: "title", result: ["id1","id2"] }, ...]
     */
    const ids = new Set<string>();

    // eslint-disable-next-line
    for (const group of hits as any[]) {
      for (const id of group.result) {
        if (typeof id === 'string') {
          ids.add(id);
        }
      }
    }

    return Array.from(ids)
      .map((id) => this.docsById.get(id))
      .filter((d): d is SearchDocumentShape => !!d)
      .sort((a, b) => {
        const pa = this.#KIND_PRIORITY[a.kind] ?? 0;
        const pb = this.#KIND_PRIORITY[b.kind] ?? 0;
        return pb - pa;
      })
      .map((d) => ({
        id: d.id,
        title: d.title,
        kind: d.kind,
        project: d.project,
        docLink: d.docLink,
        url: d.url,
        description: d.description || ''
      }));
  }

  /**
   * Ensures search index has been initialized.
   */
  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;

    if (!this.initPromise) {
      this.initPromise = this.loadAndBuildIndex();
    }

    await this.initPromise;
    this.initialized = true;
  }

  /**
   * Loads search-index.json and builds FlexSearch Document index.
   */
  private async loadAndBuildIndex(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<SearchIndexJsonShape>(
        'assets/search-index/search-index.json'
      )
    );

    const docs = data.documents ?? [];

    // Cache docs for fast lookup
    docs.forEach((doc) => {
      this.docsById.set(doc.id, doc);
    });

    // Build index
    this.index = new FlexSearch.Document<SearchDocumentShape>({
      document: {
        id: 'id',
        index: ['title', 'symbols', 'content'],
        store: ['id', 'title', 'kind', 'project', 'docLink', 'url']
      },
      tokenize: 'forward',
      cache: true
    });

    docs.forEach((doc) => {
      this.index!.add(doc);
    });
  }
}
