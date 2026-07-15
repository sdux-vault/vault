import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ENCRYPT_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/encrypt',
  baseDisplay: 'Encrypt Overview',
  title: 'Encrypt Behaviors in SDuX Vault — State Encryption at Rest',
  description:
    'Encrypt persisted state data using encryption behaviors in the SDuX Vault pipeline.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: ['persist'],

  items: [
    {
      link: '/docs/pipeline/behaviors/encrypt/with-aes256encrypt-behavior',
      display: 'AES256 Encrypt',
      title: 'AES256 Encrypt in SDuX Vault — State Encryption at Rest',
      description:
        'Encrypt persisted state using AES-256 encryption with withAes256EncryptBehavior in SDuX Vault.'
    }
  ]
};
