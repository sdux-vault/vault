import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PROVIDE_VAULT_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/apis/provide-vault',
    baseDisplay: 'Vault Initialization',
    title: 'provideVault in SDuX Vault — Angular Vault Registration',
    description:
      'Register a root Vault with Angular dependency injection using provideVault in SDuX Vault.',

    // Same global scope as other API pages
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category traversal
    cross: [],

    items: [
      {
        link: '/docs/pipeline/apis/provide-vault',
        display: 'provideVault',
        title: 'provideVault in SDuX Vault — Angular Vault Registration',
        description:
          'Register a Vault with Angular dependency injection using provideVault in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/inject-vault',
        display: 'injectVault',
        title: 'injectVault in SDuX Vault — Angular Vault Injection',
        description:
          'Inject a Vault with Angular dependency injection using injectVault in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/provide-feature-cell',
        display: 'provideFeatureCell',
        title:
          'provideFeatureCell in SDuX Vault — Angular FeatureCell Registration',
        description:
          'Register a FeatureCell with Angular dependency injection using provideFeatureCell in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/at-feature-cell',
        display: '@FeatureCell',
        title: '@FeatureCell Decorator in SDuX Vault — Angular Service Binding',
        description:
          'Bind an Angular injectable service to a SDuX Vault FeatureCell using the @FeatureCell decorator.'
      }
    ]
  };
