import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_REDUCERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/reducers',
  baseDisplay: 'Core Reducers Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/filters',
      display: 'Filters'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-reducer-behavior',
      display: 'Stepwise Reducer'
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
