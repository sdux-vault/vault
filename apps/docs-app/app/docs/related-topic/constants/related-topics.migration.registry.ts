import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_MIGRATION_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/migration',
  baseDisplay: 'Migration',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion
  cross: [],

  items: [
    { link: '/docs/pipeline/behaviors/state"', display: 'Understanding State' },

    {
      link: '/docs/pipeline/apis/feature-cell-api/merge-state-method"',
      display: 'mergeState() '
    },
    {
      link: '/docs/pipeline/apis/feature-cell-api/replace-state-method"',
      display: 'replaceState() '
    },
    { link: '/docs/pipeline/behaviors/resolve"', display: 'Resolve Stage ' },

    { link: '/docs/pipeline/behaviors/merge"', display: 'Merge Behaviors ' },
    { link: '/docs/pipelines"', display: 'The Pipeline' },

    {
      link: '/docs/pipeline/behaviors/reducers"',
      display: 'Reducer Behaviors'
    },

    {
      link: '/docs/pipeline/execution-guarantee"',
      display: 'Pipeline Execution Guarantee '
    },

    { link: '/docs/pipeline/controllers/policy"', display: 'Controllers ' },

    {
      link: '/docs/pipeline/behaviors/what-is-a-behavior"',
      display: 'Behaviors'
    },

    { link: '/docs/pipeline/apis/vault"', display: 'Define a Vault' },
    {
      link: '/docs/pipeline/apis/feature-cell"',
      display: 'Define a FeatureCell'
    },
    {
      link: '/docs/pipeline/apis/provide-vault"',
      display: 'Define a Vault (Angular)'
    },
    {
      link: '/docs/pipeline/apis/provide-feature-cell"',
      display: 'Define a FeatureCell (Angular)'
    },

    {
      link: '/docs/welcome/how-to-define-your-state"',
      display: 'Define Your State'
    },

    { link: '/docs/welcome/testing"', display: 'Testing with SDuX' }
  ]
};
