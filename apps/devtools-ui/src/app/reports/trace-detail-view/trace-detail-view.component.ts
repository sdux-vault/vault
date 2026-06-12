import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { ExportButtonComponent } from '../../shared/components/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { EscapeCloseDirective } from '../../shared/directives/escape-close/escape-close.directive';
import type { TraceExecutionShape } from '../../shared/shapes/trace';
import { TraceExecutionStatuses } from '../../shared/shapes/trace';
import type { StageMetricShape } from '../../shared/shapes/trace/stage-metric.shape';
import { DevtoolsPipelineEventDetailComponent } from '../events/panels/events/pipeline/detail/devtools-pipeline-event-detail.component';
import { TraceHotStageRankingComponent } from '../hot-stage-ranking-page/hot-stage-ranking-trace/trace-hot-stage-ranking.component';
import { TraceEventTableComponent } from './event-table/trace-event-table.component';
import { TracePipelineFlowTabComponent } from './pipeline-flow-tab/trace-pipeline-flow-tab.component';
import { TraceStageWaterfallComponent } from './stage-waterfall/trace-stage-waterfall.component';
import { TraceTimelineComponent } from './timeline/trace-timeline.component';

/**
 * Trace Timeline component.
 *
 * Displays completed traces as horizontal timeline bars with summary
 * statistics, an expandable event table per trace, and a stage waterfall
 * visualization. Matches the DevTools UI design language used by the
 * events pipeline panel and registry detail views.
 */
