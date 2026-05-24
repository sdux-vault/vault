import { DevMode } from '@sdux-vault/shared';
import { EventBus } from '../utils/event-bus';
import { resetDebugEngineForTesting } from '../widget/debug-widget.engine';
import { DebugWidgetRecorder } from './debug-widget.recorder';

describe('DebugWidgetRecorder', () => {
  let recorder: DebugWidgetRecorder;
  let bus: any;

  beforeEach(() => {
    spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    recorder = new DebugWidgetRecorder();
    bus = EventBus();
  });

  afterEach(() => {
    resetDebugEngineForTesting();
  });

  it('should record events from the pipeline', () => {
    recorder.start();

    bus.nextPipeline({
      type: 'test-event',
      traceId: 't1'
    });

    const events = recorder.getEvents();

    expect(events.length).toBe(1);
    expect(events[0].traceId).toBe('t1');
    expect(events[0].sequenceNumber).toBe(1);
  });

  describe('getErrorCount', () => {
    it('should increment error count with an error', () => {
      recorder.start();

      bus.nextPipeline({
        name: 'nothing-special',
        traceId: 'err',
        error: true
      });

      expect(recorder.getErrorCount()).toBe(1);
    });
    it('should increment error count without an error', () => {
      recorder.start();

      bus.nextPipeline({
        name: 'fatal',
        traceId: 'err'
      });

      expect(recorder.getErrorCount()).toBe(1);
    });
  });

  it('should stop recording when stopped', () => {
    recorder.start();
    recorder.stop();

    bus.nextPipeline({
      type: 'event-after-stop',
      traceId: 'x'
    });

    expect(recorder.getEvents().length).toBe(0);
  });

  it('should clear events', () => {
    recorder.start();

    bus.nextPipeline({
      type: 'event',
      traceId: 'a'
    });

    recorder.clear();

    expect(recorder.getEvents().length).toBe(0);
    expect(recorder.getErrorCount()).toBe(0);
  });

  it('should trim events when exceeding maxEvents', () => {
    recorder.start();

    (recorder as any).maxEvents = 1;

    bus.nextPipeline({ type: 'event1', traceId: 'a' });
    bus.nextPipeline({ type: 'event2', traceId: 'b' });

    const events = recorder.getEvents();

    expect(events.length).toBe(1);
    expect(events[0].traceId).toBe('b');
  });

  describe('Edge Cases', () => {
    it('should call onEvent callback when event arrives', () => {
      const callback = jasmine.createSpy('onEvent');

      recorder.start(callback);

      bus.nextPipeline({
        type: 'callback-event',
        traceId: 'cb'
      });

      expect(callback).toHaveBeenCalled();
    });

    it('should decrement error count when trimmed event was an error', () => {
      recorder.start();

      (recorder as any).maxEvents = 1;

      bus.nextPipeline({
        type: 'pipeline-error',
        traceId: 'e1',
        error: true
      });

      bus.nextPipeline({
        type: 'normal',
        traceId: 'e2'
      });

      expect(recorder.getErrorCount()).toBe(0);
    });

    it('should clamp negative stage duration to zero', () => {
      spyOn(performance, 'now').and.returnValues(100, 50);

      recorder.start();

      bus.nextPipeline({
        type: 'duration-test',
        traceId: 'neg'
      });

      bus.nextPipeline({
        type: 'duration-test',
        traceId: 'neg'
      });

      const events = recorder.getEvents();

      expect(events[1].stageDurationMs).toBe(0);
    });

    it('should detect scheduler categories', () => {
      let t = 0;

      spyOn(Date, 'now').and.callFake(() => t);

      recorder.start();

      t = 1;
      bus.nextPipeline({ type: 'a', traceId: 's1' });

      t = 3;
      bus.nextPipeline({ type: 'b', traceId: 's1' });

      t = 40;
      bus.nextPipeline({ type: 'c', traceId: 's1' });

      const events = recorder.getEvents();

      expect(events[0].scheduler).toBe('microtask');
      expect(events[1].scheduler).toBe('macrotask');
      expect(events[2].scheduler).toBe('delayed');
    });

    it('should classify event loop phases', () => {
      let t = 10;

      spyOn(performance, 'now').and.callFake(() => t);

      recorder.start();

      bus.nextPipeline({ type: 'phase', traceId: 'p' }); // 10 → sync

      t = 11;
      bus.nextPipeline({ type: 'phase', traceId: 'p' }); // delta 1

      t = 20;
      bus.nextPipeline({ type: 'phase', traceId: 'p' }); // delta 9

      t = 50;
      bus.nextPipeline({ type: 'phase', traceId: 'p' }); // delta 30

      const events = recorder.getEvents();

      expect(events[0].eventLoopPhase).toBe('synchronous');
      expect(events[1].eventLoopPhase).toBe('microtask');
      expect(events[2].eventLoopPhase).toBe('macrotask');
      expect(events[3].eventLoopPhase).toBe('blocked');
    });

    it('should detect event sources', () => {
      recorder.start();

      bus.nextPipeline({ type: 'controller', traceId: 's' });
      bus.nextPipeline({ type: 'lifecycle', traceId: 's' });
      bus.nextPipeline({ type: 'stage', traceId: 's' });
      bus.nextPipeline({ type: 'controller', traceId: 's' });

      const events = recorder.getEvents();

      expect(events[0].source).toBe('ui');
      expect(events[1].source).toBe('system');
      expect(events[2].source).toBe('pipeline');
      expect(events[3].source).toBe('ui');
    });

    it('should classify user latency when UI stage duration is large', () => {
      let t = 0;

      spyOn(performance, 'now').and.callFake(() => t);

      recorder.start();

      bus.nextPipeline({ type: 'controller', boundary: 'start', traceId: 'u' });

      t = 200;

      bus.nextPipeline({ type: 'controller', boundary: 'end', traceId: 'u' });

      const events = recorder.getEvents();

      expect(events[1].latencyCategory).toBe('ui');
    });

    it('should classify scheduler latency for medium stage duration', () => {
      let t = 0;

      spyOn(performance, 'now').and.callFake(() => t);

      recorder.start();

      bus.nextPipeline({ type: 'lifecycle', traceId: 's' });

      t = 30;

      bus.nextPipeline({ type: 'lifecycle', traceId: 's' });

      const events = recorder.getEvents();

      expect(events[1].latencyCategory).toBe('system');
    });

    it('should classify default pipeline latency', () => {
      let t = 0;

      spyOn(performance, 'now').and.callFake(() => t);

      recorder.start();

      bus.nextPipeline({ type: 'stage', traceId: 'p' });

      t = 5;

      bus.nextPipeline({ type: 'stage', traceId: 'p' });

      const events = recorder.getEvents();

      expect(events[1].latencyCategory).toBe('pipeline');
    });

    it('should handle an error type', () => {
      recorder.start();

      bus.nextPipeline({
        name: 'error'
      });

      const events = recorder.getEvents();

      expect(events[0]).toEqual(
        Object({
          name: 'error',
          sequenceNumber: 1,
          monotonicTimestamp: jasmine.any(Number),
          stageDurationMs: 0,
          stackHash: jasmine.any(String),
          scheduler: 'delayed',
          eventLoopPhase: 'synchronous',
          latencyCategory: 'unknown',
          source: 'unknown'
        })
      );
    });

    it('should fallback to unknown type when missing', () => {
      recorder.start();

      bus.nextPipeline({});

      const events = recorder.getEvents();

      expect(events[0].traceId).toBeUndefined();
    });

    it('should fallback to unknown traceId when missing', () => {
      recorder.start();

      bus.nextPipeline({
        type: 'no-trace'
      });

      const events = recorder.getEvents();

      expect(events[0].traceId).toBeUndefined();
    });

    it('should safely stop when not started', () => {
      expect(() => recorder.stop()).not.toThrow();
    });

    it('should evict lastMonotonicByTrace entries when trace has no remaining events', () => {
      recorder.start();

      (recorder as any).maxEvents = 2;

      bus.nextPipeline({ type: 'a', traceId: 'trace-1' });
      bus.nextPipeline({ type: 'b', traceId: 'trace-2' });

      // Both traces tracked
      expect((recorder as any).lastMonotonicByTrace.has('trace-1')).toBe(true);
      expect((recorder as any).lastMonotonicByTrace.has('trace-2')).toBe(true);

      // Push a third event — evicts trace-1's only event
      bus.nextPipeline({ type: 'c', traceId: 'trace-2' });

      expect((recorder as any).lastMonotonicByTrace.has('trace-1')).toBe(false);
      expect((recorder as any).traceRefCount.has('trace-1')).toBe(false);

      // trace-2 still has events in the buffer
      expect((recorder as any).lastMonotonicByTrace.has('trace-2')).toBe(true);
      expect((recorder as any).traceRefCount.get('trace-2')).toBe(2);
    });

    it('should clear traceRefCount on clear()', () => {
      recorder.start();

      bus.nextPipeline({ type: 'a', traceId: 'x' });

      expect((recorder as any).traceRefCount.size).toBe(1);

      recorder.clear();

      expect((recorder as any).traceRefCount.size).toBe(0);
    });
  });
});
