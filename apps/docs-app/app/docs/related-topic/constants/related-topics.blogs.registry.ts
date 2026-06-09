import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_BLOGS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/blog',
  baseDisplay: 'All Blog Posts',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  cross: ['stackblitz', 'welcome'],

  items: [
    {
      link: '/blog/one-engine-every-framework',
      display: 'One State Engine. Every Framework.'
    },
    {
      link: '/blog/circuit-breaker-state-pipeline',
      display: 'Circuit Breaker Pattern, Built Into Your State Pipeline'
    },
    {
      link: '/blog/pipeline-anatomy',
      display: 'Pipeline Anatomy — What Happens When You Update State'
    },
    {
      link: '/blog/atomic-deterministic-updates',
      display: 'Your State Updates Are Atomic and Deterministic'
    },
    {
      link: '/blog/mutation-bugs-eliminated',
      display: 'Mutation Bugs? Eliminated by Architecture'
    },
    {
      link: '/blog/welcome',
      display: 'Welcome to the SDuX Vault Blog'
    },
    {
      link: '/blog/what-is-sdux-vault',
      display: 'What Is SDuX Vault?'
    }
  ]
};
