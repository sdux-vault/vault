import { Project } from '@stackblitz/sdk';

export const basicFilterReducerExampleProject: Project = {
  title: 'react-basic-filter-reducer-example',
  template: 'node',
  files: {
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
  "name": "react-basic-filter-reducer-example",
  "version": "1.0.1",
  "private": true,
  "type": "module",
  "scripts": {
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
    'src/app/ExampleView.tsx': `import { useEffect, useState } from 'react';
import {
  Example,
  exampleState,
  exampleState\$,
  replaceExamples,
  resetExamples,
  toggleError,
  toggleLoading
} from './example.cell';
import './ExampleView.css';

const sample: Example[] = [
  { id: 11, name: 'Luke', lastName: 'Skywalker' },
  { id: 38, name: 'Leia', lastName: 'Organa' },
  { id: 9, name: 'Han', lastName: 'Solo' }
];

/** Renders the FeatureCell state example with filter and reducer pipeline visualization. */
export function ExampleView() {
  const [snapshot, setSnapshot] = useState({
    value: exampleState.value,
    isLoading: exampleState.isLoading,
    error: exampleState.error,
    hasValue: exampleState.hasValue
  });
  const [activeStateHint, setActiveStateHint] = useState(
    'Initial value is [] (empty array)'
  );
  const [displayActiveStateHint, setDisplayActiveStateHint] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sub = exampleState\$.subscribe((emit) => {
      setSnapshot({
        value: emit.snapshot.value,
        isLoading: emit.snapshot.isLoading,
        error: emit.snapshot.error,
        hasValue: emit.snapshot.hasValue
      });
    });
    return () => sub.unsubscribe();
  }, []);

  const hasError = snapshot.error !== null;

  /** Loads sample data into the FeatureCell pipeline. */
  function loadSample() {
    setDisplayActiveStateHint(false);
    setActiveStateHint(
      'State updated with sample data after filters and reducers run.'
    );
    replaceExamples(sample);
  }

  /** Resets the FeatureCell state to its initial value. */
  function handleResetState() {
    resetExamples();
  }

  /** Toggles the loading flag on the current state. */
  function handleToggleLoading() {
    const next = !isLoading;
    setIsLoading(next);
    toggleLoading(next);
  }

  /** Toggles the error state between an Error instance and null. */
  function handleToggleError() {
    const error = hasError ? null : new Error('Example error message');
    toggleError(error);
  }

  return (
    <div className="example-container">
      <div className="header">
        <div className="title">
          React - SDuX Vault Filter and Reducer Example
        </div>
        <div className="subtitle">
          This example shows how SDuX processes state through a pipeline: input
          data flows through filters and reducers before becoming the final
          FeatureCell state.
        </div>
      </div>

      <div className="section">
        <div className="label">FeatureCell Flow</div>
        <div className="flow-hint">Input → Filter → Reducer → Output</div>
      </div>

      <div className="section column">
        <div className="state-container">
          <div className="label">Filter</div>
          <div className="hint">
            Removes or blocks data before it enters the pipeline
          </div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/example.cell.ts
          </div>
          <textarea
            className="textarea"
            readOnly
            defaultValue={\`[
  (examples: Example[]) => {

    return examples.filter(
      (example: Example) => example.name !== 'Han'
    );
  }
]\`}
          />
        </div>

        <div className="state-container">
          <div className="label">Reducer</div>
          <div className="hint">Transforms each item in the state</div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/example.cell.ts
          </div>
          <textarea
            className="textarea"
            readOnly
            defaultValue={\`[
  (examples: Example[]) => {
    return examples.map((example: Example) => {
      if (example.id === 11) {
        return { ...example, jedi: true };
      }
      return example;
    });
  }
]\`}
          />
        </div>
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
          <div className="hint">Final state after filters and reducers run</div>
          <div className="hint file">
            <span className="emphasis">File:</span> app/example.cell.ts
          </div>
          {snapshot.isLoading ? (
            <div className="status">Loading...</div>
          ) : snapshot.error ? (
            <>
              <textarea
                className="data-textarea error"
                readOnly
                value={JSON.stringify(snapshot.error, null, 2)}
              />
              <div className="hint state">This is a VaultError display</div>
            </>
          ) : snapshot.hasValue ? (
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
                no active value, error or loading status.
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
            Load Sample State
          </button>

          <div className="secondary-actions">
            <button className="sdux-button" onClick={handleResetState}>
              Reset State
            </button>
            <button className="sdux-button" onClick={handleToggleLoading}>
              Loading ({String(snapshot.isLoading)})
            </button>
            <button className="sdux-button" onClick={handleToggleError}>
              Error ({String(hasError)})
            </button>
          </div>
        </div>
      </div>

      <div className="section learn-more">
        <div className="label">Learn More</div>
        <div className="learn-more-links">
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/filters"
            target="_blank"
            rel="noopener noreferrer">
            Filters
          </a>
          <span className="separator">·</span>
          <a
            href="https://www.sdux-vault.com/docs/pipeline/behaviors/reducers"
            target="_blank"
            rel="noopener noreferrer">
            Reducers
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
    'src/app/example.cell.ts': `import { FeatureCell, Vault } from '@sdux-vault/core';

export interface Example {
  id: number;
  name: string;
  lastName: string;
  jedi?: boolean;
  senator?: boolean;
}

// Initialize the Vault once at application startup
Vault({ logLevel: 'off' });

// Register the FeatureCell at module scope
const exampleCell = FeatureCell<Example[]>({
  key: 'example-feature-cell-key',
  initialState: []
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
    'src/vite-env.d.ts': `declare module '*.css';
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
