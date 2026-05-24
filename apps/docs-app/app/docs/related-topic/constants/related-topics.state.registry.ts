import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_STATE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/state',
  baseDisplay: 'Core State Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion needed here
  cross: [],

  items: [
    {
      link: '/docs/pipeline/addons/state/with-core-emit-state-behavior',
      display: 'Core State Emit Behavior'
    }
  ]
};
