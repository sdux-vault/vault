import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_FILTERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/filters',
  baseDisplay: 'Core Filter Behavior',
  title: 'Filter Behaviors in SDuX Vault — Conditional Pipeline Execution',
  description:
    'Gate pipeline execution with predicate-based filter behaviors to skip unnecessary state transitions in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/reducers',
      display: 'Reducers',
      title: 'Reducer Behaviors in SDuX Vault — Deterministic State Transforms',
      description:
        'Apply pure, deterministic state transformations using reducer behaviors in the SDuX Vault pipeline.'
    },
    {
      link: '/docs/pipeline/behaviors/stepwise/with-stepwise-filter-behavior',
      display: 'Stepwise Filter',
      title: 'withStepwiseFilter in SDuX Vault — Step-Level Conditional Gating',
      description:
        'Gate individual pipeline steps with predicate-based filters using withStepwiseFilter in SDuX Vault.'
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
