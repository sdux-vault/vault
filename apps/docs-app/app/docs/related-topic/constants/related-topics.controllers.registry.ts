import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_CONTROLLERS_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/controllers/policy',
  baseDisplay: 'Policy Layer (Controllers)',
  title: 'Controllers in SDuX Vault — Pipeline Execution Policies',
  description:
    'Configure pipeline execution policies using controllers that govern throttling, delays, failures, and cross-tab sync in SDuX Vault.',

  globals: ['core'],

  globalCross: ['interceptors'],

  cross: ['interceptors'],

  items: [
    {
      link: '/docs/pipeline/controllers/with-max-failures-controller',
      display: 'Max Failures Controller',
      title: 'Max Failures Controller in SDuX Vault — Failure Threshold Policy',
      description:
        'Halt pipeline execution after a configured number of consecutive failures using withMaxFailuresController in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/controllers/with-stepwise-controller',
      display: 'Stepwise Controller',
      title: 'Stepwise Controller in SDuX Vault — Step-Level Pipeline Control',
      description:
        'Control pipeline execution at the step level using the Stepwise Controller in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/controllers/with-throttle-controller',
      display: 'Throttle Controller',
      title: 'Throttle Controller in SDuX Vault — Rate-Limited Execution',
      description:
        'Rate-limit pipeline execution frequency using withThrottleController in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/controllers/with-delay-controller',
      display: 'Delay Controller',
      title: 'Delay Controller in SDuX Vault — Deferred Pipeline Execution',
      description:
        'Defer pipeline execution by a configured duration using withDelayController in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/controllers/with-tab-sync-controller',
      display: 'Tab Sync Controller',
      title:
        'Tab Sync Controller in SDuX Vault — Cross-Tab State Synchronization',
      description:
        'Synchronize state across browser tabs using the Tab Sync Controller in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/controllers/with-replay-global-error-controller',
      display: 'Replay Global Error Controller',
      title:
        'Replay Global Error Controller in SDuX Vault — Error Recovery Replay',
      description:
        'Replay failed pipeline executions after global error recovery using withReplayGlobalErrorController in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/execution-guarantee/conductor-queue',
      display: 'Conductor Queue',
      title: 'Conductor Queue — SDuX Vault Pipeline Serialization',
      description:
        'Learn how the Conductor Queue serializes pipeline attempts through a FIFO queue for deterministic execution ordering.'
    }
  ]
};
