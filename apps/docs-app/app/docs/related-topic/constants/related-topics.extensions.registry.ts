import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_EXTENSION_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/extensions/what-is-sdux-extensions',
  baseDisplay: 'SDuX Extensions',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/extensions/building-custom-behaviors',
      display: 'Building Custom Behaviors'
    },
    {
      link: '/docs/pipeline/extensions/building-custom-controllers',
      display: 'Building Custom Controllers'
    },
    {
      link: '/docs/pipeline/extensions/licensing-and-monetization',
      display: 'Licensing & Monetization'
    }
  ]
};
