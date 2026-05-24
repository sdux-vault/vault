import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_EXECUTION_GUARANTEE_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/execution-guarantee',
    baseDisplay: 'Execution Guarantee',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/execution-guarantee',
        display: 'Pipeline Execution Guarantees (queueMicrotask)'
      },
      {
        link: '/docs/pipeline/isolation',
        display: 'Pipeline Isolation'
      }
    ]
  };
