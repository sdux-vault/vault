import { Project } from '@stackblitz/sdk';

export const hydrateStateExampleProject: Project = {
  title: 'react-hydrate-state-example',
  template: 'node',
  files: {
    'dist/assets/index-D6AsyO4-.css': `.example-container{display:flex;flex-direction:column;gap:.75rem;padding:1rem}.header{display:flex;flex-direction:column;gap:.25rem}.title{font-size:2rem;font-weight:600;letter-spacing:.3px}.subtitle{font-size:1rem;color:#666;max-width:600px}.section{padding:1rem}.section.column{border:1px solid rgba(0,0,0,.08);border-radius:8px;display:flex;gap:.75rem}@media(max-width:768px){.section.column{flex-direction:column}.section.column .state-container{width:100%}}.state-container{flex:1;display:flex;flex-direction:column;gap:.35rem;min-width:0}.state-container.data-row{height:430px}.textarea,.data-textarea{width:100%;box-sizing:border-box;height:300px;padding:.5rem;border:1px solid rgba(0,0,0,.08);border-radius:6px;font-family:monospace;font-size:.8rem;background:#fafafa;color:#222}.data-textarea.error{color:#d33}.textarea{height:175px}.label{font-size:1.1rem;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#666}.flow-hint{margin-top:.25rem;font-size:1rem;letter-spacing:.3px;color:#666;font-family:monospace}.hint{font-size:1rem;color:#777;margin-top:-.15rem;margin-left:.5rem}.hint.file{min-height:16px;color:#999;font-family:monospace;font-size:.9rem}.hint.state{margin-top:.15rem}.emphasis{font-weight:600;color:#555}.actions{justify-content:flex-start;display:flex;align-items:center;gap:3rem}@media(max-width:768px){.actions{flex-direction:column;align-items:flex-start;gap:2rem}}.secondary-actions{display:flex;gap:2rem}@media(max-width:768px){.secondary-actions{gap:1.5rem;flex-direction:column;align-items:flex-start}}.status{height:300px;font-size:.85rem;color:#666;display:flex;align-items:center;justify-content:center}.learn-more{display:flex;flex-direction:column;gap:.35rem}.learn-more-links{display:flex;align-items:center;gap:.75rem;font-size:1rem}.learn-more-links a{color:#555;text-decoration:none}.learn-more-links a:hover{text-decoration:underline;color:#222}.learn-more-links .separator{color:#ccc}.example-container{padding:.25rem;display:flex;flex-direction:column;gap:.25rem}.sdux-button{height:40px;color:#fff;background-color:#1976d2;border:1px solid #004ba0;border-radius:.3125rem;font-size:.875rem;padding:.5rem;gap:.25rem;font-weight:600;min-width:125px;display:flex;flex-direction:row;justify-content:center;align-items:center;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`,
    'dist/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX React Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" crossorigin src="/assets/index-CAoD3njc.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-D6AsyO4-.css">
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
  "name": "react-hydrate-state-example",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "npm run dev",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
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
`,
    'src/app/ExampleView.tsx': `import { useState } from 'react';
import {
  Example,
  exampleCell,
  replaceExamples,
  resetExamples
} from './example.cell';
import './ExampleView.css';

/** Supplies a contrasting dataset used to replace the hydrated value. */
const sample: Example[] = [
  { id: 11, name: 'Luke', lastName: 'Skywalker' },
  { id: 38, name: 'Leia', lastName: 'Organa' },
  { id: 9, name: 'Han', lastName: 'Solo' }
];

/**
 * Renders the value produced by the cell's deferred hydration factory.
 * The component subscribes through \`useSyncExternalStore()\` and lets the reader
 * replace or clear that value after initialization. State changes are delegated
 * to the cell module so rendering stays separate from pipeline ownership.
 * @returns The React interface for exploring hydrated state.
 */
export function ExampleView() {
  /**
   * Subscribes React to the FeatureCell and exposes its current immutable snapshot.
   * Changes to the hydrated value cause React to render the latest state.
   */
  const snapshot = exampleCell.useSyncExternalStore();

  /** Describes whether the visible value came from hydration or a later update. */
  const [activeStateHint, setActiveStateHint] = useState(
    'hydrate() factory resolved during initialize().'
  );

  /** Controls whether the view identifies the hydrated value's source file. */
  const [displayActiveStateHint, setDisplayActiveStateHint] = useState(true);

  /**
   * Replaces the hydrated value with the sample dataset through the cell module.
   * The button click updates the pipeline and the external-store subscription
   * refreshes this component with the next snapshot.
   * @returns void
   */
  function loadSample() {
    setDisplayActiveStateHint(false);
    setActiveStateHint('State updated with sample data.');
    replaceExamples(sample);
  }

  /**
   * Clears the current value without running the hydration factory again.
   * Hydration belongs to initialization, so reset leaves the FeatureCell empty.
   * @returns void
   */
  function handleResetState() {
    resetExamples();
  }

  return (
    <div className="example-container">
      <div className="header">
        <div className="title">React - SDuX Vault Hydrate State Example</div>
        <div className="subtitle">
          This example demonstrates hydrate() — a deferred factory supplies the
          authoritative initial FeatureCell value when initialize() runs. The
          resolved value then travels through the normal state pipeline.
        </div>
      </div>

      <div className="section">
        <div className="label">FeatureCell Flow</div>
        <div className="flow-hint">
          Deferred factory → initialize() → pipeline → reactive state
        </div>
      </div>

      <div className="section column">
        <div className="state-container">
          <div className="label">Next State</div>
          <div className="hint">
            Sample data for a later replaceState() update
          </div>
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
          <div className="label">Hydrated FeatureCell State</div>
          <div className="hint">Factory result after initialization</div>
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
            Replace Hydrated State
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
            href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/hydrate-method"
            target="_blank"
            rel="noopener noreferrer">
            hydrate()
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/initialize-method"
            target="_blank"
            rel="noopener noreferrer">
            initialize()
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/apis/provide-feature-cell"
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
    'src/app/example.cell.ts': `import { FeatureCell, Vault } from '@sdux-vault/react';

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
 * \`initialize()\` supplies the authoritative initial value. React components read
 * the resulting snapshot through \`useSyncExternalStore()\` while mutation functions
 * in this module keep pipeline access in one place.
 */
export const exampleCell = FeatureCell<Example[] | undefined>({
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
    'src/main.tsx': `/**
 * Mounts the hydrate example as the root React application.
 * StrictMode wraps ExampleView while the cell module owns Vault initialization.
 */
import { StrictMode } from 'react';
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
