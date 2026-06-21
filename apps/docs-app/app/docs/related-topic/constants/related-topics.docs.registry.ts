import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_DOCS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs',
  baseDisplay: 'SDuX Vault Documentation',
  title: 'SDuX Vault Documentation — Complete API & Guide Reference',
  description:
    'Browse all SDuX Vault documentation topics including pipelines, controllers, behaviors, extensions, migration guides, and DevTools.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: [],

  items: []
};
