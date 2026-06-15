import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_REDUCERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/reducers',
  baseDisplay: 'Core Reducers Behavior',
  title: 'Reducer Behaviors in SDuX Vault — Deterministic State Transforms',
  description:
    'Apply pure, deterministic state transformations using reducer behaviors in the SDuX Vault pipeline.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/filters',
      display: 'Filters',
      title: 'Filter Behaviors in SDuX Vault — Conditional Pipeline Execution',
      description:
        'Gate pipeline execution with predicate-based filter behaviors in SDuX Vault to skip unnecessary state transitions.'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-reducer-behavior',
      display: 'Stepwise Reducer',
      title: 'withStepwiseReducer in SDuX Vault — Step-Level State Transforms',
      description:
        'Apply pure state transformations at individual pipeline steps using withStepwiseReducer in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/taps/with-core-before-tap-behavior',
      display: 'BeforeTap Behavior',
      title: 'Before Tap Behavior in SDuX Vault — Pre-Pipeline Side Effects',
      description:
        'Run side-effect callbacks before pipeline execution begins in SDuX Vault using withCoreBeforeTapBehavior.'
    },
    {
      link: '/docs/pipeline/behaviors/taps/with-core-after-tap-behavior',
      display: 'AfterTap Behavior',
      title: 'After Tap Behavior in SDuX Vault — Post-Pipeline Side Effects',
      description:
        'Run side-effect callbacks after every successful pipeline execution in SDuX Vault using withCoreAfterTapBehavior.'
    }
  ]
};
