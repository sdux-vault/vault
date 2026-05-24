import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_INTERCEPTORS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/behaviors/interceptors',
  baseDisplay: 'Interceptors',

  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // Bidirectional relationship with controller
  cross: ['controllers'],

  items: [
    {
      link: '/docs/pipeline/controllers/with-stepwise-controller',
      display: 'Global Error Pause Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/interceptors/with-global-error-pause-behavior',
      display: 'Global Error Pause Behavior'
    },
    {
      link: '/docs/pipeline/behaviors/interceptors/rxjs',
      display: 'RxJS Integration'
    }
  ]
};
