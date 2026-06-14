import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_SDUX_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/sdux/vault',
  baseDisplay: 'Vault Licensing',
  title: 'SDuX Vault Licensing — Plans and Pricing',
  description:
    'Explore SDuX Vault licensing options including free, professional, and enterprise plans.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior'],

  // No cross-category inclusion needed here
  cross: [],

  items: [
    {
      link: '/sdux/vault',
      display: 'Vault Licensing',
      title: 'SDuX Vault Licensing — Plans and Pricing',
      description:
        'Explore SDuX Vault licensing options including free, professional, and enterprise plans.'
    },
    {
      link: '/sdux/enterprise',
      display: 'Vault Enterprise Support',
      title: 'SDuX Vault Enterprise Support — Dedicated Assistance',
      description:
        'Learn about SDuX Vault enterprise support offerings including dedicated channels and SLAs.'
    },
    {
      link: '/sdux/training',
      display: 'Vault Trainings',
      title: 'SDuX Vault Trainings — Guided Learning Programs',
      description:
        'Discover SDuX Vault training programs for teams and individuals to accelerate adoption.'
    }
  ]
};
