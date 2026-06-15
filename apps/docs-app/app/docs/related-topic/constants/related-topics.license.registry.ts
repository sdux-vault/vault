import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_LICENSE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/license',
  baseDisplay: 'License',
  title: 'SDuX Vault License — Terms of Use',
  description: 'Review the SDuX Vault software license terms and conditions.',

  // Reuse existing global groups
  globals: ['core'],

  // No cross-category inclusion
  cross: ['welcome', 'trademark-usage'],

  items: []
};
