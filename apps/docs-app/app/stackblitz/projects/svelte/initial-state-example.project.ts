import { Project } from '@stackblitz/sdk';

export const initialStateExampleProject: Project = {
  title: 'svelte-initial-state-example',
  template: 'node',
  files: {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Svelte Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "svelte-initial-state-example",
  "version": "1.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
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
    'src/app/ExampleView.svelte': `<script lang="ts">
  import { onDestroy } from 'svelte';
  import {
    type Example,
    exampleState,
    exampleState\$,
    replaceExamples,
    resetExamples
  } from './example.cell';

  const sample: Example[] = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  let snapshot = \$state({
    value: exampleState.value,
    hasValue: exampleState.hasValue
  });

  let activeStateHint = \$state('initialState configured at registration time.');
  let displayActiveStateHint = \$state(true);

  const sub = exampleState\$.subscribe((emit) => {
    snapshot = {
      value: emit.snapshot.value,
      hasValue: emit.snapshot.hasValue
    };
  });

  onDestroy(() => {
    sub.unsubscribe();
  });

  /** Loads sample data into the FeatureCell. */
  function loadSample(): void {
    displayActiveStateHint = false;
    activeStateHint = 'State updated with sample data.';
    replaceExamples(sample);
  }

  /** Clears the FeatureCell state. Does NOT restore initialState. */
  function handleResetState(): void {
    resetExamples();
  }
</script>

<div class="example-container">
  <div class="header">
    <div class="title">Svelte - SDuX Vault Initial State Example</div>
    <div class="subtitle">
      This example demonstrates initialState — a FeatureCell can be seeded with
      pre-populated state at registration time. The initialState is processed
      through the full pipeline on initialize() and is the lowest-precedence
      initialization source.
    </div>
  </div>

  <div class="section">
    <div class="label">FeatureCell Flow</div>
    <div class="flow-hint">Input → Output</div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">Raw data before processing</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/ExampleView.svelte
      </div>
      <textarea class="data-textarea" readonly
        >{JSON.stringify(sample, null, 2)}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">FeatureCell State</div>
      <div class="hint">Final state</div>
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
        Load Sample State
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
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/state/updating"
        target="_blank"
        rel="noopener noreferrer">Updating State</a>
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/merge"
        target="_blank"
        rel="noopener noreferrer">
        Merging State
      </a>
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
    'src/app/example.cell.ts': `import { FeatureCell, Vault } from '@sdux-vault/core';

/**
 * Shape representing a single example entity in the FeatureCell state.
 * Used as the typed element of the \`Example[]\` collection managed by the cell.
 */
export interface Example {
  /** Unique identifier for the example entry. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;
}

// Initialize the Vault once at application startup
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
  devMode: false
});

/**
 * FeatureCell for the 'example-feature-cell-key' state, registered at module
 * scope with an \`initialState\` value. The \`initialState\` is the lowest-precedence
 * initialization source — \`initialize()\` processes it as a deterministic
 * \`replaceState\` through the full pipeline, seeding state before any consumer
 * reads it. Explicit \`replaceState()\` calls always override it.
 */
const exampleCell = FeatureCell<Example[]>({
  key: 'example-feature-cell-key',
  initialState: [{ id: 66, name: 'Darth', lastName: 'Vader' }]
});

// Initialize the pipeline
exampleCell.initialize();

/**
 * Read-only synchronous state snapshot exposed to Svelte components.
 * Provides access to \`value\`, \`isLoading\`, \`error\`, and \`hasValue\`.
 */
export const exampleState = exampleCell.state;

/**
 * Observable stream of committed state snapshots.
 * Emits each time the FeatureCell pipeline commits a new value.
 */
export const exampleState\$ = exampleCell.state\$;

/**
 * Replaces the entire FeatureCell state with the provided input.
 *
 * @param input - The new collection of Example records to commit.
 * @returns void
 */
export function replaceExamples(input: Example[]): void {
  exampleCell.replaceState({
    loading: false,
    value: input,
    error: null
  });
}

/**
 * Clears the FeatureCell state to \`undefined\`, resetting the loading and
 * error fields without destroying the FeatureCell or its pipeline.
 *
 * This does NOT restore the \`initialState\` configured at registration.
 * To return to a specific value, call \`replaceExamples()\` with the desired data.
 *
 * @returns void
 */
export function resetExamples(): void {
  exampleCell.reset();
}
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
