import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_EXTENSION_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/pipeline/extensions/what-is-sdux-extensions',
  baseDisplay: 'SDuX Extensions',
  title: 'SDuX Extensions — Custom Behaviors, Controllers, and Licensing',
  description:
    'Build, distribute, and monetize custom pipeline behaviors and controllers using the SDuX Extensions system.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: [],

  items: [
    {
      link: '/docs/pipeline/extensions/building-custom-behaviors',
      display: 'Building Custom Behaviors',
      title:
        'Building Custom Behaviors in SDuX Vault — Pipeline Extension Development',
      description:
        'Create custom pipeline behaviors to extend SDuX Vault with domain-specific logic.'
    },
    {
      link: '/docs/pipeline/extensions/building-custom-controllers',
      display: 'Building Custom Controllers',
      title:
        'Building Custom Controllers in SDuX Vault — Execution Policy Development',
      description:
        'Create custom pipeline controllers to define execution policies in SDuX Vault.'
    },
    {
      link: '/docs/pipeline/extensions/licensing-and-monetization',
      display: 'Licensing & Monetization',
      title: 'SDuX Extensions Licensing — Monetization and Distribution',
      description:
        'Learn about licensing and monetization options for custom SDuX Vault extensions.'
    }
  ]
};
