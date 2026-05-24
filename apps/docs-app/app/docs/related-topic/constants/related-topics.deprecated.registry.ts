import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_DEPRECATED_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/deprecated',
  baseDisplay: '',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: [
    'interceptors',
    'reducers',
    'operators',
    'filters',
    'resolve',
    'state'
  ],

  items: [
    {
      link: '/docs/pipeline/behaviors/deprecated/selectors',
      display: 'Selectors'
    },
    {
      link: '/docs/pipeline/behaviors/deprecated/dispatch',
      display: 'Dispatch'
    }
  ]
};
