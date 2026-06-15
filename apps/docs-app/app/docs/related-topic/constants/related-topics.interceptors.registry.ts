import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_INTERCEPTORS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/interceptors',
  baseDisplay: 'Interceptors',
  title: 'Interceptors in SDuX Vault — Pipeline Middleware',
  description:
    'Intercept and transform pipeline execution using interceptor behaviors and RxJS integration in SDuX Vault.',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // Bidirectional relationship with controller
  cross: ['controllers'],

  items: [
    {
      link: '/docs/pipeline/controllers/with-stepwise-controller',
      display: 'Global Error Pause Behavior',
      title: 'Stepwise Controller in SDuX Vault — Step-Level Pipeline Control',
      description:
        'Control pipeline execution at the step level using the Stepwise Controller in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/interceptors/with-global-error-pause-behavior',
      display: 'Global Error Pause Behavior',
      title: 'Global Error Pause Behavior in SDuX Vault — Error Interception',
      description:
        'Pause pipeline execution on errors using withGlobalErrorPauseBehavior in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/behaviors/interceptors/rxjs',
      display: 'RxJS Integration',
      title: 'RxJS Interceptors in SDuX Vault — Reactive Pipeline Integration',
      description:
        'Integrate RxJS operators as pipeline interceptors in SDuX Vault.'
    }
  ]
};
