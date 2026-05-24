import { DevMode } from '@sdux-vault/shared';
import { DebugWidgetEngineContract } from '../interfaces/debug-widget-engine.contract';
import type { DebugWidgetDumpShape } from '../shapes/debug-widget-dump.shape';
import { DebugWidgetEventStatShape } from '../shapes/debug-widget-event-stat.shape';
import { DebugWidgetEventShape } from '../shapes/debug-widget-event.shape';
import { DebugWidgetLatencyCategoryTypes } from '../types/debug-widget-latency-category.type';

// ------------------------------------------------
// DOWNLOAD HELPERS
// ------------------------------------------------

/** Cached singleton instance of the debug widget engine. */
let instance: DebugWidgetEngineContract | null = null;

/**
 * Returns the singleton DebugWidgetEngine instance, creating it on first call.
 *
 * @returns The debug widget engine contract.
 */
export function DebugWidgetEngine(): DebugWidgetEngineContract {
  if (!instance) {
    instance = new DebugWidgetEngineInstance();
  }

  return instance;
}

/** Internal implementation of the debug widget engine contract. */
class DebugWidgetEngineInstance implements DebugWidgetEngineContract {
  // ------------------------------------------------
  // REGISTRY SERIALIZATION
  // ------------------------------------------------

  /**
   * Serializes the global FeatureCell registry into a dump-ready structure.
   *
   * @returns The serialized registry, or undefined if unavailable.
   */
  serializeRegistry(): DebugWidgetDumpShape['registry'] | undefined {
    const registry = globalThis?.sdux?.debugWidget?.getRegistry?.();
    if (!registry) return;

    const licenseSummary = {
      valid: 0,
      pending: 0,
      revoked: 0,
      timeout: 0,
      notRequired: 0
    };

    const bump = (state: unknown) => {
      const s = String(state ?? '').toLowerCase();

      if (s === 'valid') licenseSummary.valid++;
      else if (s === 'pending') licenseSummary.pending++;
      else if (s === 'revoked') licenseSummary.revoked++;
      else if (s === 'timeout') licenseSummary.timeout++;
      else if (s === 'not-required' || s === 'notrequired')
        licenseSummary.notRequired++;
    };

    const featureCells = Array.from(registry.values()).map((cell) => {
      const behaviors = cell.behaviors
        ? Array.from(cell.behaviors.values())
        : [];
      const controllers = cell.controllers
        ? Array.from(cell.controllers.values())
        : [];

      // eslint-disable-next-line
      for (const b of behaviors) bump((b as any).validLicense);
      // eslint-disable-next-line
      for (const c of controllers) bump((c as any).validLicense);

      return {
        key: cell.key,
        behaviorsRegistered: !!cell.behaviorsRegistered,
        controllersRegistered: !!cell.controllersRegistered,
        fluentApis: cell.fluentApis ?? null,
        behaviors,
        controllers
      };
    });

    return {
      totalFeatureCells: featureCells.length,
      licenseSummary,
      featureCells
    };
  }

  // ------------------------------------------------
  // STATS ENGINE
  // ------------------------------------------------

