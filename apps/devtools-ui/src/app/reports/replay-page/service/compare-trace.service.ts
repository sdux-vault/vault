import { computed, Injectable, signal } from '@angular/core';
import { diffJson, type Change } from 'diff';
import type { TraceExecutionShape } from '../../../shared/shapes/trace';
import type { TimelineDeltaMarkerShape } from '../compare-timeline-delta/compare-timeline-delta.component';
import type { TimelineSpanShape } from '../compare-timeline-spans/compare-timeline-spans.component';
import type { WaterfallCategoryShape } from '../compare-timeline-waterfall/compare-timeline-waterfall.component';
import type { TimelineMarkerShape } from '../compare-timeline/compare-timeline.component';

/**
 * Service that owns all trace-comparison state: trace selection,
 * filters, event navigation, diff computation, and timeline markers.
 *
 * Provided at the component level so each page gets its own instance.
 */
@Injectable()
export class CompareTraceService {
  /** All traces available for comparison. */
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

  /** Trace ID selected as the "before" in comparison. */
  readonly compareBeforeId = signal<string>('');

  /** Trace ID selected as the "after" in comparison. */
  readonly compareAfterId = signal<string>('');

  /** Before events for comparison. */
  readonly compareBeforeEvents = computed<unknown[]>(() => {
    const traceId = this.compareBeforeId();
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    return trace?.events ?? [];
  });

  /** After events for comparison. */
  readonly compareAfterEvents = computed<unknown[]>(() => {
    const traceId = this.compareAfterId();
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    return trace?.events ?? [];
  });

  /** Current event index for compare navigation. */
  readonly compareEventIndex = signal<number>(0);

  /** Total number of events (max of both traces). */
  readonly compareTotalEvents = computed(() =>
    Math.max(
      this.compareBeforeEvents().length,
      this.compareAfterEvents().length
    )
  );

  /** Whether there is a previous event to navigate to. */
  readonly compareHasPrevious = computed(() => {
    const indices = this.visibleIndices();
    if (indices.length > 0) {
      return indices.some((i) => i < this.compareEventIndex());
    }
    return this.compareEventIndex() > 0;
  });

  /** Whether there is a next event to navigate to. */
  readonly compareHasNext = computed(() => {
    const indices = this.visibleIndices();
    if (indices.length > 0) {
      return indices.some((i) => i > this.compareEventIndex());
    }
    return this.compareEventIndex() < this.compareTotalEvents() - 1;
  });

  /** Number of events that differ between the two compared traces. */
  readonly compareDifferingCount = computed(() => {
    const beforeEvents = this.compareBeforeEvents();
    const afterEvents = this.compareAfterEvents();
    const total = this.compareTotalEvents();
    let differing = 0;
    for (let i = 0; i < total; i++) {
      const before = this.stripNoiseFields(beforeEvents[i]);
      const after = this.stripNoiseFields(afterEvents[i]);
      if (JSON.stringify(before) !== JSON.stringify(after)) {
        differing++;
      }
    }
    return differing;
  });

  /** Duration of the "before" trace in milliseconds. */
  readonly compareBeforeDuration = computed(() => {
    const traceId = this.compareBeforeId();
    if (!traceId) return 0;
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    return trace?.metrics?.duration ?? 0;
  });

  /** Duration of the "after" trace in milliseconds. */
  readonly compareAfterDuration = computed(() => {
    const traceId = this.compareAfterId();
    if (!traceId) return 0;
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    return trace?.metrics?.duration ?? 0;
  });

  /** Duration delta label between the two compared traces. */
  readonly compareDurationDelta = computed(() => {
    const before = this.compareBeforeDuration();
    const after = this.compareAfterDuration();
    if (!before && !after) return '';
    const delta = after - before;
    if (delta === 0) return 'same speed';
    return delta > 0 ? `+${delta}ms slower` : `${delta}ms faster`;
  });

