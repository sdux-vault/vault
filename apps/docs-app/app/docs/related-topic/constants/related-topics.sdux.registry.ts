import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_SDUX_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/sdux/vault',
  baseDisplay: 'Vault Licensing',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion needed here
  cross: [],

  items: [
    {
      link: '/sdux/vault',
      display: 'Vault Licensing'
    },
    {
      link: '/sdux/enterprise',
      display: 'Vault Enterprise Support'
    },
    {
      link: '/sdux/training',
      display: 'Vault Trainings'
    }
  ]
};
