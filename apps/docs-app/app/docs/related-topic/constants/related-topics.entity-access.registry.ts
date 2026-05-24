import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ENTITY_ACCESS_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/behaviors/entity-access',
    baseDisplay: 'Entity Access',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/behaviors/entity-access/with-lookup-behavior',
        display: 'Lookup Behavior'
      },
      {
        link: '/docs/pipeline/behaviors/entity-access/with-query-behavior',
        display: 'Query Behavior'
      },
      {
        link: '/docs/pipeline/behaviors/entity-access/with-state-cache-behavior',
        display: 'State Cache Behavior'
      }
    ]
  };
