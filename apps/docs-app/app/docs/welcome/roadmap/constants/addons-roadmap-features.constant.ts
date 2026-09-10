import { RoadMapShape } from '../shapes/roadmap.shape';

export const AddonRoadMapConstants: RoadMapShape[] = [
  {
    feature: 'HttpResource Resolution',
    isExtendable: true,
    package: '@sdux-vault/angular',
    behavior:
      '<a href="/docs/pipeline/addons/resolve/with-http-resource-behavior">withHttpResourceBehavior</a>'
  },
  {
    feature: 'State Emission Signal',
    isExtendable: false,
    package: '@sdux-vault/angular',
    behavior: 'N/A'
  },
  {
    feature: 'Error',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior: 'N/A'
  },
  {
    feature: 'Array Append Merge',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>'
  },
  {
    feature: 'Array By Id Merge',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior">withArrayByIdMergeBehavior</a>'
  },

  {
    feature: 'Array Push Merge',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/merge/with-array-push-merge-behavior">withArrayPushMergeBehavior</a>'
  },
  {
    feature: 'Stepwise',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/controllers/with-stepwise-controller">withStepwiseController</a>'
  },
  {
    feature: 'Stepwise Filter',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/stepwise/with-stepwise-filter-behavior">withStepwiseFilterBehavior</a>'
  },
  {
    feature: 'Stepwise Reducer',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/stepwise/with-stepwise-reducer-behavior">withStepwiseReducerBehavior</a>'
  },
  {
    feature: 'Stepwise Resolve',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/stepwise/with-stepwise-resolve-behavior">withStepwiseResolveBehavior</a>'
  },
  {
    feature: 'Object Deep Merge',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior">withObjectDeepMergeBehavior</a>'
  },
  {
    feature: 'Object Shallow Merge',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/behaviors/merge/with-object-shallow-merge-behavior">withObjectShallowMergeBehavior</a>'
  },
  {
    feature: 'Throttle Interceptor Controller',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/controllers/with-throttle-controller">withThrottleController</a>'
  },
  {
    feature: 'Delay Interceptor Controller',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/controllers/with-delay-controller">withDelayController</a>'
  },
  {
    feature: 'Global Error Pause',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/interceptors/with-global-error-pause-behavior">withGlobalErrorPauseBehavior</a>'
  },
  {
    feature: 'Distinct Until Changed Operator',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/operators/with-distinct-until-changed">withDistinctUntilChangedBehavior</a>'
  },
  {
    feature: 'Replay Global Error Controller',
    isExtendable: true,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/controllers/with-replay-global-error-controller">withReplayGlobalErrorController</a>'
  },
  {
    feature: 'State Cache',
    isExtendable: false,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/entity-access/with-state-cache-behavior">withStateCacheBehavior</a>'
  },
  {
    feature: 'Lookup',
    isExtendable: false,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/entity-access/with-lookup-behavior">withLookupBehavior</a>'
  },
  {
    feature: 'Query',
    isExtendable: false,
    package: '@sdux-vault/addons',
    behavior:
      '<a href="/docs/pipeline/addons/entity-access/with-query-behavior">withQueryBehavior</a>'
  }
];
