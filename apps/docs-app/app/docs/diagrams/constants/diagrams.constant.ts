import { DiagramLinkShape } from '../shapes/diagram-link.shape';

export const DIAGRAM_LINKS: DiagramLinkShape[] = [
  // --------------------
  // Flows in stage order
  // --------------------

  {
    fragment: 'full-pipeline',
    display: 'Full Pipeline',
    sort: 'Full Pipeline',
    type: 'flow'
  },
  {
    fragment: 'simplified-flow',
    display: '(Simplified) Flow',
    sort: 'Flow (Simplified)',
    type: 'flow'
  },
  {
    fragment: 'featurecell-lifecycle',
    display: 'FeatureCell Lifecycle',
    sort: 'FeatureCell Lifecycle',
    type: 'flow'
  },
  {
    fragment: 'featurecell-initialization-flow',
    display: 'FeatureCell Initialization Flow',
    sort: 'FeatureCell Initialization Flow',
    type: 'flow'
  },
  {
    fragment: 'policy-flow',
    display: 'Policy Flow',
    sort: 'Policy Flow',
    type: 'flow'
  },
  {
    fragment: 'incoming-pipeline',
    display: 'Incoming Pipeline',
    sort: 'Incoming Pipeline',
    type: 'flow'
  },
  {
    fragment: 'controller-flow',
    display: 'Controller Flow',
    sort: 'Controller Flow',
    type: 'flow'
  },
  {
    fragment: 'resolve-processing',
    display: 'Resolve Processing',
    sort: 'Resolve Processing',
    type: 'flow'
  },
  {
    fragment: 'resolve-decision-flow',
    display: 'Resolve Decision Flow',
    sort: 'Resolve Decision Flow',
    type: 'flow'
  },
  {
    fragment: 'state-flow',
    display: 'State Flow',
    sort: 'State Flow',
    type: 'flow'
  },
  {
    fragment: 'error-flow',
    display: 'Error Flow',
    sort: 'Error Flow',
    type: 'flow'
  },

  // --------------------
  // Controllers
  // --------------------

  {
    fragment: 'delay-controller-flow',
    display: 'Delay Controller Flow',
    sort: 'Delay Controller Flow',
    type: 'controller'
  },

  {
    fragment: 'replay-global-error-controller',
    display: 'Replay Global Error Controller Flow',
    sort: 'Replay Global Error Controller Flow',
    type: 'controller'
  },
  {
    fragment: 'stepwise-controller-flow',
    display: 'Stepwise Controller Flow',
    sort: 'Stepwise Controller Flow',
    type: 'controller'
  },

  {
    fragment: 'throttle-controller-flow',
    display: 'Throttle Controller Flow',
    sort: 'Throttle Controller Flow',
    type: 'controller'
  },

  {
    fragment: 'tab-sync-controller-flow',
    display: 'Tab Sync Controller Flow',
    sort: 'Tab Sync Controller Flow',
    type: 'controller'
  },

  // --------------------
  // Behaviors in stage order
  // --------------------

  {
    fragment: 'interceptor-behavior',
    display: 'Interceptor Behavior',
    sort: 'Interceptor Behavior',
    type: 'behavior'
  },
  {
    fragment: 'global-error-pause-flow',
    display: '(Global) Error Pause Flow',
    sort: 'Error Pause Flow (Global)',
    type: 'behavior'
  },

  {
    fragment: 'resolve-processing',
    display: 'Resolve Processing',
    sort: 'Resolve Processing',
    type: 'behavior'
  },

  {
    fragment: 'replace-state-flow',
    display: 'Replace State Flow',
    sort: 'Replace State Flow',
    type: 'behavior'
  },
  {
    fragment: 'merge-state-flow',
    display: 'Merge State Flow',
    sort: 'Merge State Flow',
    type: 'behavior'
  },

  {
    fragment: 'from-deferred-flow',
    display: 'fromDeferred Flow',
    sort: 'fromDeferred Flow',
    type: 'behavior'
  },

  {
    fragment: 'from-observable-flow',
    display: 'fromObservable Flow',
    sort: 'fromObservable Flow',
    type: 'behavior'
  },

  {
    fragment: 'from-promise-flow',
    display: 'fromPromise Flow',
    sort: 'fromPromise Flow',
    type: 'behavior'
  },

  {
    fragment: 'from-stream-flow',
    display: 'fromStream Flow',
    sort: 'fromStream Flow',
    type: 'behavior'
  },
  {
    fragment: 'stepwise-resolve-function-flow',
    display: '(Stepwise) Resolve Function Flow',
    sort: 'Resolve Function Flow (Stepwise)',
    type: 'behavior'
  },

  {
    fragment: 'tab-sync-behavior-flow',
    display: 'Tab Sync Behavior Flow',
    sort: 'Tab Sync Behavior Flow',
    type: 'behavior'
  },

  {
    fragment: 'operator-flow',
    display: 'Operator Flow',
    sort: 'Operator Flow',
    type: 'behavior'
  },

  {
    fragment: 'filter-behavior',
    display: 'Filter Behavior',
    sort: 'Filter Behavior',
    type: 'behavior'
  },
  {
    fragment: 'stepwise-filter-function-flow',
    display: '(Stepwise) Filter Function Flow',
    sort: 'Filter Function Flow (Stepwise)',
    type: 'behavior'
  },

  {
    fragment: 'before-tap-behavior',
    display: 'Before Tab Behavior',
    sort: 'Before Tab Behavior',
    type: 'behavior'
  },

  {
    fragment: 'reducer-behavior',
    display: 'Reducer Behavior',
    sort: 'Reducer Behavior',
    type: 'behavior'
  },
  {
    fragment: 'stepwise-reducer-function-flow',
    display: '(Stepwise) Reducer Function Flow',
    sort: 'Reducer Function Flow (Stepwise)',
    type: 'behavior'
  },

  {
    fragment: 'after-tap-behavior',
    display: 'After Tab Behavior',
    sort: 'After Tab Behavior',
    type: 'behavior'
  },
  {
    fragment: 'state-flow',
    display: 'State Flow',
    sort: 'State Flow',
    type: 'behavior'
  },

  {
    fragment: 'encrypt-lifecycle',
    display: 'Encrypt Lifecycle',
    sort: 'Encrypt Lifecycle',
    type: 'behavior'
  },
  {
    fragment: 'decrypt-lifecycle',
    display: 'Decrypt Lifecycle',
    sort: 'Decrypt Lifecycle',
    type: 'behavior'
  },
  {
    fragment: 'persist-lifecycle',
    display: 'Persist Lifecycle',
    sort: 'Persist Lifecycle',
    type: 'behavior'
  },

  {
    fragment: 'lookup-flow',
    display: 'Lookup Behavior',
    sort: 'Lookup Behavior',
    type: 'behavior'
  },
  {
    fragment: 'query-flow',
    display: 'Query Behavior',
    sort: 'Query Behavior',
    type: 'behavior'
  },
  {
    fragment: 'state-cache-flow',
    display: '(State) Cache Behavior',
    sort: 'Cache (State) Behavior',
    type: 'behavior'
  },
  {
    fragment: 'integration-testing-flow',
    display: 'Integration Testing Flow',
    sort: 'Integration Testing Flow',
    type: 'testing'
  },
  {
    fragment: 'mutation-flow',
    display: 'Mutation Flow',
    sort: 'Mutation Flow',
    type: 'testing'
  },
  {
    fragment: 'effect-mutation-flow',
    display: 'Effect Mutation Flow',
    sort: 'Effect Mutation Flow',
    type: 'testing'
  },
  {
    fragment: 'integration-effect-testing-flow',
    display: 'Integration Effect Testing Flow',
    sort: 'Integration Effect Testing Flow',
    type: 'testing'
  },
  {
    fragment: 'integration-timer-testing-flow',
    display: 'Integration Timer Testing Flow',
    sort: 'Integration Timer Testing Flow',
    type: 'testing'
  },
  {
    fragment: 'mutation-timer-flow',
    display: 'Mutation Timer Flow',
    sort: 'Mutation Timer Flow',
    type: 'testing'
  }
];
