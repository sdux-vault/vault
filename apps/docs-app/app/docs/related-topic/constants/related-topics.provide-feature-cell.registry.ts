import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PROVIDE_FEATURE_CELL_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/apis/provide-feature-cell',
    baseDisplay: 'Provide FeatureCell',
    title:
      'provideFeatureCell in SDuX Vault — Angular FeatureCell Registration',
    description:
      'Register a FeatureCell with Angular dependency injection using provideFeatureCell in SDuX Vault.',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/apis/provide-vault',
        display: 'Vault Initialization',
        title: 'provideVault in SDuX Vault — Angular Vault Registration',
        description:
          'Register a Vault with Angular dependency injection using provideVault in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/apis/at-feature-cell',
        display: 'Angular @FeatureCell Decorator',
        title: '@FeatureCell Decorator in SDuX Vault — Angular Service Binding',
        description:
          'Bind an Angular injectable service to a SDuX Vault FeatureCell using the @FeatureCell decorator.'
      }
    ]
  };
