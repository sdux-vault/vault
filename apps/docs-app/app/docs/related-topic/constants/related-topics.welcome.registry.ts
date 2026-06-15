import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_WELCOME_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/welcome/getting-started',
  baseDisplay: 'Getting Started',
  title: 'Getting Started with SDuX Vault — Setup and First State Container',
  description:
    'Install SDuX Vault and create your first deterministic, stream-oriented state container in TypeScript with minimal boilerplate.',

  // Reuse existing global groups
  globals: ['core'],

  // No cross-category inclusion
  cross: ['license', 'trademark-usage', 'testing'],

  items: [
    {
      link: '/docs/welcome/getting-started',
      display: 'Getting Started',
      title:
        'Getting Started with SDuX Vault — Setup and First State Container',
      description:
        'Install SDuX Vault and create your first deterministic, stream-oriented state container in TypeScript with minimal boilerplate.'
    },
    {
      link: '/docs/welcome/core-concepts',
      display: 'Core Concepts',
      title: 'SDuX Vault Core Concepts — FeatureCell, Snapshots, and Pipeline',
      description:
        'Learn the foundational concepts of SDuX Vault: FeatureCell ownership, immutable Snapshots, and the deterministic streaming Pipeline.'
    },
    {
      link: '/docs/welcome/what-is-sdux',
      display: 'What is SDuX?',
      title: 'What is SDuX Vault? — Deterministic Reactive State Management',
      description:
        'SDuX Vault is a deterministic, reactive state management system that combines Redux-style state transitions with modern reactive programming.'
    },
    {
      link: '/docs/welcome/supported-languages',
      display: 'SDuX Supported Languages',
      title: 'SDuX Vault Supported Languages — Angular, React, Vue, and Svelte',
      description:
        'SDuX Vault is framework-agnostic and runs in any TypeScript or JavaScript environment including Angular, React, Vue, and Svelte.'
    },
    {
      link: '/docs/welcome/sdux-redux-similarities',
      display: 'SDuX / Redux Similarities',
      title: 'SDuX Vault vs Redux — Shared Principles and Key Differences',
      description:
        'Compare SDuX Vault and Redux: both enforce predictable, inspectable state changes but differ in pipeline architecture and reactive design.'
    },
    {
      link: '/docs/welcome/how-to-define-your-state',
      display: 'How to Define Your State',
      title: 'How to Define State in SDuX Vault — FeatureCell State Setup',
      description:
        'Define explicit, feature-scoped state bound to the FeatureCell lifecycle in SDuX Vault using TypeScript.'
    }
  ]
};
