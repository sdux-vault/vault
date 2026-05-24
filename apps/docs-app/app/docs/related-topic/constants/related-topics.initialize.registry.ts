import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_INITIALIZE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/initialize',
  baseDisplay: 'Initialization',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // Bidirectional relationship with controller
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with hydrate()',
      fragment: 'hydrate'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization from storage',
      fragment: 'persisted-storage'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with initialState',
      fragment: 'initial-state'
    },
    {
      link: '/docs/pipeline/behaviors/initialize',
      display: 'Initalization with replaceState()',
      fragment: 'replace-state'
    }
  ]
};
