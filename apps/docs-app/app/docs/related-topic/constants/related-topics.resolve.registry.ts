import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_RESOLVE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/resolve',
  baseDisplay: 'Resolve Behavior',
  title: 'Resolve Behaviors in SDuX Vault — Async Data Resolution',
  description:
    'Resolve state from async sources including Promises, Observables, streams, and HttpResource in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-deferred-behavior',
      display: 'fromDeferred (Bridge only)',
      title: 'fromDeferred Resolve in SDuX Vault — Deferred Bridge Resolution',
      description:
        'Resolve deferred values through the bridge adapter using withCoreFromDeferredBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-observable-behavior',
      display: 'fromObservable (Bridge only)',
      title:
        'fromObservable Resolve in SDuX Vault — Observable Bridge Resolution',
      description:
        'Resolve Observable sources through the bridge adapter using withCoreFromObservableBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-promise-behavior',
      display: 'fromPromise (Bridge only)',
      title: 'fromPromise Resolve in SDuX Vault — Promise Bridge Resolution',
      description:
        'Resolve Promise sources through the bridge adapter using withCoreFromPromiseBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior',
      display: 'fromStream',
      title: 'fromStream Resolve in SDuX Vault — Stream-Based Resolution',
      description:
        'Resolve stream-based async sources using withCoreFromStreamBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-http-resource-behavior',
      display: 'HttpResource Resolve',
      title:
        'HttpResource Resolve in SDuX Vault — Angular HttpResource Integration',
      description:
        'Resolve state from Angular HttpResource endpoints using withHttpResourceBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-observable-behavior',
      display: 'Observable Resolve',
      title: 'Observable Resolve in SDuX Vault — RxJS Observable Resolution',
      description:
        'Resolve state from RxJS Observable sources using withCoreObservableBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-promise-behavior',
      display: 'Promise Resolve',
      title: 'Promise Resolve in SDuX Vault — Async Promise Resolution',
      description:
        'Resolve state from async Promise sources using withCorePromiseBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-value-behavior',
      display: 'Value Resolve',
      title: 'Value Resolve in SDuX Vault — Synchronous Value Resolution',
      description:
        'Resolve state from synchronous values using withCoreValueBehavior in SDuX Vault.'
    }
  ]
};