  /** Maximum duration across both compared traces (shared time scale). */
  readonly timelineMaxDuration = computed(() =>
    Math.max(this.compareBeforeDuration(), this.compareAfterDuration(), 1)
  );

  /** Display label for the "before" trace. */
  readonly compareBeforeLabel = computed(
    () => this.traceLabels().get(this.compareBeforeId()) ?? 'Before'
  );

  /** Display label for the "after" trace. */
  readonly compareAfterLabel = computed(
    () => this.traceLabels().get(this.compareAfterId()) ?? 'After'
  );

  /** Timeline markers for the "before" trace. */
  readonly timelineBeforeMarkers = computed(() =>
    this.buildTimelineMarkers(this.compareBeforeId())
  );

  /** Timeline markers for the "after" trace. */
  readonly timelineAfterMarkers = computed(() =>
    this.buildTimelineMarkers(this.compareAfterId())
  );

  /** All-events timeline markers for the "before" trace (every event, collision-spread). */
  readonly timelineBeforeAllMarkers = computed(() =>
    this.buildAllEventsMarkers(this.compareBeforeId())
  );

  /** All-events timeline markers for the "after" trace (every event, collision-spread). */
  readonly timelineAfterAllMarkers = computed(() =>
    this.buildAllEventsMarkers(this.compareAfterId())
  );

  /** Diff-only timeline markers for the "before" trace. */
  readonly timelineBeforeDiffMarkers = computed(() =>
    this.buildDiffOnlyMarkers(this.compareBeforeId(), this.compareAfterId())
  );

  /** Diff-only timeline markers for the "after" trace. */
  readonly timelineAfterDiffMarkers = computed(() =>
    this.buildDiffOnlyMarkers(this.compareAfterId(), this.compareBeforeId())
  );

  /** State-only timeline markers for the "before" trace. */
  readonly timelineBeforeStateMarkers = computed(() =>
    this.buildStateOnlyMarkers(this.compareBeforeId())
  );

  /** State-only timeline markers for the "after" trace. */
  readonly timelineAfterStateMarkers = computed(() =>
    this.buildStateOnlyMarkers(this.compareAfterId())
  );

  /** Category-filtered timeline markers for the "before" trace. */
  readonly timelineBeforeCategoryMarkers = computed(() =>
    this.buildCategoryFilteredMarkers(this.compareBeforeId())
  );

  /** Category-filtered timeline markers for the "after" trace. */
  readonly timelineAfterCategoryMarkers = computed(() =>
    this.buildCategoryFilteredMarkers(this.compareAfterId())
  );

  /** Category duration spans for the "before" trace. */
  readonly timelineBeforeSpans = computed(() =>
    this.buildCategorySpans(this.compareBeforeId())
  );

  /** Category duration spans for the "after" trace. */
  readonly timelineAfterSpans = computed(() =>
    this.buildCategorySpans(this.compareAfterId())
  );

  /** Active timeline view mode across all timeline components. */
  readonly timelineViewMode = signal('category-overview');

  /** Zoom multiplier for timeline tracks (1 = no zoom, max 6). */
  readonly timelineZoom = signal(1);

  /** Tick interval in ms, adapting to zoom level. */
  readonly timelineTickInterval = computed(() => {
    const zoom = this.timelineZoom();
    if (zoom >= 4) return 25;
    if (zoom >= 2) return 50;
    return 100;
  });

  /** Tick interval as a percentage of the shared time scale. */
  readonly timelineTickPercent = computed(
    () => (this.timelineTickInterval() / this.timelineMaxDuration()) * 100
  );

  /** Elapsed delta markers comparing corresponding events between traces. */
  readonly timelineDeltaMarkers = computed(() =>
    this.buildElapsedDeltaMarkers()
  );

  /** Waterfall categories with before/after events per category. */
  readonly timelineWaterfallCategories = computed(() =>
    this.buildWaterfallCategories()
  );

