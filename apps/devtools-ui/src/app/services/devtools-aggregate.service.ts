import { DestroyRef, Injectable, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  DEVTOOLS_AGGREGATE_KEY_CONSTANT,
  DEVTOOLS_LOGGING_KEY_CONSTANT,
  EventBoundaryTypes,
  EventShape,
  EventTypes,
  PipelineStage
} from '@sdux-vault/shared';
import { filter } from 'rxjs';
import type {
  CandidateSnapshotShape,
  CellAggregateShape,
  StageMetricShape,
  TraceExecutionShape,
  TraceExecutionStatus,
  TraceMetricsShape
} from '../shapes/trace';
import { TraceExecutionStatuses } from '../shapes/trace';
import { InsightService } from './insight/insight.service';

/**
 * Event names that signal the end of a trace execution.
 * When any of these events fires, the in-flight buffer is finalized
 * and committed to the FeatureCell.
 */
const TERMINAL_EVENTS = new Set([
  'conductor:end:attempt',
  'conductor:start:deny',
  'conductor:start:abort'
]);

/**
 * Error notification events that also terminate a trace.
 */
const ERROR_EVENTS = new Set([
  'lifecycle:notification:failure',
  'lifecycle:notification:fatal',
  'lifecycle:notification:runtime-error'
]);

/**
 * Default orphan timeout in milliseconds.
 * Traces that have not received a terminal event within this window
 * are committed with an `orphaned` status.
 */
const ORPHAN_TIMEOUT_MS = 30_000;

/**
 * FeatureCell-backed service that buffers raw pipeline events per-trace,
 * computes metrics on the terminal event, and commits completed
 * TraceExecution records into the aggregate FeatureCell.
 *
 * Exposes computed signals for per-cell grouping and aggregate statistics.
 */
@FeatureCell<TraceExecutionShape[]>(DEVTOOLS_AGGREGATE_KEY_CONSTANT)
@Injectable({ providedIn: 'root' })
export class DevtoolsAggregateService {
  /**
   * Internal FeatureCell storing completed TraceExecution records.
   */
  private readonly vault = injectVault<TraceExecutionShape[]>(
    DevtoolsAggregateService
  );

  /**
   * DevTools InsightService that exposes pipeline and queue observables.
   */
  private readonly bus = inject(InsightService);

  /**
   * Used to auto-dispose subscriptions when the service is destroyed.
   */
  private readonly destroyRef = inject(DestroyRef);

  /**
   * In-flight event buffer keyed by traceId.
   * Entries are removed once the trace is committed or orphaned.
   */
  private readonly buffer = new Map<string, EventShape[]>();

  /**
   * Set of traceIds that have already been committed.
   * Used to discard post-commit events (e.g. `lifecycle:notification:finalize`)
   * that arrive after the terminal event has already closed the trace.
   */
  private readonly committedTraces = new Set<string>();

  /**
   * Timeout handles for orphan detection, keyed by traceId.
   */
  private readonly orphanTimers = new Map<
    string,
    ReturnType<typeof setTimeout>
  >();

  /**
   * Reactive list of completed trace executions from the FeatureCell.
   */
  readonly traces = computed(() => this.vault.state.value() ?? []);

  /**
   * Total number of completed trace executions.
   */
  readonly totalTraces = computed(() => this.traces().length);

  /**
   * Traces grouped by cellKey for per-cell views.
   */
  readonly tracesByCellKey = computed(() => {
    const map = new Map<string, TraceExecutionShape[]>();
    for (const trace of this.traces()) {
      const existing = map.get(trace.cellKey);
      if (existing) {
        existing.push(trace);
      } else {
        map.set(trace.cellKey, [trace]);
      }
    }
    return map;
  });

  /**
   * Aggregate statistics per cellKey (averages, min/max, error rates).
   */
  readonly cellAggregates = computed(() => {
    const result = new Map<string, CellAggregateShape>();
    for (const [cellKey, traces] of this.tracesByCellKey()) {
      const durations = traces.map((t) => t.metrics.duration);
      const errorTraces = traces.filter(
        (t) =>
          t.metrics.status === TraceExecutionStatuses.Failed ||
          t.metrics.status === TraceExecutionStatuses.Orphaned
      );
      result.set(cellKey, {
        cellKey,
        traceCount: traces.length,
        averageDuration:
          durations.reduce((sum, d) => sum + d, 0) / durations.length,
        minDuration: Math.min(...durations),
        maxDuration: Math.max(...durations),
        errorCount: errorTraces.length,
        errorRate: errorTraces.length / traces.length,
        errorTraceIds: errorTraces.map((t) => t.traceId)
      });
    }
    return result;
  });

