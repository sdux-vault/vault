import { RoadMapShape } from '../shapes/roadmap.shape';

export const CoreRoadMapConstants: RoadMapShape[] = [
  {
    feature: 'Value Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/resolve/with-core-value-behavior">withCoreValueBehavior</a>'
  },
  {
    feature: 'Observable Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/resolve/with-core-observable-behavior">withCoreObservableBehavior</a>'
  },
  {
    feature: 'Promise Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/resolve/with-core-promise-behavior">withCorePromiseBehavior</a>'
  },
  {
    feature: 'Dev Pipeline Observer',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'withDevPipelineObserver'
  },
  {
    feature: 'State Emission Callback',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior">withCoreEmitStateBehavior</a>'
  },
  {
    feature: 'Error Callback',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior">withCoreErrorCallbackBehavior</a>'
  },
  {
    feature: 'Array Merge',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/merge/with-array-merge-behavior">withArrayMergeBehavior</a>'
  },
  {
    feature: 'After Tap',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/taps/with-core-after-tap-behavior">withCoreAfterTapBehavior</a>'
  },
  {
    feature: 'Before Tap',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/taps/with-core-before-tap-behavior">withCoreBeforeTapBehavior</a>'
  },
  {
    feature: 'Error (Core)',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/error/with-core-error-behavior">withCoreErrorBehavior</a>'
  },
  {
    feature: 'Filter',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/filter/with-core-filter-behavior">withCoreFilterBehavior</a>'
  },
  {
    feature: 'From Observable Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior">withCoreFromObservableBehavior</a>'
  },
  {
    feature: 'From Promise Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior">withCoreFromPromiseBehavior</a>'
  },
  {
    feature: 'From Stream Resolution',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior">withCoreFromStreamBehavior</a>'
  },
  {
    feature: 'Reducer',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/reducer/with-core-reducer-behavior">withCoreReducerBehavior</a>'
  },
  {
    feature: 'State',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/state/with-core-state-behavior">withCoreStateBehavior</a>'
  },

  {
    feature: 'Queue - Async Diagnostic',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Queue - Async',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Queue - Sync',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },

  {
    feature: 'Console Error Logging',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Console Warn Logging',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Console Log Logging',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Console Debug Logging',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Dev Mode',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'State Emission Observable',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Global Error Handling',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },

  {
    feature:
      '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Handling',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature:
      '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Normalization',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior: 'N/A'
  },
  {
    feature: 'Error Emission Callback',
    isExtendable: false,
    package: '@sdux-vault/core',
    behavior:
      '<a href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior">withCoreErrorCallbackBehavior</a>'
  },
  {
    feature: 'DevTools & Observable Hooks',
    isExtendable: true,
    package: '@sdux-vault/devtools',
    behavior: 'N/A'
  }
].sort((a: RoadMapShape, b: RoadMapShape) => {
  return a.feature > b.feature ? 1 : -1;
});
