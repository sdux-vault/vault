import { DevMode } from '@sdux-vault/shared';
import { EVENTS_CHAOS_ARTIFACT } from './artifacts/events.chaos.artifact';
import { EVENTS_CHAOS_V2_ARTIFACT } from './artifacts/events.chaos.v2.artifact';
import { EVENTS_SUCCESS_ARTIFACTS } from './artifacts/events.success.artifact';
import { STATS_DUMP_EXPECTED } from './artifacts/expected/dump/stats-dump.expected';
import { REGISTRY_EDGE_ARTIFACT } from './artifacts/registry.edge.artifacts';
import { REGISTRY_SUCCESS_ARTIFACT } from './artifacts/registry.success.artifact';
import {
  DebugWidgetEngine,
  resetDebugEngineForTesting
} from './debug-widget.engine';

describe('debug-wiget.engine', () => {
  const instance = DebugWidgetEngine();
  const registryArtifacts: any = [];

  beforeEach(() => {
    spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    registryArtifacts.length = 0;

    (globalThis as any).sdux = {
      debugWidget: {
        versions: {
          '@sdux-vault/test': '1.0.0'
        },
        getRegistry: (): any => {
          return registryArtifacts.shift();
        }
      }
    };
  });

  afterEach(() => {
    delete (globalThis as any).sdux;
    resetDebugEngineForTesting();
  });

  describe('serializeRegistry', () => {
    it('should serialize the registry', () => {
      delete (globalThis as any).sdux;

      expect(instance.serializeRegistry()).toBeUndefined();
    });

    it('should serialize the registry', () => {
      registryArtifacts.push(REGISTRY_SUCCESS_ARTIFACT);
      expect(instance.serializeRegistry()).toEqual(
        Object({
          licenseSummary: Object({
            valid: 0,
            pending: 0,
            revoked: 0,
            timeout: 0,
            notRequired: 17
          }),
          totalFeatureCells: 1,
          featureCells: [
            Object({
              key: 'pipeline-builder',
              behaviorsRegistered: true,
              controllersRegistered: true,
              fluentApis: Object({
                filters: 0,
                reducers: 0,
                beforeTaps: 0,
                afterTaps: 0,
                emitStateCallbacks: 0,
                errorCallbacks: 0
              }),
              controllers: [
                Object({
                  key: 'SDUX::Controller::Policy::CoreAbstain',
                  type: 'coreAbstain',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Controller::Policy::CoreLicense',
                  type: 'license',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Controller::Policy::CoreError',
                  type: 'error',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                })
              ],
              behaviors: [
                Object({
                  key: 'SDUX::Behavior::Core::AfterTap',
                  type: 'coreAfterTap',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::BeforeTap',
                  type: 'coreBeforeTap',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Error',
                  type: 'coreError',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Filter',
                  type: 'filter',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::FromObservable',
                  type: 'fromObservable',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::FromPromise',
                  type: 'fromPromise',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::FromStream',
                  type: 'fromStream',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Observable',
                  type: 'resolve',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Promise',
                  type: 'resolve',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Reducer',
                  type: 'reduce',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::Value',
                  type: 'resolve',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Core::State',
                  type: 'coreState',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Merge::Deep',
                  type: 'merge',
                  critical: true,
                  needsLicense: false,
                  validLicense: 'not-required'
                }),
                Object({
                  key: 'SDUX::Behavior::Persist::SessionStorage',
                  type: 'persist',
                  critical: false,
                  needsLicense: false,
                  validLicense: 'not-required'
                })
              ]
            })
          ]
        })
      );
    });

    it('should serialize the registry', () => {
      registryArtifacts.push(REGISTRY_EDGE_ARTIFACT);
      expect(instance.serializeRegistry()).toEqual(
        Object({
          totalFeatureCells: 4,
          licenseSummary: Object({
            valid: 1,
            pending: 1,
            revoked: 1,
            timeout: 1,
            notRequired: 2
          }),
          featureCells: [
            Object({
              key: 'feature-a',
              behaviorsRegistered: true,
              controllersRegistered: true,
              fluentApis: null,
              behaviors: [
                Object({ validLicense: 'valid' }),
                Object({ validLicense: 'pending' })
              ],
              controllers: [
                Object({ validLicense: 'revoked' }),
                Object({ validLicense: 'timeout' })
              ]
            }),
            Object({
              key: 'feature-b',
              behaviorsRegistered: true,
              controllersRegistered: true,
              fluentApis: null,
              behaviors: [
                Object({ validLicense: 'not-required' }),
                Object({ validLicense: 'notrequired' })
              ],
              controllers: []
            }),
            Object({
              key: 'feature-edge',
              behaviorsRegistered: false,
              controllersRegistered: false,
              fluentApis: null,
              behaviors: [],
              controllers: []
            }),
            Object({
              key: 'feature-null-license',
              behaviorsRegistered: true,
              controllersRegistered: true,
              fluentApis: null,
              behaviors: [Object({ validLicense: undefined })],
              controllers: [Object({ validLicense: null })]
            })
          ]
        })
      );
    });
  });

  describe('getEnvironmentInfo', () => {
    it('should verify getEnvironmentInfo with the normal path', () => {
      expect(instance.getEnvironmentInfo()).toBeTruthy();
    });
  });

  describe('buildEventStats', () => {
    it('should create a debug dump using DebugWidgetEngine', () => {
      const longTasks = [
        { start: 1, duration: 20 },
        { start: 2, duration: 10 }
      ];

      const stats = instance.buildEventStats(
        EVENTS_SUCCESS_ARTIFACTS as any,
        longTasks
      );

      if (stats.pipelineFlamegraph) {
        expect(stats.pipelineFlamegraph?.length).toBe(1);
        if (stats.pipelineFlamegraph[0].stages) {
          expect(stats.pipelineFlamegraph[0].stages.length).toBe(12);

          stats.pipelineFlamegraph[0].stages.length = 0;
        }
      }

      expect(stats).toEqual(STATS_DUMP_EXPECTED);
    });

    it('should create a debug dump using the chaos artifact', () => {
      const longTasks = [
        { start: 1, duration: 20 },
        { start: 2, duration: 10 }
      ];

      const stats = instance.buildEventStats(
        EVENTS_CHAOS_ARTIFACT as any,
        longTasks
      );

      if (stats.pipelineFlamegraph) {
        expect(stats.pipelineFlamegraph?.length).toBe(1);
        if (stats.pipelineFlamegraph[0].stages) {
          expect(stats.pipelineFlamegraph[0].stages.length).toBe(4);

          stats.pipelineFlamegraph[0].stages.length = 0;
        }
      }

      expect(stats).toEqual({
        stageBottleneck: 'pipeline-step',
        stageBottleneckTimeMs: 18,
        pipelineFlamegraph: [Object({ traceId: 'trace-chaos', stages: [] })],
        burstAnalysis: Object({ maxEventsPerFrame: 5 }),
        suppressionStats: Object({
          suppressedCount: 0,
          votePass: 0,
          voteAbstain: 0
        }),
        structuralIntegrity: Object({
          duplicateTraceCount: 0,
          outOfOrderCount: 1
        }),
        pipelineRecursion: null,
        timingIntegrity: Object({
          timestampCollisionRate: 0.16666666666666666,
          monotonicCollisionRate: 0.16666666666666666,
          worstCollisionTrace: 'trace-chaos',
          collisionsPerTrace: Object({ 'trace-chaos': 1 })
        }),
        totalEvents: 6,
        errorEvents: 0,
        firstEventTimestamp: 90,
        lastEventTimestamp: 104,
        totalDurationMs: 14,
        longTaskStats: Object({ count: 2, maxDuration: 20 }),
        eventTypes: Object({
          'pipeline-start': 1,
          'pipeline-step': 2,
          'scheduler-delay': 1,
          'persist-state': 2
        }),
        traces: Object({
          'trace-chaos': Object({
            eventCount: 6,
            firstTimestamp: 90,
            lastTimestamp: 104,
            durationMs: 14,
            stageBreakdown: Object({
              'pipeline-start': 5,
              'pipeline-step': 18
            }),
            stageSequence: [],
            meanStageDuration: 7.5,
            p95StageDuration: 10,
            maxStageDuration: 10
          })
        }),
        stageAggregates: Object({
          'pipeline-start': Object({
            count: 1,
            total: 5,
            max: 5,
            min: 5,
            avg: 5,
            p95: 5
          }),
          'pipeline-step': Object({
            count: 2,
            total: 18,
            max: 10,
            min: 8,
            avg: 9,
            p95: 10
          })
        }),
        schedulerDistribution: Object({}),
        eventLoopPhaseDistribution: Object({}),
        maxIdleGapMs: 12,
        deadlockByTrace: Object({ 'trace-chaos': false }),
        longestTraceId: 'trace-chaos',
        longestTraceDurationMs: 14,
        traceFanOut: Object({}),
        diagnosticSummary: [
          Object({
            rank: 2,
            type: 'stage-bottleneck',
            id: 'pipeline-step',
            evidence: 'Stage has highest total compute time (18ms).'
          }),
          Object({
            rank: 3,
            type: 'slowest-trace',
            id: 'trace-chaos',
            evidence: 'Longest trace duration (14ms).'
          })
        ],
        stateAnalytics: Object({
          stateSizePerTrace: Object({ 'trace-chaos': 14 } as any),
          stateSerializationErrors: 0,
          stateSerializationErrorMessages: Object({}),
          avgPayloadSize: 130022,
          repeatedIdenticalStateCount: 1,
          largeObjectCount: 2,
          deepNestingMaxDepth: 1,
          persistPayloadSizeRanking: [
            Object({ traceId: 'trace-chaos', size: 70011 }),
            Object({ traceId: 'trace-chaos', size: 60011 })
          ],
          stateEntropyScore: 0,
          avgStateDiffSize: 0,
          maxChurnPerSecond: 6,
          avgChurnPerSecond: 2
        }),
        computeVsIdle: Object({
          totalComputeTimeMs: 23,
          estimatedIdleTimeMs: 0,
          computeRatio: 1.6428571428571428
        }),
        userLatencyDistribution: undefined
      } as any);
    });

    it('should create a debug dump using the chaos V@ artifact', () => {
      const longTasks = [
        { start: 1, duration: 20 },
        { start: 2, duration: 10 },
        { start: 3 } as any
      ];

      const stats = instance.buildEventStats(
        EVENTS_CHAOS_V2_ARTIFACT,
        longTasks
      );

      if (stats.pipelineFlamegraph) {
        expect(stats.pipelineFlamegraph?.length).toBe(10);
        if (stats.pipelineFlamegraph[0].stages) {
          expect(stats.pipelineFlamegraph[0].stages.length).toBe(0);

          stats.pipelineFlamegraph[0].stages.length = 0;
        }
      }

      expect(stats).toEqual({
        totalEvents: 76,
        errorEvents: 1,
        firstEventTimestamp: 0,
        lastEventTimestamp: 3005,
        totalDurationMs: 3005,

        longTaskStats: {
          count: 3,
          maxDuration: jasmine.any(Number)
        },

        eventTypes: {
          'no-ts': 1,
          'collision-step': 2,
          'ooo-step': 1,
          'dist-step': 1,
          'something-error': 1,
          'vote-abstain': 1,
          'vote-success': 1,
          'noop-suppressed': 1,
          'ui-controller-step': 1,
          'scheduler-delay': 1,
          'pipeline-compute': 1,
          'persist-state': 2,
          'state-change': 1,
          'state-circular': 1,
          'deadlock-start': 1,
          'deadlock-end': 1,
          A: 3,
          B: 3,
          'fanout-stage': 50
        },

        traces: jasmine.any(Object),

        stageAggregates: jasmine.any(Object),

        schedulerDistribution: {
          microtask: 1
        },

        eventLoopPhaseDistribution: {
          microtask: 1
        },

        maxIdleGapMs: 3005,

        deadlockByTrace: jasmine.any(Object),

        longestTraceId: 'trace-deadlock',
        longestTraceDurationMs: 3005,

        traceFanOut: {
          'trace-fanout': 50
        },

        diagnosticSummary: jasmine.any(Array),

        stageBottleneck: 'fanout-stage',
        stageBottleneckTimeMs: 50,

        pipelineFlamegraph: jasmine.any(Array),

        burstAnalysis: {
          maxEventsPerFrame: jasmine.any(Number)
        },

        suppressionStats: {
          suppressedCount: 1,
          votePass: 1,
          voteAbstain: 1
        },

        structuralIntegrity: {
          duplicateTraceCount: 0,
          outOfOrderCount: 1
        },

        pipelineRecursion: {
          detected: true,
          traceId: 'trace-recursion',
          repeatingPattern: jasmine.any(Array),
          repetitionCount: 3
        },

        timingIntegrity: {
          timestampCollisionRate: jasmine.any(Number),
          monotonicCollisionRate: jasmine.any(Number),
          worstCollisionTrace: 'trace-collide',
          collisionsPerTrace: jasmine.any(Object)
        },

        stateAnalytics: jasmine.any(Object),

        computeVsIdle: {
          totalComputeTimeMs: jasmine.any(Number),
          estimatedIdleTimeMs: jasmine.any(Number),
          computeRatio: jasmine.any(Number)
        },

        userLatencyDistribution: {
          count: 1,
          avgMs: 200,
          p95Ms: 200,
          maxMs: 200
        }
      } as any);
    });
  });
});
