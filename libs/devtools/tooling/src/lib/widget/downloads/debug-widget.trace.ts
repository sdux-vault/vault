import { EventBoundaryTypes } from '@sdux-vault/shared';
import { DebugWidgetEventShape } from '../../shapes/debug-widget-event.shape';
import { DebugWidgetTraceEventShape } from '../../shapes/debug-widget-trace-event.shape';
import { DebugWidgetEventTracePhaseTypes } from '../../types/debug-widget-event-trace-phase.type';

/**
 * Converts debug widget events into a Chrome-compatible trace format.
 *
 * @param allEvents - The array of debug widget events to export.
 * @param timeScale - The time scale multiplier for trace timestamps.
 * @returns A JSON string of trace events.
 */
export function exportTrace(
  allEvents: DebugWidgetEventShape[],
  timeScale = 1
): string {
  const traceEvents: DebugWidgetTraceEventShape[] = [];
  const openSpans = new Map<string, number[]>();
  const pipelineIndexByTraceId = new Map<string, number>();
  let nextIndex = 0;

  traceEvents.push({
    name: 'process_name',
    ph: DebugWidgetEventTracePhaseTypes.Meta,
    pid: 1,
    args: { name: 'SDUX Pipeline Debugger' }
  });

  traceEvents.push({
    name: 'trace_scale',
    ph: DebugWidgetEventTracePhaseTypes.Meta,
    pid: 1,
    args: { scale: timeScale }
  });

  const threadNames = new Set<string>();

  const events = [...allEvents].sort((a, b) => {
    const aSeq = a.sequenceNumber ?? 0;
    const bSeq = b.sequenceNumber ?? 0;
    return aSeq - bSeq;
  });

  const timestampBySequence = new Map<number, number>();

  if (events.length > 0) {
    const firstRawTs = events[0].monotonicTimestamp ?? 0;

    let syntheticTsUs = 0;
    let prevRawTs = firstRawTs;

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const rawTs = event.monotonicTimestamp ?? prevRawTs;
      const seq = event.sequenceNumber ?? i;

      if (i === 0) {
        timestampBySequence.set(seq, 0);
        prevRawTs = rawTs;
        continue;
      }

      const rawDeltaMs = Math.max(0, rawTs - prevRawTs);

      // Zoom small active gaps, compress large idle gaps.
      let deltaUs: number;

      if (timeScale <= 1) {
        deltaUs = Math.floor(rawDeltaMs * 1000);
      } else if (rawDeltaMs <= 2) {
        deltaUs = Math.floor(rawDeltaMs * 1000 * timeScale);
      } else if (rawDeltaMs <= 16) {
        deltaUs = Math.floor(
          rawDeltaMs * 1000 * Math.max(2, Math.floor(timeScale / 4))
        );
      } else {
        // compress dead air so Chrome stays readable
        deltaUs = 1000;
      }

      syntheticTsUs += deltaUs;
      timestampBySequence.set(seq, syntheticTsUs);
      prevRawTs = rawTs;
    }
  }

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const traceId = event.traceId ?? 'main';
    const seq = event.sequenceNumber ?? index;

    // istanbul ignore next line
    const ts = timestampBySequence.get(seq) ?? 0;

    const [domain, phase, name] = (event.name ?? '').split(':');

    const cat = event.type;
    const key = `${traceId}:${cat}:${domain}:${name}`;

    if (!threadNames.has(traceId)) {
      threadNames.add(traceId);

      traceEvents.push({
        name: 'thread_name',
        ph: DebugWidgetEventTracePhaseTypes.Meta,
        pid: 1,
        tid: traceId,
        args: { name: `Pipeline ${traceId.slice(0, 8)}` }
      });
    }

    if (!pipelineIndexByTraceId.has(traceId)) {
      pipelineIndexByTraceId.set(traceId, nextIndex++);

      traceEvents.push({
        name: 'thread_sort_index',
        ph: DebugWidgetEventTracePhaseTypes.Meta,
        pid: 1,
        tid: traceId,
        args: { sort_index: pipelineIndexByTraceId.get(traceId) }
      });
    }

    if (event.boundary === EventBoundaryTypes.Start) {
      if (!openSpans.has(key)) openSpans.set(key, []);
      openSpans.get(key)!.push(ts);

      traceEvents.push({
        name,
        cat,
        ph: DebugWidgetEventTracePhaseTypes.Begin,
        ts,
        pid: 1,
        tid: traceId,
        args: {
          cell: event.cell,
          behavior: event.behaviorKey,
          scheduler: event.scheduler,
          source: event.source,
          latency: event.latencyCategory
        }
      });

      continue;
    }

    if (event.boundary === EventBoundaryTypes.End) {
      const starts = openSpans.get(key);

      if (starts && starts.length) {
        const start = starts.pop()!;

        const MIN_US = 50;
        let endTs = ts;

        if (endTs - start < MIN_US) {
          endTs = start + MIN_US;
        }

        traceEvents.push({
          name,
          cat,
          ph: DebugWidgetEventTracePhaseTypes.End,
          ts: endTs,
          pid: 1,
          tid: traceId
        });
      }

      continue;
    }

    const NOTIFY_DURATION = 20 * timeScale;
    const start = Math.max(0, ts - NOTIFY_DURATION);
    const end = start === 0 ? NOTIFY_DURATION : ts;
    const display = `${name}:${phase} (synthetic)`;

    traceEvents.push({
      name: display,
      cat,
      ph: DebugWidgetEventTracePhaseTypes.Begin,
      ts: start,
      pid: 1,
      tid: traceId,
      args: {
        synthetic: true,
        actualDurationMs: 0,
        note: 'Synthetic span time added for visualization'
      }
    });

    traceEvents.push({
      name: display,
      cat,
      ph: DebugWidgetEventTracePhaseTypes.End,
      ts: end,
      pid: 1,
      tid: traceId,
      args: {
        synthetic: true,
        actualDurationMs: 0,
        note: 'Synthetic time span added for visualization'
      }
    });
  }

  return JSON.stringify({ traceEvents }, null, 2);
}
