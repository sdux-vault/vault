import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_TAPS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/taps',
  baseDisplay: 'Taps Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/taps/with-core-after-tap-behavior',
      display: 'After Tap Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/taps/with-core-before-tap-behavior',
      display: 'Before Tap Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/filters',
      display: 'Filters'
    },
    {
      link: '/docs/pipeline/behaviors/reducers',
      display: 'Reducers'
    }
  ]
};
