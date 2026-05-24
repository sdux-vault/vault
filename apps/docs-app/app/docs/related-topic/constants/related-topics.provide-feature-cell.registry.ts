import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PROVIDE_FEATURE_CELL_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/api/provide-feature-cell',
    baseDisplay: 'Provide FeatureCell',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/api/provide-vault',
        display: 'Vault Initialization'
      },
      {
        link: '/docs/pipeline/apis/at-feature-cell',
        display: 'Angular @FeatureCell Decorator'
      }
    ]
  };
