import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_ERROR_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/error',
  baseDisplay: 'Core Error Behavior',
  title: 'Error Behaviors in SDuX Vault — Pipeline Error Handling',
  description:
    'Handle pipeline errors using global handlers, callbacks, and error transform behaviors in SDuX Vault.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion needed here
  cross: [],

  items: [
    {
      link: '/docs/global-error-handler',
      display: 'Global Error Handler',
      title:
        'Global Error Handler in SDuX Vault — Centralized Error Management',
      description:
        'Handle pipeline errors centrally using the global error handler in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/addons/error/with-core-error-callback-behavior',
      display: 'Core Error Callback Behavior',
      title: 'Core Error Callback in SDuX Vault — Per-Cell Error Handling',
      description:
        'Register error callback handlers on individual FeatureCells using withCoreErrorCallbackBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/addons/error/with-error-transform-behavior',
      display: 'Error Transform Behavior',
      title: 'Error Transform in SDuX Vault — Error Normalization',
      description:
        'Transform and normalize pipeline errors using withErrorTransformBehavior in SDuX Vault.'
    }
  ]
};