  /** Whether only differing events are shown. */
  readonly showOnlyDiffs = signal(false);

  /** Whether only events with a state attribute are shown. */
  readonly showOnlyState = signal(false);

  /** Active category filters. Empty set means all categories are shown. */
  readonly categoryFilters = signal<Set<string>>(new Set());

  /** Indices of events that differ between the two compared traces. */
  readonly differingIndices = computed<number[]>(() => {
    const beforeEvents = this.compareBeforeEvents();
    const afterEvents = this.compareAfterEvents();
    const total = this.compareTotalEvents();
    const indices: number[] = [];
    for (let i = 0; i < total; i++) {
      const before = this.stripNoiseFields(beforeEvents[i]);
      const after = this.stripNoiseFields(afterEvents[i]);
      if (JSON.stringify(before) !== JSON.stringify(after)) {
        indices.push(i);
      }
    }
    return indices;
  });

  /** Unique event type categories from both compared traces. */
  readonly compareCategories = computed<string[]>(() => {
    const beforeEvents = this.compareBeforeEvents();
    const afterEvents = this.compareAfterEvents();
    const categories = new Set<string>();
    for (const event of [...beforeEvents, ...afterEvents]) {
      if (event != null && typeof event === 'object') {
        const name = (event as Record<string, unknown>)['name'];
        if (typeof name === 'string') {
          categories.add(name.split(':')[0]);
        }
      }
    }
    return Array.from(categories).sort();
  });

  /** Indices of events visible after applying diff-only, category, and state filters. */
  readonly visibleIndices = computed<number[]>(() => {
    const diffOnly = this.showOnlyDiffs();
    const cats = this.categoryFilters();
    const stateOnly = this.showOnlyState();
    if (!diffOnly && cats.size === 0 && !stateOnly) return [];
    const diffIndices = diffOnly ? new Set(this.differingIndices()) : null;
    const beforeEvents = this.compareBeforeEvents();
    const afterEvents = this.compareAfterEvents();
    const total = this.compareTotalEvents();
    const result: number[] = [];
    for (let i = 0; i < total; i++) {
      if (diffIndices && !diffIndices.has(i)) continue;
      if (cats.size > 0) {
        const beforeEvent = beforeEvents[i] as
          | Record<string, unknown>
          | undefined;
        const afterEvent = afterEvents[i] as
          | Record<string, unknown>
          | undefined;
        const beforeCat =
          typeof beforeEvent?.['name'] === 'string'
            ? (beforeEvent['name'] as string).split(':')[0]
            : '';
        const afterCat =
          typeof afterEvent?.['name'] === 'string'
            ? (afterEvent['name'] as string).split(':')[0]
            : '';
        if (!cats.has(beforeCat) && !cats.has(afterCat)) continue;
      }
      if (stateOnly) {
        const bEvt = beforeEvents[i] as Record<string, unknown> | undefined;
        const aEvt = afterEvents[i] as Record<string, unknown> | undefined;
        if (!bEvt?.['state'] && !aEvt?.['state']) continue;
      }
      result.push(i);
    }
    return result;
  });

  /** Number of identical events skipped before the current event. */
  readonly skippedBeforeCurrentCount = computed(() => {
    const indices = this.visibleIndices();
    if (indices.length === 0) return 0;
    const currentIdx = this.compareEventIndex();
    const posInFiltered = indices.indexOf(currentIdx);
    if (posInFiltered <= 0) return currentIdx;
    const prevIdx = indices[posInFiltered - 1];
    return currentIdx - prevIdx - 1;
  });

  /** The current before event at the selected index (noise stripped, timing added). */
  readonly currentBeforeEvent = computed<unknown>(() => {
    const event = this.compareBeforeEvents()[this.compareEventIndex()];
    const traceId = this.compareBeforeId();
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    const afterTrace = this.cellTraces().find(
      (t) => t.traceId === this.compareAfterId()
    );
    const afterEvent = this.compareAfterEvents()[this.compareEventIndex()] as
      | Record<string, unknown>
      | undefined;
    return this.stripNoiseFields(
      event,
      trace?.startedAt,
      afterEvent?.['timestamp'] as number | undefined,
      afterTrace?.startedAt
    );
  });

