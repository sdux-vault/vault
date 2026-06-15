import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_VAULT_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/apis/vault',
  baseDisplay: 'Vault Initialization',
  title: 'Vault API in SDuX Vault — Root Store Creation',
  description:
    'Create and configure a root Vault store for centralized state management in SDuX Vault.',
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category traversal
  cross: [],

  items: [
    {
      link: '/docs/pipeline/apis/provide-feature-cell',
      display: 'Create a FeatureCell',
      title:
        'provideFeatureCell in SDuX Vault — Angular FeatureCell Registration',
      description:
        'Register a FeatureCell with Angular dependency injection using provideFeatureCell in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/apis/at-feature-cell',
      display: 'Decorate an Angular Service with @FeatureCell',
      title: '@FeatureCell Decorator in SDuX Vault — Angular Service Binding',
      description:
        'Bind an Angular injectable service to a SDuX Vault FeatureCell using the @FeatureCell decorator.'
    }
  ]
};
