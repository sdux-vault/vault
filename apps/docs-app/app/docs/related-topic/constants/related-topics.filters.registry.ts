import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_FILTERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/filters',
  baseDisplay: 'Core Filter Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/reducers',
      display: 'Reducers'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-filter-behavior',
      display: 'Stepwise Filter'
    },
    {
      link: '/docs/pipeline/behaviors/taps/with-core-before-tap-behavior',
      display: 'BeforeTap Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/taps/with-core-after-tap-behavior',
      display: 'AfterTap Behavior'
    }
  ]
};
