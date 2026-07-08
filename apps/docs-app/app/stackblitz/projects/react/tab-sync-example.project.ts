import { Project } from '@stackblitz/sdk';

export const tabSyncExampleProject: Project = {
  title: 'react-tab-sync-example',
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
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "react-tab-sync-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "rxjs": "~7.8.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "typescript": "~5.9.2",
    "vite": "^6.3.3"
  }
}
`,
    'src/app/ExampleView.css': `.example-container {
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
`,
    'src/app/ExampleView.tsx': `import { ChangeEvent, useEffect, useState } from 'react';
import {
  Example,
  exampleState,
  exampleState\$,
  initializeCell,
  replaceExamples,
  resetExamples
} from './example.cell';
import './ExampleView.css';

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

/**
 * UI component for the Tab Sync example.
 *
 * This component consumes the Vault-backed state exposed by example.cell
 * and demonstrates cross-tab state synchronization. When state is updated
 * in one tab, the withTabSyncStateBehavior broadcasts the finalized snapshot
 * to other tabs via BroadcastChannel.
 *
 * The component does not manage state directly — it delegates all state
 * updates and lifecycle orchestration to the FeatureCell module.
 */
export function ExampleView() {
  const [snapshot, setSnapshot] = useState({
    value: exampleState.value,
    hasValue: exampleState.hasValue
  });
  const [activeSample, setActiveSample] = useState<Example[]>(samples[0]);
  const [activeStateHint, setActiveStateHint] = useState(
    'Initial value is [] (empty array)'
  );
  const [displayActiveStateHint, setDisplayActiveStateHint] = useState(true);

  /**
   * Subscribes to state emissions then initializes the FeatureCell.
   *
   * Initialization is deferred so the subscription is guaranteed to
   * be active before the Tab Sync controller begins BroadcastChannel
   * negotiation. This ensures the component catches the negotiation
   * snapshot that is committed synchronously via commitState.
   */
  useEffect(() => {
    const sub = exampleState\$.subscribe((emit) => {
      setSnapshot({
        value: emit.snapshot.value,
        hasValue: emit.snapshot.hasValue
      });
    });
    initializeCell();
    return () => sub.unsubscribe();
  }, []);

  /**
   * Loads the active sample into the FeatureCell pipeline.
   *
   * When Tab Sync is enabled, the pipeline broadcasts the
   * finalized snapshot to all other tabs via BroadcastChannel.
   *
   * Architectural Flow:
   * Button Click
   *   → Component handler
   *   → Cell replaceState
   *   → Vault update
   *   → Pipeline execution
   *   → BroadcastChannel broadcast
   *   → Reactive UI refresh (all tabs)
   */
  function loadSample() {
    setDisplayActiveStateHint(false);
    setActiveStateHint('State updated and broadcast to all tabs.');
    replaceExamples(activeSample);
  }

  /** Resets the FeatureCell state to its initial value. */
  function handleResetState() {
    resetExamples();
  }

  /** Updates the active sample when the dropdown selection changes. */
  function handleSampleChange(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    setActiveSample(samples[index]);
  }

  return (
    <div className="example-container">
      <div className="header">
        <div className="title">React - SDuX Vault Tab Sync Example</div>
        <div className="subtitle">
          This example demonstrates cross-tab state synchronization. Open this
          page in two browser tabs — updating state in one tab automatically
          propagates the change to the other via BroadcastChannel.
        </div>
      </div>

      <div className="section">
        <div className="label">Tab Sync Flow</div>
        <div className="flow-hint">Tab A → BroadcastChannel → Tab B</div>
      </div>

      <div className="section">
        <div className="state-container">
          <label className="label" htmlFor="sample-select">
            Sample Dataset
          </label>
          <div className="hint">
            Choose a character group to use as input state. Selecting a dataset
            updates the input preview — click Load &amp; Sync State to apply it.
          </div>
          <div className="hint">
            <select
              id="sample-select"
              className="sdux-select"
              onChange={handleSampleChange}>
              {samples.map((sample, index) => (
                <option key={index} value={index}>
                  {sample[0].name} {sample[0].lastName}, {sample[1].name}{' '}
                  {sample[1].lastName}, {sample[2].name} {sample[2].lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section column">
        <div className="state-container">
          <div className="label">Input State</div>
          <div className="hint">Data to replace and broadcast across tabs</div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/ExampleView.tsx
          </div>
          <textarea
            className="data-textarea"
            readOnly
            value={JSON.stringify(activeSample, null, 2)}
          />
        </div>

        <div className="state-container data-row">
          <div className="label">Synced FeatureCell State</div>
          <div className="hint">State synchronized across tabs</div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/example.cell.ts
          </div>
          {snapshot.hasValue ? (
            <>
              <textarea
                className="data-textarea"
                readOnly
                value={JSON.stringify(snapshot.value, null, 2)}
              />
              <div className="hint state">
                <span className="emphasis">State:</span> {activeStateHint}
              </div>
              <div className="hint file">
                {displayActiveStateHint ? (
                  <>
                    <span className="emphasis">File:</span> app/example.cell.ts
                  </>
                ) : (
                  '\\u00a0'
                )}
              </div>
            </>
          ) : (
            <>
              <textarea className="data-textarea" readOnly value=" " />
              <div className="hint state">
                <span className="emphasis">State:</span> cleared - pipeline has
                no active value for state.
              </div>
              <div className="hint file">
                <span className="emphasis">File:</span> app/example.cell.ts
                &nbsp;
              </div>
            </>
          )}
        </div>
      </div>

      <div className="section">
        <div className="actions">
          <button className="sdux-button primary" onClick={loadSample}>
            Load &amp; Sync State
          </button>

          <div className="secondary-actions">
            <button className="sdux-button" onClick={handleResetState}>
              Reset State
            </button>
          </div>
        </div>
      </div>

      <div className="section learn-more">
        <div className="label">Learn More</div>
        <div className="learn-more-links">
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/state"
            target="_blank"
            rel="noopener noreferrer">
            State
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/tab-sync"
            target="_blank"
            rel="noopener noreferrer">
            Tab Sync
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/state/updating"
            target="_blank"
            rel="noopener noreferrer">
            Updating State
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell"
            target="_blank"
            rel="noopener noreferrer">
            FeatureCell
          </a>
        </div>
      </div>
    </div>
  );
}
`,
    'src/app/example.cell.ts': `import {
  FeatureCell,
  Vault,
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';

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
const exampleCell = FeatureCell<Example[]>(
  {
    key: 'example-feature-cell-key',
    initialState: []
  },
  [withTabSyncStateBehavior],
  [withTabSyncController]
);

let initialized = false;

/**
 * Configures the Vault runtime pipeline and finalizes initialization.
 *
 * Initialization is deferred to allow React components to subscribe
 * to state\$ before the Tab Sync controller begins BroadcastChannel
 * negotiation. This ensures the subscription is active when the
 * negotiation snapshot is committed synchronously via commitState.
 *
 * Guarded to run only once — safe to call from React StrictMode
 * where useEffect fires twice.
 *
 * After initialize() is called:
 * - The pipeline structure becomes immutable
 * - No additional behaviors or operators may be registered
 * - All subsequent state updates flow through the configured pipeline
 *
 * No state updates will be processed before initialize() is called.
 */
export function initializeCell(): void {
  if (initialized) return;
  initialized = true;
  exampleCell.initialize();
}

/**
 * Read-only state snapshot accessor.
 *
 * Provides access to:
 * - value — current state value
 * - hasValue — whether state contains a value
 */
export const exampleState = exampleCell.state;

/**
 * Observable stream of state emissions.
 *
 * Each emission includes the full snapshot after pipeline execution.
 * Used by the component to subscribe to reactive state changes.
 */
export const exampleState\$ = exampleCell.state\$;

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
    'src/main.tsx': `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ExampleView } from './app/ExampleView';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExampleView />
  </StrictMode>
);
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
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true
  },
  "include": ["src", "vite.config.ts"]
}
`,
    'vite.config.ts': `import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()]
});
`
  }
};
