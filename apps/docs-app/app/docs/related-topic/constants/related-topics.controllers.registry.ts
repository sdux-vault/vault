import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_CONTROLLERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/controllers/policy',
  baseDisplay: 'Policy Layer (Controllers)',

  globals: ['core'],

  globalCross: ['interceptors'],

  cross: ['interceptors'],

  items: [
    {
      link: '/docs/pipeline/controllers/with-max-failures-controller',
      display: 'Max Failures Controller'
    },
    {
      link: '/docs/pipeline/controllers/with-stepwise-controller',
      display: 'Stepwise Controller'
    },
    {
      link: '/docs/pipeline/controllers/with-throttle-controller',
      display: 'Throttle Controller'
    },
    {
      link: '/docs/pipeline/controllers/with-delay-controller',
      display: 'Delay Controller'
    },
    {
      link: '/docs/pipeline/controllers/with-tab-sync-controller',
      display: 'Tab Sync Controller'
    },
    {
      link: '/docs/pipeline/controllers/with-replay-global-error-controller',
      display: 'Replay Global Error Controller'
    }
  ]
};
