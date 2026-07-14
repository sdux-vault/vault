import { Project } from '@stackblitz/sdk';

export const debuggerExampleProject: Project = {
  title: 'vue-debugger-example',
  template: 'node',
  files: {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Vault Debugger Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "vue-debugger-example",
  "version": "1.0.1",
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
  resetExamples,
  toggleError,
  toggleLoading
} from './example.cell';

const sample: Example[] = [
  { id: 11, name: 'Luke', lastName: 'Skywalker' },
  { id: 38, name: 'Leia', lastName: 'Organa' },
  { id: 9, name: 'Han', lastName: 'Solo' }
];

const snapshot = ref({
  value: exampleState.value,
  isLoading: exampleState.isLoading,
  error: exampleState.error as unknown,
  hasValue: exampleState.hasValue
});

const activeStateHint = ref('Initial value is [] (empty array)');
const displayActiveStateHint = ref(true);
const isLoading = ref(false);

let sub: Subscription;

onMounted(() => {
  sub = exampleState\$.subscribe((emit) => {
    snapshot.value = {
      value: emit.snapshot.value,
      isLoading: emit.snapshot.isLoading,
      error: emit.snapshot.error,
      hasValue: emit.snapshot.hasValue
    };
  });
});

onUnmounted(() => {
  sub?.unsubscribe();
});

/** Loads sample data into the FeatureCell pipeline. */
function loadSample(): void {
  displayActiveStateHint.value = false;
  activeStateHint.value =
    'State updated with sample data after filters and reducers run.';
  replaceExamples(sample);
}

/** Resets the FeatureCell state to its initial value. */
function handleResetState(): void {
  resetExamples();
}

/** Toggles the loading flag on the current state. */
function handleToggleLoading(): void {
  const next = !isLoading.value;
  isLoading.value = next;
  toggleLoading(next);
}

/** Toggles the error state between an Error instance and null. */
function handleToggleError(): void {
  const hasError = snapshot.value.error !== null;
  const error = hasError ? null : new Error('Example error message');
  toggleError(error);
}
</script>

<template>
  <div class="example-container">
    <div class="header">
      <div class="title">Vue - SDuX Vault Debugger Example</div>
      <div class="subtitle">
        This example demonstrates the SDuX Vault built-in debugger — a floating
        panel that captures pipeline execution traces. Record a session, trigger
        state changes, then export logs or generate an AI diagnostic report.
      </div>
    </div>

    <div class="section">
      <div class="label">Debugger Flow</div>
      <div class="flow-hint">
        Record → FeatureCell Activity → Stop → Download
      </div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">1. Enable Dev Mode in Vault Definition</div>
        <div class="hint">
          The debugger is enabled via
          <span class="emphasis">devMode: true</span> in the Vault
          configuration. This example already has it enabled.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts
        </div>
        <textarea class="textarea" readonly>
Vault({
  devMode: true,
  logLevel: 'off'
})</textarea>
      </div>

      <div class="state-container">
        <div class="label">2. Add insights to the FeatureCell Definition</div>
        <div class="hint">
          <span class="emphasis">Insights</span> provide additional context for
          the debugger to capture during pipeline execution. This example
          already has insights enabled.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts
        </div>
        <textarea class="textarea" readonly>
FeatureCell({
  key: 'example-feature-cell-key',
  initialState: [],
  insights: {
    wantsErrors: true,
    wantsPayload: true,
    wantsState: false
  } as InsightConfig
})</textarea>
      </div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">3. Record a Session</div>
        <div class="hint">
          To record a FeatureCell session, click the "Record" button, then
          trigger state changes by clicking "Load Sample State" in the UI. The
          debugger captures each pipeline event, including filter and reducer
          executions, state emissions, and any errors.
        </div>
        <div class="hint">
          After finishing all state changes, click "Stop" to end the recording
          session. You can then download the captured logs as a JSON file for
          analysis or use the AI Assist feature to generate an automated
          diagnostic report.
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Control</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Record / Stop</td>
              <td>Start or end a recording session</td>
            </tr>
            <tr>
              <td>Event Count</td>
              <td>Total captured pipeline events</td>
            </tr>
            <tr>
              <td>Error Count</td>
              <td>Captured error signals</td>
            </tr>
            <tr>
              <td>Clear</td>
              <td>Reset the current session</td>
            </tr>
            <tr>
              <td>Download Logs</td>
              <td>Export the debug dump (JSON)</td>
            </tr>
            <tr>
              <td>AI Assist</td>
              <td>Generate an AI diagnostic report</td>
            </tr>
            <tr>
              <td>Create Issue</td>
              <td>Generate a structured issue report</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="hint">
        <strong>Note:</strong> This example uses a filter (removes "Han") and a
        reducer (marks Jedi). See
        <span class="emphasis">app/example.cell.ts</span> for the pipeline
        configuration.
      </div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">Input State</div>
        <div class="hint">
          Raw data before processing — click "Load Sample State" to trigger
          pipeline activity
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/ExampleView.vue
        </div>
        <textarea
          class="data-textarea"
          readonly
          :value="JSON.stringify(sample, null, 2)" />
      </div>

      <div class="state-container data-row">
        <div class="label">FeatureCell State</div>
        <div class="hint">
          Final state after filters and reducers run — the debugger captures
          each pipeline stage
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts
        </div>

        <template v-if="snapshot.isLoading">
          <div class="status">Loading...</div>
        </template>

        <template v-else-if="snapshot.error">
          <textarea
            class="data-textarea error"
            readonly
            :value="JSON.stringify(snapshot.error, null, 2)" />
          <div class="hint state">This is a VaultError display</div>
        </template>

        <template v-else-if="snapshot.hasValue">
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
            active value, error or loading status.
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
          Load Sample State
        </button>

        <div class="secondary-actions">
          <button type="button" class="sdux-button" @click="handleResetState">
            Reset State
          </button>
          <button
            type="button"
            class="sdux-button"
            @click="handleToggleLoading">
            Loading ({{ String(snapshot.isLoading) }})
          </button>
          <button type="button" class="sdux-button" @click="handleToggleError">
            Error ({{ String(snapshot.error !== null) }})
          </button>
        </div>
      </div>
    </div>

    <div class="section learn-more">
      <div class="label">Learn More</div>
      <div class="learn-more-links">
        <a
          href="https://www.sdux-vault.com/docs/dev-tools/built-in-debugger"
          target="_blank"
          rel="noopener noreferrer"
          >Debugger</a
        >
        <span class="separator">·</span>
        <a
          href="https://www.sdux-vault.com/docs/pipeline/behaviors/filters"
          target="_blank"
          rel="noopener noreferrer"
          >Filters</a
        >
        <span class="separator">·</span>
        <a
          href="https://www.sdux-vault.com/docs/pipeline/behaviors/reducers"
          target="_blank"
          rel="noopener noreferrer"
          >Reducers</a
        >
        <span class="separator">·</span>
        <a
          href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell"
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

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
  font-family: monospace;
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}

