import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_DEV_TOOLS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/dev-tools',
  baseDisplay: 'Dev-Tools Overview',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/dev-tools/built-in-debugger',
      display: 'Built-in Debugger'
    },
    {
      link: '/docs/dev-tools/event-bus',
      display: 'Event Bus (Custom Devtools API)'
    },
    {
      link: '/docs/dev-tools/vault-monitor',
      display: 'Vault Monitor'
    }
  ]
};
