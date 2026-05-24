import { EventTypes, type EventShape } from '@sdux-vault/shared';
import { DebugWidgetEventShape } from '../shapes/debug-widget-event.shape';
import { DebugWidgetLatencyCategoryTypes } from '../types/debug-widget-latency-category.type';
import { EventBus } from '../utils/event-bus';

/** Records and enriches pipeline events for the debug widget UI. */
export class DebugWidgetRecorder {
  /** Active event bus subscription. */
  private sub?: { unsubscribe(): void };
  /** Collected enriched pipeline events. */
  private events: DebugWidgetEventShape[] = [];
  /** Running count of error events in the buffer. */
  private errorCount = 0;
  /** Maximum number of events to retain before eviction. */
  private maxEvents = 5000;

  /** Monotonically increasing sequence counter for event ordering. */
  private sequence = 0;
  /** Last monotonic timestamp per trace ID for stage duration calculation. */
  private lastMonotonicByTrace = new Map<string, number>();
  /** Reference count of buffered events per trace ID for bounded eviction. */
  private traceRefCount = new Map<string, number>();
  /** Last global wall-clock timestamp for scheduler detection. */
  private lastGlobalTimestamp = 0;

  /**
   * Starts recording pipeline events from the EventBus.
   *
   * @param onEvent - Optional callback invoked after each event is recorded.
   */
  start(onEvent?: () => void): void {
    const bus = EventBus();

    // istanbul ignore next line
    if (!bus || typeof bus.pipeline$ !== 'function') {
      // eslint-disable-next-line
      console.warn('[SDUX] EventBus not available.');
      return;
    }

    this.sub = bus.pipeline$().subscribe((event: EventShape) => {
      const enriched = this.enrichEvent(event);
      const traceId = enriched.traceId ?? '__unknown';

      this.events.push(enriched);
      this.traceRefCount.set(
        traceId,
        (this.traceRefCount.get(traceId) ?? 0) + 1
      );

      if (this.isErrorEvent(enriched)) {
        this.errorCount++;
      }

      if (this.events.length > this.maxEvents) {
        const removed = this.events.shift();
        if (removed) {
          if (this.isErrorEvent(removed)) {
            this.errorCount = Math.max(0, this.errorCount - 1);
          }
          this.evictTrace(removed.traceId ?? '__unknown');
        }
      }

      onEvent?.();
    });
  }

  /** Stops recording and unsubscribes from the EventBus. */
  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }

  /** Clears all recorded events and resets internal counters. */
  clear(): void {
    this.events = [];
    this.errorCount = 0;
    this.sequence = 0;
    this.lastMonotonicByTrace.clear();
    this.traceRefCount.clear();
    this.lastGlobalTimestamp = 0;
  }

  /**
   * Decrements the reference count for a trace and evicts its monotonic
   * timestamp entry when no buffered events reference it.
   *
   * @param traceId - The trace identifier to potentially evict.
   */
  private evictTrace(traceId: string): void {
    // istanbul ignore next -- defensive: traceRefCount is always set before eviction
    const count = (this.traceRefCount.get(traceId) ?? 1) - 1;

    if (count <= 0) {
      this.traceRefCount.delete(traceId);
      this.lastMonotonicByTrace.delete(traceId);
    } else {
      this.traceRefCount.set(traceId, count);
    }
  }

  /**
   * Returns a shallow copy of all recorded events.
   *
   * @returns An array of enriched debug widget events.
   */
  getEvents(): DebugWidgetEventShape[] {
    return [...this.events];
  }

  /**
   * Returns the current error event count.
   *
   * @returns The number of error events in the buffer.
   */
  getErrorCount(): number {
    return this.errorCount;
  }

  // ─────────────────────────────────────────────
  // Enrichment Engine
  // ─────────────────────────────────────────────

  /**
   * Enriches a raw pipeline event with timing and diagnostic metadata.
   *
   * @param event - The raw event from the pipeline.
   * @returns The enriched debug widget event.
   */
  private enrichEvent(event: EventShape): DebugWidgetEventShape {
    const now = Date.now();
    const monotonic =
      typeof performance !== 'undefined' && performance.now
        ? performance.now()
        : // istanbul ignore next line
          0;

    const traceId = event.traceId ?? '__unknown';

    const lastMono = this.lastMonotonicByTrace.get(traceId);

    let stageDurationMs =
      typeof lastMono === 'number' ? monotonic - lastMono : 0;

    if (stageDurationMs < 0) stageDurationMs = 0;

    this.lastMonotonicByTrace.set(traceId, monotonic);

    const scheduler = this.detectScheduler(now);
    const eventLoopPhase = this.detectEventLoopPhase(stageDurationMs);
    const source = this.detectSource(event);
    const latencyCategory = this.detectSource(event);
    const stackHash = this.hashStack();

    // -----------------------------------------
    // Latency classification (dev heuristic)
    // -----------------------------------------

    return {
      ...event,

      sequenceNumber: ++this.sequence,
      monotonicTimestamp: monotonic,
      stageDurationMs,
      stackHash,
      scheduler,
      eventLoopPhase,
      latencyCategory,
      source
    } as DebugWidgetEventShape;
  }

  // ─────────────────────────────────────────────
  // Heuristics
  // ─────────────────────────────────────────────

  /**
   * Detects the scheduler type based on wall-clock delta.
   *
   * @param now - The current wall-clock timestamp.
   * @returns The detected scheduler category.
   */
  private detectScheduler(now: number): string {
    const delta = now - this.lastGlobalTimestamp;
    this.lastGlobalTimestamp = now;

    if (delta < 2) return 'microtask';
    if (delta < 16) return 'macrotask';
    return 'delayed';
  }

  /**
   * Classifies the event loop phase based on stage duration.
   *
   * @param stageDuration - The stage duration in milliseconds.
   * @returns The detected event loop phase.
   */
  private detectEventLoopPhase(stageDuration: number): string {
    if (stageDuration === 0) return 'synchronous';
    if (stageDuration < 2) return 'microtask';
    if (stageDuration < 16) return 'macrotask';
    return 'blocked';
  }

  /**
   * Determines the event source category from the event type.
   *
   * @param event - The raw pipeline event.
   * @returns The latency category label.
   */
  private detectSource(event: EventShape): string {
    switch (event.type) {
      case EventTypes.Controller:
        return DebugWidgetLatencyCategoryTypes.User;

      case EventTypes.Stage:
        return DebugWidgetLatencyCategoryTypes.Pipeline;

      case EventTypes.Lifecycle:
      case EventTypes.Conductor:
        return DebugWidgetLatencyCategoryTypes.System;
    }

    return DebugWidgetLatencyCategoryTypes.Unknown;
  }

  /**
   * Generates a hash from the current call stack for correlation.
   *
   * @returns A hex-prefixed hash string.
   */
  private hashStack(): string {
    /* istanbul ignore next -- defensive: stack access failure is not reliably reproducible in browser runtimes */
    try {
      const stack = new Error().stack ?? '';
      let hash = 0;
      for (let i = 0; i < stack.length; i++) {
        hash = (hash << 5) - hash + stack.charCodeAt(i);
        hash |= 0;
      }
      return `h${Math.abs(hash)}`;
    } catch {
      return 'h0';
    }
  }

  // ─────────────────────────────────────────────

  /**
   * Checks whether an event represents an error condition.
   *
   * @param event - The event to evaluate.
   * @returns True if the event is an error event.
   */
  private isErrorEvent(event: EventShape): boolean {
    if (event.error) return true;
    if (typeof event.name === 'string' && event.name.includes('fatal'))
      return true;
    return false;
  }
}
