import { RELATED_TOPICS_BLOGS_REGISTRY } from 'apps/docs-app/app/docs/related-topic/constants/related-topics.blogs.registry';
import { RELATED_TOPICS_DEV_TOOLS_REGISTRY } from 'apps/docs-app/app/docs/related-topic/constants/related-topics.dev-tools.registry';
import { RELATED_TOPICS_ENTITY_ACCESS_REGISTRY } from 'apps/docs-app/app/docs/related-topic/constants/related-topics.entity-access.registry';
import { RELATED_TOPICS_SDUX_REGISTRY } from 'apps/docs-app/app/docs/related-topic/constants/related-topics.sdux.registry';
import { RelatedTopicRegistryShape } from '../shapes/related-topic-registry.shape';
import { RELATED_TOPICS_CONTROLLERS_REGISTRY } from './related-topics.controllers.registry';
import { RELATED_TOPICS_DEPRECATED_REGISTRY } from './related-topics.deprecated.registry';
import { RELATED_TOPICS_ENCRYPT_REGISTRY } from './related-topics.encypt.registry';
import { RELATED_TOPICS_ERROR_REGISTRY } from './related-topics.error.registry';
import { RELATED_TOPICS_EXECUTION_GUARANTEE_REGISTRY } from './related-topics.execution-guarantee.registry';
import { RELATED_TOPICS_EXTENSION_REGISTRY } from './related-topics.extensions.registry';
import { RELATED_TOPICS_FEATURE_CELL_API_REGISTRY } from './related-topics.feature-cell-api.registry';
import { RELATED_TOPICS_FEATURE_CELL_REGISTRY } from './related-topics.feature-cell.registry';
import { RELATED_TOPICS_FILTERS_REGISTRY } from './related-topics.filters.registry';
import { RELATED_TOPICS_INITIALIZE_REGISTRY } from './related-topics.initialize.registry';
import { RELATED_TOPICS_INTERCEPTORS_REGISTRY } from './related-topics.interceptors.registry';
import { RELATED_TOPICS_LICENSE_REGISTRY } from './related-topics.license.registry';
import { RELATED_TOPICS_MERGE_REGISTRY } from './related-topics.merge.registry';
import { RELATED_TOPICS_MIGRATION_REGISTRY } from './related-topics.migration.registry';
import { RELATED_TOPICS_OPERATORS_REGISTRY } from './related-topics.operators.registry';
import { RELATED_TOPICS_PERSIST_REGISTRY } from './related-topics.persist.registry';
import { RELATED_TOPICS_PIPELINE_OVERVIEW_REGISTRY } from './related-topics.pipeline-overview.registry';
import { RELATED_TOPICS_PROVIDE_FEATURE_CELL_REGISTRY } from './related-topics.provide-feature-cell.registry';
import { RELATED_TOPICS_PROVIDE_VAULT_REGISTRY } from './related-topics.provide-vault.registry';
import { RELATED_TOPICS_REDUCERS_REGISTRY } from './related-topics.reducers.registry';
import { RELATED_TOPICS_RESOLVE_REGISTRY } from './related-topics.resolve.registry';
import { RELATED_TOPICS_STACKBLITZ_REGISTRY } from './related-topics.stackblitz.registry';
import { RELATED_TOPICS_STATE_REGISTRY } from './related-topics.state.registry';
import { RELATED_TOPICS_STEPWISE_REGISTRY } from './related-topics.stepwise.registry';
import { RELATED_TOPICS_TAB_SYNC_REGISTRY } from './related-topics.tab-sync.registry';
import { RELATED_TOPICS_TAPS_REGISTRY } from './related-topics.taps.registry';
import { RELATED_TOPICS_TESTING_REGISTRY } from './related-topics.testing.registry';
import { RELATED_TOPICS_TRADEMARK_USAGE_REGISTRY } from './related-topics.trademark-usage.registry';
import { RELATED_TOPICS_VAULT_REGISTRY } from './related-topics.vault.registry';
import { RELATED_TOPICS_WELCOME_REGISTRY } from './related-topics.welcome.registry';

