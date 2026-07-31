import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';
import { createTutorialExampleGroups } from './stackblitz-tutorial-examples.constant';

/** StackBlitz example group definitions. */
export function createExampleGroups(brandName: string) {
  const tutorialGroups = createTutorialExampleGroups();
  const groups = [
    {
      heading: 'Getting Started',
      tutorialOnly: false,
      id: 'getting-started',
      description:
        'Your first FeatureCell — learn state replacement, the foundation of every SDuX Vault update.',
      examples: [
        {
          title: 'Replace State',
          id: 'replace-state',
          exampleName: 'replace-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>replaceState</strong> — the simplest way to update a FeatureCell. The entire previous state is discarded and replaced with the new value in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Reset State',
          id: 'reset-state',
          exampleName: 'replace-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>resetState</strong> — the simplest way to reset a FeatureCell to an <span class="code">undefined</span> state. The entire previous state is discarded and replaced with undefined in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Initial State',
          id: 'initial-state',
          exampleName: 'initial-state-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>initialState</strong> — the descriptor-level seed value that populates a FeatureCell before any explicit replaceState() or mergeState() call. ${brandName} initializes the cell automatically so components receive state immediately on startup. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ] satisfies StackBlitzExampleShape[]
    },
    {
      heading: 'Core Patterns',
      tutorialOnly: false,
      id: 'core-patterns',
      description:
        'Async state inputs — promises, observables, and HTTP resources. The patterns you will use in every real application.',
      examples: [
        {
          title: 'Error',
          id: 'basic-error',
          exampleName: 'replace-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>error</strong> setting, resetting and handling. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Hydrate State',
          id: 'hydrate-state',
          exampleName: 'hydrate-state-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>hydrate()</strong> with a <strong>deferred factory</strong> that supplies the authoritative initial FeatureCell value when initialize() runs. ${brandName} processes the resolved value through the normal state pipeline. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Promise',
          id: 'promise',
          exampleName: 'promise-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>replaceState</strong> with a <strong>deferred promise factory</strong> — ${brandName} handles asynchronous state updates via promises. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Observable',
          id: 'observable',
          exampleName: 'observable-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>replaceState</strong> with an <strong>RxJS Observable</strong> — ${brandName} manages state through reactive stream patterns. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'HTTP Resource (Angular)',
          id: 'http-resource',
          exampleName: 'http-resource-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>replaceState</strong> with Angular's <strong>httpResource</strong> — ${brandName} integrates HTTP requests directly into state management. Launch the example in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        }
      ] satisfies StackBlitzExampleShape[]
    },
    {
      heading: 'Intermediate',
      tutorialOnly: false,
      id: 'intermediate',
      description:
        'Pipeline controllers and interceptors — add timing, throttling, and orchestration to your state transitions.',
      examples: [
        {
          title: 'Array Append Merge',
          id: 'array-append-merge',
          exampleName: 'array-append-merge-example',
          displayCopyIcon: true,
          description: `Demonstrates <strong>mergeState</strong> with <strong>withArrayAppendMergeBehavior</strong> — ${brandName} concatenates incoming arrays with existing FeatureCell state on every mergeState() call, growing the list without discarding previous entries. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Filter & Reducer Pipeline',
          id: 'basic-filter-reducer',
          exampleName: 'basic-filter-reducer-example',
          displayCopyIcon: true,
          description: `Demonstrates how ${brandName} processes state through a pipeline: input data flows through <strong>filters</strong> and <strong>reducers</strong> before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Delay Interceptor Pipeline',
          id: 'interceptor-delay',
          exampleName: 'interceptor-delay-example',
          displayCopyIcon: true,
          description: `Demonstrates how ${brandName} processes state through a pipeline: input data flows through a delay interceptor before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ] satisfies StackBlitzExampleShape[]
    },
    {
      heading: 'Advanced',
      tutorialOnly: false,
      id: 'advanced',
      description:
        'Developer tooling and diagnostics — record pipeline traces, export debug logs, and generate AI-powered diagnostic reports.',
      examples: [
        {
          title: 'Built-in Debugger',
          id: 'debugger',
          exampleName: 'debugger-example',
          displayCopyIcon: true,
          description: `Demonstrates the ${brandName} <strong>built-in debugger</strong> — a floating panel that captures pipeline execution traces. Record a session, trigger state changes, then export logs or generate an AI diagnostic report. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Comparison',
          id: 'comparison',
          exampleName: 'comparison-example',
          displayCopyIcon: true,
          description: `The example from the <a href="/developer">State library</a> comparison guide. The example includes filtering, reduction, replacement, async fetch, loading, error and reset operations. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        },
        {
          title: 'Tab Sync',
          id: 'tab-sync',
          exampleName: 'tab-sync-example',
          displayCopyIcon: true,
          isVault: true,
          notice: `
            <p>
              Tab Sync requires same-origin tabs to communicate via BroadcastChannel.
              StackBlitz assigns each instance a unique origin, so cross-tab
              synchronization cannot be demonstrated in the browser preview.
            </p>
            <p>To verify real-time tab synchronization, clone and run the example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/&lt;language&gt;/tab-sync-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              Replace <code>&lt;language&gt;</code> with <code>angular</code>,
              <code>react</code>, <code>svelte</code>, or <code>vue</code>.
            </p>
          `,
          description: `Demonstrates <strong>cross-tab state synchronization</strong> using the Tab Sync behavior and controller. State changes committed in one browser tab are automatically broadcast to all other tabs via BroadcastChannel. Open the example in two tabs to see state synchronize in real time. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ] satisfies StackBlitzExampleShape[]
    },
    ...tutorialGroups
  ];

  return groups.map((group) => ({
    ...group,
    examples: [...group.examples].sort((a, b) => a.title.localeCompare(b.title))
  }));
}