  /**
   * Initializes the FeatureCell with withQuery support and subscribes
   * to the pipeline event stream for trace buffering.
   */
  constructor() {
    this.vault.withQuery?.({ idKey: 'traceId' }).initialize();

    this.bus
      .pipeline$()
      .pipe(
        filter(
          (event): event is EventShape =>
            !!event &&
            !!event.traceId &&
            !event.name.includes(':reset') &&
            event.name !== 'lifecycle:notification:finalize' &&
            event.name !== 'lifecycle:notification:abort' &&
            event.name !== 'controller:notification:restart-attempt' &&
            ![
              DEVTOOLS_LOGGING_KEY_CONSTANT,
              DEVTOOLS_AGGREGATE_KEY_CONSTANT
            ].includes(event.cell)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => this.handleEvent(event));
  }

  /**
   * Clears all completed traces and in-flight buffers.
   */
  clearTraces(): void {
    this.buffer.clear();
    this.committedTraces.clear();
    for (const timer of this.orphanTimers.values()) {
      clearTimeout(timer);
    }
    this.orphanTimers.clear();
    this.vault.reset();
    this.vault.replaceState({ value: [] });
  }

  /**
   * Loads events from an exported debug dump file.
   *
   * Clears existing traces, then replays each event through the
   * standard buffering and commit pipeline so the UI renders
   * dump data identically to live data.
   *
   * @param events - Array of EventShape records from a dump file.
   */
  loadDumpEvents(events: EventShape[]): void {
    this.clearTraces();
    for (const event of events) {
      if (event.traceId) {
        this.handleEvent(event);
      }
    }
  }

  /**
   * Routes an incoming event to the appropriate buffer and checks
   * for terminal conditions.
   *
   * @param event - The pipeline event to process.
   */
  private handleEvent(event: EventShape): void {
    const traceId = event.traceId!;
    const isInitiating =
      event.name === 'conductor:start:attempt' ||
      event.name.startsWith('controller:start:') ||
      event.name === 'lifecycle:notification:revote';
    const wasPreviouslyCommitted = this.committedTraces.has(traceId);

    if (wasPreviouslyCommitted) {
      this.committedTraces.delete(traceId);
    }

    let events = this.buffer.get(traceId);

    if (!events) {
      if (!isInitiating) {
        return;
      }
      events = [];
      this.buffer.set(traceId, events);
      this.startOrphanTimer(traceId);
    }

    events.push(event);

    if (TERMINAL_EVENTS.has(event.name) || ERROR_EVENTS.has(event.name)) {
      this.commitTrace(traceId, events, event);
    }
  }

  /**
   * Finalizes a trace buffer into a TraceExecutionShape and commits
   * it to the FeatureCell via mergeState.
   *
   * @param traceId - Unique trace identifier.
   * @param events - Ordered array of buffered events.
   * @param terminalEvent - The event that triggered finalization.
   */
  private commitTrace(
    traceId: string,
    events: EventShape[],
    terminalEvent: EventShape
  ): void {
    this.clearOrphanTimer(traceId);
    this.buffer.delete(traceId);
    this.committedTraces.add(traceId);

    const status = this.resolveStatus(terminalEvent);
    const metrics = this.computeMetrics(events, status);
    const trace: TraceExecutionShape = {
      traceId,
      cellKey: events[0].cell,
      startedAt: events[0].timestamp,
      finishedAt: terminalEvent.timestamp,
      events,
      metrics
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.vault.mergeState({ value: trace as any });
  }

  /**
   * Commits an orphaned trace when the timeout fires without a terminal event.
   *
   * @param traceId - Unique trace identifier.
   */
  private commitOrphanedTrace(traceId: string): void {
    const events = this.buffer.get(traceId);
    if (!events || events.length === 0) {
      this.buffer.delete(traceId);
      return;
    }

    this.orphanTimers.delete(traceId);
    this.buffer.delete(traceId);

    const metrics = this.computeMetrics(
      events,
      TraceExecutionStatuses.Orphaned
    );
    const trace: TraceExecutionShape = {
      traceId,
      cellKey: events[0].cell,
      startedAt: events[0].timestamp,
      finishedAt: events[events.length - 1].timestamp,
      events,
      metrics
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.vault.mergeState({ value: trace as any });
  }

  /**
   * Determines the trace status from the terminal event name.
   *
   * @param event - The terminal event.
   * @returns The resolved TraceExecutionStatus.
   */
  private resolveStatus(event: EventShape): TraceExecutionStatus {
    if (event.name === 'conductor:start:deny') {
      return TraceExecutionStatuses.Denied;
    }
    if (event.name === 'conductor:start:abort') {
      return TraceExecutionStatuses.Aborted;
    }
    if (
      event.name === 'conductor:end:attempt' &&
      this.isAbortPayload(event.payload)
    ) {
      return TraceExecutionStatuses.Aborted;
    }
    if (ERROR_EVENTS.has(event.name)) {
      return TraceExecutionStatuses.Failed;
    }
    return TraceExecutionStatuses.Success;
  }

  /**
   * Type guard that checks whether a terminal event payload indicates
   * an abort outcome from the conductor.
   *
   * @param payload - The event payload to inspect.
   * @returns True when the payload carries `status: 'abort'`.
   */
  private isAbortPayload(payload: unknown): payload is { status: string } {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'status' in payload &&
      (payload as { status: unknown }).status === 'abort'
    );
  }

  /**
   * Computes aggregate metrics from a completed event sequence.
   *
   * @param events - Ordered array of trace events.
   * @param status - Resolved execution status.
   * @returns Computed TraceMetricsShape.
   */
  private computeMetrics(
    events: EventShape[],
    status: TraceExecutionStatus
  ): TraceMetricsShape {
    const stages = this.matchStages(events);
    const nonAttemptStages = stages.filter((s) => s.name !== 'attempt');
    const duration =
      events.length > 1
        ? events[events.length - 1].timestamp - events[0].timestamp
        : 0;

    const slowestStage =
      nonAttemptStages.length > 0
        ? nonAttemptStages.reduce((a, b) => (a.duration > b.duration ? a : b))
        : { name: 'none', duration: 0 };

    const fastestStage =
      nonAttemptStages.length > 0
        ? nonAttemptStages.reduce((a, b) => (a.duration < b.duration ? a : b))
        : { name: 'none', duration: 0 };

    return {
      duration,
      eventCount: events.length,
      status,
      slowestStage: {
        name: slowestStage.name,
        duration: slowestStage.duration
      },
      fastestStage: {
        name: fastestStage.name,
        duration: fastestStage.duration
      },
      stages,
      hadRevote: events.some((e) => e.name === 'conductor:start:revote'),
      controllerVoteCount: events.filter(
        (e) => e.name === 'controller:end:vote'
      ).length,
      usedLicensedFeatures: events.some(
        (e) => e.name === 'conductor:start:license-approved'
      )
    };
  }

  /**
   * Matches start/end boundary pairs from the event sequence to produce
   * StageMetricShape entries.
   *
   * @param events - Ordered array of trace events.
   * @returns Array of matched stage metrics.
   */
  private matchStages(events: EventShape[]): StageMetricShape[] {
    const stages: StageMetricShape[] = [];
    const openStarts = new Map<string, EventShape>();

    for (const event of events) {
      const parts = event.name.split(':');
      if (parts.length !== 3) continue;

      const [type, boundary, stageName] = parts;
      const matchKey = `${type}:${stageName}:${event.behaviorKey}`;

      if (boundary === EventBoundaryTypes.Start) {
        openStarts.set(matchKey, event);
      } else if (boundary === EventBoundaryTypes.End) {
        const startEvent = openStarts.get(matchKey);
        if (startEvent) {
          openStarts.delete(matchKey);
          const duration = event.timestamp - startEvent.timestamp;
          stages.push({
            name: stageName,
            behaviorKey: event.behaviorKey,
            startedAt: startEvent.timestamp,
            finishedAt: event.timestamp,
            duration,
            type: event.type as (typeof EventTypes)[keyof typeof EventTypes],
            startEventId: startEvent.id,
            payload: event.payload,
            error: event.error
          });
        }
      }
    }

    return stages;
  }

  /**
   * Starts an orphan detection timer for a newly seen traceId.
   *
   * @param traceId - The trace to monitor for orphan timeout.
   */
  private startOrphanTimer(traceId: string): void {
    const timer = setTimeout(
      () => this.commitOrphanedTrace(traceId),
      ORPHAN_TIMEOUT_MS
    );
    this.orphanTimers.set(traceId, timer);
  }

  /**
   * Clears the orphan timer for a trace that received its terminal event.
   *
   * @param traceId - The trace to clear the timer for.
   */
  private clearOrphanTimer(traceId: string): void {
    const timer = this.orphanTimers.get(traceId);
    if (timer) {
      clearTimeout(timer);
      this.orphanTimers.delete(traceId);
    }
  }

  /**
   * Extracts candidate snapshots from a trace execution for the State Diff View.
   *
   * Filters events to pipeline candidate boundaries and maps each to a
   * CandidateSnapshotShape with the stage label, value, and sequence index.
   *
   * @param trace - The trace execution to extract candidates from.
   * @returns Ordered array of candidate snapshots.
   */
  extractCandidates(trace: TraceExecutionShape): CandidateSnapshotShape[] {
    return trace.events
      .filter(
        (event) =>
          event.type === EventTypes.Pipeline &&
          event.boundary === EventBoundaryTypes.Candidate
      )
      .map((event, index) => ({
        stage: event.name.split(':').pop() as PipelineStage,
        eventId: event.id,
        behaviorKey: event.behaviorKey,
        timestamp: event.timestamp,
        sequenceIndex: index,
        value: event.candidate
      }));
  }
}
