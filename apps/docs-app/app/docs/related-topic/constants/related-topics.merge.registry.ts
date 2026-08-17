import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_MERGE_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/merge',
  baseDisplay: 'Core Merge Behavior',
  title: 'Merge Behaviors in SDuX Vault — State Merge Strategies',
  description:
    'Configure how resolved data merges into existing state using array and object merge behaviors in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/behaviors/merge/with-array-append-merge-behavior',
      display: 'Array Append Merge Behavior',
      title: 'Array Append Merge in SDuX Vault — Concatenating Array State',
      description:
        'Append resolved array items to existing array state using withArrayAppendMergeBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/addons/merge/with-array-by-id-merge-behavior',
      display: 'Array By ID Merge Behavior',
      title:
        'Array By ID Merge in SDuX Vault — Identifier-Based Array State Merging',
      description:
        'Update, append, or delete array entities by identifier using withArrayByIdMergeBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-array-merge-behavior',
      display: 'Array Merge Behavior (Default)',
      title: 'Array Merge in SDuX Vault — Default Array Replacement',
      description:
        'Replace array state with resolved array data using the default withArrayMergeBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-array-push-merge-behavior',
      display: 'Array Push Merge Behavior',
      title: 'Array Push Merge in SDuX Vault — Pushing Items to Array State',
      description:
        'Push resolved items onto existing array state using withArrayPushMergeBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-object-deep-merge-behavior',
      display: 'Object Deep Merge Behavior',
      title: 'Object Deep Merge in SDuX Vault — Recursive State Merging',
      description:
        'Recursively merge nested object state using withObjectDeepMergeBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/merge/with-object-shallow-merge-behavior',
      display: 'Object Shallow Merge Behavior',
      title: 'Object Shallow Merge in SDuX Vault — Top-Level State Merging',
      description:
        'Merge top-level object properties into state using withObjectShallowMergeBehavior in SDuX Vault.'
    }
  ]
};