@Component({
  selector: 'sdux-trace-detail-view',
  standalone: true,
  imports: [
    UpperCasePipe,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    EscapeCloseDirective,
    ResetButtonComponent,
    ExportButtonComponent,
    HelpToggleComponent,
    TraceEventTableComponent,
    TraceHotStageRankingComponent,
    TracePipelineFlowTabComponent,
    TraceStageWaterfallComponent,
    TraceTimelineComponent,
    DevtoolsPipelineEventDetailComponent
  ],
  templateUrl: './trace-detail-view.component.html',
  styleUrls: [
    '../scss/reports-common.scss',
    './trace-detail-view.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceDetailViewComponent implements OnInit {
  /** Internal reference to the trace aggregate FeatureCell service. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Activated route for reading query params. */
  #route = inject(ActivatedRoute);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** All completed traces from the aggregate service. */
  readonly traces = this.#aggregate.traces;

  /** Available cell keys for filtering. */
  readonly cellKeys = computed(() => {
    const keys = [...this.#aggregate.tracesByCellKey().keys()];
    return keys.sort();
  });

  /** Currently selected cell filter ('all' = no filter). */
  readonly selectedCell = signal<string>('all');

  /** Currently expanded trace ID. */
  readonly expandedTraceId = signal<string | null>(null);

  /** Currently selected event for the detail panel. */
  readonly selectedEvent = signal<EventShape | null>(null);

  /** Cell key for the currently expanded trace. */
  readonly expandedTraceCellKey = computed(() => {
    const traceId = this.expandedTraceId();
    if (!traceId) return null;
    const trace = this.filteredTraces().find((t) => t.traceId === traceId);
    return trace?.cellKey ?? null;
  });

  /** Traces filtered by selected cell, ordered by startedAt descending. */
  readonly filteredTraces = computed(() => {
    const cell = this.selectedCell();
    let traces = this.traces();

    if (cell !== 'all') {
      traces = traces.filter((t) => t.cellKey === cell);
    }

    return [...traces].sort((a, b) => a.startedAt - b.startedAt);
  });

  /** Summary statistics for the current filter. */
  readonly stats = computed(() => {
    const traces = this.filteredTraces();
    const total = traces.length;
    const success = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Success
    ).length;
    const errors = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Failed
    ).length;
    const denied = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Denied
    ).length;
    const aborted = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Aborted
    ).length;
    const orphaned = traces.filter(
      (t) => t.metrics.status === TraceExecutionStatuses.Orphaned
    ).length;
    const avgDuration =
      total > 0
        ? traces.reduce((sum, t) => sum + t.metrics.duration, 0) / total
        : 0;

    return { total, success, errors, denied, aborted, orphaned, avgDuration };
  });

  /** Time window boundaries for the timeline bar visualization. */
  readonly timeWindow = computed(() => {
    const traces = this.filteredTraces();
    if (traces.length === 0) return { min: 0, max: 1 };

    const min = Math.min(...traces.map((t) => t.startedAt));
    const max = Math.max(...traces.map((t) => t.finishedAt || t.startedAt));
    const span = max - min || 1;

    return { min, max: min + span };
  });

  /**
   * Resolves a status label for display.
   */
  statusLabel(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return '✓';
      case TraceExecutionStatuses.Failed:
        return '✗';
      case TraceExecutionStatuses.Denied:
        return '⊘';
      case TraceExecutionStatuses.Orphaned:
        return '⚠';
      case TraceExecutionStatuses.Aborted:
        return '↺';
      default:
        return '?';
    }
  }

  /**
   * Resolves a CSS class for the trace status.
   */
  statusClass(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return 'status-success';
      case TraceExecutionStatuses.Failed:
        return 'status-error';
      case TraceExecutionStatuses.Denied:
        return 'status-denied';
      case TraceExecutionStatuses.Orphaned:
        return 'status-orphaned';
      case TraceExecutionStatuses.Aborted:
        return 'status-aborted';
      default:
        return '';
    }
  }

  /**
   * Computes the left offset percentage for a trace bar in the timeline.
   */
  timelineLeft(trace: TraceExecutionShape): number {
    const { min, max } = this.timeWindow();
    return ((trace.startedAt - min) / (max - min)) * 100;
  }

  /**
   * Computes the width percentage for a trace bar in the timeline.
   */
  timelineWidth(trace: TraceExecutionShape): number {
    const { min, max } = this.timeWindow();
    const duration = (trace.finishedAt || trace.startedAt) - trace.startedAt;
    const width = (duration / (max - min)) * 100;
    return Math.max(width, 0.5);
  }

  /**
   * Computes waterfall bar left offset for a stage within its trace.
   */
  waterfallLeft(trace: TraceExecutionShape, stage: StageMetricShape): number {
    if (trace.metrics.duration === 0) return 0;
    return ((stage.startedAt - trace.startedAt) / trace.metrics.duration) * 100;
  }

  /**
   * Computes waterfall bar width for a stage within its trace.
   */
  waterfallWidth(trace: TraceExecutionShape, stage: StageMetricShape): number {
    if (trace.metrics.duration === 0) return 100;
    const width = (stage.duration / trace.metrics.duration) * 100;
    return Math.max(width, 0.5);
  }

  /**
   * Builds waterfall rows from trace stages plus synthetic revote-delay
   * entries. Revote delays are inserted chronologically and excluded
   * from slowest-stage highlighting.
   */
  waterfallStages(trace: TraceExecutionShape): StageMetricShape[] {
    const revoteDelays: StageMetricShape[] = [];
    let denyTimestamp: number | null = null;

    for (const event of trace.events) {
      if (event.name === 'conductor:notification:deny') {
        denyTimestamp = event.timestamp;
      } else if (
        event.name === 'lifecycle:notification:revote' &&
        denyTimestamp !== null
      ) {
        revoteDelays.push({
          name: 'revote-delay',
          behaviorKey: 'vault-conductor',
          startedAt: denyTimestamp,
          finishedAt: event.timestamp,
          duration: event.timestamp - denyTimestamp,
          type: 'lifecycle' as StageMetricShape['type']
        });
        denyTimestamp = null;
      }
    }

    const eventIndex = new Map<string, number>();
    trace.events.forEach((e, i) => eventIndex.set(e.id, i));

    const sortByStart = (a: StageMetricShape, b: StageMetricShape): number => {
      const timeDiff = a.startedAt - b.startedAt;
      if (timeDiff !== 0) return timeDiff;
      return (
        (eventIndex.get(a.startEventId ?? '') ?? 0) -
        (eventIndex.get(b.startEventId ?? '') ?? 0)
      );
    };

    const allStages = [...trace.metrics.stages, ...revoteDelays];
    const attempts: StageMetricShape[] = [];
    const rest: StageMetricShape[] = [];
    for (const stage of allStages) {
      if (stage.name === 'attempt') {
        attempts.push(stage);
      } else {
        rest.push(stage);
      }
    }
    rest.sort(sortByStart);
    return [...rest, ...attempts];
  }

  /**
   * Determines if a stage is a synthetic revote-delay row.
   */
  isRevoteDelay(stage: StageMetricShape): boolean {
    return stage.name === 'revote-delay';
  }

  /**
   * Determines if the slow label should appear to the right of the bar.
   * Returns true when the bar ends in the left half of the track.
   */
  isSlowOnRight(trace: TraceExecutionShape, stage: StageMetricShape): boolean {
    return (
      this.waterfallLeft(trace, stage) + this.waterfallWidth(trace, stage) <= 50
    );
  }

  /**
   * Toggles the expanded trace row.
   */
  toggleTrace(traceId: string): void {
    this.expandedTraceId.set(
      this.expandedTraceId() === traceId ? null : traceId
    );
  }

  /**
   * Reads the `cell` query param on init to auto-select the cell filter.
   */
  ngOnInit(): void {
    const cell = this.#route.snapshot.queryParamMap.get('cell');
    if (cell) {
      this.selectedCell.set(cell);
    }
  }

  /**
   * Selects a cell filter.
   */
  selectCell(cell: string): void {
    this.selectedCell.set(cell);
    this.expandedTraceId.set(null);
  }

  /**
   * Computes the delta time from trace start for a given event.
   */
  deltaMs(
    trace: TraceExecutionShape,
    event: EventShape,
    index: number
  ): string {
    if (index === 0) {
      return '0.0';
    }
    const prev = trace.events[index - 1];
    const delta = event.timestamp - prev.timestamp;
    return delta.toFixed(1);
  }

  /**
   * Computes the total elapsed time from trace start for a given event.
   */
  elapsedMs(trace: TraceExecutionShape, event: EventShape): string {
    const elapsed = event.timestamp - trace.startedAt;
    return elapsed.toFixed(1);
  }

  /**
   * Extracts the behavior key from an event for display.
   */
  eventBehaviorKey(event: EventShape): string {
    return event.behaviorKey ?? '';
  }

  /**
   * Formats an event name for display by dropping the boundary segment.
   * `stage:end:reducer` becomes `stage reducer`.
   */
  eventDisplayName(event: EventShape): string {
    const parts = event.name.split(':');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts.slice(2).join(':')}`;
    }
    return event.name;
  }

  /**
   * Computes stage name occurrence counts for a trace.
   */
  stageCounts(trace: TraceExecutionShape): { name: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const stage of trace.metrics.stages) {
      counts.set(stage.name, (counts.get(stage.name) ?? 0) + 1);
    }
    return Array.from(counts, ([name, count]) => ({ name, count }));
  }

  /**
   * Determines if an event carries a state snapshot.
   */
  hasState(event: EventShape): boolean {
    return event.state?.hasValue === true;
  }

  /**
   * Determines if an event carries a payload.
   */
  hasPayload(event: EventShape): boolean {
    return event.payload !== undefined && event.payload !== null;
  }

  /**
   * Determines if an event carries an error.
   */
  hasError(event: EventShape): boolean {
    return event.error !== undefined && event.error !== null;
  }

  /**
   * Determines if a stage is the slowest in the trace.
   */
  isSlowestStage(trace: TraceExecutionShape, stage: StageMetricShape): boolean {
    return (
      trace.metrics.stages.length > 1 &&
      stage.duration === trace.metrics.slowestStage.duration &&
      stage.name === trace.metrics.slowestStage.name
    );
  }

  /**
   * Selects an event to display in the detail panel.
   */
  selectEvent(event: EventShape): void {
    this.selectedEvent.set(
      this.selectedEvent()?.id === event.id ? null : event
    );
  }

  /**
   * Closes the event detail panel.
   */
  closeEventDetail(): void {
    this.selectedEvent.set(null);
  }

  /**
   * Finds and selects the start event matching a stage in a trace.
   */
  selectStageEvent(trace: TraceExecutionShape, stage: StageMetricShape): void {
    if (stage.startEventId) {
      const event = trace.events.find((e) => e.id === stage.startEventId);
      if (event) {
        this.selectEvent(event);
        return;
      }
    }
    const event = trace.events.find(
      (e) =>
        e.timestamp === stage.startedAt &&
        e.behaviorKey === stage.behaviorKey &&
        e.boundary === 'start' &&
        e.name.endsWith(':' + stage.name)
    );
    if (event) {
      this.selectEvent(event);
    }
  }
}
