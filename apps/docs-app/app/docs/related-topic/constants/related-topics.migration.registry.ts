import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_MIGRATION_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/migration',
  baseDisplay: 'Migration',
  title: 'Migration Guide for SDuX Vault — Upgrading Your State Management',
  description:
    'Migrate your existing state management to SDuX Vault with step-by-step guidance on state, pipelines, and APIs.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/state"',
      display: 'Understanding State',
      title: 'Understanding State in SDuX Vault — State Concepts',
      description:
        'Learn the foundational concepts of state management in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/feature-cell-api/merge-state-method"',
      display: 'mergeState() ',
      title: 'mergeState() in SDuX Vault — Partial State Updates',
      description:
        'Merge partial state updates into the current state using the mergeState() API in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/feature-cell-api/replace-state-method"',
      display: 'replaceState() ',
      title: 'replaceState() in SDuX Vault — Full State Replacement',
      description:
        'Replace the entire current state with a new state object using the replaceState() API in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/resolve"',
      display: 'Resolve Stage ',
      title: 'Resolve Stage in SDuX Vault — Async Data Resolution',
      description:
        'Resolve asynchronous data sources during pipeline execution in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/merge"',
      display: 'Merge Behaviors ',
      title: 'Merge Behaviors in SDuX Vault — State Merge Strategies',
      description:
        'Configure how resolved data merges into existing state using merge behaviors in SDuX Vault.'
    },
    {
      link: '/docs/pipelines"',
      display: 'The Pipeline',
      title: 'The Pipeline in SDuX Vault — Execution Overview',
      description:
        'Understand the SDuX Vault pipeline and its role in orchestrating state transitions.'
    },
    {
      link: '/docs/pipeline/behaviors/reducers"',
      display: 'Reducer Behaviors',
      title: 'Reducer Behaviors in SDuX Vault — Deterministic State Transforms',
      description:
        'Apply pure, deterministic state transformations using reducer behaviors in the SDuX Vault pipeline.'
    },
    {
      link: '/docs/pipeline/execution-guarantee"',
      display: 'Pipeline Execution Guarantee ',
      title:
        'Pipeline Execution Guarantee in SDuX Vault — Reliable State Transitions',
      description:
        'Learn how SDuX Vault guarantees consistent pipeline execution and state transition reliability.'
    },
    {
      link: '/docs/pipeline/controllers/policy"',
      display: 'Controllers ',
      title: 'Controllers in SDuX Vault — Pipeline Execution Policies',
      description:
        'Configure pipeline execution policies using controllers in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/what-is-a-behavior"',
      display: 'Behaviors',
      title: 'Behaviors in SDuX Vault — Pipeline Extension Points',
      description:
        'Understand what behaviors are and how they extend the SDuX Vault pipeline.'
    },
    {
      link: '/docs/pipeline/apis/vault"',
      display: 'Define a Vault',
      title: 'Define a Vault in SDuX Vault — Root Store Creation',
      description:
        'Create a root Vault store to manage application state in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/feature-cell"',
      display: 'Define a FeatureCell',
      title: 'Define a FeatureCell in SDuX Vault — Feature-Scoped State',
      description:
        'Create a feature-scoped FeatureCell for modular state management in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/provide-vault"',
      display: 'Define a Vault (Angular)',
      title: 'provideVault in SDuX Vault — Angular Vault Registration',
      description:
        'Register a Vault with Angular dependency injection using provideVault in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/provide-feature-cell"',
      display: 'Define a FeatureCell (Angular)',
      title:
        'provideFeatureCell in SDuX Vault — Angular FeatureCell Registration',
      description:
        'Register a FeatureCell with Angular dependency injection using provideFeatureCell in SDuX Vault.'
    },
    {
      link: '/docs/welcome/how-to-define-your-state"',
      display: 'Define Your State',
      title: 'Define Your State in SDuX Vault — State Shape Design',
      description:
        'Learn how to define and structure your application state shape in SDuX Vault.'
    },
    {
      link: '/docs/welcome/testing"',
      display: 'Testing with SDuX',
      title: 'Testing with SDuX Vault — Unit and Integration Testing',
      description:
        'Learn how to test SDuX Vault stores, FeatureCells, and pipelines effectively.'
    }
  ]
};
