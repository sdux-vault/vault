import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_PIPELINE_OVERVIEW_REGISTRY: RelatedTopicCategoryShape =
  {
    baseRoute: '/docs/pipeline',
    baseDisplay: 'Pipeline Overview',
    title: 'Pipeline Overview in SDuX Vault — Architecture and Concepts',
    description:
      'Explore the SDuX Vault pipeline architecture including behaviors, add-ons, and execution flow.',

    globals: ['core'],

    globalCross: ['behavior', 'controller'],

    cross: [],

    items: [
      {
        link: '/docs/pipeline/pipeline-architecture',
        display: 'Pipeline Architecture',
        title: 'Pipeline Architecture in SDuX Vault — Execution Flow Design',
        description:
          'Explore the architecture and execution flow of the SDuX Vault pipeline.'
      },
      {
        link: '/docs/pipeline/behaviors/what-is-a-behavior',
        display: 'What is a Behavior?',
        title: 'What is a Behavior in SDuX Vault — Pipeline Extension Points',
        description:
          'Understand what behaviors are and how they extend the SDuX Vault pipeline.'
      },
      {
        link: '/docs/pipeline/addons/what-is-an-addon',
        display: 'What is an Add-on?',
        title:
          'What is an Add-on in SDuX Vault — Composable Pipeline Extensions',
        description:
          'Learn about add-ons and how they compose multiple behaviors into reusable pipeline extensions in SDuX Vault.'
      },
      {
        link: '/docs/pipeline/addons/how-to-build-an-addon',
        display: 'How to Build an Add-on',
        title: 'How to Build an Add-on in SDuX Vault — Custom Extension Guide',
        description:
          'Step-by-step guide to building custom add-ons for the SDuX Vault pipeline.'
      }
    ]
  };
