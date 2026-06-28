import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PRESS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/press',
  baseDisplay: 'Press & Brand Assets',
  title: 'SDuX Vault Press & Brand Assets — Official Logos',
  description:
    'Download official SDuX Vault logos and brand assets in SVG format for use in articles, presentations, and documentation.',

  // Reuse existing global groups
  globals: ['core'],

  // No cross-category inclusion
  cross: ['license', 'trademark-usage'],

  items: []
};
