import { Project } from '@stackblitz/sdk';

export const interceptorDelayExampleProject: Project = {
  title: 'vue-interceptor-delay',
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
  "name": "vue-interceptor-delay",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@sdux-vault/addons": "latest",
    "@sdux-vault/vue": "latest",
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
import { onUnmounted, ref } from 'vue';
import { ElapsedTimer } from './elapsed-timer';
import {
  type Example,
  exampleCell,
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

const snapshot = exampleCell.useReactiveState();

const activeStateHint = ref('Initial value is [] (empty array)');
const displayActiveStateHint = ref(true);
const isLoading = ref(false);
const timerDisplay = ref('0.000');

/** Framework-agnostic elapsed timer instance. */
const timer = new ElapsedTimer((ms) => {
  timerDisplay.value = ElapsedTimer.format(ms);
});

onUnmounted(() => {
  timer.destroy();
});

/**
 * Loads sample data into the FeatureCell pipeline.
 *
 * The data enters the delay interceptor and is held for 3 seconds
 * before being released to the output state. The elapsed timer
 * starts to visualize the hold window.
 */
function loadSample(): void {
  displayActiveStateHint.value = false;
  activeStateHint.value =
    'State updated with sample data after filters and reducers run.';
  replaceExamples(sample);
  timer.start();
}

/** Resets the FeatureCell state to its initial value. */
function handleResetState(): void {
  resetExamples();
  timer.reset();
}

/** Toggles the loading flag on the current state. */
function handleToggleLoading(): void {
  const next = !isLoading.value;
  isLoading.value = next;
  toggleLoading(next);
}

/** Toggles the error state between an Error instance and null. */
function handleToggleError(): void {
  const hasError = snapshot.error !== null;
  const error = hasError ? null : new Error('Example error message');
  toggleError(error);
}
</script>

<template>
  <div class="example-container">
    <div class="header">
      <div class="title">Vue - SDuX Vault Interceptor Delay Example</div>
      <div class="subtitle">
        This example demonstrates the delay interceptor controller: state
        updates are held for a configured duration before being released into
        the pipeline, letting you observe the delayed commit in real time.
      </div>
    </div>

    <div class="section">
      <div class="label">FeatureCell Flow</div>
      <div class="flow-hint">Input → Interceptor → Output</div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">Delay (Interceptor)</div>
        <div class="hint">
          Holds state updates for a configured delay before releasing them into
          the pipeline
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.cell.ts
        </div>
        <textarea class="textarea" readonly>
.withDelay?.({ millisecondDelay: 3_000 })</textarea>
      </div>

      <div class="state-container">
        <div class="label">Delay Timer</div>
        <div class="hint">
          All data is held for 3 seconds before entering the pipeline
        </div>
        <div class="hint file"></div>
        <textarea class="textarea" readonly>{{ timerDisplay }}s</textarea>
      </div>
    </div>

    <div class="section column">
      <div class="state-container">
        <div class="label">Input State</div>
        <div class="hint">Raw data before processing</div>
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
        <div class="hint">Final state after filters and reducers run</div>
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
          href="https://www.sdux-vault.com/docs/pipeline/controllers/with-delay-controller"
          target="_blank"
          rel="noopener noreferrer"
          >Delay Controller</a
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
  height: 75px;
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
    'src/app/elapsed-timer.ts': `/**
 * Framework-agnostic elapsed timer used to visualize the delay
 * interceptor's hold window in the StackBlitz example UI.
 *
 * This class has no dependency on Angular, React, Vue, or Svelte.
 * It accepts an onChange callback so each framework can wire it
 * to its own reactive primitive (Angular signal, React setState,
 * Vue ref, or Svelte store). To port this timer, instantiate it
 * with the target framework's state setter and call start/reset
 * from event handlers.
 */
export class ElapsedTimer {
  /** Timestamp (via performance.now) when the timer was last started. */
  #startTime = 0;

  /** Accumulated elapsed milliseconds since the last start. */
  #elapsed = 0;

  /** Whether the timer is currently running. */
  #running = false;

  /** Active requestAnimationFrame handle for cancellation. */
  #frameId = 0;

  /** Callback invoked on every animation frame with the current elapsed ms. */
  #onChange: (ms: number) => void;

  /**
   * Creates a new ElapsedTimer bound to the given change callback.
   *
   * @param onChange - Invoked on each animation frame with the elapsed
   *   milliseconds. Use this to push the value into the framework's
   *   reactive layer.
   */
  constructor(onChange: (ms: number) => void) {
    this.#onChange = onChange;
  }

  /**
   * Current elapsed time in milliseconds.
   *
   * @returns The accumulated elapsed milliseconds.
   */
  get elapsed(): number {
    return this.#elapsed;
  }

  /**
   * Whether the timer is actively counting.
   *
   * @returns True if the timer is running.
   */
  get running(): boolean {
    return this.#running;
  }

  /**
   * Starts the timer. If already running, the call is ignored.
   * Resumes from the current elapsed value, allowing pause/resume
   * semantics if needed.
   *
   * @returns Void.
   */
  start(): void {
    if (this.#running) return;
    this.#running = true;
    this.#startTime = performance.now() - this.#elapsed;
    this.#tick();
  }

  /**
   * Stops the timer and resets elapsed time to zero. Fires the
   * onChange callback with 0 so the UI reflects the reset immediately.
   *
   * @returns Void.
   */
  reset(): void {
    this.#running = false;
    cancelAnimationFrame(this.#frameId);
    this.#elapsed = 0;
    this.#onChange(0);
  }

  /**
   * Stops the timer without resetting elapsed time. Use this in
   * component teardown (e.g., Angular DestroyRef, React useEffect
   * cleanup, or Svelte onDestroy) to prevent orphaned animation frames.
   *
   * @returns Void.
   */
  destroy(): void {
    this.#running = false;
    cancelAnimationFrame(this.#frameId);
  }

  /**
   * Internal animation loop that recalculates elapsed time and
   * notifies the consumer on each frame.
   *
   * @returns Void.
   */
  #tick(): void {
    if (!this.#running) return;
    this.#elapsed = performance.now() - this.#startTime;
    this.#onChange(this.#elapsed);
    this.#frameId = requestAnimationFrame(() => this.#tick());
  }

  /**
   * Formats a millisecond value as a human-readable seconds string
   * with three-digit millisecond precision (e.g. "3.142").
   *
   * @param ms - The elapsed time in milliseconds.
   * @returns A formatted string in "s.mmm" format.
   */
  static format(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const millis = Math.floor(ms % 1000)
      .toString()
      .padStart(3, '0');
    return \`\${seconds}.\${millis}\`;
  }
}
`,
    'src/app/example.cell.ts': `import { withDelayController } from '@sdux-vault/addons';
import { FeatureCell, Vault } from '@sdux-vault/vue';

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

  /** Whether the character is force-sensitive, set by the jediReducer. */
  jedi?: boolean;

  /** Whether the character is a Senator, set by the jediReducer. */
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
  devMode: false
});

// Register the FeatureCell at module scope
export const exampleCell = FeatureCell<Example[]>(
  // FeatureCell descriptor (identity + initial state)
  {
    // Unique state key used by the Vault
    key: 'example-feature-cell-key',

    // Fallback Initial value for the state
    initialState: []
  },

  // Optional definition-time extensions
  [
    // --> Register add-on behaviors here <--
  ],
  [
    // Register the withDelayController add-on controller to enable delay behavior in this FeatureCell
    withDelayController
    // --> Register add-on controllers here <--
  ]
);

/**
 * Configures the Vault runtime pipeline with a delay interceptor,
 * and finalizes the FeatureCell initialization.
 *
 * Pipeline execution order:
 *
 * 1. \`.withDelay?.({ millisecondDelay: 3_000 })\` — Holds all state
 *    updates for 3 seconds before releasing them into the pipeline.
 *    The UI will not reflect new data until the delay expires.
 *
 * 2. \`.initialize()\` — Locks the pipeline. No further behaviors can
 *    be registered after this call. State updates are only processed
 *    after initialization completes.
 */
exampleCell.withDelay?.({ millisecondDelay: 3_000 }).initialize();

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
    value: exampleCell.state.value
  });
}

/** Toggles the error state between an Error instance and null. */
export function toggleError(error: Error | null): void {
  exampleCell.replaceState({
    error,
    value: exampleCell.state.value
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
    "strict": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "preserve"
  },
  "include": ["src", "vite.config.ts"]
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
