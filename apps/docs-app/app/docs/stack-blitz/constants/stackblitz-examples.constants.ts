/** StackBlitz example group definitions. */
export function createExampleGroups(brandName: string) {
  const groups = [
    {
      heading: 'Getting Started',
      id: 'getting-started',
      description:
        'Your first FeatureCell — learn state replacement, the foundation of every SDuX Vault update.',
      examples: [
        {
          title: 'Replace State',
          id: 'replace-state',
          exampleName: 'replace-example',
          description: `Demonstrates replaceState — the simplest way to update a FeatureCell. The entire previous state is discarded and replaced with the new value in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates initialState — the descriptor-level seed value that populates a FeatureCell before any explicit replaceState() or mergeState() call. ${brandName} initializes the cell automatically so components receive state immediately on startup. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    },
    {
      heading: 'Core Patterns',
      id: 'core-patterns',
      description:
        'Async state inputs — promises, observables, and HTTP resources. The patterns you will use in every real application.',
      examples: [
        {
          title: 'Promise',
          id: 'promise',
          exampleName: 'promise-example',
          description: `Demonstrates replaceState with a deferred promise factory — ${brandName} handles asynchronous state updates via promises. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates replaceState with an RxJS Observable — ${brandName} manages state through reactive stream patterns. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates replaceState with Angular's httpResource — ${brandName} integrates HTTP requests directly into state management. Launch the example in StackBlitz.`,
          languages: [{ name: 'Angular', key: 'angular' }]
        }
      ]
    },
    {
      heading: 'Intermediate',
      id: 'intermediate',
      description:
        'Pipeline controllers and interceptors — add timing, throttling, and orchestration to your state transitions.',
      examples: [
        {
          title: 'Array Append Merge',
          id: 'array-append-merge',
          exampleName: 'array-append-merge-example',
          description: `Demonstrates mergeState with withArrayAppendMergeBehavior — ${brandName} concatenates incoming arrays with existing FeatureCell state on every mergeState() call, growing the list without discarding previous entries. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates how ${brandName} processes state through a pipeline: input data flows through filters and reducers before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates how ${brandName} processes state through a pipeline: input data flows through a delay interceptor before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    },
    {
      heading: 'Advanced',
      id: 'advanced',
      description:
        'Developer tooling and diagnostics — record pipeline traces, export debug logs, and generate AI-powered diagnostic reports.',
      examples: [
        {
          title: 'Built-in Debugger',
          id: 'debugger',
          exampleName: 'debugger-example',
          description: `Demonstrates the ${brandName} built-in debugger — a floating panel that captures pipeline execution traces. Record a session, trigger state changes, then export logs or generate an AI diagnostic report. Choose your framework and launch the example directly in StackBlitz.`,
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
          description: `Demonstrates cross-tab state synchronization using the Tab Sync behavior and controller. State changes committed in one browser tab are automatically broadcast to all other tabs via BroadcastChannel. Open the example in two tabs to see state synchronize in real time. Choose your framework and launch the example directly in StackBlitz.`,
          languages: [
            { name: 'Angular', key: 'angular' },
            { name: 'React', key: 'react' },
            { name: 'Svelte', key: 'svelte' },
            { name: 'Vue', key: 'vue' }
          ]
        }
      ]
    }
  ];

  return groups.map((group) => ({
    ...group,
    examples: [...group.examples].sort((a, b) => a.title.localeCompare(b.title))
  }));
}
