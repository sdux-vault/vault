import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SDuXShape } from '@sdux-vault/shared';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { CollapsibleSectionComponent } from '../../shared/collapsible-section/collapsible-section.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/reset-button/reset-button.component';
import { LeftRightNavigationDirective } from '../../shared/shortcuts/left-right-navigation/left-right-navigation.directive';
import { UpsellNoticeComponent } from '../../shared/upsell-notice/upsell-notice.component';
import { DumpFilePickerComponent } from '../load-dump-page/dump-file-picker/dump-file-picker.component';
import { StateTableViewComponent } from '../state-diff-view/state-table-view/state-table-view.component';
import { CompareTimelineDeltaComponent } from './compare-timeline-delta/compare-timeline-delta.component';
import { CompareTimelineSpansComponent } from './compare-timeline-spans/compare-timeline-spans.component';
import { CompareTimelineWaterfallComponent } from './compare-timeline-waterfall/compare-timeline-waterfall.component';
import { CompareTimelineComponent } from './compare-timeline/compare-timeline.component';
import { CompareTraceService } from './service/compare-trace.service';

/**
 * Determines whether a trace used replaceState or mergeState by
 * inspecting its event names for lifecycle start markers.
 *
 * @param trace - The trace execution to inspect.
 * @returns 'replace' or 'merge' based on the lifecycle event found.
 */
function resolveDispatchMethod(
  trace: TraceExecutionShape
): 'replace' | 'merge' {
  for (const event of trace.events) {
    if (event.name === 'lifecycle:start:merge') return 'merge';
    if (event.name === 'lifecycle:start:replace') return 'replace';
  }
  return 'replace';
}

/**
 * Extracts the resolved pipeline candidate value from the
 * pipeline:candidate:resolve event in a trace.
 *
 * @param trace - The trace execution to inspect.
 * @returns The resolved candidate value, or undefined if not found.
 */
function extractResolvedValue(trace: TraceExecutionShape): unknown | undefined {
  for (const event of trace.events) {
    if (
      event.name === 'pipeline:candidate:resolve' &&
      event.candidate != null
    ) {
      return event.candidate;
    }
  }

  return undefined;
}

/**
 * Page component for replaying trace data through live FeatureCell instances.
 *
 * Reads traces from the aggregate service, allows the user to select a
 * cell and trace, then dispatches the resolved value through the live
 * cell's replaceState or mergeState method via globalThis.sdux.replay.
 */
