import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ENCRYPT_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/encrypt',
  baseDisplay: 'Encrypt Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: ['persist'],

  items: [
    {
      link: '/docs/pipeline/behaviors/encrypt/with-aes256encrypt-behavior',
      display: 'AES256 Encrypt'
    }
  ]
};
