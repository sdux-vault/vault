import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PERSIST_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/persist',
  baseDisplay: 'Persist Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: ['encrypt'],

  items: [
    {
      link: '/docs/pipeline/behaviors/persist/with-cookie-storage-persist-behavior',
      display: 'Cookie Storage Persist'
    },
    {
      link: '/docs/pipeline/behaviors/persist/with-local-storage-persist-behavior',
      display: 'Local Storage Persist'
    },
    {
      link: '/docs/pipeline/behaviors/persist/with-session-storage-persist-behavior',
      display: 'Session Storage Persist'
    }
  ]
};