.data-table th,
.data-table td {
  padding: 0.4rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.data-table th {
  font-weight: 600;
  color: #555;
}

.data-table td {
  color: #222;
}

.data-table tr:last-child td {
  border-bottom: none;
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
import { InsightConfig } from '@sdux-vault/shared';

export interface Example {
  id: number;
  name: string;
  lastName: string;
  jedi?: boolean;
  senator?: boolean;
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
  devMode: true
});

// Register the FeatureCell at module scope
const exampleCell = FeatureCell<Example[]>({
  key: 'example-feature-cell-key',
  initialState: [],

  // Insights enable the debugger to capture runtime telemetry for this
  // FeatureCell. Each flag controls what data the debugger records:
  //
  //   wantsErrors     — Capture error signals emitted during pipeline execution.
  //   wantsPayload    — Capture operation payloads for each pipeline event.
  //   wantsState      — Capture full state snapshots (can produce large exports).
  //   wantsCandidates — Capture pipeline candidate snapshots for state diff analysis.
  //
  // At minimum, enable wantsErrors and wantsPayload for useful debug sessions.
  insights: {
    wantsErrors: true,
    wantsPayload: true,
    wantsState: false,
    wantsCandidates: true
  } as InsightConfig
});

// Configure the pipeline: filters → reducers → initialize
exampleCell
  .filters([
    (examples: Example[]) =>
      examples.filter((example) => example.name !== 'Han')
  ])
  .reducers([
    (examples: Example[]) => {
      return examples.filter((example: Example) => {
        if (example.id === 11) {
          example.jedi = true;
        }
        example.senator = example.id === 38;
        return example;
      });
    }
  ])
  .initialize();

// Expose read-only state access
export const exampleState = exampleCell.state;
export const exampleState\$ = exampleCell.state\$;

/** Replaces the entire FeatureCell state with the provided input. */
export function replaceExamples(input: Example[]): void {
  exampleCell.replaceState({
    loading: false,
    value: input,
    error: null
  });
}

/** Resets the FeatureCell state to its initial value. */
export function resetExamples(): void {
  exampleCell.reset();
}

/** Toggles the loading flag on the current state. */
export function toggleLoading(loading: boolean): void {
  exampleCell.replaceState({
    loading,
    value: exampleState.value
  });
}

/** Toggles the error state between an Error instance and null. */
export function toggleError(error: Error | null): void {
  exampleCell.replaceState({
    error,
    value: exampleState.value
  });
}
`,
    'src/main.ts': `import { createApp } from 'vue';
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
