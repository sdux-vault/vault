import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_TAB_SYNC_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/tab-sync',
  baseDisplay: 'Tab Sync Behavior',
  title: 'Tab Sync in SDuX Vault — Cross-Tab State Synchronization',
  description:
    'Synchronize state across browser tabs automatically using tab sync behaviors in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: ['persist', 'encrypt'],

  items: [
    {
      link: '/docs/pipeline/controllers/with-tab-sync-controller',
      display: 'Tab Sync Controller',
      title:
        'Tab Sync Controller in SDuX Vault — Cross-Tab State Synchronization',
      description:
        'Synchronize state across browser tabs using the Tab Sync Controller in SDuX Vault.'
    }
  ]
};
