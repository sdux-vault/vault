import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_TRADEMARK_USAGE_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/welcome/trademark-usage',
    baseDisplay: 'Trademark Usage',
    title: 'SDuX Vault Trademark Usage — Brand Guidelines',
    description:
      'Review the trademark usage guidelines for the SDuX Vault brand and logo.',

    // Reuse existing global groups
    globals: ['core'],

    // No cross-category inclusion
    cross: ['license'],

    items: []
  };
