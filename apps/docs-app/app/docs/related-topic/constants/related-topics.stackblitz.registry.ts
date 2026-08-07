import { RelatedTopicCategoryShape } from 'apps/docs-app/app/docs/related-topic/shapes/related-topic-category.shape';

export const RELATED_TOPICS_STACKBLITZ_REGISTRY: RelatedTopicCategoryShape = {
  baseRoute: '/docs/stackblitz',
  baseDisplay: 'Stackblitz Examples',
  title: 'StackBlitz Examples for SDuX Vault — Live Interactive Demos',
  description:
    'Explore live StackBlitz examples demonstrating SDuX Vault state management patterns.',

  // Reuse existing global groups
  globals: ['core'],

  globalCross: ['behavior', 'controller'],

  // No cross-category inclusion
  cross: ['migration'],

  items: [
    // Getting Started Examples
    {
      link: '/docs/stackblitz',
      fragment: 'replace-state',
      display: 'Replace State',
      title: 'Replace State StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates replaceState — the simplest way to update a FeatureCell. Available in Angular, React, Svelte, and Vue.'
    },
    {
      link: '/docs/stackblitz',
      fragment: 'promise',
      display: 'Promise',
      title: 'Promise StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates replaceState with a deferred promise factory. Available in Angular, React, Svelte, and Vue.'
    },
    {
      link: '/docs/stackblitz',
      fragment: 'observable',
      display: 'Observable',
      title: 'Observable StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates replaceState with an RxJS Observable. Available in Angular, React, Svelte, and Vue.'
    },
    {
      link: '/docs/stackblitz',
      fragment: 'http-resource',
      display: 'HTTP Resource',
      title: 'HTTP Resource StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates replaceState with Angular httpResource integration. Available in Angular.'
    },
    // Intermediate Examples
    {
      link: '/docs/stackblitz',
      fragment: 'basic-filter-reducer',
      display: 'Filter & Reducer Pipeline',
      title: 'Filter & Reducer Pipeline StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates how SDuX Vault processes state through a pipeline. Available in Angular, React, Svelte, and Vue.'
    },
    {
      link: '/docs/stackblitz',
      fragment: 'interceptor-delay',
      display: 'Delay Interceptor Pipeline',
      title: 'Delay Interceptor Pipeline StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates how SDuX Vault processes state through a delay interceptor. Available in Angular, React, Svelte, and Vue.'
    },
    // Advanced Examples
    {
      link: '/docs/stackblitz',
      fragment: 'debugger',
      display: 'Built-in Debugger',
      title: 'Built-in Debugger StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates the SDuX Vault built-in debugger with pipeline execution traces. Available in Angular, React, Svelte, and Vue.'
    },
    {
      link: '/docs/stackblitz',
      fragment: 'tab-sync',
      display: 'Tab Sync',
      title: 'Tab Sync StackBlitz Example - SDuX Vault',
      description:
        'Demonstrates cross-tab state synchronization using Tab Sync behavior. Available in Angular, React, Svelte, and Vue.'
    }
  ]
};
