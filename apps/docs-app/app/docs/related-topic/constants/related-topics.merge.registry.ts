import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_MERGE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/merge',
  baseDisplay: 'Core Merge Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/merge/with-array-append-merge-behavior',
      display: 'Array Append Merge Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-array-merge-behavior',
      display: 'Array Merge Behavior (Default)'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-array-push-merge-behavior',
      display: 'Array Push Merge Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-object-deep-merge-behavior',
      display: 'Object Deep Merge Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-object-shallow-merge-behavior',
      display: 'Object Shallow Merge Behavior'
    }
  ]
};
