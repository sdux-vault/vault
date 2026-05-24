export const BehaviorIdTypes = {
  WithAes256EncryptBehavior: 'withAes256EncryptBehavior',

  WithArrayAppendMergeBehavior: 'withArrayAppendMergeBehavior',
  WithArrayMergeBehavior: 'withArrayMergeBehavior',
  WithArrayPushMergeBehavior: 'withArrayPushMergeBehavior',

  WithCookieStoragePersistBehavior: 'withCookieStoragePersistBehavior',

  WithCoreAfterTapBehavior: 'withCoreAfterTapBehavior',
  WithCoreBeforeTapBehavior: 'withCoreBeforeTapBehavior',
  WithCoreEmitErrorBehavior: 'withCoreEmitErrorBehavior',
  WithCoreEmitStateBehavior: 'withCoreEmitStateBehavior',
  WithCoreFilterBehavior: 'withCoreFilterBehavior',
  WithCoreFromStreamBehavior: 'withCoreFromStreamBehavior',
  WithCoreObservableBehavior: 'withCoreObservableBehavior',
  WithCorePromiseBehavior: 'withCorePromiseBehavior',
  WithCoreReducerBehavior: 'withCoreReducerBehavior',
  WithCoreTransformErrorBehavior: 'withCoreTransformErrorBehavior',
  WithCoreValueBehavior: 'withCoreValueBehavior',

  WithDelayController: 'withDelayController',
  WithDistinctUntilChangedBehavior: 'withDistinctUntilChangedBehavior',

  WithGlobalErrorPauseBehavior: 'withGlobalErrorPauseBehavior',
  WithHttpResourceBehavior: 'withHttpResourceBehavior',

  WithLocalStoragePersistBehavior: 'withLocalStoragePersistBehavior',
  WithLookupBehavior: 'withLookupBehavior',

  WithMaxFailureController: 'withMaxFailureController',

  WithMergeStateBehavior: 'withMergeBehavior',

  WithObjectDeepMergeBehavior: 'withObjectDeepMergeBehavior',
  WithObjectShallowMergeBehavior: 'withObjectShallowMergeBehavior',

  WithReplayGlobalErrorController: 'withReplayGlobalErrorController',

  WithReplaceStateBehavior: 'withReplaceBehavior',

  WithSessionStoragePersistBehavior: 'withSessionStoragePersistBehavior',
  WithStateCacheBehavior: 'withStateCacheBehavior',

  WithStepwiseFilterBehavior: 'withStepwiseFilterBehavior',
  WithStepwiseReducerBehavior: 'withStepwiseReducerBehavior',
  WithStepwiseResolveBehavior: 'withStepwiseResolveBehavior',

  WithThrottleController: 'withThrottleController'
} as const;

export type BehaviorIdType =
  (typeof BehaviorIdTypes)[keyof typeof BehaviorIdTypes];
