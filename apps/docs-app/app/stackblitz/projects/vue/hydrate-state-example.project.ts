import { Project } from '@stackblitz/sdk';

export const hydrateStateExampleProject: Project = {
  title: 'vue-hydrate-state-example',
  template: 'node',
  files: {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Vue Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "vue-hydrate-state-example",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
    "rxjs": "~7.8.0",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "typescript": "~5.9.2",
    "vite": "^6.3.3",
    "vue-tsc": "^2.2.8"
  }
}
`,
    'src/app/App.vue': `<script setup lang="ts">
import ExampleView from './ExampleView.vue';
</script>

<template>
  <ExampleView />
</template>
`,
    'src/app/ExampleView.vue': `<script setup lang="ts">
import type { Subscription } from 'rxjs';
import { onMounted, onUnmounted, ref } from 'vue';
import {
  type Example,
  exampleState,
  exampleState\$,
  replaceExamples,
  resetExamples
} from './example.cell';

/** Supplies a contrasting dataset used to replace the hydrated value. */
const sample: Example[] = [
  { id: 11, name: 'Luke', lastName: 'Skywalker' },
  { id: 38, name: 'Leia', lastName: 'Organa' },
  { id: 9, name: 'Han', lastName: 'Solo' }
];

/**
 * Holds the reactive Vue view of the current FeatureCell snapshot.
 * Stream emissions update these fields after hydration and later mutations.
 */
const snapshot = ref({
  value: exampleState.value,
  hasValue: exampleState.hasValue
});

/** Describes whether the visible value came from hydration or a later update. */
const activeStateHint = ref('hydrate() factory resolved during initialize().');

/** Controls whether the template shows the source of the hydrated value. */
const displayActiveStateHint = ref(true);

/** Holds the active stream subscription for component lifecycle cleanup. */
let sub: Subscription;

onMounted(() => {
  sub = exampleState\$.subscribe((emit) => {
    snapshot.value = {
      value: emit.snapshot.value,
      hasValue: emit.snapshot.hasValue
    };
  });
});

onUnmounted(() => {
  sub?.unsubscribe();
});

/**
 * Replaces the hydrated value with the sample dataset through the cell module.
 * The button click updates the pipeline, the stream emits, and Vue refreshes
 * the template from the reactive snapshot.
 * @returns void
 */
function loadSample(): void {
  displayActiveStateHint.value = false;
  activeStateHint.value = 'State updated with sample data.';
  replaceExamples(sample);
}

/**
 * Clears the current value without running the hydration factory again.
 * Hydration belongs to initialization, so reset leaves the FeatureCell empty.
 * @returns void
 */
function handleResetState(): void {
  resetExamples();
}
</script>

<template>
  <div class="example-container">
    <div class="header">
      <div class="title">Vue - SDuX Vault Hydrate State Example</div>
      <div class="subtitle">
        This example demonstrates hydrate() — a deferred factory supplies the
        authoritative initial FeatureCell value when initialize() runs. The
        resolved value then travels through the normal state pipeline.
      </div>
    </div>

    <div class="section">
      <div class="label">FeatureCell Flow</div>
      <div class="flow-hint">
        Deferred factory → initialize() → pipeline → reactive state
      </div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">Next State</div>
        <div class="hint">Sample data for a later replaceState() update</div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/ExampleView.vue
        </div>
        <textarea
          class="data-textarea"
          readonly
          :value="JSON.stringify(sample, null, 2)" />
      </div>

      <div class="state-container data-row">
        <div class="label">Hydrated FeatureCell State</div>
        <div class="hint">Factory result after initialization</div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts
        </div>

        <template v-if="snapshot.hasValue">
          <textarea
            class="data-textarea"
            readonly
            :value="JSON.stringify(snapshot.value, null, 2)" />
          <div class="hint state">
            <span class="emphasis">State:</span> {{ activeStateHint }}
          </div>
          <div class="hint file">
            <template v-if="displayActiveStateHint">
              <span class="emphasis">File:</span> app/example.cell.ts
            </template>
            <template v-else>&nbsp;</template>
          </div>
        </template>

        <template v-else>
          <textarea class="data-textarea" readonly value=" " />
          <div class="hint state">
            <span class="emphasis">State:</span> cleared - pipeline has no
            active value for state.
          </div>
          <div class="hint file">
            <span class="emphasis">File:</span> app/example.cell.ts &nbsp;
          </div>
        </template>
      </div>
    </div>

    <div class="section">
      <div class="actions">
        <button type="button" class="sdux-button primary" @click="loadSample">
          Replace Hydrated State
        </button>

        <div class="secondary-actions">
          <button type="button" class="sdux-button" @click="handleResetState">
            Reset State
          </button>
        </div>
      </div>
    </div>

    <div class="section learn-more">
      <div class="label">Learn More</div>
      <div class="learn-more-links">
        <a
          href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/hydrate-method"
          target="_blank"
          rel="noopener noreferrer"
          >hydrate()</a
        >
        <span class="separator">·</span>
        <a
          href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/initialize-method"
          target="_blank"
          rel="noopener noreferrer"
          >initialize()</a
        >
        <span class="separator">·</span>
        <a
          href="https://www.sdux-vault.com/docs/pipeline/apis/provide-feature-cell"
          target="_blank"
          rel="noopener noreferrer"
          >FeatureCell</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  font-family: monospace;
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
 * Defines one character record stored in the example's array state.
 * The hydration factory and later replacement use the same shape.
 */
export interface Example {
  /** Identifies the character within the FeatureCell array. */
  id: number;

  /** Stores the character's first name for display. */
  name: string;

  /** Stores the character's last name for display. */
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
 * Owns the FeatureCell that demonstrates deferred initialization with \`hydrate()\`.
 * The descriptor leaves its fallback undefined so the factory registered before
 * \`initialize()\` supplies the authoritative initial value. Vue components read
 * the exposed snapshot and stream while mutation functions in this module keep
 * pipeline access in one place.
 */
const exampleCell = FeatureCell<Example[] | undefined>({
  key: 'example-feature-cell-key',
  initialState: undefined
});

// Register the deferred factory before initializing the pipeline
exampleCell
  .hydrate(() =>
    Promise.resolve([{ id: 1, name: 'Darth', lastName: 'Sidious' }])
  )
  .initialize();

/**
 * Exposes the current read-only state used to seed the component's reactive snapshot.
 * Its \`value\` and \`hasValue\` fields reflect hydration and later pipeline updates.
 */
export const exampleState = exampleCell.state;

/**
 * Emits committed snapshots so the Vue component can keep its ref state reactive.
 * Hydration and later replacements flow through the same subscription surface.
 */
export const exampleState\$ = exampleCell.state\$;

/**
 * Replaces the entire hydrated state with a caller-provided character array.
 * The replacement travels through the same active pipeline and updates subscribers.
 * @param input - Character records that become the next FeatureCell value.
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
 * Clears the FeatureCell snapshot without rerunning its hydration factory.
 * The initialized pipeline remains active for later replacements.
 * @returns void
 */
export function resetExamples(): void {
  exampleCell.reset();
}
`,
    'src/main.ts': `/**
 * Mounts the hydrate example as the root Vue application.
 * App renders ExampleView while the cell module owns Vault initialization.
 */
import { createApp } from 'vue';
import App from './app/App.vue';
import './styles.css';

createApp(App).mount('#app');
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
    "jsx": "preserve",
    "strict": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true
  },
  "include": ["src", "vite.config.ts", "src/vite-env.d.ts"]
}
`,
    'vite.config.ts': `import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()]
});
`
  }
};
