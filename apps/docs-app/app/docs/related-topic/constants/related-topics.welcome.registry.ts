import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_WELCOME_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/getting-started',
  baseDisplay: 'Getting Started',

  // Reuse existing global groups
  globals: ['core'],

  // No cross-category inclusion
  cross: ['license', 'trademark-usage', 'testing'],

  items: [
    {
      link: '/docs/welcome/getting-started',
      display: 'Getting Started'
    },
    {
      link: '/docs/welcome/core-concepts',
      display: 'Core Concepts'
    },
    {
      link: '/docs/welcome/what-is-sdux',
      display: 'What is SDuX?'
    },
    {
      link: '/docs/welcome/supported-languages',
      display: 'SDuX Supported Languages'
    },
    {
      link: '/docs/welcome/sdux-redux-similarities',
      display: 'SDuX / Redux Similarities'
    },
    {
      link: '/docs/welcome/how-to-define-your-state',
      display: 'How to Define Your State'
    }
  ]
};
