#!/usr/bin/env node
import fs from 'fs';
import { setSafeNamePrefix } from '../../utils/get-safe-name.util.mjs';
import { buildLink } from '../../utils/links/build-link.util.mjs';

/**
 * SearchIndexGenerator
 * --------------------
 * Consumes the type-index.json produced by the TypeExtractor and builds a
 * lightweight search-index.json file that can be used by FlexSearch (or any
 * similar in-browser search engine).
 *
 * The output is intentionally simple and engine-agnostic:
 *
 * {
 *   "documents": [
 *     {
 *       "id": "behavior:withAes256EncryptBehavior",
 *       "title": "withAes256EncryptBehavior",
 *       "kind": "behavior",
 *       "project": "@sdux/encrypt",
 *       "docLink": "behaviors",
 *       "symbols": ["withAes256EncryptBehavior"],
 *       "content": "behavior withAes256EncryptBehavior in project @sdux/encrypt",
 *       "weight": {
 *         "title": 10,
 *         "symbol": 8,
 *         "kind": 4,
 *         "project": 3,
 *         "body": 1
 *       }
 *     }
 *   ]
 * }
 *
 * The front-end is responsible for using `documents` to construct the actual
 * FlexSearch index at runtime.
 */
export class SearchIndexGenerator {
  /**
   * @param {string} typeIndexPath - Path to type-index.json (organized symbol index).
   * @param {string} outputPath - Path to write search-index.json.
   * @param {string} [compodocsPath] - Optional path to documentation.json for descriptions.
   */
  constructor(typeIndexPath, outputPath, compodocsPath) {
    this.typeIndexPath = typeIndexPath;
    this.outputPath = outputPath;
    this.compodocsPath = compodocsPath;
    this.descriptionMap = new Map();
    setSafeNamePrefix('');
  }

  /**
   * Reads and parses the type-index.json file.
   */
  loadTypeIndex() {
    if (!fs.existsSync(this.typeIndexPath)) {
      throw new Error(`Type index file not found: "${this.typeIndexPath}".`);
    }

    const raw = fs.readFileSync(this.typeIndexPath, 'utf8');
    return JSON.parse(raw);
  }

  /**
   * Builds the in-memory document list for the search index.
   *
   * Shape of `typeIndexJson` (from TypeExtractor.organizeSymbols()):
   *
   * {
   *   "class": {
   *     "SomeClass": {
   *       "kind": "class",
   *       "name": "SomeClass",
   *       "project": "@sdux/core",
   *       "relativePath": "projects/core/src/lib/...",
   *       "docLink": "classes"
   *     },
   *     ...
   *   },
   *   "behavior": {
   *     "withFooBehavior": { ... }
   *   }
   * }
   */
  buildDocuments(typeIndexJson) {
    const documents = [];

    const kinds = Object.keys(typeIndexJson || {});
    for (const kind of kinds) {
      const symbolsOfKind = typeIndexJson[kind] || {};
      const symbolNames = Object.keys(symbolsOfKind);

      for (const name of symbolNames) {
        const entry = symbolsOfKind[name];

        if (!entry.docLink) continue;

        // Defensive defaulting
        const project = entry.project || '';
        const docLink = entry.docLink || '';
        const relativePath = entry.relativePath || '';

        const id = `${kind}:${name}`;
        const title = name;

        // Basic content string – can be expanded later when docs text is available
        const contentParts = [name, name, kind, project, relativePath].filter(
          Boolean
        );

        const content = contentParts.join(' ');

        const url = buildLink(entry);

        documents.push({
          id,
          title,
          kind: entry.kind,
          project,
          docLink,
          relativePath,
          symbols: [name],
          content,
          url,
          description: this.descriptionMap.get(name) || ''
        });
      }
    }

    return { documents };
  }

  /**
   * Writes the search index JSON to disk.
   */
  writeOutput(indexObject) {
    fs.writeFileSync(
      this.outputPath,
      JSON.stringify(indexObject, null, 2) + '\n',
      'utf8'
    );
    console.warn(`Search index written to "${this.outputPath}"`);
  }

  /**
   * Main execution pipeline:
   * - load type-index.json
   * - load compodocs (if available) for descriptions
   * - build documents
   * - write search-index.json
   */
  run() {
    const typeIndexJson = this.loadTypeIndex();
    this.loadCompodocDescriptions();
    const indexObject = this.buildDocuments(typeIndexJson);
    this.writeOutput(indexObject);
  }

  /**
   * Loads compodoc documentation.json and builds a name → description map.
   * Extracts the first sentence (up to 80 chars) from rawdescription.
   */
  loadCompodocDescriptions() {
    if (!this.compodocsPath || !fs.existsSync(this.compodocsPath)) return;

    const raw = fs.readFileSync(this.compodocsPath, 'utf8');
    const doc = JSON.parse(raw);

    const sections = [
      'classes',
      'injectables',
      'interfaces',
      'components',
      'modules',
      'pipes',
      'directives'
    ];

    for (const section of sections) {
      const items = doc[section];
      if (Array.isArray(items)) {
        for (const entry of items) {
          if (entry.name && entry.rawdescription) {
            this.descriptionMap.set(
              entry.name,
              this.#truncateDescription(entry.rawdescription)
            );
          }
        }
      }
    }

    if (doc.miscellaneous) {
      const miscGroups = [
        'functions',
        'variables',
        'enumerations',
        'typealiases'
      ];
      for (const group of miscGroups) {
        const items = doc.miscellaneous[group];
        if (Array.isArray(items)) {
          for (const entry of items) {
            if (entry.name && entry.rawdescription) {
              this.descriptionMap.set(
                entry.name,
                this.#truncateDescription(entry.rawdescription)
              );
            }
          }
        }
      }
    }
  }

  /**
   * Extracts the first sentence from a raw description and truncates to 80 chars.
   */
  #truncateDescription(raw) {
    const cleaned = raw
      .replace(/<[^>]+>/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const firstSentence = cleaned.split(/\.\s/)[0];
    const text = firstSentence.endsWith('.')
      ? firstSentence
      : firstSentence + '.';

    return text.length > 80 ? text.slice(0, 77) + '...' : text;
  }
}
