import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_STACKBLITZ_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/stackblitz',
  baseDisplay: 'Stackblitz Examples',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: ['migration'],

  items: []
};
