import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_VAULT_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/api/vault',
  baseDisplay: 'Vault Initialization',

  // Same global scope as other API pages
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category traversal
  cross: [],

  items: [
    {
      link: '/docs/pipeline/api/provide-feature-cell',
      display: 'Create a FeatureCell'
    },
    {
      link: '/docs/pipeline/api/at-feature-cell',
      display: 'Decorate an Angular Service with @FeatureCell'
    }
  ]
};
