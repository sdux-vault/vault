import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { CollapsibleSectionComponent } from '../../shared/components/collapsible-section/collapsible-section.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { TraceExecutionStatuses } from '../../shared/shapes/trace';
import { VaultRegistrationSerializedShape } from '../../shared/shapes/vault-registration-serialized.shape';
import { RegistryDetailComponent } from './registry-detail/registry-detail.component';

/**
 * Vault Overview component displaying Vault runtime versions,
 * the FeatureCell registry, and license details within the DevTools UI.
 *
 * On construction the component delegates registry, version, and license
 * data retrieval to {@link DevtoolsRegistryService}, which reads the local
 * `globalThis.sdux` namespace and maintains reactive signals.
 *
 * Clicking a FeatureCell row opens a detail panel on the right displaying
 * registered behaviors and controllers for that cell.
 *
 * The component is standalone and uses OnPush change detection driven
 * by the {@link DevtoolsRegistryService} signals.
 */
@Component({
  selector: 'sdux-vault-overview',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    CollapsibleSectionComponent,
    HelpToggleComponent,
    RegistryDetailComponent
  ],
  templateUrl: './vault-overview.component.html',
  styleUrls: ['../scss/reports-common.scss', './vault-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VaultOverviewComponent implements OnInit {
  /** Whether the registry cards section is expanded. */
  readonly showRegistryCards = signal(true);

  /** Current search term for filtering registry cells. */
  readonly registrySearchTerm = signal('');

  /** Subject driving debounced search updates. */
  readonly registrySearchTerm$ = new Subject<string>();

  /** Destroy ref for automatic subscription cleanup. */
  readonly #destroyRef = inject(DestroyRef);

  /** Registry service providing Vault configuration data. */
  private readonly registryService = inject(DevtoolsRegistryService);

  /** Aggregate service providing trace data per cell. */
  readonly #aggregate = inject(DevtoolsAggregateService);

  /**
   * Sorted package-version entries derived from the registry service.
   *
   * @returns An array of `[packageName, version]` tuples sorted alphabetically,
   *          or an empty array when no version data is available.
   */
  readonly versions = this.registryService.versions;

  /**
   * Serialized FeatureCell registry snapshot from the registry service.
   *
   * @returns An array of serialized FeatureCell registration records,
   *          or an empty array when no registry data is available.
   */
  readonly registry = this.registryService.registry;

  /**
   * Debounced search term applied to the registry filter.
   *
   * Updated via the `registrySearchTerm$` subject after a 300 ms
   * debounce window to avoid filtering on every keystroke.
   */
  readonly #appliedSearchTerm = signal('');

  /**
   * Registry entries filtered by the applied search term.
   *
   * Matches against the cell key (case-insensitive).
   */
  readonly filteredRegistry = computed(() => {
    const term = this.#appliedSearchTerm().trim().toLowerCase();
    const cells = this.registry();
    if (!term) return cells;
    return cells.filter((cell) => cell.key.toLowerCase().includes(term));
  });

  /** Verified license payload from the registry service. */
  readonly license = this.registryService.license;

  /**
   * Per-cell trace statistics: trace count, average duration, and error count.
   *
   * @returns A map keyed by cell key containing trace count, average duration
   *          in milliseconds, and error count for each registered cell.
   */
  readonly cellStats = computed(() => {
    const cellMap = this.#aggregate.tracesByCellKey();
    const stats = new Map<
      string,
      { traceCount: number; avgDuration: number; errorCount: number }
    >();

    for (const [cellKey, traces] of cellMap) {
      const errorCount = traces.filter(
        (t) =>
          t.metrics.status === TraceExecutionStatuses.Failed ||
          t.metrics.status === TraceExecutionStatuses.Orphaned
      ).length;
      const avgDuration =
        traces.length > 0
          ? traces.reduce((sum, t) => sum + t.metrics.duration, 0) /
            traces.length
          : 0;

      stats.set(cellKey, {
        traceCount: traces.length,
        avgDuration,
        errorCount
      });
    }

    return stats;
  });

  /**
   * Formats a license date value for display.
   *
   * @param value - A Unix-epoch millisecond timestamp or `'forever'`.
   * @returns A human-readable date string.
   */
  formatLicenseDate(value: number | 'forever'): string {
    if (value === 'forever') return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date(value));
  }

  /** The currently selected FeatureCell for the detail panel. */
  readonly selectedCell = signal<VaultRegistrationSerializedShape | null>(null);

  /** Whether the viewport matches the mobile breakpoint. */
  readonly #isMobile = window.matchMedia('(max-width: 768px)').matches;

  /** Whether the Package Versions section is expanded. */
  readonly versionsExpanded = signal(!this.#isMobile);

  /** Whether the License section is expanded. */
  readonly licenseExpanded = signal(!this.#isMobile);

  /** Set of cell keys whose cards are collapsed. */
  readonly collapsedCells = signal(new Set<string>());

  /**
   * Subscribes to the debounced registry search term stream.
   *
   * Pipes `registrySearchTerm$` through a 300 ms debounce window and
   * distinct-until-changed filter, updating `#appliedSearchTerm` on
   * each emission. The subscription is torn down when the component
   * is destroyed via {@link DestroyRef}.
   */
  ngOnInit(): void {
    const destroy$ = new Subject<void>();
    this.#destroyRef.onDestroy(() => {
      destroy$.next();
      destroy$.complete();
    });

    this.registrySearchTerm$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(destroy$))
      .subscribe((term) => this.#appliedSearchTerm.set(term));
  }

  /**
   * Initializes mobile-responsive collapse state.
   *
   * When the viewport matches the mobile breakpoint, creates an effect
   * that collapses all FeatureCell cards once the registry loads.
   */
  constructor() {
    if (this.#isMobile) {
      effect(() => {
        const cells = this.registry();
        if (cells.length) {
          this.collapsedCells.set(new Set(cells.map((c) => c.key)));
        }
      });
    }
  }

  /**
   * Toggles the collapsed state of a cell card.
   *
   * @param key - The FeatureCell key to toggle.
   */
  toggleCellCollapsed(key: string): void {
    const current = this.collapsedCells();
    const next = new Set(current);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.collapsedCells.set(next);
  }

  /**
   * Selects a FeatureCell to display in the detail panel.
   *
   * @param cell - The serialized registry entry to select.
   */
  selectCell(cell: VaultRegistrationSerializedShape): void {
    this.selectedCell.set(cell);
  }

  /** Closes the detail panel by clearing the selection. */
  closeDetail(): void {
    this.selectedCell.set(null);
  }

  /** Clears the registry search filter. */
  clearRegistrySearch(): void {
    this.registrySearchTerm.set('');
    this.#appliedSearchTerm.set('');
  }

  /**
   * Returns the count of behaviors requiring a license in the given cell.
   *
   * @param cell - The serialized registry entry to inspect.
   * @returns The number of behaviors with `needsLicense` set to `true`.
   */
  behaviorLicenseCount(cell: VaultRegistrationSerializedShape): number {
    return cell.behaviors.filter((b) => b.needsLicense).length;
  }

  /**
   * Returns the count of controllers requiring a license in the given cell.
   *
   * @param cell - The serialized registry entry to inspect.
   * @returns The number of controllers with `needsLicense` set to `true`.
   */
  controllerLicenseCount(cell: VaultRegistrationSerializedShape): number {
    return cell.controllers.filter((c) => c.needsLicense).length;
  }

  /**
   * Returns the total fluent API callback count for the given cell.
   *
   * @param cell - The serialized registry entry to inspect.
   * @returns The sum of all fluent API callback counts, or `0` if none are registered.
   */
  fluentApisCount(cell: VaultRegistrationSerializedShape): number {
    const apis = cell.fluentApis;
    if (!apis) return 0;
    return (
      apis.filters +
      apis.reducers +
      apis.beforeTaps +
      apis.afterTaps +
      apis.interceptors +
      apis.operators +
      apis.emitStateCallbacks +
      apis.errorCallbacks
    );
  }

  /**
   * Builds a multiline tooltip breaking down fluent API callback counts.
   *
   * @param cell - The serialized registry entry to inspect.
   * @returns A newline-delimited summary of non-zero callback counts,
   *          or a fallback message when none are registered.
   */
  fluentApisTooltip(cell: VaultRegistrationSerializedShape): string {
    const apis = cell.fluentApis;
    if (!apis) return 'No fluent API callbacks registered';
    const lines: string[] = [];
    if (apis.filters) lines.push(`Filters: ${apis.filters}`);
    if (apis.reducers) lines.push(`Reducers: ${apis.reducers}`);
    if (apis.interceptors) lines.push(`Interceptors: ${apis.interceptors}`);
    if (apis.operators) lines.push(`Operators: ${apis.operators}`);
    if (apis.beforeTaps) lines.push(`Before Taps: ${apis.beforeTaps}`);
    if (apis.afterTaps) lines.push(`After Taps: ${apis.afterTaps}`);
    if (apis.emitStateCallbacks)
      lines.push(`Emit States: ${apis.emitStateCallbacks}`);
    if (apis.errorCallbacks)
      lines.push(`Error Handlers: ${apis.errorCallbacks}`);
    return lines.length
      ? lines.join('\n')
      : 'No fluent API callbacks registered';
  }
}
