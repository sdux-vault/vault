import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_INITIALIZE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/initialize',
  baseDisplay: 'Initialization',
  title: 'Initialization in SDuX Vault — State Hydration and Setup',
  description:
    'Initialize FeatureCell state using hydration, persisted storage, initialState, or replaceState in SDuX Vault.',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // Bidirectional relationship with controller
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with hydrate()',
      fragment: 'hydrate',
      title:
        'Initialization with hydrate() in SDuX Vault — Programmatic State Hydration',
      description:
        'Hydrate FeatureCell state programmatically using the hydrate() method in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization from storage',
      fragment: 'persisted-storage',
      title:
        'Initialization from Storage in SDuX Vault — Persisted State Restoration',
      description:
        'Restore FeatureCell state from persisted browser storage during initialization in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with initialState',
      fragment: 'initial-state',
      title:
        'Initialization with initialState in SDuX Vault — Default State Configuration',
      description:
        'Configure default initial state for a FeatureCell using the initialState option in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with replaceState()',
      fragment: 'replace-state',
      title:
        'Initialization with replaceState() in SDuX Vault — Full State Override',
      description:
        'Override FeatureCell state entirely during initialization using replaceState() in SDuX Vault.'
    }
  ]
};
