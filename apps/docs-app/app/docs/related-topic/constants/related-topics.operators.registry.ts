import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_OPERATORS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/operators',
  baseDisplay: 'Core Operator Behavior',
  title: 'Operator Behaviors in SDuX Vault — Stream Processing',
  description:
    'Apply operator behaviors like distinct-until-changed to control state emission in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/operators/with-distinct-until-changed',
      display: 'Distinct Until Changed Behavior',
      title:
        'Distinct Until Changed in SDuX Vault — Duplicate Emission Prevention',
      description:
        'Prevent duplicate state emissions by skipping unchanged values using withDistinctUntilChangedBehavior in SDuX Vault.'
    }
  ]
};
