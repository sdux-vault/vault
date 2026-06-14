import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_EXECUTION_GUARANTEE_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/execution-guarantee',
    baseDisplay: 'Execution Guarantee',
    title: 'Execution Guarantees in SDuX Vault — Reliable State Transitions',
    description:
      'Understand how SDuX Vault guarantees consistent pipeline execution and isolates state transitions.',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/execution-guarantee',
        display: 'Pipeline Execution Guarantees (queueMicrotask)',
        title:
          'Pipeline Execution Guarantees in SDuX Vault — queueMicrotask Scheduling',
        description:
          'Understand how SDuX Vault uses queueMicrotask to guarantee consistent pipeline execution ordering.'
      },
      {
        link: '/docs/pipeline/isolation',
        display: 'Pipeline Isolation',
        title:
          'Pipeline Isolation in SDuX Vault — Independent Execution Contexts',
        description:
          'Learn how SDuX Vault isolates pipeline executions to prevent cross-contamination between state transitions.'
      }
    ]
  };
