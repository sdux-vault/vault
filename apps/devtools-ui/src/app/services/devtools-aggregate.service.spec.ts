import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  withArrayPushMergeBehavior,
  withQueryBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { EventBus, EventBusContract } from '@sdux-vault/devtools';
import { vaultSettled } from '@sdux-vault/engine';
import {
  DEVTOOLS_AGGREGATE_KEY_CONSTANT,
  EventShape
} from '@sdux-vault/shared';
import { TraceExecutionStatuses } from '../shapes/trace';
import { DevtoolsAggregateService } from './devtools-aggregate.service';
import { InsightService } from './insight/insight.service';
import {
  ABORTED_TRACE_EVENTS,
  ABORTED_TRACE_EXPECTED,
  AGG_TRACE_1,
  AGG_TRACE_2,
  ARTIFACT_STARTREK_AGGREGATE,
  ARTIFACT_STARWARS_AGGREGATE,
  ARTIFACT_TRACE_METRICS,
  CELL_AGG_AGGREGATE,
  CELL_ERR_AGGREGATE,
  CELL_MIXED_AGGREGATE,
  CELL_TRACE_A,
  CELL_TRACE_B,
  CELL_TRACE_C,
  COMPLETE_TRACE_EVENTS,
  COMPLETE_TRACE_EXPECTED,
  DENIED_TRACE_EVENTS,
  DENIED_TRACE_EXPECTED,
  ERROR_CELL_TRACE_EVENTS,
  ERROR_CELL_TRACE_EXPECTED,
  FAILED_TRACE_EVENTS,
  FAILED_TRACE_EXPECTED,
  MIXED_ERROR_EVENTS,
  MIXED_ERROR_EXPECTED,
  MIXED_TRACE_1,
  MIXED_TRACE_2,
  ORPHAN_TRACE_EVENTS,
  ORPHAN_TRACE_EXPECTED,
  RESET_TRACE_EVENTS,
  REVOTE_TRACE_EVENTS,
  REVOTE_TRACE_EXPECTED,
  VOTES_TRACE_EVENTS,
  VOTES_TRACE_EXPECTED
} from './testing/complete-trace.artifact';
import { PIPELINE_EVENT_ARTIFACT } from './testing/pipeline-event.artifact';

