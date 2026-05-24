import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SDUX_BRAND_NAME } from '@sdux-vault/ui/web-components';
import { SearchService } from './service/search.service';
import { SearchResultShape } from './shapes/search-result.shape';

@Component({
  selector: 'sdux-search',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.scss'
})
export class SearchComponent {
  readonly query = signal('');
  readonly results = signal<SearchResultShape[]>([]);
  #brandName = inject(SDUX_BRAND_NAME);

  focused = signal(false);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

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
  }

  dropdownLeft = signal(0);

  ngAfterViewInit() {
    this.updatePosition();

    window.addEventListener('resize', () => this.updatePosition());
  }

  buildProject(project: string): string {
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
  }
}
