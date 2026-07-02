import {
  Component,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { SDUX_BRAND_NAME } from '@sdux-vault/ui/web-components';
import { SearchService } from './service/search.service';
import { SearchResultShape } from './shapes/search-result.shape';

@Component({
  selector: 'sdux-search',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.scss'
})
export class SearchComponent {
  readonly query = signal('');
  readonly results = signal<SearchResultShape[]>([]);
  #brandName = inject(SDUX_BRAND_NAME);

  focused = signal(false);
  readonly activeIndex = signal(-1);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChildren('resultItem') resultItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  focusInput() {
    this.searchInput?.nativeElement?.focus();
  }

  constructor(
    private readonly search: SearchService,
    private readonly router: Router
  ) {}

  async onQueryChange(value: string): Promise<void> {
    this.query.set(value);
    this.results.set(await this.search.search(value));
    this.activeIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.query.set('');
      this.results.set([]);
      this.activeIndex.set(-1);
      this.searchInput?.nativeElement?.blur();
      return;
    }

    const count = this.results().length;
    if (!count) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.set((this.activeIndex() + 1) % count);
        this.#scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(
          this.activeIndex() <= 0 ? count - 1 : this.activeIndex() - 1
        );
        this.#scrollActiveIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.activeIndex() >= 0) {
          this.goTo(this.results()[this.activeIndex()]);
        }
        break;
    }
  }

  #scrollActiveIntoView(): void {
    const index = this.activeIndex();
    const items = this.resultItems?.toArray();
    if (items?.[index]) {
      items[index].nativeElement.scrollIntoView({ block: 'nearest' });
    }
    this.#showActiveTooltip();
  }

  #showActiveTooltip(): void {
    const tips = this.tooltips?.toArray();
    if (!tips) return;
    for (const tip of tips) {
      tip.hide();
    }
    const index = this.activeIndex();
    if (index >= 0 && tips[index]) {
      tips[index].show();
    }
  }

  dropdownLeft = signal(0);

  ngAfterViewInit() {
    this.updatePosition();

    window.addEventListener('resize', () => this.updatePosition());
    window.addEventListener('keydown', (e) => this.#onGlobalKeydown(e));
  }

  #onGlobalKeydown(event: KeyboardEvent): void {
    if (event.key !== '/') return;
    if (this.focused()) return;

    const target = event.target as HTMLElement;
    const tag = target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) {
      return;
    }

    event.preventDefault();
    this.focusInput();
  }

  buildProject(project: string): string {
    if (project === 'blog') return 'blog';
    return `@${this.#brandName.toLowerCase()}/${project}`;
  }

  updatePosition() {
    if (!this.searchInput) return;

    const rect = this.searchInput.nativeElement.getBoundingClientRect();
    const dropdownWidth = 320; // same width as .results

    // New: align dropdown right side with input right side
    this.dropdownLeft.set(rect.left + rect.width - dropdownWidth);
  }

  goTo(result: SearchResultShape): void {
    this.router.navigateByUrl(result.url);

    // clear UI state
    this.query.set('');
    this.results.set([]);
    this.focused.set(false);
    this.searchInput?.nativeElement?.blur();
  }

  highlightMatch(title: string): string {
    const q = this.query().trim();
    if (!q) return title;

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return title.replace(regex, '<mark class="highlight">$1</mark>');
  }
}