export const RELATED_TOPICS_REGISTRY: RelatedTopicRegistryShape = {
  globals: {
    core: [
      { link: '/docs/pipeline/builder', display: 'Pipeline Builder' },
      { link: '/docs/pipelines', display: 'The SDuX Pipeline' },
      { link: '/docs/welcome/best-practices', display: 'Best Practices' },
      { link: '/docs/diagrams', display: 'SDuX Diagrams' },
      { link: '/docs/welcome/license', display: 'SDuX License' },
      {
        link: '/docs/pipeline/extensions/licensing-and-monetization',
        display: 'Licensing & Monetization'
      },
      { link: '/docs/welcome/testing', display: 'Testing Strategies' },
      { link: '/docs/dev-tools/overview', display: 'DevTools' }
    ],
    behavior: [
      {
        link: '/docs/pipeline/behaviors/what-is-a-behavior',
        display: 'What is a Behavior?'
      },
      {
        link: '/docs/pipeline/addons/what-is-an-addon',
        display: 'What is an Add-on?'
      }
    ],
    controller: [
      {
        link: '/docs/pipeline/controllers/what-is-a-controller',
        display: 'What is a Controller?'
      },
      {
        link: '/docs/pipeline/controllers/policy',
        display: 'Policy Layer (Controllers)'
      }
    ],
    interceptors: [
      { link: '/docs/pipeline/behaviors/interceptors', display: 'Interceptors' }
    ]
  },

  categories: {
    blogs: RELATED_TOPICS_BLOGS_REGISTRY,

    default: {
      baseRoute: '/docs/pipeline/behaviors/errors',
      baseDisplay: '',

      // Reuse existing global groups
      globals: ['core', 'behavior', 'controller'],

      // No cross-category inclusion needed here
      cross: [],

      items: []
    },

    controllers: RELATED_TOPICS_CONTROLLERS_REGISTRY,

    deprecated: RELATED_TOPICS_DEPRECATED_REGISTRY,

    'dev-tools': RELATED_TOPICS_DEV_TOOLS_REGISTRY,

    encrypt: RELATED_TOPICS_ENCRYPT_REGISTRY,

    'entity-access': RELATED_TOPICS_ENTITY_ACCESS_REGISTRY,

    error: RELATED_TOPICS_ERROR_REGISTRY,

    'execution-guarantee': RELATED_TOPICS_EXECUTION_GUARANTEE_REGISTRY,

    extensions: RELATED_TOPICS_EXTENSION_REGISTRY,

    'feature-cell': RELATED_TOPICS_FEATURE_CELL_REGISTRY,

    'feature-cell-api': RELATED_TOPICS_FEATURE_CELL_API_REGISTRY,

    filters: RELATED_TOPICS_FILTERS_REGISTRY,

    initialize: RELATED_TOPICS_INITIALIZE_REGISTRY,

    interceptors: RELATED_TOPICS_INTERCEPTORS_REGISTRY,

    license: RELATED_TOPICS_LICENSE_REGISTRY,

    merge: RELATED_TOPICS_MERGE_REGISTRY,

    migration: RELATED_TOPICS_MIGRATION_REGISTRY,

    operators: RELATED_TOPICS_OPERATORS_REGISTRY,

    persist: RELATED_TOPICS_PERSIST_REGISTRY,

    'pipeline-overview': RELATED_TOPICS_PIPELINE_OVERVIEW_REGISTRY,

    'provide-feature-cell': RELATED_TOPICS_PROVIDE_FEATURE_CELL_REGISTRY,

    'provide-vault': RELATED_TOPICS_PROVIDE_VAULT_REGISTRY,

    reducers: RELATED_TOPICS_REDUCERS_REGISTRY,

    resolve: RELATED_TOPICS_RESOLVE_REGISTRY,

    sdux: RELATED_TOPICS_SDUX_REGISTRY,

    stackblitz: RELATED_TOPICS_STACKBLITZ_REGISTRY,

    state: RELATED_TOPICS_STATE_REGISTRY,

    stepwise: RELATED_TOPICS_STEPWISE_REGISTRY,

    'tab-sync': RELATED_TOPICS_TAB_SYNC_REGISTRY,

    taps: RELATED_TOPICS_TAPS_REGISTRY,

    testing: RELATED_TOPICS_TESTING_REGISTRY,

    'trademark-usage': RELATED_TOPICS_TRADEMARK_USAGE_REGISTRY,

    vault: RELATED_TOPICS_VAULT_REGISTRY,

    welcome: RELATED_TOPICS_WELCOME_REGISTRY
  }
};
