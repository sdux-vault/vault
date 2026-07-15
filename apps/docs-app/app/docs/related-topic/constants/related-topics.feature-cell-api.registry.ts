import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_FEATURE_CELL_API_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/apis/feature-cell-api',
    baseDisplay: 'FeatureCell API Methods',
    title: 'FeatureCell API in SDuX Vault — Runtime State Methods',
    description:
      'Access the complete FeatureCell runtime API for state management, pipeline configuration, and lifecycle control in SDuX Vault.',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/apis/feature-cell-api/after-taps-method',
        display: 'afterTaps()',
        title: 'afterTaps() in SDuX Vault — Post-Pipeline Tap Registration',
        description:
          'Register after-tap callbacks on a FeatureCell using the afterTaps() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/at-feature-cell',
        display: '@FeatureCell',
        title: '@FeatureCell Decorator in SDuX Vault — Angular Service Binding',
        description:
          'Bind an Angular injectable service to a SDuX Vault FeatureCell using the @FeatureCell decorator.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/before-taps-method',
        display: 'beforeTaps()',
        title: 'beforeTaps() in SDuX Vault — Pre-Pipeline Tap Registration',
        description:
          'Register before-tap callbacks on a FeatureCell using the beforeTaps() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/cell-builder',
        display: 'Complete CellBuilder Api',
        title: 'CellBuilder API in SDuX Vault — FeatureCell Configuration',
        description:
          'Configure FeatureCell behaviors, controllers, and options using the complete CellBuilder API in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/destroy-method',
        display: 'destroy()',
        title: 'destroy() in SDuX Vault — FeatureCell Teardown',
        description:
          'Tear down a FeatureCell and release its resources using the destroy() method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/destroyed-stream-method',
        display: 'destroyed$',
        title: 'destroyed$ in SDuX Vault — Destruction Observable',
        description:
          'Observe FeatureCell destruction events using the destroyed$ stream in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/emit-states-method',
        display: 'emitStates()',
        title: 'emitStates() in SDuX Vault — Manual State Emission',
        description:
          'Manually emit the current state to all subscribers using the emitStates() method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/errors-method',
        display: 'errors()',
        title: 'errors() in SDuX Vault — Pipeline Error Registration',
        description:
          'Register error handlers on a FeatureCell using the errors() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/feature-cell',
        display: 'FeatureCell Registration',
        title:
          'FeatureCell Registration in SDuX Vault — Creating Feature-Scoped State',
        description:
          'Register a FeatureCell for feature-scoped state management in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/feature-cell-api',
        display: 'FeatureCell API',
        title: 'FeatureCell API in SDuX Vault — Runtime State Interface',
        description:
          'Access the complete FeatureCell runtime API for state management operations in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/filters-method',
        display: 'filters()',
        title: 'filters() in SDuX Vault — Pipeline Filter Registration',
        description:
          'Register filter behaviors on a FeatureCell using the filters() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/from-stream-method',
        display: 'fromStream()',
        title: 'fromStream() in SDuX Vault — Stream-Based State Resolution',
        description:
          'Resolve state from a stream source using the fromStream() method on a FeatureCell in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/hydrate-method',
        display: 'hydrate()',
        title: 'hydrate() in SDuX Vault — Programmatic State Hydration',
        description:
          'Programmatically hydrate FeatureCell state using the hydrate() method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/initialize-method',
        display: 'initialize()',
        title: 'initialize() in SDuX Vault — FeatureCell Initialization',
        description:
          'Initialize a FeatureCell and trigger its first pipeline execution using initialize() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/inject-vault',
        display: 'injectVault()',
        title: 'injectVault() in SDuX Vault — Angular Vault Injection',
        description:
          'Inject the Vault instance into Angular components and services using injectVault() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/interceptors-method',
        display: 'interceptors()',
        title:
          'interceptors() in SDuX Vault — Pipeline Interceptor Registration',
        description:
          'Register interceptor behaviors on a FeatureCell using the interceptors() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/key-property',
        display: 'key',
        title: 'key Property in SDuX Vault — FeatureCell Identifier',
        description:
          'Access the unique string identifier of a FeatureCell using the key property in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/merge-state-method',
        display: 'mergeState()',
        title: 'mergeState() in SDuX Vault — Partial State Updates',
        description:
          'Merge partial state updates into the current state using the mergeState() method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/operators-method',
        display: 'operators()',
        title: 'operators() in SDuX Vault — Pipeline Operator Registration',
        description:
          'Register operator behaviors on a FeatureCell using the operators() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/provide-feature-cell',
        display: 'provideFeatureCell()',
        title:
          'provideFeatureCell() in SDuX Vault — Angular FeatureCell Registration',
        description:
          'Register a FeatureCell with Angular dependency injection using provideFeatureCell() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/provide-vault',
        display: 'provideVault()',
        title: 'provideVault() in SDuX Vault — Angular Vault Registration',
        description:
          'Register a Vault with Angular dependency injection using provideVault() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/reducers-method',
        display: 'reducers()',
        title: 'reducers() in SDuX Vault — Pipeline Reducer Registration',
        description:
          'Register reducer behaviors on a FeatureCell using the reducers() CellBuilder method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/replace-state-method',
        display: 'replaceState()',
        title: 'replaceState() in SDuX Vault — Full State Replacement',
        description:
          'Replace the entire current state with a new state object using replaceState() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/reset-method',
        display: 'reset()',
        title: 'reset() in SDuX Vault — FeatureCell State Reset',
        description:
          'Reset a FeatureCell back to its initial state using the reset() method in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/reset-stream-method',
        display: 'reset$',
        title: 'reset$ in SDuX Vault — Reset Observable',
        description:
          'Observe FeatureCell reset events using the reset$ stream in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/state-property',
        display: 'state',
        title: 'state Property in SDuX Vault — Synchronous State Access',
        description:
          'Access the current synchronous state snapshot of a FeatureCell using the state property in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/state-stream-method',
        display: 'state$',
        title: 'state$ in SDuX Vault — Reactive State Observable',
        description:
          'Subscribe to reactive state changes using the state$ Observable on a FeatureCell in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/use-sync-external-store-method',
        display: 'useSyncExternalStore()',
        title:
          'useSyncExternalStore() in SDuX Vault — React Render Subscription',
        description:
          'Connect a React component render to FeatureCell state changes and access the latest committed snapshot using useSyncExternalStore() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/use-reactive-state-method',
        display: 'useReactiveState()',
        title: 'useReactiveState() in SDuX Vault — Vue Render Subscription',
        description:
          'Connect a Vue component render to FeatureCell state changes and access the latest committed snapshot using useReactiveState() in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/feature-cell-api/vault',
        display: 'Vault Initialization',
        title: 'Vault Initialization in SDuX Vault — Root Store Setup',
        description:
          'Initialize and configure the root Vault store for state management in SDuX Vault.'
      }
    ]
  };