  /**
   * Builds aggregate statistics from a collection of debug events.
   *
   * @param events - The events to analyze.
   * @param longTasks - Optional long task performance entries.
   * @returns The computed event statistics shape.
   */
  buildEventStats(
    events: DebugWidgetEventShape[],
    longTasks?: { start: number; duration: number }[]
  ): DebugWidgetEventStatShape {
    let maxIdleGapMs = 0;
    let lastEventTs: number | null = null;
    const eventTypes: Record<string, number> = {};
    const schedulerDistribution: Record<string, number> = {};
    const eventLoopPhaseDistribution: Record<string, number> = {};
    // eslint-disable-next-line
    const traces: Record<string, any> = {};
    const traceStageDurations: Record<string, number[]> = {};
    const stageAggregates: Record<
      string,
      {
        count: number;
        total: number;
        max: number;
        min: number;
        avg: number;
        p95: number;
      }
    > = {};

    const stageDurations: Record<string, number[]> = {};
    const stateDiffSizes: number[] = [];
    const churnBuckets: Record<number, number> = {};
    const userLatencies: number[] = [];

    const burstWindows: Record<number, number> = {};
    const stateSizePerTrace: Record<string, number> = {};
    const payloadSizePerTrace: Record<string, number> = {};
    const persistPayloadSizes: { traceId: string; size: number }[] = [];
    const deadlockByTrace: Record<string, boolean> = {};

    let errorEvents = 0;
    let suppressedCount = 0;
    let votePass = 0;
    let totalComputeTimeMs = 0;
    let voteAbstain = 0;
    let duplicateTraceCount = 0;
    let outOfOrderCount = 0;
    let repeatedIdenticalStateCount = 0;
    let largeObjectCount = 0;
    let deepNestingMaxDepth = 0;
    let totalStateChanges = 0;
    let stateSerializationErrors = 0;
    const stateSerializationErrorMessages: Record<string, number> = {};
    let pipelineRecursion: {
      detected: boolean;
      traceId?: string;
      repeatingPattern?: string[];
      repetitionCount?: number;
    } | null = null;

    const timestamps: number[] = [];
    const seenTraceIds = new Set<string>();
    const lastStateHashByTrace = new Map<string, string>();

    let timestampCollisions = 0;
    let monotonicCollisions = 0;

    const collisionsPerTrace: Record<string, number> = {};
    const lastTimestampByTrace = new Map<string, number>();
    const lastMonotonicByTrace = new Map<string, number>();

    let firstTs: number | null = null;
    let lastTs: number | null = null;

    // ------------------------------------------------
    // LONG TASK SUMMARY
    // ------------------------------------------------

    let longTaskStats: { count: number; maxDuration: number } = {
      count: 0,
      maxDuration: 0
    };

    // Prefer captured dump longTasks (more reliable)
    if (Array.isArray(longTasks) && longTasks.length > 0) {
      longTaskStats.count = longTasks.length;

      for (const t of longTasks) {
        if (t.duration > longTaskStats.maxDuration) {
          longTaskStats.maxDuration = t.duration;
        }
      }
    }
    // Fallback to Performance API only if dump data is unavailable
    else if (
      typeof performance !== 'undefined' &&
      performance.getEntriesByType
    ) {
      try {
        const perfLongTasks = performance.getEntriesByType(
          'longtask'
        ) as PerformanceEntry[];

        longTaskStats.count = perfLongTasks.length;

        // istanbul ignore next
        for (const t of perfLongTasks) {
          // eslint-disable-next-line
          const d = (t as any).duration ?? 0;
          if (d > longTaskStats.maxDuration) longTaskStats.maxDuration = d;
        }
      } catch {
        // ignore
      }
    }

    for (const e of events) {
      if (!e?.name) continue;

      eventTypes[e.name] = (eventTypes[e.name] ?? 0) + 1;
      if (e.scheduler) {
        schedulerDistribution[e.scheduler] =
          (schedulerDistribution[e.scheduler] ?? 0) + 1;
      }

      if (e.eventLoopPhase) {
        eventLoopPhaseDistribution[e.eventLoopPhase] =
          (eventLoopPhaseDistribution[e.eventLoopPhase] ?? 0) + 1;
      }

      if (e.error || String(e.name).includes('error')) errorEvents++;
      if (String(e.name).includes('abstain')) voteAbstain++;
      if (String(e.name).includes('success')) votePass++;
      if (String(e.name).includes('noop')) suppressedCount++;

      const ts =
        typeof e.monotonicTimestamp === 'number'
          ? e.monotonicTimestamp
          : // istanbul ignore next line
            typeof e.timestamp === 'number'
            ? e.timestamp
            : null;

      if (ts !== null) {
        if (lastEventTs !== null) {
          const gap = ts - lastEventTs;
          if (gap > maxIdleGapMs) {
            maxIdleGapMs = gap;
          }
        }
        lastEventTs = ts;
      }

      if (ts !== null) {
        timestamps.push(ts);
        if (firstTs === null || ts < firstTs) firstTs = ts;
        if (lastTs === null || ts > lastTs) lastTs = ts;

        const frame = Math.floor(ts / 16);
        burstWindows[frame] = (burstWindows[frame] ?? 0) + 1;

        const second = Math.floor(ts / 1000);
        churnBuckets[second] = (churnBuckets[second] ?? 0) + 1;
      }

      // istanbul ignore next line
      const traceId = e.traceId ?? '__unknown';

      // ------------------------------------------------
      // TIMESTAMP COLLISION DETECTION
      // ------------------------------------------------

      // Wall clock timestamp collisions
      if (typeof e.timestamp === 'number') {
        const lastTs = lastTimestampByTrace.get(traceId);

        if (lastTs === e.timestamp) {
          timestampCollisions++;
          collisionsPerTrace[traceId] = (collisionsPerTrace[traceId] ?? 0) + 1;
        }

        lastTimestampByTrace.set(traceId, e.timestamp);
      }

      // Monotonic timestamp collisions
      //here

      if (!traces[traceId]) {
        traces[traceId] = {
          eventCount: 0,
          firstTimestamp: ts,
          lastTimestamp: ts,
          durationMs: 0,
          stageBreakdown: {},
          stageSequence: [] // NEW
        };

        traceStageDurations[traceId] = [];

        // istanbul ignore next line
        if (seenTraceIds.has(traceId)) duplicateTraceCount++;
        seenTraceIds.add(traceId);
      }

      const trace = traces[traceId];
      trace.eventCount++;

      // -----------------------------------------
      // Out-of-order detection (monotonic only)
      // -----------------------------------------

      const mono = e.monotonicTimestamp;

      if (typeof mono === 'number') {
        const lastMono = lastMonotonicByTrace.get(traceId);

        if (lastMono === mono) {
          monotonicCollisions++;
        }

        if (typeof lastMono === 'number' && mono < lastMono) {
          outOfOrderCount++;
        }

        lastMonotonicByTrace.set(traceId, mono);
      }

      // -----------------------------------------
      // Trace duration calculation
      // -----------------------------------------

      if (ts !== null) {
        // istanbul ignore next line
        trace.firstTimestamp = Math.min(trace.firstTimestamp ?? ts, ts);
        // istanbul ignore next line
        trace.lastTimestamp = Math.max(trace.lastTimestamp ?? ts, ts);
        trace.durationMs = trace.lastTimestamp - trace.firstTimestamp;
      }

      // Stage metrics
      if (typeof e.stageDurationMs === 'number') {
        const stage = e.name;
        const dur = e.stageDurationMs;

        // -----------------------------------------
        // Track user interaction delays separately
        // -----------------------------------------

        // eslint-disable-next-line
        const latencyCategory = (e as any).latencyCategory;

        // -----------------------------------------
        // User interaction latency
        // -----------------------------------------

        if (latencyCategory === DebugWidgetLatencyCategoryTypes.User) {
          userLatencies.push(dur);
        }

        // -----------------------------------------
        // Scheduler delay (do NOT count as compute)
        // -----------------------------------------
        else if (latencyCategory === DebugWidgetLatencyCategoryTypes.System) {
          // scheduler delay tracked implicitly but excluded from compute
        }

        // -----------------------------------------
        // Pipeline compute
        // -----------------------------------------
        else {
          totalComputeTimeMs += dur;

          if (!stageAggregates[stage]) {
            stageAggregates[stage] = {
              count: 0,
              total: 0,
              max: 0,
              min: Infinity,
              avg: 0,
              p95: 0
            };
            stageDurations[stage] = [];
          }

          stageAggregates[stage].count++;
          stageAggregates[stage].total += dur;
          stageAggregates[stage].max = Math.max(
            stageAggregates[stage].max,
            dur
          );
          stageAggregates[stage].min = Math.min(
            stageAggregates[stage].min,
            dur
          );
          stageDurations[stage].push(dur);

          trace.stageBreakdown[stage] =
            (trace.stageBreakdown[stage] ?? 0) + dur;
        }

        // -----------------------------------------
        // Trace-level metrics (always recorded)
        // -----------------------------------------

        if (latencyCategory === DebugWidgetLatencyCategoryTypes.Pipeline) {
          traceStageDurations[traceId].push(dur);
        }

        trace.stageSequence.push({
          stage,
          durationMs: dur
        });
      }
      // Payload size
      if ('payload' in e) {
        const size = this.#safeSize(e.payload);
        payloadSizePerTrace[traceId] =
          (payloadSizePerTrace[traceId] ?? 0) + size;

        if (String(e.name).includes('persist')) {
          persistPayloadSizes.push({ traceId, size });
        }

        if (size > 50000) largeObjectCount++;
      }

      // State metrics
      if ('state' in e) {
        totalStateChanges++;

        const size = this.#safeSize(e.state);
        stateSizePerTrace[traceId] = (stateSizePerTrace[traceId] ?? 0) + size;

        // istanbul ignore next line
        if (size > 100000) largeObjectCount++;

        let depth = 0;
        try {
          depth = this.#computeDepth(e.state);
        } catch {
          depth = 0;
        }

        deepNestingMaxDepth = Math.max(deepNestingMaxDepth, depth);

        let serialized = '';
        let stateSerializationError: string | null = null;

        try {
          serialized = JSON.stringify(e.state);
          // eslint-disable-next-line
        } catch (err: any) {
          // istanbul ignore next line
          stateSerializationError =
            err?.message || 'Unknown serialization error';

          serialized = '__STATE_SERIALIZATION_ERROR__';
        }

        if (stateSerializationError) {
          stateSerializationErrors++;

          stateSerializationErrorMessages[stateSerializationError] =
            (stateSerializationErrorMessages[stateSerializationError] ?? 0) + 1;
        }

        const hash = this.#fastHash(serialized);
        const lastHash = lastStateHashByTrace.get(traceId);

        if (lastHash === hash) {
          repeatedIdenticalStateCount++;
        }

        if (lastHash && lastHash !== hash) {
          stateDiffSizes.push(Math.abs(size));
        }

        lastStateHashByTrace.set(traceId, hash);
      }
    }

    const totalDuration =
      firstTs !== null && lastTs !== null ? lastTs - firstTs : 0;

    // ------------------------------------------------
    // PIPELINE RECURSION DETECTION
    // ------------------------------------------------

    let longestTraceId: string | null = null;
    let longestTraceDuration = 0;

    for (const traceId in traces) {
      const trace = traces[traceId];

      // istanbul ignore next line
      const traceDuration = trace.durationMs ?? 0;
      // istanbul ignore next line
      const eventsInTrace = trace.eventCount ?? 0;

      // -----------------------------------------
      // Deadlock detection
      // -----------------------------------------

      deadlockByTrace[traceId] = traceDuration > 2000 && eventsInTrace < 3;

      // -----------------------------------------
      // Longest trace detection
      // -----------------------------------------

      if (traceDuration > longestTraceDuration) {
        longestTraceDuration = traceDuration;
        longestTraceId = traceId;
      }

      // -----------------------------------------
      // Trace latency distribution metrics
      // -----------------------------------------

      // istanbul ignore next line
      const durations = traceStageDurations[traceId] ?? [];

      if (durations.length > 0) {
        const sorted = durations.slice().sort((a, b) => a - b);

        const mean = durations.reduce((a, b) => a + b, 0) / durations.length;

        // istanbul ignore next line
        const p95 =
          sorted[Math.floor(sorted.length * 0.95)] ?? sorted[sorted.length - 1];

        const max = sorted[sorted.length - 1];

        trace.meanStageDuration = mean;
        trace.p95StageDuration = p95;
        trace.maxStageDuration = max;
      }

      // -----------------------------------------
      // Pipeline recursion detection
      // -----------------------------------------

      if (!pipelineRecursion) {
        // istanbul ignore next line
        const seq = trace.stageSequence ?? [];

        if (seq.length >= 6) {
          // eslint-disable-next-line
          const stages = seq.map((s: any) => s.stage);
          const window = stages.slice(0, 2).join('|');

          let count = 0;

          // istanbul ignore next
          for (let i = 0; i < stages.length - 1; i += 2) {
            if (stages.slice(i, i + 2).join('|') === window) {
              count++;
            } else {
              break;
            }
          }

          if (count >= 3) {
            pipelineRecursion = {
              detected: true,
              traceId,
              repeatingPattern: window.split('|'),
              repetitionCount: count
            };
          }
        }
      }
    }

    const estimatedIdleTimeMs = Math.max(0, totalDuration - totalComputeTimeMs);

    const timestampCollisionRate =
      events.length > 0 ? timestampCollisions / events.length : 0;

    const monotonicCollisionRate =
      events.length > 0 ? monotonicCollisions / events.length : 0;

    let worstCollisionTrace: string | null = null;
    let worstCollisionCount = 0;

    for (const traceId in collisionsPerTrace) {
      const count = collisionsPerTrace[traceId];

      if (count > worstCollisionCount) {
        worstCollisionCount = count;
        worstCollisionTrace = traceId;
      }
    }

    const computeRatio =
      totalDuration > 0 ? totalComputeTimeMs / totalDuration : 0;

    // finalize stage aggregates
    for (const stage in stageAggregates) {
      const agg = stageAggregates[stage];
      // istanbul ignore next line
      agg.avg = agg.count > 0 ? agg.total / agg.count : 0;

      const arr = stageDurations[stage].sort((a, b) => a - b);
      const index = Math.floor(arr.length * 0.95);
      // istanbul ignore next line
      agg.p95 = arr[index] ?? 0;
    }

    /**
     * Stage Bottleneck Detection
     *
     * Identifies the stage responsible for the largest share
     * of total pipeline compute time.
     */

    let stageBottleneck: string | null = null;
    let stageBottleneckTime = 0;

    for (const stage in stageAggregates) {
      const total = stageAggregates[stage].total;

      if (total > stageBottleneckTime) {
        stageBottleneckTime = total;
        stageBottleneck = stage;
      }
    }

    /**
     * Pipeline Flamegraph Data
     *
     * Converts trace stage timings into a format
     * usable by flamegraph visualizers.
     */

    const pipelineFlamegraph: {
      traceId: string;
      stages: { stage: string; durationMs: number }[];
    }[] = [];

    for (const traceId in traces) {
      const trace = traces[traceId];

      const stages = trace.stageSequence?.length
        ? trace.stageSequence
        : Object.entries(
            trace.stageBreakdown ??
              // istanbul ignore next line
              {}
          ).map(
            // istanbul ignore next line
            ([stage, duration]) => ({
              stage,
              durationMs: duration as number
            })
          );

      pipelineFlamegraph.push({
        traceId,
        stages
      });
    }

    const avgPayloadSize =
      Object.values(payloadSizePerTrace).reduce((a, b) => a + b, 0) /
      Math.max(1, Object.keys(payloadSizePerTrace).length);

    const avgStateDiffSize =
      stateDiffSizes.length > 0
        ? stateDiffSizes.reduce((a, b) => a + b, 0) / stateDiffSizes.length
        : 0;

    // eslint-disable-next-line
    let userLatencyDistribution: any = undefined;

    if (userLatencies.length > 0) {
      // istanbul ignore next line
      const sorted = userLatencies.slice().sort((a, b) => a - b);

      const avg =
        userLatencies.reduce((a, b) => a + b, 0) / userLatencies.length;
      // istanbul ignore next line
      const p95 =
        sorted[Math.floor(sorted.length * 0.95)] ?? sorted[sorted.length - 1];
      const max = sorted[sorted.length - 1];

      userLatencyDistribution = {
        count: userLatencies.length,
        avgMs: avg,
        p95Ms: p95,
        maxMs: max
      };
    }

    const maxChurnPerSecond = Math.max(...Object.values(churnBuckets), 0);

    const avgChurnPerSecond =
      Object.keys(churnBuckets).length > 0
        ? totalStateChanges / Object.keys(churnBuckets).length
        : 0;

    const stateSizeVarianceScore = this.#computeEntropyScore(stateSizePerTrace);

    /**
     * Trace Fan-Out Detection
     *
     * Detects traces producing an unusually large number
     * of events, which usually indicates observable storms,
     * recursive pipelines, or runaway loops.
     */

    const traceFanOut: Record<string, number> = {};
    const fanOutThreshold = 50;

    for (const traceId in traces) {
      // istanbul ignore next line
      const count = traces[traceId].eventCount ?? 0;

      if (count >= fanOutThreshold) {
        traceFanOut[traceId] = count;
      }
    }

    // ------------------------------------------------
    // Ranked Diagnostic Summary (engineer-first)
    // ------------------------------------------------
    const diagnosticSummary = [
      deadlockByTrace && Object.values(deadlockByTrace).some(Boolean)
        ? {
            rank: 1,
            type: 'deadlock',
            id: 'deadlockByTrace',
            evidence: 'One or more traces match deadlock heuristics.'
          }
        : null,

      stageBottleneck
        ? {
            rank: 2,
            type: 'stage-bottleneck',
            id: stageBottleneck,
            evidence: `Stage has highest total compute time (${Math.round(stageBottleneckTime)}ms).`
          }
        : null,

      longestTraceId
        ? {
            rank: 3,
            type: 'slowest-trace',
            id: longestTraceId,
            evidence: `Longest trace duration (${Math.round(longestTraceDuration)}ms).`
          }
        : null,

      traceFanOut && Object.keys(traceFanOut).length
        ? {
            rank: 4,
            type: 'fanout',
            id: Object.keys(traceFanOut)[0],
            evidence: `Fan-out threshold exceeded (≥ ${fanOutThreshold} events).`
          }
        : null,

      maxIdleGapMs > 250
        ? {
            rank: 5,
            type: 'stall',
            id: 'maxIdleGapMs',
            evidence: `Large idle gap detected (${Math.round(maxIdleGapMs)}ms).`
          }
        : null
    ].filter(Boolean);

    return {
      totalEvents: events.length,
      errorEvents,
      firstEventTimestamp: firstTs,
      lastEventTimestamp: lastTs,
      totalDurationMs: totalDuration,

      longTaskStats,

      eventTypes,
      traces,
      stageAggregates,
      schedulerDistribution,
      eventLoopPhaseDistribution,
      maxIdleGapMs,
      deadlockByTrace,
      longestTraceId,
      longestTraceDurationMs: longestTraceDuration,
      traceFanOut,
      diagnosticSummary,

      stageBottleneck,
      stageBottleneckTimeMs: stageBottleneckTime,

      pipelineFlamegraph,

      burstAnalysis: {
        maxEventsPerFrame: Math.max(...Object.values(burstWindows), 0)
      },

      suppressionStats: {
        suppressedCount,
        votePass,
        voteAbstain
      },

      structuralIntegrity: {
        duplicateTraceCount,
        outOfOrderCount
      },

      pipelineRecursion,

      timingIntegrity: {
        timestampCollisionRate,
        monotonicCollisionRate,
        worstCollisionTrace,
        collisionsPerTrace
      },

      stateAnalytics: {
        stateSizePerTrace,
        stateSerializationErrors,
        stateSerializationErrorMessages,
        avgPayloadSize,
        repeatedIdenticalStateCount,
        largeObjectCount,
        deepNestingMaxDepth,
        persistPayloadSizeRanking: persistPayloadSizes
          .sort((a, b) => b.size - a.size)
          .slice(0, 10),
        stateEntropyScore: stateSizeVarianceScore,
        avgStateDiffSize,
        maxChurnPerSecond,
        avgChurnPerSecond
      },
      computeVsIdle: {
        totalComputeTimeMs,
        estimatedIdleTimeMs,
        computeRatio
      },
      userLatencyDistribution
    };
  }

