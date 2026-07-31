import { Project } from '@stackblitz/sdk';

export const tabSyncExampleProject: Project = {
  title: 'svelte-tab-sync-example',
  template: 'node',
  files: {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Vault Tab Sync Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "svelte-tab-sync-example",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@sdux-vault/svelte": "latest",
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^5.0.3",
    "svelte": "^5.28.2",
    "svelte-check": "^4.2.1",
    "typescript": "~5.9.2",
    "vite": "^6.3.3"
  }
}
`,
    'src/app/App.svelte': `<script lang="ts">
  import ExampleView from './ExampleView.svelte';
</script>

<ExampleView />
`,
    'src/app/example.cell.ts': `import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { FeatureCell, Vault } from '@sdux-vault/svelte';

/**
 * Shape representing a single example entity in the FeatureCell state.
 */
export interface Example {
  /** Unique identifier for the example entry. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;
}

/**
 * Initializes the Vault runtime for the Tab Sync example.
 */
Vault({
  /**
   * Controls the verbosity of internal logging.
   * Levels: \`'debug' | 'info' | 'warn' | 'error' | 'off'\`.
   * Set to \`'debug'\` during development to trace pipeline activity.
   */
  logLevel: 'off',

  /**
   * Enables development-mode diagnostics.
   * When \`true\`, the SDuX Debugger panel and Chrome Extension
   * receive real-time pipeline trace events.
   */
  devMode: true,

  /**
   * Disables license validation for demo environments.
   * Use only in StackBlitz or local playground setups.
   */
  bypassLicensing: true
});

/**
 * Registers the FeatureCell with cross-tab synchronization.
 *
 * withTabSyncStateBehavior broadcasts finalized state snapshots to other
 * browser tabs via BroadcastChannel. withTabSyncController coordinates
 * the initial negotiation when a new tab opens, ensuring it receives
 * the latest state from an existing peer.
 */
export const exampleCell = FeatureCell<Example[]>(
  {
    key: 'example-feature-cell-key',
    initialState: []
  },
  [withTabSyncStateBehavior],
  [withTabSyncController]
);

/**
 * Configures the Vault runtime pipeline and finalizes initialization.
 *
 * After initialize() is called:
 * - The pipeline structure becomes immutable
 * - No additional behaviors or operators may be registered
 * - All subsequent state updates flow through the configured pipeline
 *
 * No state updates will be processed before initialize() is called.
 */
exampleCell.initialize();

/**
 * Replaces the entire FeatureCell state with the provided input.
 *
 * When Tab Sync is enabled, the pipeline broadcasts the finalized
 * snapshot to all other tabs via BroadcastChannel.
 *
 * @param input - The new state value to commit.
 */
export function replaceExamples(input: Example[]): void {
  exampleCell.replaceState({
    loading: false,
    value: input,
    error: null
  });
}

/**
 * Resets the FeatureCell state to its initial value.
 */
export function resetExamples(): void {
  exampleCell.reset();
}
`,
    'src/app/ExampleView.svelte': `<script lang="ts">
  import {
    type Example,
    exampleCell,
    replaceExamples,
    resetExamples
  } from './example.cell';

  /**
   * Sample datasets used to demonstrate state replacement and cross-tab sync.
   */
  const samples: Example[][] = [
    [
      { id: 11, name: 'Luke', lastName: 'Skywalker' },
      { id: 38, name: 'Leia', lastName: 'Organa' },
      { id: 9, name: 'Han', lastName: 'Solo' }
    ],
    [
      { id: 22, name: 'Anakin', lastName: 'Skywalker' },
      { id: 44, name: 'Padmé', lastName: 'Amidala' },
      { id: 66, name: 'Obi-Wan', lastName: 'Kenobi' }
    ],
    [
      { id: 77, name: 'Din', lastName: 'Djarin' },
      { id: 88, name: 'Ahsoka', lastName: 'Tano' },
      { id: 99, name: 'Bo-Katan', lastName: 'Kryze' }
    ]
  ];

  let snapshot = \$derived(exampleCell.state);

  let activeSample: Example[] = \$state(samples[0]);
  let activeStateHint = \$state('Initial value is [] (empty array)');
  let displayActiveStateHint = \$state(true);

  /**
   * Loads the active sample into the FeatureCell pipeline.
   *
   * When Tab Sync is enabled, the pipeline broadcasts the
   * finalized snapshot to all other tabs via BroadcastChannel.
   */
  function loadSample(): void {
    displayActiveStateHint = false;
    activeStateHint = 'State updated and broadcast to all tabs.';
    replaceExamples(\$state.snapshot(activeSample));
  }

  /** Resets the FeatureCell state to its initial value. */
  function handleResetState(): void {
    resetExamples();
  }

