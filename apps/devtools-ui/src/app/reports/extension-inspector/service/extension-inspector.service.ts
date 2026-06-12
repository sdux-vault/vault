import { computed, Injectable, signal } from '@angular/core';
import type { EventShape } from '@sdux-vault/shared';
import type { TraceExecutionShape } from '../../../shapes/trace';

/**
 * Shape for a single marker on the inspector timeline.
 */
export interface InspectorTimelineRowShape {
  /** Sequential label (t1, t2, ...). */
  traceLabel: string;

  /** Trace identifier. */
  traceId: string;

  /** Total trace duration (ms). */
  traceDuration: number;

  /** Start position of the key's span as a percentage of max duration. */
  startPercent: number;

  /** Width of the key's span as a percentage of max duration. */
  widthPercent: number;

  /** Duration of the key's stages within this trace (ms). */
  keyDuration: number;

  /** Track width as a percentage of max duration. */
  trackWidthPercent: number;
}

/**
 * Shape describing a single extension key's performance within one trace.
 */
export interface ExtensionKeyDurationShape {
  /** Trace identifier. */
  traceId: string;

  /** Sequential label (t1, t2, ...). */
  traceLabel: string;

  /** Total duration in milliseconds for this key within the trace. */
  duration: number;

  /** Events matching the selected key within this trace. */
  events: EventShape[];

  /** Total trace duration for calculating percentage. */
  traceDuration: number;
}

/**
 * Service that owns all state for the Extension Inspector view.
 *
 * Manages cell/key selection, filtered event extraction, and
 * per-key duration statistics across traces.
 *
 * Provided at the component level so each page gets its own instance.
 */
@Injectable()
export class ExtensionInspectorService {
  /** All traces available for inspection. */
  readonly cellTraces = signal<TraceExecutionShape[]>([]);

  /** Sequential labels (t1, t2, ...) for each trace. */
  readonly traceLabels = computed(() => {
    const traces = this.cellTraces();
    const labels = new Map<string, string>();
    for (let i = 0; i < traces.length; i++) {
      labels.set(traces[i].traceId, `t${i + 1}`);
    }
    return labels;
  });

  /** The controller/behavior key being inspected. */
  readonly selectedKey = signal<string>('');

  /**
   * Unique extension keys (behavior/controller) derived from
   * all traces' stage metrics.
   */
  readonly extensionKeys = computed(() => {
    const keys = new Set<string>();
    for (const trace of this.cellTraces()) {
      for (const stage of trace.metrics.stages) {
        if (stage.behaviorKey) {
          keys.add(stage.behaviorKey);
        }
      }
    }
    return Array.from(keys).sort();
  });

  /** Events matching the selected key across all traces. */
  readonly filteredTraceEvents = computed(() => {
    const key = this.selectedKey();
    if (!key) return [];
    return this.cellTraces().map((trace) => ({
      traceId: trace.traceId,
      events: trace.events.filter((e) => e.behaviorKey === key)
    }));
  });

  /** Per-trace duration data for the selected key. */
  readonly keyDurations = computed<ExtensionKeyDurationShape[]>(() => {
    const key = this.selectedKey();
    const labels = this.traceLabels();
    if (!key) return [];

    return this.cellTraces()
      .map((trace) => {
        const matchingStages = trace.metrics.stages.filter(
          (s) => s.behaviorKey === key
        );
        const duration = matchingStages.reduce((sum, s) => sum + s.duration, 0);
        const events = trace.events.filter((e) => e.behaviorKey === key);
        return {
          traceId: trace.traceId,
          traceLabel: labels.get(trace.traceId) ?? '',
          duration,
          events,
          traceDuration: trace.metrics.duration
        };
      })
      .filter((d) => d.events.length > 0);
  });

  /** Number of traces containing the selected key. */
  readonly executionCount = computed(() => this.keyDurations().length);

  /** Average duration across all traces for the selected key. */
  readonly avgDuration = computed(() => {
    const durations = this.keyDurations();
    if (durations.length === 0) return 0;
    const total = durations.reduce((sum, d) => sum + d.duration, 0);
    return total / durations.length;
  });

  /** Minimum duration across all traces for the selected key. */
  readonly minDuration = computed(() => {
    const durations = this.keyDurations();
    if (durations.length === 0) return 0;
    return Math.min(...durations.map((d) => d.duration));
  });

  /** Maximum duration across all traces for the selected key. */
  readonly maxDuration = computed(() => {
    const durations = this.keyDurations();
    if (durations.length === 0) return 0;
    return Math.max(...durations.map((d) => d.duration));
  });

  /** Average percentage of total trace duration consumed by the selected key. */
  readonly avgTracePercent = computed(() => {
    const durations = this.keyDurations();
    if (durations.length === 0) return 0;
    const percents = durations.map((d) =>
      d.traceDuration > 0 ? (d.duration / d.traceDuration) * 100 : 0
    );
    return percents.reduce((sum, p) => sum + p, 0) / percents.length;
  });