describe('Service: Devtools Aggregate', () => {
  const key = DEVTOOLS_AGGREGATE_KEY_CONSTANT;
  let service: DevtoolsAggregateService;
  let bus: EventBusContract;

  @Injectable()
  class MockInsightService {
    constructor(private bus: EventBusContract) {}

    pipeline$() {
      return this.bus.pipeline$(); // chrome stream mocked
    }

    listenPipeline() {
      return this.bus.pipeline$(); // local stream mocked
    }
  }

  /**
   * Creates a minimal EventShape for testing negative/edge cases.
   */
  function createEvent(
    overrides: Partial<EventShape> & { name: string; traceId: string }
  ): EventShape {
    return Object({
      id: crypto.randomUUID(),
      cell: 'test-cell',
      behaviorKey: 'behavior-key',
      type: 'controller',
      boundary: 'start',
      timestamp: Date.now(),
      ...overrides
    });
  }

  beforeEach(() => {
    bus = EventBus();

    TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        {
          provide: InsightService,
          useFactory: () => new MockInsightService(bus)
        },
        provideFeatureCell(
          DevtoolsAggregateService,

          { key, initialState: [], insights: {} as any },
          [withArrayPushMergeBehavior, withQueryBehavior]
        ),
        DevtoolsAggregateService
      ]
    });

    service = TestBed.inject(DevtoolsAggregateService);
  });

  describe('initialization', () => {
    it('should create with empty traces', () => {
      expect(service.traces()).toEqual([]);
      expect(service.totalTraces()).toBe(0);
    });

    it('should receive events from the bus', () => {
      const received: EventShape[] = [];
      bus.pipeline$().subscribe((e) => received.push(e));

      bus.nextPipeline(
        createEvent({
          name: 'controller:start:attempt',
          traceId: 'diag-1'
        })
      );

      expect(received.length).toBe(1);
      expect(received[0].traceId).toBe('diag-1');
    });
  });

  describe('trace buffering and commit', () => {
    it('should not commit until a terminal event fires', async () => {
      bus.nextPipeline(
        createEvent({
          name: 'conductor:start:attempt',
          traceId: 'trace-1'
        })
      );
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });

    it('should commit a trace on conductor:end:attempt', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([COMPLETE_TRACE_EXPECTED]);
    });

    it('should commit with denied status on conductor:start:deny', async () => {
      for (const event of DENIED_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([DENIED_TRACE_EXPECTED]);
    });

    it('should commit with aborted status on conductor:start:abort', async () => {
      for (const event of ABORTED_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([ABORTED_TRACE_EXPECTED]);
    });

    it('should commit with failed status on error events', async () => {
      for (const event of FAILED_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([FAILED_TRACE_EXPECTED]);
    });

    it('should filter out devtools internal cell events', async () => {
      bus.nextPipeline(
        createEvent({
          name: 'controller:start:attempt',
          traceId: 'trace-internal',
          cell: DEVTOOLS_AGGREGATE_KEY_CONSTANT
        })
      );

      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });

    it('should filter out events without a traceId', async () => {
      bus.nextPipeline(
        Object({
          id: '1',
          cell: 'test-cell',
          behaviorKey: 'bk',
          type: 'controller',
          boundary: 'start',
          timestamp: Date.now(),
          name: 'controller:start:attempt'
        })
      );

      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });

    it('should filter out reset lifecycle events', async () => {
      for (const event of RESET_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });

    it('should not buffer events that lack a trace-initiating event', async () => {
      bus.nextPipeline(
        createEvent({
          name: 'stage:start:core-state',
          traceId: 'trace-stray',
          type: 'stage',
          boundary: 'start'
        })
      );
      bus.nextPipeline(
        createEvent({
          name: 'stage:end:core-state',
          traceId: 'trace-stray',
          type: 'stage',
          boundary: 'end'
        })
      );
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });
  });

  describe('metrics computation', () => {
    it('should compute stage metrics from matched start/end pairs', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()[0].metrics.stages).toEqual(
        COMPLETE_TRACE_EXPECTED.metrics.stages
      );
    });

    it('should count events', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()[0].metrics.eventCount).toBe(
        COMPLETE_TRACE_EXPECTED.metrics.eventCount
      );
    });

    it('should identify slowest and fastest stages', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const metrics = service.traces()[0].metrics;
      expect(metrics.slowestStage).toEqual(
        COMPLETE_TRACE_EXPECTED.metrics.slowestStage
      );
      expect(metrics.fastestStage).toEqual(
        COMPLETE_TRACE_EXPECTED.metrics.fastestStage
      );
    });

    it('should exclude attempt from slowest and fastest stage metrics', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const metrics = service.traces()[0].metrics;
      expect(metrics.slowestStage.name).not.toBe('attempt');
      expect(metrics.fastestStage.name).not.toBe('attempt');
    });

    it('should detect revotes', async () => {
      for (const event of REVOTE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([REVOTE_TRACE_EXPECTED]);
    });

    it('should count controller votes', async () => {
      for (const event of VOTES_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([VOTES_TRACE_EXPECTED]);
    });
  });

  describe('cell key index', () => {
    it('should group traces by cellKey', async () => {
      for (const event of [
        ...CELL_TRACE_A.events,
        ...CELL_TRACE_B.events,
        ...CELL_TRACE_C.events
      ]) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const grouped = service.tracesByCellKey();
      expect(grouped.get('cell-alpha')).toEqual([
        CELL_TRACE_A.expected,
        CELL_TRACE_C.expected
      ]);
      expect(grouped.get('cell-beta')).toEqual([CELL_TRACE_B.expected]);
    });
  });

  describe('cell aggregates', () => {
    it('should compute averages, min, max, and error rates per cellKey', async () => {
      for (const event of [...AGG_TRACE_1.events, ...AGG_TRACE_2.events]) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const agg = service.cellAggregates().get('cell-agg');
      expect(agg).toEqual(CELL_AGG_AGGREGATE);
    });

    it('should track error traceIds', async () => {
      for (const event of ERROR_CELL_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([ERROR_CELL_TRACE_EXPECTED]);
      const agg = service.cellAggregates().get('cell-err');
      expect(agg).toEqual(CELL_ERR_AGGREGATE);
    });

    it('should compute fractional error rate and varying min/max/average', async () => {
      for (const event of [
        ...MIXED_TRACE_1.events,
        ...MIXED_TRACE_2.events,
        ...MIXED_ERROR_EVENTS
      ]) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([
        MIXED_TRACE_1.expected,
        MIXED_TRACE_2.expected,
        MIXED_ERROR_EXPECTED
      ]);
      const agg = service.cellAggregates().get('cell-mixed');
      expect(agg).toEqual(CELL_MIXED_AGGREGATE);
    });
  });

  describe('orphan detection', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('should commit orphaned traces after timeout', async () => {
      for (const event of ORPHAN_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);

      jasmine.clock().tick(30_000);
      await vaultSettled(key);

      expect(service.traces()).toEqual([ORPHAN_TRACE_EXPECTED]);
    });

    it('should not orphan reset events after timeout', async () => {
      for (const event of RESET_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      jasmine.clock().tick(30_000);

      expect(service.traces()).toEqual([]);
    });
  });

  describe('clearTraces', () => {
    it('should clear all completed traces and buffers', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.traces()).toEqual([COMPLETE_TRACE_EXPECTED]);

      service.clearTraces();
      expect(service.traces()).toEqual([]);
      expect(service.totalTraces()).toBe(0);
    });

    it('should verify totalTraces is zero after clearTraces', async () => {
      for (const event of COMPLETE_TRACE_EVENTS) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);
      expect(service.totalTraces()).toBe(1);

      service.clearTraces();
      expect(service.totalTraces()).toBe(0);
    });

    it('should clear active orphan timers without committing', async () => {
      bus.nextPipeline(
        createEvent({
          name: 'controller:start:attempt',
          traceId: 'in-flight-trace'
        })
      );
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);

      service.clearTraces();
      expect(service.traces()).toEqual([]);
    });
  });

  describe('handleEvent edge cases', () => {
    it('should discard non-initiating events with no existing buffer', async () => {
      const stageEvent = createEvent({
        name: 'stage:start:reducer',
        traceId: 'orphan-trace'
      });

      bus.nextPipeline(stageEvent);
      await vaultSettled(key);

      expect(service.traces()).toEqual([]);
    });

    it('should handle commitOrphanedTrace when buffer is missing', () => {
      (service as any).commitOrphanedTrace('nonexistent-trace');
      expect(service.traces()).toEqual([]);
    });

    it('should handle commitOrphanedTrace when buffer is empty', () => {
      (service as any).buffer.set('empty-trace', []);

      (service as any).commitOrphanedTrace('empty-trace');
      expect(service.traces()).toEqual([]);
    });

    it('should skip events with non-standard name format in stage matching', async () => {
      bus.nextPipeline(
        createEvent({
          name: 'conductor:start:attempt',
          traceId: 'format-trace',
          cell: 'cell-format'
        })
      );
      bus.nextPipeline(
        createEvent({
          name: 'custom-event-no-colons',
          traceId: 'format-trace',
          cell: 'cell-format'
        })
      );
      bus.nextPipeline(
        createEvent({
          name: 'conductor:end:attempt',
          traceId: 'format-trace',
          cell: 'cell-format',
          boundary: 'end'
        })
      );
      await vaultSettled(key);

      const trace = service.traces()[0];
      expect(trace.traceId).toBe('format-trace');
      expect(trace.metrics.eventCount).toBe(3);
    });
  });

  describe('real-world artifact replay', () => {
    it('should process all artifact events and produce expected traces', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const traces = service.traces();

      // 8 single-terminal success traces + 4 error traces (1 each) = 12
      expect(traces.map((t) => t.traceId)).toEqual([
        '9338f067-5169-4282-86de-0985cd8bcb99',
        '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
        'd8c3b9e1-68f6-4bac-b658-ea8da0f00979',
        '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
        'dd760cb0-54ef-40b3-903e-e918ed45d203',
        'bf673fea-51f3-484a-ba58-d681227e007a',
        'b66e8d34-16c4-4faa-a53c-d365ae435505',
        'daed122e-198f-4517-b60b-d18c9ba3aa45',
        '0bd8a2fa-4d84-449e-9e68-ee759e31365b',
        'daa5fd95-e343-4711-a5bc-5c5cf2a89db5',
        '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
        'ec9f318d-8431-4794-b526-aba0a75bb279'
      ]);
    });

    it('should group traces by cell key across two feature cells', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const grouped = service.tracesByCellKey();
      expect(grouped.has('starwars-feature-cell-key')).toBeTrue();
      expect(grouped.has('startrek-feature-cell-key')).toBeTrue();

      const starwarsTraces = grouped.get('starwars-feature-cell-key')!;
      const startrekTraces = grouped.get('startrek-feature-cell-key')!;
      expect(starwarsTraces.map((t) => t.traceId)).toEqual([
        '9338f067-5169-4282-86de-0985cd8bcb99',
        '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
        '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
        'daa5fd95-e343-4711-a5bc-5c5cf2a89db5',
        '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
        'ec9f318d-8431-4794-b526-aba0a75bb279'
      ]);
      expect(startrekTraces.map((t) => t.traceId)).toEqual([
        'd8c3b9e1-68f6-4bac-b658-ea8da0f00979',
        'dd760cb0-54ef-40b3-903e-e918ed45d203',
        'bf673fea-51f3-484a-ba58-d681227e007a',
        'b66e8d34-16c4-4faa-a53c-d365ae435505',
        'daed122e-198f-4517-b60b-d18c9ba3aa45',
        '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
      ]);
    });

    it('should correctly identify failed traces from runtime-error events', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const failed = service
        .traces()
        .filter((t) => t.metrics.status === TraceExecutionStatuses.Failed);
      // 4 error traces × 1 sub-trace each (committed at runtime-error only)
      expect(failed.map((t) => t.traceId)).toEqual([
        'b66e8d34-16c4-4faa-a53c-d365ae435505',
        'daed122e-198f-4517-b60b-d18c9ba3aa45',
        '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
        'ec9f318d-8431-4794-b526-aba0a75bb279'
      ]);
    });

    it('should correctly identify successful traces', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const success = service
        .traces()
        .filter((t) => t.metrics.status === TraceExecutionStatuses.Success);
      // 8 normal success traces
      expect(success.map((t) => t.traceId)).toEqual([
        '9338f067-5169-4282-86de-0985cd8bcb99',
        '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
        'd8c3b9e1-68f6-4bac-b658-ea8da0f00979',
        '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
        'dd760cb0-54ef-40b3-903e-e918ed45d203',
        'bf673fea-51f3-484a-ba58-d681227e007a',
        '0bd8a2fa-4d84-449e-9e68-ee759e31365b',
        'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
      ]);
    });

    it('should compute cell aggregates with exact values', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const aggregates = service.cellAggregates();
      expect(aggregates.get('starwars-feature-cell-key')).toEqual(
        ARTIFACT_STARWARS_AGGREGATE
      );
      expect(aggregates.get('startrek-feature-cell-key')).toEqual(
        ARTIFACT_STARTREK_AGGREGATE
      );
    });

    it('should compute exact per-trace metrics', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      const traces = service.traces();
      expect(
        traces.map((t) => ({
          traceId: t.traceId,
          duration: t.metrics.duration,
          eventCount: t.metrics.eventCount,
          status: t.metrics.status,
          hadRevote: t.metrics.hadRevote,
          controllerVoteCount: t.metrics.controllerVoteCount
        }))
      ).toEqual(ARTIFACT_TRACE_METRICS);
    });

    it('should match exact controller vote counts per trace', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(
        service.traces().map((t) => ({
          traceId: t.traceId,
          controllerVoteCount: t.metrics.controllerVoteCount
        }))
      ).toEqual(
        ARTIFACT_TRACE_METRICS.map((m) => ({
          traceId: m.traceId,
          controllerVoteCount: m.controllerVoteCount
        }))
      );
    });

    it('should report correct totalTraces count', async () => {
      for (const event of PIPELINE_EVENT_ARTIFACT) {
        bus.nextPipeline(event);
      }
      await vaultSettled(key);

      expect(service.totalTraces()).toBe(12);
    });
  });
});
