import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ENTITY_ACCESS_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline/behaviors/entity-access',
    baseDisplay: 'Entity Access',
    title: 'Entity Access in SDuX Vault — Lookup, Query, and Cache',
    description:
      'Access entities from state using lookup, query, and caching behaviors in SDuX Vault.',

    // Reuse existing global groups
    globals: ['core'],

    globalCross: ['behavior'],

    // No cross-category inclusion
    cross: [],

    items: [
      {
        link: '/docs/pipeline/behaviors/entity-access/with-lookup-behavior',
        display: 'Lookup Behavior',
        title: 'Lookup Behavior in SDuX Vault — Key-Based Entity Access',
        description:
          'Access individual entities by key from state using withLookupBehavior in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/behaviors/entity-access/with-query-behavior',
        display: 'Query Behavior',
        title: 'Query Behavior in SDuX Vault — Predicate-Based Entity Access',
        description:
          'Query entities from state using predicate-based filters with withQueryBehavior in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/behaviors/entity-access/with-state-cache-behavior',
        display: 'State Cache Behavior',
        title: 'State Cache Behavior in SDuX Vault — Cached Entity Access',
        description:
          'Cache and reuse entity access results using withStateCacheBehavior in SDuX Vault.'
      }
    ]
  };
