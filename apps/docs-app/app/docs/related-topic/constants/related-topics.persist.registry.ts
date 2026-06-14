import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PERSIST_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/persist',
  baseDisplay: 'Persist Behavior',
  title: 'Persist Behaviors in SDuX Vault — Browser Storage Persistence',
  description:
    'Persist state to cookie, localStorage, or sessionStorage using persist behaviors in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: ['encrypt'],

  items: [
    {
      link: '/docs/pipeline/behaviors/persist/with-cookie-storage-persist-behavior',
      display: 'Cookie Storage Persist',
      title:
        'Cookie Storage Persist in SDuX Vault — Cookie-Based State Persistence',
      description:
        'Persist state to browser cookies using withCookieStoragePersistBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/persist/with-local-storage-persist-behavior',
      display: 'Local Storage Persist',
      title:
        'Local Storage Persist in SDuX Vault — LocalStorage State Persistence',
      description:
        'Persist state to browser localStorage using withLocalStoragePersistBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/persist/with-session-storage-persist-behavior',
      display: 'Session Storage Persist',
      title:
        'Session Storage Persist in SDuX Vault — SessionStorage State Persistence',
      description:
        'Persist state to browser sessionStorage using withSessionStoragePersistBehavior in SDuX Vault.'
    }
  ]
};
