import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ERROR_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/error',
  baseDisplay: 'Core Error Behavior',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion needed here
  cross: [],

  items: [
    {
      link: '/docs/pipeline/addons/error/with-core-error-callback-behavior',
      display: 'Core Error Callback Behavior'
    },
    {
      link: '/docs/pipeline/addons/error/with-error-transform-behavior',
      display: 'Error Transform Behavior'
    }
  ]
};
