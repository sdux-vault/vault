import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_OPERATORS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/operators',
  baseDisplay: 'Core Operator Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/operators/with-distinct-until-changed-behavior',
      display: 'Distinct Until Changed Behavior'
    }
  ]
};
