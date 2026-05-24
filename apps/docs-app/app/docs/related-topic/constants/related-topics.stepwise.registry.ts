import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_STEPWISE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/stepwise',
  baseDisplay: 'Stepwise Behavior',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['reducers', 'filters'],

  items: [
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-filter-behavior',
      display: 'withStepwiseFilter'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-reducer-behavior',
      display: 'withStepwiseReducer'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-resolve-behavior',
      display: 'withStepwiseResolve'
    }
  ]
};