  /** Updates the active sample when the dropdown selection changes. */
  function handleSampleChange(event: Event): void {
    const index = Number((event.target as HTMLSelectElement).value);
    activeSample = samples[index];
  }
</script>

<div class="example-container">
  <div class="header">
    <div class="title">Svelte - SDuX Vault Tab Sync Example</div>
    <div class="subtitle">
      This example demonstrates cross-tab state synchronization. Open this page
      in two browser tabs — updating state in one tab automatically propagates
      the change to the other via BroadcastChannel.
    </div>
  </div>

  <div class="section">
    <div class="label">Tab Sync Flow</div>
    <div class="flow-hint">Tab A → BroadcastChannel → Tab B</div>
  </div>

  <div class="section">
    <div class="state-container">
      <label class="label" for="sample-select">Sample Dataset</label>
      <div class="hint">
        Choose a character group to use as input state. Selecting a dataset
        updates the input preview — click Load & Sync State to apply it.
      </div>
      <div class="hint">
        <select
          id="sample-select"
          class="sdux-select"
          onchange={handleSampleChange}>
          {#each samples as sample, index}
            <option value={index} selected={index === 0}>
              {sample[0].name}
              {sample[0].lastName}, {sample[1].name}
              {sample[1].lastName}, {sample[2].name}
              {sample[2].lastName}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">Data to replace and broadcast across tabs</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/ExampleView.svelte
      </div>
      <textarea class="data-textarea" readonly
        >{JSON.stringify(activeSample, null, 2)}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">Synced FeatureCell State</div>
      <div class="hint">State synchronized across tabs</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.cell.ts
      </div>

      {#if snapshot.hasValue}
        <textarea
          class="data-textarea"
          readonly
          value={JSON.stringify(snapshot.value, null, 2)}></textarea>
        <div class="hint state">
          <span class="emphasis">State:</span>
          {activeStateHint}
        </div>
        <div class="hint file">
          {#if displayActiveStateHint}
            <span class="emphasis">File:</span> app/example.cell.ts
          {:else}
            &nbsp;
          {/if}
        </div>
      {:else}
        <textarea class="data-textarea" readonly value=" "></textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> cleared - pipeline has no active value
          for state.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts &nbsp;
        </div>
      {/if}
    </div>
  </div>

  <div class="section">
    <div class="actions">
      <button type="button" class="sdux-button primary" onclick={loadSample}>
        Load & Sync State
      </button>

      <div class="secondary-actions">
        <button type="button" class="sdux-button" onclick={handleResetState}>
          Reset State
        </button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/state"
        target="_blank"
        rel="noopener noreferrer">State</a>
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/tab-sync"
        target="_blank"
        rel="noopener noreferrer">Tab Sync</a>
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/state/updating"
        target="_blank"
        rel="noopener noreferrer">Updating State</a>
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell"
        target="_blank"
        rel="noopener noreferrer">FeatureCell</a>
    </div>
  </div>
</div>

<style>
  .example-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
    max-width: 600px;
  }

  .section {
    padding: 1rem;
  }

  .section.column {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    display: flex;
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    .section.column {
      flex-direction: column;
    }

    .section.column .state-container {
      width: 100%;
    }
  }

  .state-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }

  .state-container.data-row {
    height: 430px;
  }

  .textarea,
  .data-textarea {
    width: 100%;
    box-sizing: border-box;
    height: 300px;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.8rem;
    background: #fafafa;
    color: #222;
  }

  .data-textarea.error {
    color: #d33;
  }

  .textarea {
    height: 175px;
  }

  .label {
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666;
  }

  .flow-hint {
    margin-top: 0.25rem;
    font-size: 1rem;
    letter-spacing: 0.3px;
    color: #666;
  }

  .hint {
    font-size: 1rem;
    color: #777;
    margin-top: -0.15rem;
    margin-left: 0.5rem;
  }

  .hint.file {
    min-height: 16px;
    color: #999;
    font-family: monospace;
    font-size: 0.9rem;
  }

  .hint.state {
    margin-top: 0.15rem;
  }

  .emphasis {
    font-weight: 600;
    color: #555;
  }

  .actions {
    justify-content: flex-start;
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    .actions {
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
    }
  }

  .secondary-actions {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .secondary-actions {
      gap: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .status {
    height: 300px;
    font-size: 0.85rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .learn-more {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .learn-more-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
  }

  .learn-more-links a {
    color: #555;
    text-decoration: none;
  }

  .learn-more-links a:hover {
    text-decoration: underline;
    color: #222;
  }

  .learn-more-links .separator {
    color: #ccc;
  }
</style>
`,
    'src/main.ts': `import { mount } from 'svelte';
import App from './app/App.svelte';
import './styles.css';

mount(App, { target: document.getElementById('app')! });
`,
    'src/styles.css': `.example-container {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sdux-button {
  height: 40px;
  color: #ffffff;
  background-color: #1976d2;
  border: 1px solid #004ba0;
  border-radius: 0.3125rem;
  font-size: 0.875rem;
  padding: 0.5rem;
  gap: 0.25rem;
  font-weight: 600;
  min-width: 125px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src", "vite.config.ts"]
}
`,
    'vite.config.ts': `import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()]
});
`
  }
};
