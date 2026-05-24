/** Test artifact containing a successful pipeline event sequence. */
export const EVENTS_SUCCESS_ARTIFACTS = [
  {
    id: '004c15ca-1030-42eb-a639-8cbb74b2db66',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664194986,
    traceId: 'A5094',
    sequenceNumber: 1,
    monotonicTimestamp: 333139.39999997616,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '086819cb-b164-4a51-ae55-7451a4dde32e',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664194987,
    traceId: 'A5094',
    sequenceNumber: 2,
    monotonicTimestamp: 333139.89999997616,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '60fb5a2a-953d-45ee-8872-a3e81fb49bd2',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664194987,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 3,
    monotonicTimestamp: 333140.3000000715,
    stageDurationMs: 0.40000009536743164,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '7aaafe0a-7319-4d6a-bc8e-663367ce1904',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664194987,
    traceId: 'A5094',
    sequenceNumber: 5,
    monotonicTimestamp: 333140.8000000715,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'fcdfd716-8966-4b2e-852d-a302245c0a5b',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664194988,
    traceId: 'A5094',
    sequenceNumber: 6,
    monotonicTimestamp: 333141,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '26d5cc4f-3437-4e04-a597-81ac27157308',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664194988,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: null,
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 8,
    monotonicTimestamp: 333141.2000000477,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '54c5c6ac-6e62-4bec-8d49-a0648d6c3d55',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664194988,
    traceId: 'A5094',
    sequenceNumber: 9,
    monotonicTimestamp: 333141.3000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'c471309b-5885-4c6c-bedc-da8af98e86d9',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664194988,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: null,
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 10,
    monotonicTimestamp: 333141.5,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f94a9384-cedf-43f1-862b-33970c71b97e',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664194989,
    traceId: 'A5094',
    sequenceNumber: 11,
    monotonicTimestamp: 333142,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '41e96369-2a9e-46b2-bb5e-e1436f49bd1b',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664194989,
    traceId: 'A5094',
    sequenceNumber: 12,
    monotonicTimestamp: 333142.60000002384,
    stageDurationMs: 0.6000000238418579,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '0739d478-34d2-405c-87b9-afef506d0fcf',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664194989,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: null,
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 13,
    monotonicTimestamp: 333142.7000000477,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'd4704552-82f5-4ff6-a55b-d1898410ab30',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664194989,
    traceId: 'A5094',
    sequenceNumber: 14,
    monotonicTimestamp: 333142.7000000477,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '4dca184b-e60c-41a3-a6e8-015bd0a3e220',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664194990,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: null,
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 15,
    monotonicTimestamp: 333143.39999997616,
    stageDurationMs: 0.6999999284744263,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '258c6247-02ad-40e1-9664-b9bc110aa0fb',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664194990,
    traceId: 'A5094',
    sequenceNumber: 16,
    monotonicTimestamp: 333143.60000002384,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '4e8fb155-b51c-4c81-abc2-e11df6b87090',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664194990,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 17,
    monotonicTimestamp: 333143.7000000477,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '9d0adb81-2449-4ebf-8b2c-91518e754ccb',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664194990,
    traceId: 'A5094',
    sequenceNumber: 18,
    monotonicTimestamp: 333143.89999997616,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '6db1c13a-a458-455d-aa98-bfabd34d3c37',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664198141,
    traceId: 'A5094',
    sequenceNumber: 19,
    monotonicTimestamp: 336294.89999997616,
    stageDurationMs: 3151,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'blocked',
    latencyCategory: 'user',
    source: 'ui'
  },
  {
    id: '331972f1-6647-4ab4-a7ec-6eee2fe45dc6',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664198142,
    traceId: 'A5094',
    sequenceNumber: 20,
    monotonicTimestamp: 336295.2000000477,
    stageDurationMs: 0.30000007152557373,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'b09935a3-e9d2-4673-8fe7-0a6628709150',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664198142,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 21,
    monotonicTimestamp: 336295.60000002384,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '9696aad8-a881-4df2-b2b4-5610763d715a',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664198143,
    traceId: 'A5094',
    sequenceNumber: 23,
    monotonicTimestamp: 336296.10000002384,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '1d84bc0a-bfeb-4530-bc02-65243446a3a1',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664198143,
    traceId: 'A5094',
    sequenceNumber: 24,
    monotonicTimestamp: 336296.3000000715,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '2cecd020-2807-41ee-b6bc-fa3c44327f8c',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664198143,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 26,
    monotonicTimestamp: 336296.5,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'c85741f0-21c0-4509-9668-5285e932a997',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664198143,
    traceId: 'A5094',
    sequenceNumber: 27,
    monotonicTimestamp: 336296.5,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'ed772815-9e49-4bc0-afd4-244ac099f2c9',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664198143,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 28,
    monotonicTimestamp: 336296.60000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '34b2dc96-e9d4-424c-84a0-e98196004545',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664198144,
    traceId: 'A5094',
    sequenceNumber: 29,
    monotonicTimestamp: 336297.3000000715,
    stageDurationMs: 0.7000000476837158,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f3aba378-6bae-4287-9b8a-8c79cdc5773d',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664198144,
    traceId: 'A5094',
    sequenceNumber: 30,
    monotonicTimestamp: 336297.7000000477,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '6c21c673-84a2-4584-8c05-ef9fe6c58192',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664198144,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 31,
    monotonicTimestamp: 336297.8000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '122ecbea-3f56-42d9-b924-62595d7d9ffa',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664198144,
    traceId: 'A5094',
    sequenceNumber: 32,
    monotonicTimestamp: 336297.89999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '7a9d287b-9f0a-4b10-98d3-5b065f32484e',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664198145,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: '',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 33,
    monotonicTimestamp: 336298.3000000715,
    stageDurationMs: 0.40000009536743164,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f49c21c7-1956-4697-ba21-27fe328658e6',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664198145,
    traceId: 'A5094',
    sequenceNumber: 34,
    monotonicTimestamp: 336298.39999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'c466512d-421d-4888-aa4d-599d05922a00',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664198145,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 35,
    monotonicTimestamp: 336298.60000002384,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'd4f65410-2605-4821-b2d1-dbe12df7e592',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664198145,
    traceId: 'A5094',
    sequenceNumber: 36,
    monotonicTimestamp: 336298.60000002384,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '72de585f-fca1-441b-9eea-2fb18f1fd417',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664198666,
    traceId: 'A5094',
    sequenceNumber: 37,
    monotonicTimestamp: 336819.39999997616,
    stageDurationMs: 520.7999999523163,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'blocked',
    latencyCategory: 'user',
    source: 'ui'
  },
  {
    id: 'f7786707-76f4-4d1a-b1b9-59f44e625238',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664198666,
    traceId: 'A5094',
    sequenceNumber: 38,
    monotonicTimestamp: 336819.8000000715,
    stageDurationMs: 0.40000009536743164,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '69635db5-e023-4a97-89ba-ed0eb5f7b2f9',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664198667,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 39,
    monotonicTimestamp: 336820.2000000477,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '86b7684c-dd13-4750-ab1d-1578290d7773',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664198667,
    traceId: 'A5094',
    sequenceNumber: 41,
    monotonicTimestamp: 336820.8000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '912801be-7c71-4fea-8a2c-b9eebb27154e',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664198668,
    traceId: 'A5094',
    sequenceNumber: 42,
    monotonicTimestamp: 336821.60000002384,
    stageDurationMs: 0.7999999523162842,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'e3ec5d58-6278-45d6-8397-94d6ea013c46',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664198668,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employ',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 44,
    monotonicTimestamp: 336821.8000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '2b08f332-6c96-4cec-a127-05b2c4a59774',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664198669,
    traceId: 'A5094',
    sequenceNumber: 45,
    monotonicTimestamp: 336822,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'e7f34036-3b41-4e05-a273-73bed721419b',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664198669,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employ',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 46,
    monotonicTimestamp: 336822.10000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'b2dea8d3-bcf5-43b3-b511-6143cf82eed2',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664198669,
    traceId: 'A5094',
    sequenceNumber: 47,
    monotonicTimestamp: 336822.8000000715,
    stageDurationMs: 0.7000000476837158,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '3d39c063-c26e-445c-ab14-8aa3bbb4fa53',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664198670,
    traceId: 'A5094',
    sequenceNumber: 48,
    monotonicTimestamp: 336823.2000000477,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '197b358b-7a1a-4753-bb67-b5af80ae2059',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664198670,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employ',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 49,
    monotonicTimestamp: 336823.3000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '3ae58b46-f083-49d8-84a0-c919967d6e10',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664198670,
    traceId: 'A5094',
    sequenceNumber: 50,
    monotonicTimestamp: 336823.39999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '1fdebe52-5b8e-4a9f-95b8-b28685373606',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664198670,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employ',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 51,
    monotonicTimestamp: 336823.89999997616,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '7d707dc1-5f21-4851-a8cc-e55838d52bf0',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664198671,
    traceId: 'A5094',
    sequenceNumber: 52,
    monotonicTimestamp: 336823.89999997616,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'd432b644-8761-4a18-b17f-c79cd74f8d49',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664198671,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 53,
    monotonicTimestamp: 336824,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '07d7571f-8c8d-4356-8d35-69997c41e961',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664198671,
    traceId: 'A5094',
    sequenceNumber: 54,
    monotonicTimestamp: 336824.3000000715,
    stageDurationMs: 0.30000007152557373,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'c0413499-2a10-4320-8a88-c37d7fc7b82a',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664200387,
    traceId: 'A5094',
    sequenceNumber: 55,
    monotonicTimestamp: 338540.5,
    stageDurationMs: 1716.1999999284744,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'blocked',
    latencyCategory: 'user',
    source: 'ui'
  },
  {
    id: '29749d11-af30-4b4b-98fe-8281f3adf8d6',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664200387,
    traceId: 'A5094',
    sequenceNumber: 56,
    monotonicTimestamp: 338540.8000000715,
    stageDurationMs: 0.30000007152557373,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '1f21a86a-8eaf-45ac-8e1b-53ca6f5d5729',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664200388,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 57,
    monotonicTimestamp: 338541.10000002384,
    stageDurationMs: 0.2999999523162842,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'bca46add-a870-4ac7-967e-8413d1231396',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664200388,
    traceId: 'A5094',
    sequenceNumber: 59,
    monotonicTimestamp: 338541.39999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'a24ac3cf-3e2d-4bfd-96ad-14b5dc4fc0f8',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664200388,
    traceId: 'A5094',
    sequenceNumber: 60,
    monotonicTimestamp: 338541.5,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'e93e2d78-f361-45c6-9bb3-813373477183',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664200388,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 62,
    monotonicTimestamp: 338541.8000000715,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f5905a78-f0af-4766-975d-59c94f71d5d7',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664200388,
    traceId: 'A5094',
    sequenceNumber: 63,
    monotonicTimestamp: 338541.8000000715,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'aa8a25a7-cf85-4104-9766-f394bb61f0a4',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664200389,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 64,
    monotonicTimestamp: 338542,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '1ec4001d-ec73-44b4-95cc-878b32757605',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664200389,
    traceId: 'A5094',
    sequenceNumber: 65,
    monotonicTimestamp: 338542.60000002384,
    stageDurationMs: 0.6000000238418579,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '19da2027-167e-4e43-8447-229af72936f1',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664200390,
    traceId: 'A5094',
    sequenceNumber: 66,
    monotonicTimestamp: 338543.10000002384,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '0262f2b2-fc5f-4b2f-a5a3-2aa4ff6dda29',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664200390,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 67,
    monotonicTimestamp: 338543.2000000477,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '9981938f-81d5-47e2-bb01-b5fcb7754fb4',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664200390,
    traceId: 'A5094',
    sequenceNumber: 68,
    monotonicTimestamp: 338543.2000000477,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'd7f293f9-9a85-440e-9a17-4fd80ef4ec4d',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664200390,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: null,
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 69,
    monotonicTimestamp: 338543.7000000477,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'acea7309-f8c9-4306-9e2d-4f0dc51adb29',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664200390,
    traceId: 'A5094',
    sequenceNumber: 70,
    monotonicTimestamp: 338543.8000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '623d95cd-fbb2-41b3-bb96-a77eec24cf9b',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664200391,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 71,
    monotonicTimestamp: 338543.89999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'facdfda1-25bc-4bda-99ee-89e7df9390f1',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664200391,
    traceId: 'A5094',
    sequenceNumber: 72,
    monotonicTimestamp: 338544.10000002384,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '336ad9da-e4c4-435c-bd59-cb0647ed9d6a',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664202110,
    traceId: 'A5094',
    sequenceNumber: 73,
    monotonicTimestamp: 340263.7000000477,
    stageDurationMs: 1719.6000000238419,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'blocked',
    latencyCategory: 'user',
    source: 'ui'
  },
  {
    id: '09d9bc2a-c1a2-4b9a-bc94-b3f707445e65',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664202111,
    traceId: 'A5094',
    sequenceNumber: 74,
    monotonicTimestamp: 340264.10000002384,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '09add655-9da3-4351-b2b8-d3192b97ad68',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664202111,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 75,
    monotonicTimestamp: 340264.2000000477,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '1aad46be-4cfd-4fad-86d9-192d82115f00',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664202111,
    traceId: 'A5094',
    sequenceNumber: 77,
    monotonicTimestamp: 340264.5,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '92696e5d-698e-45ee-a5bb-fa4db3c96b80',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664202111,
    traceId: 'A5094',
    sequenceNumber: 78,
    monotonicTimestamp: 340264.60000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f5cc10ce-c127-4ebf-86ae-79867ed23f99',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664202111,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 80,
    monotonicTimestamp: 340264.8000000715,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '211f3dd4-efd7-4404-962b-509f536ea706',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664202111,
    traceId: 'A5094',
    sequenceNumber: 81,
    monotonicTimestamp: 340264.8000000715,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f7b2c97e-7dc8-4ca7-98af-bb449f98273e',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664202111,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 82,
    monotonicTimestamp: 340264.89999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '3403a11e-3671-48e9-ad86-d0f264ed0643',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664202112,
    traceId: 'A5094',
    sequenceNumber: 83,
    monotonicTimestamp: 340265.7000000477,
    stageDurationMs: 0.8000000715255737,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '4aab530b-b815-493d-b26f-c17a7f39253c',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664202113,
    traceId: 'A5094',
    sequenceNumber: 84,
    monotonicTimestamp: 340266,
    stageDurationMs: 0.2999999523162842,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'f6e039d4-a46e-4d50-b845-4e03799911b2',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664202113,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 85,
    monotonicTimestamp: 340266.2000000477,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '1eea8850-faa9-441d-9118-591e1d188a19',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664202113,
    traceId: 'A5094',
    sequenceNumber: 86,
    monotonicTimestamp: 340266.39999997616,
    stageDurationMs: 0.19999992847442627,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '05e776e8-cd96-443c-921f-0f639ae090e5',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664202115,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: null
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 87,
    monotonicTimestamp: 340268.89999997616,
    stageDurationMs: 2.5,
    stackHash: 'h786822589',
    scheduler: 'macrotask',
    eventLoopPhase: 'macrotask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'fe969e93-4ba1-4939-9556-85248fa5b7a4',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664202116,
    traceId: 'A5094',
    sequenceNumber: 88,
    monotonicTimestamp: 340269,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'ae5c17c0-372e-4e94-96cb-4b8a66e9c7fd',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664202116,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 89,
    monotonicTimestamp: 340269.10000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'd7be4f4a-65ea-4786-8f30-72259cf39b09',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664202116,
    traceId: 'A5094',
    sequenceNumber: 90,
    monotonicTimestamp: 340269.2000000477,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '1d597d46-7269-4e54-be05-20f5a370b5ca',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:attempt',
    timestamp: 1772664203835,
    traceId: 'A5094',
    sequenceNumber: 91,
    monotonicTimestamp: 341988.39999997616,
    stageDurationMs: 1719.1999999284744,
    stackHash: 'h786822589',
    scheduler: 'delayed',
    eventLoopPhase: 'blocked',
    latencyCategory: 'user',
    source: 'ui'
  },
  {
    id: '4495aea0-d2b9-4424-a27d-cf82115e0f49',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:start:vote',
    timestamp: 1772664203836,
    traceId: 'A5094',
    sequenceNumber: 92,
    monotonicTimestamp: 341989.10000002384,
    stageDurationMs: 0.7000000476837158,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: '97c03e9f-aad3-438e-b006-140c9283dd65',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:vote',
    timestamp: 1772664203836,
    payload: {
      traceId: 'A5094',
      outcome: 'abstain'
    },
    traceId: 'A5094',
    sequenceNumber: 93,
    monotonicTimestamp: 341989.5,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'a5f94a07-76b4-4c4e-ab12-a413baab5d3b',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:merge',
    timestamp: 1772664203837,
    traceId: 'A5094',
    sequenceNumber: 95,
    monotonicTimestamp: 341990.10000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '5fe3554e-e059-43d9-a276-5fce0b579b2b',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:start:resolve',
    timestamp: 1772664203837,
    traceId: 'A5094',
    sequenceNumber: 96,
    monotonicTimestamp: 341990.3000000715,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '2d32a2f1-5fd8-43ba-bc4d-513fb623d9fb',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    type: 'stage:end:resolve',
    timestamp: 1772664203837,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: '[]'
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 98,
    monotonicTimestamp: 341990.5,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'a04b3797-d9e0-444b-8c27-172ea5a5c97e',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:start:compute-merge',
    timestamp: 1772664203837,
    traceId: 'A5094',
    sequenceNumber: 99,
    monotonicTimestamp: 341990.60000002384,
    stageDurationMs: 0.10000002384185791,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'e807ebe3-5036-44bc-8059-006596ae853b',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'stage:end:compute-merge',
    timestamp: 1772664203837,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: '[]'
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 100,
    monotonicTimestamp: 341990.8000000715,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: 'c59de7b7-ef50-491d-a23f-908cf7475206',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:start:persist',
    timestamp: 1772664203838,
    traceId: 'A5094',
    sequenceNumber: 101,
    monotonicTimestamp: 341991.5,
    stageDurationMs: 0.6999999284744263,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '890814f0-0edc-482b-9159-fb051bfe09dc',
    cell: 'pipeline-builder',
    behaviorKey: 'SDUX::Behavior::Persist::SessionStorage',
    type: 'stage:end:persist',
    timestamp: 1772664203839,
    traceId: 'A5094',
    sequenceNumber: 102,
    monotonicTimestamp: 341992,
    stageDurationMs: 0.5,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '408f521b-ff9f-42be-90cb-cd6a8a0a54a6',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:merge',
    timestamp: 1772664203839,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: '[]'
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 103,
    monotonicTimestamp: 341992.2000000477,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '798e95e2-7081-410c-838d-e0ad81fbe9ff',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:start:core-state',
    timestamp: 1772664203839,
    traceId: 'A5094',
    sequenceNumber: 104,
    monotonicTimestamp: 341992.2000000477,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '47368363-dffb-4bb9-b808-d59350e8086f',
    cell: 'pipeline-builder',
    behaviorKey: 'vault-orchestrator',
    type: 'lifecycle:end:core-state',
    timestamp: 1772664203839,
    state: {
      isLoading: false,
      value: {
        stateInput: {
          framework: 'Angular',
          primitive: '[]',
          shapeName: 'Employee',
          initialValue: '[]'
        },
        currentStep: 1,
        stageInstances: [
          {
            stageId: 'policy',
            selected: null,
            status: 'idle',
            index: 0,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'interceptor',
            selected: null,
            status: 'idle',
            index: 1,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'resolve',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 2,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'updateStrategy',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 3,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'merge',
            selected: true,
            status: 'complete',
            index: 4,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'operator',
            selected: null,
            status: 'idle',
            index: 5,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'filter',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 6,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'tap',
            selected: null,
            status: 'idle',
            index: 7,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'reducer',
            selected: null,
            status: 'idle',
            mode: 'basic',
            index: 8,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'encrypt',
            selected: null,
            status: 'idle',
            index: 9,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'persist',
            selected: null,
            status: 'idle',
            index: 10,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'error',
            selected: null,
            status: 'idle',
            index: 11,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'state',
            selected: null,
            status: 'idle',
            index: 12,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'stepwise',
            selected: null,
            status: 'idle',
            index: 13,
            behaviorSelectionMode: 'multiple'
          },
          {
            stageId: 'cache',
            selected: null,
            status: 'idle',
            index: 14,
            behaviorSelectionMode: 'single'
          },
          {
            stageId: 'lookup',
            selected: null,
            status: 'idle',
            index: 15,
            behaviorSelectionMode: 'single'
          }
        ],
        behaviorInstances: [
          {
            behaviorId: 'withDelayController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withThrottleController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withReplayGlobalErrorController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withMaxFailureController',
            stageId: 'policy',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withGlobalErrorPauseBehavior',
            stageId: 'interceptor',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreValueBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreObservableBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCorePromiseBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreFromStreamBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'advanced',
            frameworks: []
          },
          {
            behaviorId: 'withHttpResourceBehavior',
            stageId: 'resolve',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: ['Angular']
          },
          {
            behaviorId: 'withReplaceBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withMergeBehavior',
            stageId: 'updateStrategy',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withArrayMergeBehavior',
            stageId: 'merge',
            selected: true,
            default: true,
            complete: true,
            frameworks: []
          },
          {
            behaviorId: 'withArrayAppendMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withArrayPushMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectShallowMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withObjectDeepMergeBehavior',
            stageId: 'merge',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withDistinctUntilChangedBehavior',
            stageId: 'operator',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreFilterBehavior',
            stageId: 'filter',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withCoreBeforeTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreAfterTapBehavior',
            stageId: 'tap',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreReducerBehavior',
            stageId: 'reducer',
            selected: null,
            default: false,
            complete: null,
            mode: 'basic',
            frameworks: []
          },
          {
            behaviorId: 'withAes256EncryptBehavior',
            stageId: 'encrypt',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCookieStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLocalStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withSessionStoragePersistBehavior',
            stageId: 'persist',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitErrorBehavior',
            stageId: 'error',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withCoreEmitStateBehavior',
            stageId: 'state',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseResolveBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseFilterBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStepwiseReducerBehavior',
            stageId: 'stepwise',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withStateCacheBehavior',
            stageId: 'cache',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          },
          {
            behaviorId: 'withLookupBehavior',
            stageId: 'lookup',
            selected: null,
            default: false,
            complete: null,
            frameworks: []
          }
        ]
      },
      error: null,
      hasValue: true
    },
    traceId: 'A5094',
    sequenceNumber: 105,
    monotonicTimestamp: 341992.60000002384,
    stageDurationMs: 0.3999999761581421,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'internal'
  },
  {
    id: '2fae3d67-6847-4428-90c3-5dbac650bd7f',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1772664203839,
    traceId: 'A5094',
    sequenceNumber: 106,
    monotonicTimestamp: 341992.60000002384,
    stageDurationMs: 0,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'synchronous',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'afd05515-c53b-491b-abba-b99e303122a9',
    cell: 'pipeline-builder',
    behaviorKey: 'A5094',
    type: 'controller:end:attempt',
    timestamp: 1772664203839,
    payload: {
      status: 'success'
    },
    traceId: 'A5094',
    sequenceNumber: 107,
    monotonicTimestamp: 341992.8000000715,
    stageDurationMs: 0.20000004768371582,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  },
  {
    id: 'e387dbae-0d69-4e2e-b37a-fe5302a7494c',
    cell: 'pipeline-builder',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1772664203839,
    traceId: 'A5094',
    sequenceNumber: 108,
    monotonicTimestamp: 341992.89999997616,
    stageDurationMs: 0.09999990463256836,
    stackHash: 'h786822589',
    scheduler: 'microtask',
    eventLoopPhase: 'microtask',
    latencyCategory: 'pipeline',
    source: 'ui'
  }
];