  /** The current after event at the selected index (noise stripped, timing added). */
  readonly currentAfterEvent = computed<unknown>(() => {
    const event = this.compareAfterEvents()[this.compareEventIndex()];
    const traceId = this.compareAfterId();
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    const beforeTrace = this.cellTraces().find(
      (t) => t.traceId === this.compareBeforeId()
    );
    const beforeEvent = this.compareBeforeEvents()[this.compareEventIndex()] as
      | Record<string, unknown>
      | undefined;
    return this.stripNoiseFields(
      event,
      trace?.startedAt,
      beforeEvent?.['timestamp'] as number | undefined,
      beforeTrace?.startedAt
    );
  });

  /** Diff hunks for the current event pair. */
  readonly compareDiffHunks = computed<Change[]>(() => {
    const before = this.currentBeforeEvent();
    const after = this.currentAfterEvent();
    if (before == null && after == null) return [];
    return diffJson(before ?? {}, after ?? {});
  });

  /** Lines for the BEFORE diff panel. */
  readonly compareBeforeLines = computed(() =>
    this.buildLines(this.compareDiffHunks(), 'before')
  );

  /** Lines for the AFTER diff panel. */
  readonly compareAfterLines = computed(() =>
    this.buildLines(this.compareDiffHunks(), 'after')
  );

  /**
   * Toggles the diff-only filter. When enabling, jumps to the nearest
   * differing event if the current event is identical.
   */
  toggleDiffFilter(): void {
    const next = !this.showOnlyDiffs();
    this.showOnlyDiffs.set(next);
    this.jumpToNearestVisible();
  }

  /**
   * Toggles a category filter on or off.
   *
   * @param category - The event category prefix to toggle.
   */
  toggleCategoryFilter(category: string): void {
    const current = this.categoryFilters();
    const next = new Set(current);
    if (next.has(category)) {
      next.delete(category);
    } else {
      next.add(category);
    }
    this.categoryFilters.set(next);
    this.jumpToNearestVisible();
  }

  /**
   * Toggles the state-only filter.
   */
  toggleStateFilter(): void {
    this.showOnlyState.set(!this.showOnlyState());
    this.jumpToNearestVisible();
  }

  /** Navigate to the previous event in comparison. */
  previousEvent(): void {
    if (!this.compareHasPrevious()) return;
    const indices = this.visibleIndices();
    if (indices.length > 0) {
      const currentIdx = this.compareEventIndex();
      const prev = indices.filter((i) => i < currentIdx).pop();
      if (prev != null) this.compareEventIndex.set(prev);
    } else {
      this.compareEventIndex.update((i) => i - 1);
    }
  }

  /** Navigate to the next event in comparison. */
  nextEvent(): void {
    if (!this.compareHasNext()) return;
    const indices = this.visibleIndices();
    if (indices.length > 0) {
      const currentIdx = this.compareEventIndex();
      const next = indices.find((i) => i > currentIdx);
      if (next != null) this.compareEventIndex.set(next);
    } else {
      this.compareEventIndex.update((i) => i + 1);
    }
  }

  /**
   * Selects a trace for comparison by clicking a row in the trace table.
   *
   * @param traceId - The trace ID to select.
   */
  selectCompareTrace(traceId: string): void {
    const beforeId = this.compareBeforeId();
    const afterId = this.compareAfterId();

    if (traceId === beforeId) {
      this.compareBeforeId.set(afterId);
      this.compareAfterId.set(traceId);
    } else if (traceId === afterId) {
      this.compareAfterId.set(beforeId);
      this.compareBeforeId.set(traceId);
    } else if (!beforeId) {
      this.compareBeforeId.set(traceId);
    } else {
      this.compareAfterId.set(traceId);
    }

    this.compareEventIndex.set(0);
  }

