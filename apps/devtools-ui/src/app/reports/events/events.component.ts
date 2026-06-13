import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { HeaderSectionComponent } from '../../shared/components/header-section/header-section.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ExportButtonComponent } from '../../shared/components/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { EXTENSION_VERSION } from '../../splash-page/devtools-splash-page.component';
import { EventContainerComponent } from './event-container/event-container.component';

/**
 * Events component displaying the tabbed event viewer with header,
 * pipeline panels, and empty-state messaging for the DevTools UI.
 */
@Component({
  selector: 'sdux-events',
  standalone: true,
  imports: [
    HeaderSectionComponent,
    EmptyStateComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    EventContainerComponent,
    ExportButtonComponent,
    HelpToggleComponent,
    ResetButtonComponent
  ],
  templateUrl: './events.component.html',
  styleUrls: ['../scss/reports-common.scss', './events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  /** Internal service providing access to DevTools event streams. */
  private devtools: DevtoolsLoggingService = inject(DevtoolsLoggingService);

  /** Extension manifest version, resolved via injection token. */
  readonly version = inject(EXTENSION_VERSION);

  /** Reactive list of pipeline events used to populate the UI. */
  readonly events = computed(() => this.devtools.events());

  /** Current search term for filtering events. */
  readonly eventSearchTerm = signal('');

  /** Subject driving debounced search updates. */
  readonly eventSearchTerm$ = new Subject<string>();

  /** Debounced search term applied to the event filter. */
  readonly #appliedSearchTerm = signal('');

  /** References to pipeline panel children for scroll control. */
  readonly panels = viewChildren(EventContainerComponent);

  /** Currently selected cell filter. */
  readonly selectedCell = signal('');

  /** Currently selected event type filter. */
  readonly selectedType = signal('all');

  /** Currently selected behavior/controller key filter. */
  readonly selectedKey = signal('all');

  /** Unique cell names derived from the current events. */
  readonly cellNames = computed(() => {
    const cells = this.events()?.map((e) => e.cell) ?? [];
    return [...new Set(cells)].sort();
  });

  /**
   * Auto-selects the first available cell when no cell is selected.
   *
   * Runs whenever the cell names list changes. If the current selection
   * is empty or no longer present in the list, defaults to the first cell.
   */
  constructor() {
    effect(() => {
      const names = this.cellNames();
      const current = this.selectedCell();
      if (names.length && (!current || !names.includes(current))) {
        this.selectedCell.set(names[0]);
      }
    });

    const destroy$ = new Subject<void>();
    inject(DestroyRef).onDestroy(() => {
      destroy$.next();
      destroy$.complete();
    });

    this.eventSearchTerm$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(destroy$))
      .subscribe((term) => this.#appliedSearchTerm.set(term));
  }

  /** Unique event type names derived from events matching the selected cell. */
  readonly typeNames = computed((): string[] => {
    const cell = this.selectedCell();
    let result = this.events() ?? [];
    if (cell) {
      result = result.filter((e) => e.cell === cell);
    }
    const types = result.map((e) => e.type);
    return [...new Set(types)].sort();
  });

  /** Whether the key filter dropdown should be visible. */
  readonly showKeyFilter = computed(() => {
    const type = this.selectedType();
    return type === 'stage' || type === 'controller';
  });

  /** Unique key names derived from events matching the selected cell and type. */
  readonly keyNames = computed((): string[] => {
    const cell = this.selectedCell();
    const type = this.selectedType();
    let result = this.events() ?? [];
    if (cell) {
      result = result.filter((e) => e.cell === cell);
    }
    if (type !== 'all') {
      result = result.filter((e) => e.type === type);
    }
    const keys = result.map((e) => e.behaviorKey);
    return [...new Set(keys)].sort();
  });

  /** Events filtered by the selected cell, type, key, and search term. */
  readonly filteredEvents = computed(() => {
    const cell = this.selectedCell();
    const type = this.selectedType();
    const key = this.selectedKey();
    const search = this.#appliedSearchTerm().trim().toLowerCase();
    let result = this.events();
    if (cell) {
      result = result?.filter((e) => e.cell === cell) ?? [];
    }
    if (type !== 'all') {
      result = result?.filter((e) => e.type === type) ?? [];
    }
    if (key !== 'all') {
      result = result?.filter((e) => e.behaviorKey === key) ?? [];
    }
    if (search) {
      result =
        result?.filter(
          (e) =>
            e.behaviorKey.toLowerCase().includes(search) ||
            e.cell.toLowerCase().includes(search) ||
            e.type.toLowerCase().includes(search) ||
            (e.error?.message?.toLowerCase().includes(search) ?? false)
        ) ?? [];
    }
    return result;
  });

  /** Total number of pipeline events currently stored. */
  readonly totalEvents = computed(() => this.filteredEvents()?.length);

  /** Pipeline events filtered to only those with errors. */
  readonly errorEvents = computed(
    () => this.filteredEvents()?.filter((e) => !!e.error) ?? []
  );

  /** Human-readable total state size across all cells (latest event per cell). */

  /**
   * Resets local filter signals without clearing the FeatureCell
   * (used alongside the shared reset button which handles cell clearing).
   */
  resetFilters(): void {
    this.selectedCell.set(this.cellNames()[0] ?? '');
    this.selectedType.set('all');
    this.selectedKey.set('all');
    this.clearEventSearch();
  }

  /** Clears the event search filter. */
  clearEventSearch(): void {
    this.eventSearchTerm.set('');
    this.#appliedSearchTerm.set('');
  }

  /** Scrolls all visible pipeline panels to the latest event. */
  jumpToLatest(): void {
    this.panels().forEach((panel) => panel.scrollToTop());
  }

  /**
   * Extracts the display name from a behavior or controller key.
   * For keys like `SDUX::Behavior::Core::Value`, returns `Value`.
   * For internal keys like `vault-conductor`, returns the full string.
   *
   * @param key - The full behavior or controller key.
   * @returns The short display name.
   */
  displayKeyName(key: string): string {
    const parts = key.split('::');
    return parts.length > 1 ? parts[parts.length - 1] : key;
  }

  /**
   * Capitalizes the first letter of a string.
   *
   * @param value - The string to capitalize.
   * @returns The string with its first character uppercased.
   */
  capitalize(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
  }
}
