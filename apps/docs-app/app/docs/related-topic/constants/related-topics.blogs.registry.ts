import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_BLOGS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/blog',
  baseDisplay: 'All Blog Posts',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['stackblitz', 'welcome'],

  items: [
    {
      link: '/blog/welcome',
      display: 'Welcome to the SDuX Vault Blog'
    },
    {
      link: '/blog/what-is-sdux-vault',
      display: 'What Is SDuX Vault?'
    }
  ]
};