  // ------------------------------------------------
  // HELPERS
  // ------------------------------------------------
  /** Computes the byte size of a value via JSON serialization. */
  // eslint-disable-next-line
  #safeSize(obj: any): number {
    try {
      return new TextEncoder().encode(JSON.stringify(obj)).length;
    } catch {
      return 0;
    }
  }

  /** Recursively computes the maximum nesting depth of an object. */
  // eslint-disable-next-line
  #computeDepth(obj: any, depth = 0): number {
    if (obj === null || typeof obj !== 'object') return depth;
    return Math.max(
      depth,
      ...Object.values(obj).map((v) => this.#computeDepth(v, depth + 1))
    );
  }

  /** Produces a fast non-cryptographic hash string for change detection. */
  #fastHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return `h${Math.abs(hash)}`;
  }

  /** Computes the standard deviation of state sizes as a variance score. */
  #computeEntropyScore(stateSizes: Record<string, number>): number {
    const values = Object.values(stateSizes);
    if (!values.length) return 0;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;

    return Math.sqrt(variance);
  }

  /**
   * Collects browser and runtime environment information.
   *
   * @returns An object describing the current runtime environment.
   */
  /* istanbul ignore next */
  getEnvironmentInfo() {
    const ua = navigator.userAgent;

    const isChrome = /chrome|crios|edg|opr/i.test(ua);
    const isSafari = /safari/i.test(ua) && !isChrome;

    let browser = 'unknown';
    let browserVersion = 'unknown';

    if (/firefox/i.test(ua)) {
      browser = 'firefox';
      browserVersion = (ua.match(/firefox\/(\d+)/i) ?? [])[1] ?? 'unknown';
    } else if (/edg/i.test(ua)) {
      browser = 'edge';
      browserVersion = (ua.match(/edg\/(\d+)/i) ?? [])[1] ?? 'unknown';
    } else if (/opr/i.test(ua)) {
      browser = 'opera';
      browserVersion = (ua.match(/opr\/(\d+)/i) ?? [])[1] ?? 'unknown';
    } else if (isChrome) {
      browser = 'chrome';
      browserVersion =
        (ua.match(/(?:chrome|crios)\/(\d+)/i) ?? [])[1] ?? 'unknown';
    } else if (isSafari) {
      browser = 'safari';
      browserVersion = (ua.match(/version\/(\d+)/i) ?? [])[1] ?? 'unknown';
    }

    let os = 'unknown';

    if (/windows/i.test(ua)) os = 'Windows';
    else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/mac/i.test(ua)) os = 'MacOS';
    else if (/linux/i.test(ua)) os = 'Linux';

    let deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown' = 'desktop';

    if (/mobile/i.test(ua)) deviceType = 'mobile';
    if (/tablet|ipad/i.test(ua)) deviceType = 'tablet';

    return {
      url: location.href,
      referrer:
        typeof document !== 'undefined' ? document.referrer || null : null,
      userAgent: ua,

      browser,
      browserVersion,
      os,
      platform: navigator.platform ?? 'unknown',

      online: typeof navigator !== 'undefined' ? navigator.onLine : undefined,

      deviceType,

      language: navigator.language ?? 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'unknown',

      screenResolution:
        typeof screen !== 'undefined'
          ? `${screen.width}x${screen.height}`
          : 'unknown',

      viewport:
        typeof window !== 'undefined'
          ? `${window.innerWidth}x${window.innerHeight}`
          : 'unknown'
    };
  }
}

/** Resets the singleton engine instance for test isolation. */
// istanbul ignore next
export const resetDebugEngineForTesting = (): void => {
  if (!DevMode.active) return;
  instance = null;
};