  /**
   * Selects a trace as the "before" trace for comparison.
   *
   * @param traceId - The trace ID to set as the before trace.
   */
  selectBeforeTrace(traceId: string): void {
    this.compareBeforeId.set(traceId);
    this.compareEventIndex.set(0);
  }

  /**
   * Selects a trace as the "after" trace for comparison.
   *
   * @param traceId - The trace ID to set as the after trace.
   */
  selectAfterTrace(traceId: string): void {
    this.compareAfterId.set(traceId);
    this.compareEventIndex.set(0);
  }

  /**
   * Resets all comparison state. Called when the cell key changes.
   */
  resetFilters(): void {
    this.showOnlyDiffs.set(false);
    this.showOnlyState.set(false);
    this.categoryFilters.set(new Set());
  }

  /**
   * Jumps to the nearest visible event if the current event is not
   * in the visible set after a filter change.
   */
  jumpToNearestVisible(): void {
    const indices = this.visibleIndices();
    if (indices.length === 0) return;
    const current = this.compareEventIndex();
    if (!indices.includes(current)) {
      const nearest =
        indices.find((i) => i >= current) ?? indices[indices.length - 1];
      this.compareEventIndex.set(nearest);
    }
  }

  /**
   * Builds display lines from diff hunks for one side of the diff panel.
   *
   * @param hunks - The diff changes from diffJson.
   * @param side - Which side to build lines for.
   * @returns Array of text/cssClass pairs for rendering.
   */
  buildLines(
    hunks: Change[],
    side: 'before' | 'after'
  ): { text: string; cssClass: string }[] {
    const lines: { text: string; cssClass: string }[] = [];
    for (const hunk of hunks) {
      if (side === 'before' && hunk.added) continue;
      if (side === 'after' && hunk.removed) continue;

      const cssClass = hunk.added
        ? 'diff-line-added'
        : hunk.removed
          ? 'diff-line-removed'
          : '';

      const text = hunk.value.endsWith('\n')
        ? hunk.value.slice(0, -1)
        : hunk.value;

      for (const line of text.split('\n')) {
        if (line.length > 0) {
          lines.push({ text: line, cssClass });
        }
      }
    }
    return lines;
  }

  /**
   * Clones an event and removes id/traceId fields to reduce diff noise.
   *
   * @param event - The raw event object.
   * @param traceStartedAt - Start time of the event's trace.
   * @param otherTimestamp - Timestamp of the corresponding event in the other trace.
   * @param otherTraceStartedAt - Start time of the other trace.
   * @returns A clone without id and traceId, or undefined if input is falsy.
   */
  stripNoiseFields(
    event: unknown,
    traceStartedAt?: number,
    otherTimestamp?: number,
    otherTraceStartedAt?: number
  ): unknown {
    if (event == null || typeof event !== 'object') return event;
    const clone = structuredClone(event) as Record<string, unknown>;
    delete clone['id'];
    delete clone['traceId'];
    if (
      clone['payload'] != null &&
      typeof clone['payload'] === 'object' &&
      !Array.isArray(clone['payload'])
    ) {
      delete (clone['payload'] as Record<string, unknown>)['traceId'];
    }
    const timestamp = clone['timestamp'] as number | undefined;
    delete clone['timestamp'];
    if (timestamp != null && traceStartedAt != null) {
      clone['elapsed'] = `+${timestamp - traceStartedAt}ms`;
    }
    if (
      timestamp != null &&
      traceStartedAt != null &&
      otherTimestamp != null &&
      otherTraceStartedAt != null
    ) {
      const thisElapsed = timestamp - traceStartedAt;
      const otherElapsed = otherTimestamp - otherTraceStartedAt;
      const delta = thisElapsed - otherElapsed;
      clone['delta'] =
        delta === 0 ? '0ms' : `${delta > 0 ? '+' : ''}${delta}ms`;
    }
    return clone;
  }

