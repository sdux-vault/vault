import { Project } from '@stackblitz/sdk';

export const arrayByIdMergeExampleProject: Project = {
  title: 'react-array-by-id-merge-example',
  template: 'node',
  files: {
    'dist/assets/index-BVqJXALc.css': `.header{flex-direction:column;gap:.25rem;display:flex}.title{letter-spacing:.3px;font-size:2rem;font-weight:600}.subtitle{color:#666;max-width:600px;font-size:1rem}.section{padding:1rem}.section.column{border:1px solid #00000014;border-radius:8px;gap:.75rem;display:flex}@media (width<=768px){.section.column{flex-direction:column}.section.column .state-container{width:100%}}.state-container{flex-direction:column;flex:1;gap:.35rem;min-width:0;display:flex}.state-container.data-row{height:430px}.textarea,.data-textarea{box-sizing:border-box;color:#222;background:#fafafa;border:1px solid #00000014;border-radius:6px;width:100%;height:300px;padding:.5rem;font-family:monospace;font-size:.8rem}.data-textarea.error{color:#d33}.textarea{height:175px}.label{text-transform:uppercase;letter-spacing:.5px;color:#666;font-size:1.1rem;font-weight:600}.flow-hint{letter-spacing:.3px;color:#666;margin-top:.25rem;font-size:1rem}.hint{color:#777;margin-top:-.15rem;margin-left:.5rem;font-size:1rem}.hint.file{color:#999;min-height:16px;font-family:monospace;font-size:.9rem}.hint.state{margin-top:.15rem}.emphasis{color:#555;font-weight:600}.actions{justify-content:flex-start;align-items:center;gap:3rem;display:flex}@media (width<=768px){.actions{flex-direction:column;align-items:flex-start;gap:2rem}}.secondary-actions{gap:2rem;display:flex}@media (width<=768px){.secondary-actions{flex-direction:column;align-items:flex-start;gap:1.5rem}}.status{color:#666;justify-content:center;align-items:center;height:300px;font-size:.85rem;display:flex}.learn-more{flex-direction:column;gap:.35rem;display:flex}.learn-more-links{align-items:center;gap:.75rem;font-size:1rem;display:flex}.learn-more-links a{color:#555;text-decoration:none}.learn-more-links a:hover{color:#222;text-decoration:underline}.learn-more-links .separator{color:#ccc}.example-container{flex-direction:column;gap:.25rem;padding:.25rem;display:flex}.sdux-button{color:#fff;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;background-color:#1976d2;border:1px solid #004ba0;border-radius:.3125rem;flex-direction:row;justify-content:center;align-items:center;gap:.25rem;min-width:125px;height:40px;padding:.5rem;font-size:.875rem;font-weight:600;display:flex;overflow:hidden}
`,
    'dist/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX React Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" crossorigin src="/assets/index-DVVxSDDC.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-BVqJXALc.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`,
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX React Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "react-array-by-id-merge-example",
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
    "@sdux-vault/addons": "latest",
    "@sdux-vault/react": "latest",
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
    'src/app/example.cell.ts': `import { withArrayByIdMergeBehavior } from '@sdux-vault/addons';
import { FeatureCell, Vault } from '@sdux-vault/react';

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
 * FeatureCell for the \`example-feature-cell-key\` state, registered at module
 * scope with an \`initialState\` value and the \`withArrayByIdMergeBehavior\`.
 * The \`withArrayMergeId({ idKey: 'id' })\` configuration identifies records by
 * their \`id\`, allowing merges to update matching records and add new records.
 */
export const exampleCell = FeatureCell<Example[]>(
  // FeatureCell descriptor (identity + initial state)
  {
    // Unique state key used by the Vault
    key: 'example-feature-cell-key',

    // Fallback Initial value for the state
    initialState: [{ id: 66, name: 'Darth', lastName: 'Vader' }]
  },

  // Optional definition-time extensions
  [
    // Register the withArrayByIdMergeBehavior to enable ID-based merge semantics
    withArrayByIdMergeBehavior
    // --> Register add-on behaviors here <--
  ],
  [
    // --> Register add-on controllers here <--
  ]
);

// Configure the entity identifier before activating the pipeline.
exampleCell.withArrayMergeId?.({ idKey: 'id' });
exampleCell.initialize();

/**
 * Merges entity records into the current array by their \`id\` property.
 *
 * Existing IDs are updated with the incoming record, while new IDs are added
 * to the state. The React component reads the resulting snapshot through the
 * \`useSyncExternalStore()\` bridge.
 *
 * @param input - Entity records to update or add to the current state.
 * @returns void
 */
export function mergeExamples(input: Example[]): void {
  exampleCell.mergeState({
    value: input
  });
}

/**
 * Removes entity records whose IDs match the supplied records.
 *
 * The array-by-ID behavior uses the \`isDelete\` option to remove matching
 * records while preserving all other entries in the FeatureCell state.
 *
 * @param input - Entity records whose IDs should be removed from the state.
 * @returns void
 */
export function deleteExamples(input: Example[]): void {
  exampleCell.mergeState(
    {
      value: input
    },
    {
      isDelete: true
    }
  );
}

/**
 * Clears the current FeatureCell value without destroying its pipeline.
 *
 * Resetting removes the active value rather than restoring the registered
 * initial state. Call \`mergeExamples()\` with entity records to build the array again.
 *
 * @returns void
 */
export function resetExamples(): void {
  exampleCell.reset();
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
    'src/app/ExampleView.tsx': `import { useState } from 'react';
import {
  Example,
  exampleCell,
  deleteExamples,
  mergeExamples,
  resetExamples
} from './example.cell';
import './ExampleView.css';

/** Entity records used to demonstrate ID-based updates, additions, and deletion. */
const sample: Example[] = [
  { id: 66, name: 'Darth', lastName: 'Vader' },
  { id: 38, name: 'Padme', lastName: 'Naberrie' },
  { id: 9, name: 'Han', lastName: 'Solo' }
];

/**
 * Root component for the array-by-ID merge example.
 *
 * Subscribes to the FeatureCell state observable and re-renders whenever
 * the pipeline commits a new snapshot. Each merge updates the matching Darth
 * record and adds Padme and Han; the delete action removes Han by ID.
 * The component does NOT mutate state directly — all updates are delegated
 * to the cell module to preserve the service boundary pattern.
 *
 * @returns The rendered React example view.
 */
export function ExampleView() {
  const snapshot = exampleCell.useSyncExternalStore();
  const [activeStateHint, setActiveStateHint] = useState(
    'initialState seeded on initialize() — click Merge Sample Data to update or add records.'
  );
  const [displayActiveStateHint, setDisplayActiveStateHint] = useState(true);

  /**
   * Delegates an ID-based entity merge to the FeatureCell cell module.
   *
   * Calls \`mergeExamples\`, which passes the sample records through the
   * \`withArrayByIdMergeBehavior\`. Darth is updated by ID, while Padme and Han
   * are added, triggering a reactive UI refresh.
   *
   * @returns void
   */
  function loadSample() {
    setDisplayActiveStateHint(false);
    setActiveStateHint(
      'Sample data merged — Darth was updated while Padme and Han were added.'
    );
    mergeExamples(sample);
  }

  /**
   * Removes Han by sending his record to the cell with the delete option.
   *
   * The configured behavior matches Han's \`id\` and removes only that entity,
   * leaving the other records in the current state unchanged.
   *
   * @returns void
   */
  function deleteHan() {
    setDisplayActiveStateHint(false);
    setActiveStateHint('Han was removed by ID using the delete option.');
    deleteExamples([sample[2]]);
  }

  /**
   * Clears the FeatureCell state to \`undefined\` by calling \`resetExamples\`.
   * This does NOT restore the \`initialState\` — to rebuild the list, use the
   * merge flow instead.
   *
   * @returns void
   */
  function handleResetState() {
    resetExamples();
  }

  return (
    <div className="example-container">
      <div className="header">
        <div className="title">
          React - SDuX Vault Array By ID Merge Example
        </div>
        <div className="subtitle">
          This example demonstrates mergeState with the
          withArrayByIdMergeBehavior. Each merge compares incoming records by
          their <code>id</code>, updating matching entries and adding new ones.
          Delete Han removes the record with ID 9 without affecting the others.
        </div>
      </div>

      <div className="section">
        <div className="label">FeatureCell Flow</div>
        <div className="flow-hint">Input → Output</div>
      </div>

      <div className="section column">
        <div className="state-container">
          <div className="label">Input State</div>
          <div className="hint">Raw data before processing</div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/ExampleView.tsx
          </div>
          <textarea
            className="data-textarea"
            readOnly
            defaultValue={JSON.stringify(sample, null, 2)}
          />
        </div>

        <div className="state-container data-row">
          <div className="label">FeatureCell State</div>
          <div className="hint">Final state</div>
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
            Merge Sample Data
          </button>

          <button className="sdux-button warn" onClick={deleteHan}>
            Delete Han
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
            href="https://www.sdux-vault.com/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
            target="_blank"
            rel="noopener noreferrer">
            withArrayByIdMerge Behavior
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/merge"
            target="_blank"
            rel="noopener noreferrer">
            Merging State
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

.warn {
  background-color: #d32f2f !important;
  border-color: #b71c1c !important;
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
