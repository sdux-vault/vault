import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_BLOGS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/blog',
  baseDisplay: 'All Blog Posts',
  title: 'SDuX Vault Blog — Insights on State Management',
  description:
    'Read blog posts covering SDuX Vault state management patterns, pipeline architecture, and best practices.',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['stackblitz', 'welcome'],

  items: [
    {
      link: '/blog/testing-state-3-steps',
      display: "Testing State Is 3 Steps. That's It."
    },
    {
      link: '/blog/ai-assisted-debugging',
      display: 'AI-Assisted Debugging Reports',
      title: 'AI-Assisted Debugging Reports — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault generates AI-assisted debugging reports to accelerate pipeline troubleshooting.'
    },
    {
      link: '/blog/one-engine-every-framework',
      display: 'One State Engine. Every Framework.',
      title: 'One State Engine. Every Framework. — SDuX Vault Blog',
      description:
        'Discover how SDuX Vault provides a single state engine that works across Angular, React, Vue, and Svelte.'
    },
    {
      link: '/blog/circuit-breaker-state-pipeline',
      display: 'Circuit Breaker Pattern, Built Into Your State Pipeline',
      title:
        'Circuit Breaker Pattern, Built Into Your State Pipeline — SDuX Vault Blog',
      description:
        'Explore how SDuX Vault implements the circuit breaker pattern directly in the state pipeline.'
    },
    {
      link: '/blog/pipeline-anatomy',
      display: 'Pipeline Anatomy — What Happens When You Update State',
      title:
        'Pipeline Anatomy — What Happens When You Update State — SDuX Vault Blog',
      description:
        'Walk through the anatomy of a SDuX Vault pipeline execution from state update to emission.'
    },
    {
      link: '/blog/atomic-deterministic-updates',
      display: 'Your State Updates Are Atomic and Deterministic',
      title:
        'Your State Updates Are Atomic and Deterministic — SDuX Vault Blog',
      description:
        'Understand how SDuX Vault guarantees atomic and deterministic state updates in every pipeline execution.'
    },
    {
      link: '/blog/mutation-bugs-eliminated',
      display: 'Mutation Bugs? Eliminated by Architecture',
      title: 'Mutation Bugs? Eliminated by Architecture — SDuX Vault Blog',
      description:
        'Learn how SDuX Vault eliminates mutation bugs through architectural immutability guarantees.'
    },
    {
      link: '/blog/welcome',
      display: 'Welcome to the SDuX Vault Blog',
      title: 'Welcome to the SDuX Vault Blog',
      description:
        'An introduction to the SDuX Vault blog covering state management insights and best practices.'
    },
    {
      link: '/blog/what-is-sdux-vault',
      display: 'What Is SDuX Vault?',
      title: 'What Is SDuX Vault? — SDuX Vault Blog',
      description:
        'A high-level introduction to SDuX Vault and its approach to modern state management.'
    },
    {
      link: '/blog/controllers-dont-touch-your-data',
      display: "Controllers Don't Touch Your Data"
    },
    {
      link: '/blog/tab-sync-state',
      display: 'Open a New Tab. State Is Already There.',
      title: 'Open a New Tab. State Is Already There. — SDuX Vault Blog',
      description:
        'See how SDuX Vault synchronizes state across browser tabs automatically with zero configuration.'
    },
    {
      link: '/blog/redux-broke-my-trust',
      display: 'I Built a State Engine Because Redux Broke My Trust',
      title:
        'I Built a State Engine Because Redux Broke My Trust — SDuX Vault Blog',
      description:
        'Learn why SDuX Vault was built from scratch — deterministic pipelines, ordered execution, and zero ambiguity in state management.'
    }
  ]
};