  /**
   * Builds timeline markers for a trace, positioning each event
   * as a percentage of the shared max duration.
   *
   * @param traceId - The trace to build markers for.
   * @returns Array of marker objects with label, position, and elapsed time.
   */
  buildTimelineMarkers(traceId: string): TimelineMarkerShape[] {
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    if (!trace) return [];
    const maxDuration = this.timelineMaxDuration();
    const seen = new Set<string>();
    const markers: TimelineMarkerShape[] = [];
    for (const event of trace.events) {
      const category = event.name.split(':')[0];
      if (seen.has(category)) continue;
      seen.add(category);
      const elapsed = event.timestamp - trace.startedAt;
      markers.push({
        label: category,
        eventName: event.name,
        position: (elapsed / maxDuration) * 100,
        elapsed
      });
    }
    return markers;
  }

  /**
   * Builds timeline markers for every event in a trace, applying
   * collision spreading so overlapping markers are visually separated.
   * Uses per-trace duration as 100% so each track fills its full width.
   *
   * @param traceId - The trace to extract markers from.
   * @returns Array of marker objects for every event with spread positions.
   */
  buildAllEventsMarkers(traceId: string): TimelineMarkerShape[] {
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    if (!trace || !trace.events.length) return [];
    const traceDuration = Math.max(
      trace.events[trace.events.length - 1].timestamp - trace.startedAt,
      1
    );
    const markers: TimelineMarkerShape[] = trace.events.map((event) => {
      const category = event.name.split(':')[0];
      const elapsed = event.timestamp - trace.startedAt;
      return {
        label: category,
        eventName: event.name,
        position: (elapsed / traceDuration) * 100,
        elapsed
      };
    });
    return this.spreadOverlappingMarkers(markers);
  }