  // ─── Timeline ───

  /** Zoom level for the timeline. */
  readonly timelineZoom = signal(1);

  /** Maximum duration across all traces (for shared time scale). */
  readonly timelineMaxDuration = computed(() => {
    const traces = this.cellTraces();
    if (traces.length === 0) return 1;
    return Math.max(...traces.map((t) => t.metrics.duration), 1);
  });

  /** Tick interval in ms, adapts to zoom level. */
  readonly timelineTickInterval = computed(() => {
    const zoom = this.timelineZoom();
    if (zoom >= 4) return 25;
    if (zoom >= 2) return 50;
    return 100;
  });

  /** Tick percentage for CSS repeating gradient. */
  readonly timelineTickPercent = computed(() => {
    const max = this.timelineMaxDuration();
    return (this.timelineTickInterval() / max) * 100;
  });

  /** Timeline rows — one per trace containing the selected key. */
  readonly timelineRows = computed<InspectorTimelineRowShape[]>(() => {
    const key = this.selectedKey();
    const labels = this.traceLabels();
    const maxDur = this.timelineMaxDuration();
    if (!key || maxDur === 0) return [];

    return this.cellTraces()
      .map((trace) => {
        const stages = trace.metrics.stages.filter(
          (s) => s.behaviorKey === key
        );
        if (stages.length === 0) return null;

        const traceStart = trace.startedAt;
        const earliest =
          Math.min(...stages.map((s) => s.startedAt)) - traceStart;
        const latest =
          Math.max(...stages.map((s) => s.startedAt + s.duration)) - traceStart;
        const keyDuration = latest - earliest;

        return {
          traceLabel: labels.get(trace.traceId) ?? '',
          traceId: trace.traceId,
          traceDuration: trace.metrics.duration,
          startPercent: (earliest / maxDur) * 100,
          widthPercent: Math.max((keyDuration / maxDur) * 100, 0.5),
          keyDuration,
          trackWidthPercent: (trace.metrics.duration / maxDur) * 100
        };
      })
      .filter((row): row is InspectorTimelineRowShape => row !== null);
  });

  // ─── Filtered Timeline (key duration only) ───

  /** Maximum key duration across all traces (for filtered time scale). */
  readonly filteredMaxDuration = computed(() => {
    const rows = this.timelineRows();
    if (rows.length === 0) return 1;
    return Math.max(...rows.map((r) => r.keyDuration), 1);
  });

  /** Tick percentage for the filtered timeline. */
  readonly filteredTickPercent = computed(() => {
    const max = this.filteredMaxDuration();
    return (this.timelineTickInterval() / max) * 100;
  });

  /** Filtered timeline rows — scaled to max key duration instead of max trace duration. */
  readonly filteredTimelineRows = computed<InspectorTimelineRowShape[]>(() => {
    const rows = this.timelineRows();
    const maxKeyDur = this.filteredMaxDuration();
    if (rows.length === 0 || maxKeyDur === 0) return [];

    return rows.map((row) => ({
      ...row,
      startPercent: 0,
      widthPercent: 100,
      trackWidthPercent: (row.keyDuration / maxKeyDur) * 100
    }));
  });

  // ─── State Comparison ───

  /** Index of the currently viewed execution for state comparison. */
  readonly selectedExecutionIndex = signal(0);

  /** The selected execution's events. */
  readonly selectedExecution = computed(() => {
    const durations = this.keyDurations();
    const idx = this.selectedExecutionIndex();
    return durations[idx] ?? null;
  });

  /**
   * All pipeline candidate events from the current execution's trace,
   * in the order they appear in the event log.
   */
  readonly candidateEvents = computed<EventShape[]>(() => {
    const exec = this.selectedExecution();
    if (!exec) return [];

    const trace = this.cellTraces().find((t) => t.traceId === exec.traceId);
    if (!trace) return [];

    return trace.events.filter((e) => e.boundary === 'candidate');
  });

  /** Whether there is a previous execution to navigate to. */
  readonly hasPreviousExecution = computed(
    () => this.selectedExecutionIndex() > 0
  );

  /** Whether there is a next execution to navigate to. */
  readonly hasNextExecution = computed(
    () => this.selectedExecutionIndex() < this.keyDurations().length - 1
  );

  /** Navigate to the previous execution. */
  previousExecution(): void {
    if (this.hasPreviousExecution()) {
      this.selectedExecutionIndex.update((i) => i - 1);
    }
  }

  /** Navigate to the next execution. */
  nextExecution(): void {
    if (this.hasNextExecution()) {
      this.selectedExecutionIndex.update((i) => i + 1);
    }
  }
}
