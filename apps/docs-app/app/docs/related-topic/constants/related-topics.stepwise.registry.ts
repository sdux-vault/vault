import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_STEPWISE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/stepwise',
  baseDisplay: 'Stepwise Behavior',
  title: 'Stepwise Behaviors in SDuX Vault — Step-Level Pipeline Control',
  description:
    'Apply filter, reducer, and resolve behaviors at individual pipeline steps using stepwise behaviors in SDuX Vault.',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['reducers', 'filters'],

  items: [
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-filter-behavior',
      display: 'withStepwiseFilter',
      title: 'withStepwiseFilter in SDuX Vault — Step-Level Conditional Gating',
      description:
        'Gate individual pipeline steps with predicate-based filters using withStepwiseFilter in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-reducer-behavior',
      display: 'withStepwiseReducer',
      title: 'withStepwiseReducer in SDuX Vault — Step-Level State Transforms',
      description:
        'Apply pure state transformations at individual pipeline steps using withStepwiseReducer in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-resolve-behavior',
      display: 'withStepwiseResolve',
      title: 'withStepwiseResolve in SDuX Vault — Step-Level Async Resolution',
      description:
        'Resolve asynchronous data at individual pipeline steps using withStepwiseResolve in SDuX Vault.'
    }
  ]
};
