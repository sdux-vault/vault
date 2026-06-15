import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_TESTING_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/testing',
  baseDisplay: 'Testing Strategies',
  title: 'Testing Strategies in SDuX Vault — Unit and Integration Testing',
  description:
    'Learn how to test SDuX Vault stores, FeatureCells, and pipelines effectively.',

  // Reuse existing global groups
  globalCross: ['core'],

  globals: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: ['welcome'],

  items: []
};
