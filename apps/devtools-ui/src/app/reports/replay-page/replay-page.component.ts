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
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { InsightService } from '../../services/insight/insight.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ExportButtonComponent } from '../../shared/components/export-button/export-button.component';
import { HeaderSectionComponent } from '../../shared/components/header-section/header-section.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { UpsellNoticeComponent } from '../../shared/components/upsell-notice/upsell-notice.component';
import { LeftRightNavigationDirective } from '../../shared/directives/left-right-navigation/left-right-navigation.directive';
import type { TraceExecutionShape } from '../../shared/shapes/trace';
import {
  DumpFileLoadedEvent,
  DumpFilePickerComponent
} from '../load-dump-page/dump-file-picker/dump-file-picker.component';
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
    EmptyStateComponent,
    ExportButtonComponent,
    HeaderSectionComponent,
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

  /** Insight service for replaying traces through the bridge. */
  #insight = inject(InsightService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Comparison service owning all trace comparison state. */
  readonly compare = inject(CompareTraceService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Whether the replay details section is expanded. */
  readonly showReplay = signal(true);

  /** Whether the compare section is expanded. */
  readonly showCompare = signal(true);

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

  /** Whether the next auto-select should also pick the first trace. */
  #autoSelectTrace = false;

  /** Auto-select the first cell key when traces become available. */
  readonly #autoSelectCellKey = effect(() => {
    const keys = this.cellKeys();
    if (keys.length > 0 && !this.selectedCellKey()) {
      this.selectedCellKey.set(keys[0]);
    }
  });

  /** Auto-select the first trace after a file load populates cellTraces. */
  readonly #autoSelectFirstTrace = effect(() => {
    const traces = this.cellTraces();
    if (this.#autoSelectTrace && traces.length > 0) {
      this.#autoSelectTrace = false;
      this.onTraceIdChange(traces[0].traceId);
    }
  });

  /** Keep the comparison service in sync whenever cellTraces changes. */
  readonly #syncTraces = effect(() => {
    const traces = this.cellTraces();
    this.compare.cellTraces.set(traces);

    if (traces.length >= 2) {
      if (!this.compare.compareBeforeId()) {
        this.compare.compareBeforeId.set(traces[0].traceId);
      }
      if (!this.compare.compareAfterId()) {
        this.compare.compareAfterId.set(traces[1].traceId);
      }
    }
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

  // ─── Template state guards (2–7) ───

  /** State 2: no pipeline data available yet. */
  readonly isEmpty = computed(() => !this.cellKeys().length);

  /** State 3: a cell key is selected, enabling the trace dropdown. */
  readonly hasCellKey = computed(() => !!this.selectedCellKey());

  /** State 4: a cell is selected but no trace has been picked yet. */
  readonly isAwaitingTrace = computed(
    () => !!this.selectedCellKey() && !this.selectedTrace()
  );

  /** State 5: a trace is selected and replay details are available. */
  readonly hasTrace = computed(() => !!this.selectedTrace());

  /** State 6: two or more traces exist, enabling side-by-side comparison. */
  readonly isComparable = computed(() => this.cellTraces().length >= 2);

  /** State 7: a trace is selected but fewer than two traces exist for comparison. */
  readonly isAwaitingComparison = computed(
    () => !!this.selectedTrace() && this.cellTraces().length < 2
  );

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

  /** Whether to show only changed keys in diff and table views. */
  readonly showChangedOnly = this.compare.showChangedOnly;

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
   * Handles a successful dump file load by resetting state and
   * auto-selecting the first cell key and trace.
   *
   * @param _event - The load result containing file name and event count.
   */
  onFileLoaded(_event: DumpFileLoadedEvent): void {
    this.selectedCellKey.set('');
    this.selectedTraceId.set('');
    this.resultMessage.set('');
    this.resultIsError.set(false);
    this.compare.resetFilters();
    this.#autoSelectTrace = true;
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
    this.showReplay.set(true);
  }

  /**
   * Replays the selected trace through the live FeatureCell instance.
   */
  async replay(): Promise<void> {
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

    const result = await this.#insight.replayCell(cellKey, value, method);

    this.resultIsError.set(!result.success);
    this.resultMessage.set(result.message);

    if (result.success) {
      this.showReplay.set(false);
      this.showCompareTraces.set(true);
      this.compareBeforeId.set(this.selectedTraceId());
      this.compareEventIndex.set(0);
    }
  }

  /** Pushes the current cellTraces into the comparison service. */
  #syncCellTraces(): void {
    this.compare.cellTraces.set(this.cellTraces());
  }
}