  /**
   * Builds timeline markers for only the events that differ between
   * two traces. Uses per-trace duration as 100%.
   *
   * @param traceId - The trace to build markers for.
   * @param otherTraceId - The trace to compare against.
   * @returns Markers for events at differing indices only.
   */
  buildDiffOnlyMarkers(
    traceId: string,
    otherTraceId: string
  ): TimelineMarkerShape[] {
    if (!traceId || !otherTraceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    const otherTrace = this.cellTraces().find(
      (t) => t.traceId === otherTraceId
    );
    if (!trace?.events.length || !otherTrace) return [];
    const diffIndices = new Set(this.differingIndices());
    if (diffIndices.size === 0) return [];
    const traceDuration = Math.max(
      trace.events[trace.events.length - 1].timestamp - trace.startedAt,
      1
    );
    const markers: TimelineMarkerShape[] = [];
    for (let i = 0; i < trace.events.length; i++) {
      if (!diffIndices.has(i)) continue;
      const event = trace.events[i];
      const category = event.name.split(':')[0];
      const elapsed = event.timestamp - trace.startedAt;
      markers.push({
        label: category,
        eventName: event.name,
        position: (elapsed / traceDuration) * 100,
        elapsed
      });
    }
    return this.spreadOverlappingMarkers(markers);
  }

  /**
   * Builds timeline markers for only events that carry a `state`
   * attribute. Uses per-trace duration as 100%.
   *
   * @param traceId - The trace to build markers for.
   * @returns Markers for state-bearing events only.
   */
  buildStateOnlyMarkers(traceId: string): TimelineMarkerShape[] {
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    if (!trace?.events.length) return [];
    const traceDuration = Math.max(
      trace.events[trace.events.length - 1].timestamp - trace.startedAt,
      1
    );
    const markers: TimelineMarkerShape[] = [];
    for (const event of trace.events) {
      if (!(event as unknown as Record<string, unknown>)['state']) continue;
      const category = event.name.split(':')[0];
      const elapsed = event.timestamp - trace.startedAt;
      markers.push({
        label: category,
        eventName: event.name,
        position: (elapsed / traceDuration) * 100,
        elapsed
      });
    }
    return this.spreadOverlappingMarkers(markers);
  }

  /**
   * Builds timeline markers for only events whose category matches
   * the active category filters. Uses per-trace duration as 100%.
   * Returns an empty array when no category filters are active.
   *
   * @param traceId - The trace to build markers for.
   * @returns Markers for category-matching events only.
   */
  buildCategoryFilteredMarkers(traceId: string): TimelineMarkerShape[] {
    if (!traceId) return [];
    const cats = this.categoryFilters();
    if (cats.size === 0) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    if (!trace?.events.length) return [];
    const traceDuration = Math.max(
      trace.events[trace.events.length - 1].timestamp - trace.startedAt,
      1
    );
    const markers: TimelineMarkerShape[] = [];
    for (const event of trace.events) {
      const category = event.name.split(':')[0];
      if (!cats.has(category)) continue;
      const elapsed = event.timestamp - trace.startedAt;
      markers.push({
        label: category,
        eventName: event.name,
        position: (elapsed / traceDuration) * 100,
        elapsed
      });
    }
    return this.spreadOverlappingMarkers(markers);
  }

  /**
   * Builds category duration spans for a trace, computing the first
   * and last event timestamp per category as horizontal bars.
   * Uses per-trace duration as 100%.
   *
   * @param traceId - The trace to build spans for.
   * @returns Array of span objects with start/end positions per category.
   */
  buildCategorySpans(traceId: string): TimelineSpanShape[] {
    if (!traceId) return [];
    const trace = this.cellTraces().find((t) => t.traceId === traceId);
    if (!trace?.events.length) return [];
    const traceDuration = Math.max(
      trace.events[trace.events.length - 1].timestamp - trace.startedAt,
      1
    );
    const categoryMap = new Map<
      string,
      { firstElapsed: number; lastElapsed: number; eventCount: number }
    >();
    for (const event of trace.events) {
      const category = event.name.split(':')[0];
      const elapsed = event.timestamp - trace.startedAt;
      const existing = categoryMap.get(category);
      if (existing) {
        existing.lastElapsed = elapsed;
        existing.eventCount++;
      } else {
        categoryMap.set(category, {
          firstElapsed: elapsed,
          lastElapsed: elapsed,
          eventCount: 1
        });
      }
    }
    const spans: TimelineSpanShape[] = [];
    for (const [category, data] of categoryMap) {
      spans.push({
        label: category,
        startPosition: (data.firstElapsed / traceDuration) * 100,
        endPosition: (data.lastElapsed / traceDuration) * 100,
        startElapsed: data.firstElapsed,
        endElapsed: data.lastElapsed,
        duration: data.lastElapsed - data.firstElapsed,
        eventCount: data.eventCount
      });
    }
    return spans.sort((a, b) => a.startPosition - b.startPosition);
  }

  /**
   * Builds elapsed delta markers by comparing corresponding events
   * between the before and after traces. Each marker shows how much
   * earlier or later the event fired in the after trace.
   *
   * @returns Array of delta markers positioned by event index.
   */
  buildElapsedDeltaMarkers(): TimelineDeltaMarkerShape[] {
    const beforeId = this.compareBeforeId();
    const afterId = this.compareAfterId();
    if (!beforeId || !afterId) return [];
    const beforeTrace = this.cellTraces().find((t) => t.traceId === beforeId);
    const afterTrace = this.cellTraces().find((t) => t.traceId === afterId);
    if (!beforeTrace?.events.length || !afterTrace?.events.length) return [];
    const total = Math.min(beforeTrace.events.length, afterTrace.events.length);
    const markers: TimelineDeltaMarkerShape[] = [];
    let maxAbsDelta = 0;
    const rawDeltas: {
      category: string;
      eventName: string;
      beforeElapsed: number;
      afterElapsed: number;
      delta: number;
    }[] = [];
    for (let i = 0; i < total; i++) {
      const bEvent = beforeTrace.events[i];
      const aEvent = afterTrace.events[i];
      const bElapsed = bEvent.timestamp - beforeTrace.startedAt;
      const aElapsed = aEvent.timestamp - afterTrace.startedAt;
      const delta = aElapsed - bElapsed;
      const category = bEvent.name.split(':')[0];
      rawDeltas.push({
        category,
        eventName: bEvent.name,
        beforeElapsed: bElapsed,
        afterElapsed: aElapsed,
        delta
      });
      maxAbsDelta = Math.max(maxAbsDelta, Math.abs(delta));
    }
    if (maxAbsDelta === 0) maxAbsDelta = 1;
    for (let i = 0; i < rawDeltas.length; i++) {
      const d = rawDeltas[i];
      markers.push({
        label: d.category,
        eventName: d.eventName,
        position: (i / Math.max(total - 1, 1)) * 100,
        delta: d.delta,
        normalizedDelta: d.delta / maxAbsDelta,
        beforeElapsed: d.beforeElapsed,
        afterElapsed: d.afterElapsed
      });
    }
    return markers;
  }

  /**
   * Builds waterfall category rows with before and after event markers
   * grouped by category. Each category gets one row with events from
   * both traces plotted on a shared time scale.
   *
   * @returns Array of category rows with before/after markers.
   */
  buildWaterfallCategories(): WaterfallCategoryShape[] {
    const beforeId = this.compareBeforeId();
    const afterId = this.compareAfterId();
    const maxDuration = this.timelineMaxDuration();
    const categoryMap = new Map<
      string,
      { before: TimelineMarkerShape[]; after: TimelineMarkerShape[] }
    >();
    const addEvents = (traceId: string, side: 'before' | 'after'): void => {
      if (!traceId) return;
      const trace = this.cellTraces().find((t) => t.traceId === traceId);
      if (!trace?.events.length) return;
      for (const event of trace.events) {
        const category = event.name.split(':')[0];
        if (!categoryMap.has(category)) {
          categoryMap.set(category, { before: [], after: [] });
        }
        const elapsed = event.timestamp - trace.startedAt;
        categoryMap.get(category)![side].push({
          label: category,
          eventName: event.name,
          position: (elapsed / maxDuration) * 100,
          elapsed
        });
      }
    };
    addEvents(beforeId, 'before');
    addEvents(afterId, 'after');
    const categories: WaterfallCategoryShape[] = [];
    for (const [label, data] of categoryMap) {
      categories.push({
        label,
        beforeMarkers: data.before,
        afterMarkers: data.after,
        totalEvents: data.before.length + data.after.length
      });
    }
    return categories.sort((a, b) => {
      const aFirst = Math.min(
        ...[...a.beforeMarkers, ...a.afterMarkers].map((m) => m.position)
      );
      const bFirst = Math.min(
        ...[...b.beforeMarkers, ...b.afterMarkers].map((m) => m.position)
      );
      return aFirst - bFirst;
    });
  }

  /**
   * Spreads markers that overlap within a minimum gap threshold
   * so they remain visually distinguishable on the timeline.
   *
   * @param markers - Unsorted markers to spread.
   * @returns Markers with adjusted positions.
   */
  private spreadOverlappingMarkers(
    markers: TimelineMarkerShape[]
  ): TimelineMarkerShape[] {
    if (markers.length <= 1) return markers;
    const minGap = 2;
    const sorted = [...markers].sort((a, b) => a.position - b.position);
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      if (sorted[i].position - prev.position < minGap) {
        sorted[i] = {
          ...sorted[i],
          position: Math.min(prev.position + minGap, 100)
        };
      }
    }
    return sorted;
  }
}
