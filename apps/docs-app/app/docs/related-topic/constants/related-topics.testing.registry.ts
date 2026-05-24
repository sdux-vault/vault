import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_TESTING_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/testing',
  baseDisplay: 'Testing Strategies',

  // Reuse existing global groups
  globalCross: ['core'],

  globals: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: ['welcome'],

  items: []
};
