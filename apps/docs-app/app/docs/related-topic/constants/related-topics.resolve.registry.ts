import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_RESOLVE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/resolve',
  baseDisplay: 'Resolve Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-deferred-behavior',
      display: 'fromDeferred (Bridge only)'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-observable-behavior',
      display: 'fromObservable (Bridge only)'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-promise-behavior',
      display: 'fromPromise (Bridge only)'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior',
      display: 'fromStream'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-http-resource-behavior',
      display: 'HttpResource Resolve'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-observable-behavior',
      display: 'Observable Resolve'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-promise-behavior',
      display: 'Promise Resolve'
    },
    {
      link: '/docs/pipeline/behaviors/resolve/with-core-value-behavior',
      display: 'Value Resolve'
    }
  ]
};