@Component({
  selector: 'sdux-replay-page',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    RouterLink,
    DumpFilePickerComponent,
    ExportButtonComponent,
    CollapsibleSectionComponent,
    HelpToggleComponent,
    LeftRightNavigationDirective,
    ResetButtonComponent,
    UpsellNoticeComponent,
    StateTableViewComponent,
    CompareTimelineComponent,
    CompareTimelineDeltaComponent,
    CompareTimelineSpansComponent,
    CompareTimelineWaterfallComponent
  ],
  providers: [CompareTraceService],
  templateUrl: './replay-page.component.html',
  styleUrls: ['../scss/reports-common.scss', './replay-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayPageComponent {
  /** Aggregate service providing trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Comparison service owning all trace comparison state. */
  readonly compare = inject(CompareTraceService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Whether the description section is visible. */
  readonly showDescription = signal(false);

  /** Whether the trace summary section is expanded. */
  readonly showTraceSummary = signal(true);

  /** Whether the resolved value section is expanded. */
  readonly showResolvedValue = signal(true);

  /** Whether the compare traces section is expanded. */
  readonly showCompareTraces = signal(true);

  /** View mode for compare traces: diff or table. */
  readonly viewMode = signal<'diff' | 'table'>('diff');

  /** All unique cell keys from loaded traces. */
  readonly cellKeys = computed(() => {
    return Array.from(this.#aggregate.tracesByCellKey().keys()).sort();
  });

  /** Currently selected cell key. */
  readonly selectedCellKey = signal<string>('');

  /** Traces for the selected cell. */
  readonly cellTraces = computed(() => {
    const key = this.selectedCellKey();
    if (!key) return [];
    return this.#aggregate.tracesByCellKey().get(key) ?? [];
  });

  /** Auto-select the first cell key when traces become available. */
  readonly #autoSelectCellKey = effect(() => {
    const keys = this.cellKeys();
    if (keys.length > 0 && !this.selectedCellKey()) {
      this.selectedCellKey.set(keys[0]);
    }
  });

  /** Keep the comparison service in sync whenever cellTraces changes. */
  readonly #syncTraces = effect(() => {
    this.compare.cellTraces.set(this.cellTraces());
  });

  /** Timer handle for auto-dismissing the result message. */
  #dismissTimer: ReturnType<typeof setTimeout> | undefined;

  /** Clears and restarts the result message auto-dismiss countdown. */
  readonly #autoDismissResult = effect(() => {
    const message = this.resultMessage();
    clearTimeout(this.#dismissTimer);
    if (message) {
      this.#dismissTimer = setTimeout(() => this.resultMessage.set(''), 5000);
    }
  });

  /** Sequential labels (t1, t2, ...) for each trace in the cell. */
  readonly traceLabels = this.compare.traceLabels;

  /** Currently selected trace ID. */
  readonly selectedTraceId = signal<string>('');

  /** The selected trace object. */
  readonly selectedTrace = computed(() => {
    const traceId = this.selectedTraceId();
    if (!traceId) return undefined;
    return this.cellTraces().find((t) => t.traceId === traceId);
  });

  /** Resolved dispatch method for the selected trace. */
  readonly dispatchMethod = computed(() => {
    const trace = this.selectedTrace();
    if (!trace) return undefined;
    return resolveDispatchMethod(trace);
  });

  /** Resolved value from the selected trace. */
  readonly resolvedValue = computed(() => {
    const trace = this.selectedTrace();
    if (!trace) return undefined;
    return extractResolvedValue(trace);
  });

  /** Result message after replay attempt. */
  readonly resultMessage = signal<string>('');

  /** Whether the last replay was an error. */
  readonly resultIsError = signal<boolean>(false);

  // ─── Delegated comparison signals ───

  /** Selected "before" trace ID for comparison. */
  readonly compareBeforeId = this.compare.compareBeforeId;
  /** Selected "after" trace ID for comparison. */
  readonly compareAfterId = this.compare.compareAfterId;

  /** Events from the "before" trace. */
  readonly compareBeforeEvents = this.compare.compareBeforeEvents;
  /** Events from the "after" trace. */
  readonly compareAfterEvents = this.compare.compareAfterEvents;

  /** Index of the currently viewed event pair. */
  readonly compareEventIndex = this.compare.compareEventIndex;

  /** Total event count across both compared traces. */
  readonly compareTotalEvents = this.compare.compareTotalEvents;

  /** Whether a previous event exists for navigation. */
  readonly compareHasPrevious = this.compare.compareHasPrevious;

  /** Whether a next event exists for navigation. */
  readonly compareHasNext = this.compare.compareHasNext;

  /** Count of events that differ between the two traces. */
  readonly compareDifferingCount = this.compare.compareDifferingCount;

  /** Duration of the "before" trace in milliseconds. */
  readonly compareBeforeDuration = this.compare.compareBeforeDuration;

  /** Duration of the "after" trace in milliseconds. */
  readonly compareAfterDuration = this.compare.compareAfterDuration;

  /** Human-readable duration delta label. */
  readonly compareDurationDelta = this.compare.compareDurationDelta;

  /** Maximum duration across both traces for time scale. */
  /** Active timeline view mode for component switching. */
  readonly timelineViewMode = this.compare.timelineViewMode;

  /** Whether the diff-only filter is active. */
  readonly showOnlyDiffs = this.compare.showOnlyDiffs;

  /** Whether the state-only filter is active. */
  readonly showOnlyState = this.compare.showOnlyState;

  /** Active category filter set. */
  readonly categoryFilters = this.compare.categoryFilters;

  /** Indices of events that differ between traces. */
  readonly differingIndices = this.compare.differingIndices;

  /** Unique event categories across both traces. */
  readonly compareCategories = this.compare.compareCategories;

  /** Indices of events visible after applying all filters. */
  readonly visibleIndices = this.compare.visibleIndices;

  /** Count of identical events skipped before the current index. */
  readonly skippedBeforeCurrentCount = this.compare.skippedBeforeCurrentCount;

  /** Noise-stripped event at the current index from the "before" trace. */
  readonly currentBeforeEvent = this.compare.currentBeforeEvent;

  /** Noise-stripped event at the current index from the "after" trace. */
  readonly currentAfterEvent = this.compare.currentAfterEvent;

  /** Diff hunks between the current before and after events. */
  readonly compareDiffHunks = this.compare.compareDiffHunks;

  /** Rendered diff lines for the "before" side. */
  readonly compareBeforeLines = this.compare.compareBeforeLines;

  /** Rendered diff lines for the "after" side. */
  readonly compareAfterLines = this.compare.compareAfterLines;

  // ─── Delegated methods ───

  /** Toggles the diff-only event filter. */
  toggleDiffFilter(): void {
    this.compare.toggleDiffFilter();
  }

  /**
   * Toggles a category in the active category filter set.
   *
   * @param category - The category name to toggle.
   */
  toggleCategoryFilter(category: string): void {
    this.compare.toggleCategoryFilter(category);
  }

  /** Toggles the state-only event filter. */
  toggleStateFilter(): void {
    this.compare.toggleStateFilter();
  }

  /** Navigates to the previous event in the comparison. */
  previousEvent(): void {
    this.compare.previousEvent();
  }

  /** Navigates to the next event in the comparison. */
  nextEvent(): void {
    this.compare.nextEvent();
  }

  /**
   * Selects a trace for comparison, auto-assigning it to the before or after slot.
   *
   * @param traceId - The trace ID to select.
   */
  selectCompareTrace(traceId: string): void {
    this.compare.selectCompareTrace(traceId);
  }

  /**
   * Sets the "before" trace for comparison.
   *
   * @param traceId - The trace ID to assign as the before trace.
   */
  selectBeforeTrace(traceId: string): void {
    this.compare.selectBeforeTrace(traceId);
  }

  /**
   * Sets the "after" trace for comparison.
   *
   * @param traceId - The trace ID to assign as the after trace.
   */
  selectAfterTrace(traceId: string): void {
    this.compare.selectAfterTrace(traceId);
  }

  // ─── Page-specific methods ───

  /**
   * Handles cell key selection changes.
   *
   * @param key - The selected cell key.
   */
  onCellKeyChange(key: string): void {
    this.selectedCellKey.set(key);
    this.selectedTraceId.set('');
    this.resultMessage.set('');
    this.compare.resetFilters();
    this.#syncCellTraces();
  }

  /**
   * Handles trace ID selection changes.
   *
   * @param traceId - The selected trace ID.
   */
  onTraceIdChange(traceId: string): void {
    this.selectedTraceId.set(traceId);
    this.resultMessage.set('');
    this.resultIsError.set(false);
    this.showTraceSummary.set(true);
    this.showResolvedValue.set(true);
    this.showCompareTraces.set(false);
  }

  /**
   * Replays the selected trace through the live FeatureCell instance.
   */
  replay(): void {
    const cellKey = this.selectedCellKey();
    const value = this.resolvedValue();
    const method = this.dispatchMethod();

    if (!cellKey || value === undefined || !method) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        'Missing cell key, resolved value, or dispatch method.'
      );
      return;
    }

    const sdux: SDuXShape | undefined = globalThis.sdux;
    const cell = sdux?.replay?.getCell(cellKey) as
      | { mergeState: (v: unknown) => void; replaceState: (v: unknown) => void }
      | undefined;

    if (!cell) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        `No live cell found for "${cellKey}". Ensure the application is running with DevMode enabled.`
      );
      return;
    }

    try {
      if (method === 'merge') {
        cell.mergeState(value);
      } else {
        cell.replaceState(value);
      }

      this.resultIsError.set(false);
      this.resultMessage.set(
        `Replayed via ${method}State to "${cellKey}" successfully.`
      );
      this.showTraceSummary.set(false);
      this.showResolvedValue.set(false);
      this.showCompareTraces.set(true);
      this.compareBeforeId.set(this.selectedTraceId());
      this.compareEventIndex.set(0);
    } catch (error: unknown) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        `Replay failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /** Pushes the current cellTraces into the comparison service. */
  #syncCellTraces(): void {
    this.compare.cellTraces.set(this.cellTraces());
  }
}
