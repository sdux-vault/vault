import { DebugWidgetEventShape } from '../../shapes/debug-widget-event.shape';
import { EVENTS_TRACE_ARTIFACTS } from '../artifacts/events.trace.artifacts';
import { ZOOM_BEGIN_EVENTS_EXPECTED } from '../artifacts/expected/trace-zoom/zoom-begin-events.expected';
import { ZOOM_END_EVENTS_EXPECTED } from '../artifacts/expected/trace-zoom/zoom-end-events.expected';
import { ZOOM_INSTANT_EVENTS_EXPECTED } from '../artifacts/expected/trace-zoom/zoom-instant-events.expected';
import { ZOOM_META_EVENTS_EXPECTED } from '../artifacts/expected/trace-zoom/zoom-meta-events.expected';
import { BEGIN_EVENTS_EXPECTED } from '../artifacts/expected/trace/begin-events.expected';
import { END_EVENTS_EXPECTED } from '../artifacts/expected/trace/end-events.expected';
import { INSTANT_EVENTS_EXPECTED } from '../artifacts/expected/trace/instant-events.expected';
import { META_EVENTS_EXPECTED } from '../artifacts/expected/trace/meta-events.expected';
import { resetDebugEngineForTesting } from '../debug-widget.engine';
import { exportTrace } from './debug-widget.trace';

describe('DebugWidget: exportTrace', () => {
  let events: DebugWidgetEventShape[];
  beforeAll(() => {
    events = structuredClone(
      EVENTS_TRACE_ARTIFACTS as any
    ) as DebugWidgetEventShape[];
  });

  beforeEach(() => {});

  afterEach(() => {
    resetDebugEngineForTesting();
  });

  describe('exportTrace', () => {
    it('should export events in Chrome trace format', () => {
      const json = exportTrace(events);
      const parsed = JSON.parse(json);

      const beginEvents = parsed.traceEvents.filter((e: any) => e.ph === 'B');
      expect(beginEvents.length).toBe(414);
      expect(beginEvents).toEqual(BEGIN_EVENTS_EXPECTED);
      // testArtifactDownloader('begin-events', 'json', beginEvents);

      const endEvents = parsed.traceEvents.filter((e: any) => e.ph === 'E');
      expect(endEvents.length).toBe(414);
      expect(endEvents).toEqual(END_EVENTS_EXPECTED);
      // testArtifactDownloader('end-events', 'json', endEvents);

      const metaEvents = parsed.traceEvents.filter((e: any) => e.ph === 'M');
      expect(metaEvents.length).toBe(94);
      expect(metaEvents).toEqual(META_EVENTS_EXPECTED);
      // testArtifactDownloader('meta-events', 'json', metaEvents);

      const instantEvents = parsed.traceEvents.filter((e: any) => e.ph === 'I');
      expect(instantEvents.length).toBe(0);
      expect(instantEvents).toEqual(INSTANT_EVENTS_EXPECTED);
      //testArtifactDownloader('instant-events', 'json', instantEvents);

      expect(parsed.traceEvents.length).toBe(922);

      expect(
        beginEvents.length +
          endEvents.length +
          metaEvents.length +
          instantEvents.length
      ).toEqual(922);
    });

    it('should export events in Chrome trace format - zoom', () => {
      const json = exportTrace(events, 1000);
      const parsed = JSON.parse(json);

      const beginEvents = parsed.traceEvents.filter((e: any) => e.ph === 'B');
      expect(beginEvents.length).toBe(414);
      expect(beginEvents).toEqual(ZOOM_BEGIN_EVENTS_EXPECTED);
      // testArtifactDownloader('zoom-begin-events', 'json', beginEvents);

      const endEvents = parsed.traceEvents.filter((e: any) => e.ph === 'E');
      expect(beginEvents.length).toBe(414);
      expect(endEvents).toEqual(ZOOM_END_EVENTS_EXPECTED);
      // testArtifactDownloader('zoom-end-events', 'json', endEvents);

      const metaEvents = parsed.traceEvents.filter((e: any) => e.ph === 'M');
      expect(metaEvents.length).toBe(94);
      expect(metaEvents).toEqual(ZOOM_META_EVENTS_EXPECTED);
      // testArtifactDownloader('zoom-meta-events', 'json', metaEvents);

      const instantEvents = parsed.traceEvents.filter((e: any) => e.ph === 'I');
      expect(instantEvents.length).toBe(0);
      expect(instantEvents).toEqual(ZOOM_INSTANT_EVENTS_EXPECTED);
      // testArtifactDownloader('zoom-instant-events', 'json', instantEvents);

      expect(parsed.traceEvents.length).toBe(922);

      expect(
        beginEvents.length +
          endEvents.length +
          metaEvents.length +
          instantEvents.length
      ).toEqual(922);
    });

    it('should apply mid-range scaling when rawDeltaMs <= 16', () => {
      const events: any[] = [
        {
          type: 'controller:start:test',
          sequenceNumber: 1,
          monotonicTimestamp: 0
        },
        {
          type: 'controller:end:test',
          sequenceNumber: 2,
          monotonicTimestamp: 10 // <=16
        }
      ];

      const json = exportTrace(events as any, 1000);
      const parsed = JSON.parse(json);

      const begin = parsed.traceEvents.find((e: any) => e.ph === 'B');
      const end = parsed.traceEvents.find((e: any) => e.ph === 'E');

      expect(begin.ts).toBe(0);

      // deltaUs = 10 * 1000 * 250 = 2,500,000
      expect(end.ts).toBeGreaterThan(begin.ts);
    });
  });

  describe('exportTrace defensive fallbacks', () => {
    it('should apply default fallbacks for missing fields', () => {
      const events: any[] = [
        {
          // sequenceNumber intentionally missing -> fallback 0
          // traceId missing -> fallback "main"
          // monotonicTimestamp missing -> fallback 0
          // type missing -> fallback ""
        }
      ];

      const json = exportTrace(events as any);
      const parsed = JSON.parse(json);

      const meta = parsed.traceEvents.find(
        (e: any) => e.ph === 'M' && e.name === 'thread_name'
      );

      expect(meta).toEqual(
        Object({
          name: 'thread_name',
          ph: 'M',
          pid: 1,
          tid: 'main',
          args: Object({
            name: 'Pipeline main'
          })
        })
      );

      const instant = parsed.traceEvents.find((e: any) => e.ph === 'I');

      expect(instant).toBeUndefined();
    });

    it('should fallback sequenceNumber to 0 for sorting', () => {
      const events: any[] = [
        { type: 'controller:start:test', monotonicTimestamp: 2 },
        { type: 'controller:start:test', monotonicTimestamp: 1 }
      ];

      const json = exportTrace(events as any);
      const parsed = JSON.parse(json);

      const beginEvents = parsed.traceEvents.filter((e: any) => e.ph === 'B');

      expect(beginEvents.length).toBe(2);
    });

    it('should generate thread metadata once per traceId', () => {
      const events: any[] = [
        {
          type: 'controller:start:test',
          traceId: 'abc123',
          sequenceNumber: 1,
          monotonicTimestamp: 1
        },
        {
          type: 'controller:end:test',
          traceId: 'abc123',
          sequenceNumber: 2,
          monotonicTimestamp: 2
        }
      ];

      const json = exportTrace(events as any);
      const parsed = JSON.parse(json);

      const threadMeta = parsed.traceEvents.filter(
        (e: any) => e.ph === 'M' && e.name === 'thread_name'
      );

      expect(threadMeta.length).toBe(1);
      expect(threadMeta[0].tid).toBe('abc123');
    });
  });
});
