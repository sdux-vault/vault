import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_DEV_TOOLS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/dev-tools',
  baseDisplay: 'Dev-Tools Overview',
  title: 'Dev-Tools in SDuX Vault — Debugging and Monitoring',
  description:
    'Debug and monitor SDuX Vault pipelines using built-in debugger, Chrome extension, event bus, and Vault Monitor.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/dev-tools/built-in-debugger',
      display: 'Built-in Debugger',
      title:
        'Built-in Debugger in SDuX Vault — Console-Based Pipeline Debugging',
      description:
        'Debug pipeline execution with the built-in console debugger in SDuX Vault.'
    },
    {
      link: '/docs/dev-tools/chrome-extension',
      display: 'Chrome Extension',
      title: 'Chrome Extension for SDuX Vault — Browser DevTools Integration',
      description:
        'Inspect and debug SDuX Vault state and pipelines using the Chrome DevTools extension.'
    },
    {
      link: '/docs/dev-tools/event-bus',
      display: 'Event Bus (Custom Devtools API)',
      title: 'Event Bus in SDuX Vault — Custom DevTools API',
      description:
        'Build custom developer tools by subscribing to the SDuX Vault event bus API.'
    },
    {
      link: '/docs/dev-tools/vault-monitor',
      display: 'Vault Monitor',
      title: 'Vault Monitor in SDuX Vault — Real-Time State Monitoring',
      description:
        'Monitor state changes and pipeline activity in real time using the Vault Monitor in SDuX Vault.'
    }
  ]
};
