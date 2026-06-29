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
    cross: ['controllers'],

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
        link: '/docs/pipeline/execution-guarantee/isolation',
        display: 'Pipeline Isolation',
        title:
          'Pipeline Isolation in SDuX Vault — Independent Execution Contexts',
        description:
          'Learn how SDuX Vault isolates pipeline executions to prevent cross-contamination between state transitions.'
      },
      {
        link: '/docs/pipeline/execution-guarantee/decision-engine',
        display: 'Decision Engine & Arbitrator',
        title:
          'Decision Engine & Arbitrator — SDuX Vault Controller Arbitration',
        description:
          'Learn how the Decision Engine and Arbitrator evaluate controller votes to produce deterministic execution decisions.'
      },
      {
        link: '/docs/pipeline/execution-guarantee/orchestrator',
        display: 'Orchestrator',
        title: 'Orchestrator — SDuX Vault Pipeline Stage Traversal',
        description:
          'Learn how the Orchestrator sequences Pipeline stages in deterministic order with strict value isolation.'
      },
      {
        link: '/docs/pipeline/execution-guarantee/conductor',
        display: 'Conductor',
        title: 'Conductor — SDuX Vault Pipeline Control Boundary',
        description:
          'Learn how the Conductor serializes attempts, delegates controller arbitration, and routes approved requests into the Pipeline.'
      },
      {
        link: '/docs/pipeline/execution-guarantee/conductor-queue',
        display: 'Conductor Queue',
        title: 'Conductor Queue — SDuX Vault Pipeline Serialization',
        description:
          'Learn how the Conductor Queue serializes pipeline attempts through a FIFO queue for deterministic execution ordering.'
      }
    ]
  };
