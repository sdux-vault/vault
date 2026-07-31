import { Project } from '@stackblitz/sdk';

export const comparisonExampleProject: Project = {
  title: 'react-comparison-example',
  template: 'node',
  files: {
    'dist/assets/index-CxTEQTeM.css': `.example-container{flex-direction:column;gap:.75rem;width:800px;padding:1rem;display:flex}.textarea{box-sizing:border-box;color:#222;background:#fafafa;border:1px solid #00000014;border-radius:6px;width:100%;height:175px;padding:.5rem;font-family:monospace;font-size:.8rem}.actions{justify-content:flex-start;align-items:center;gap:3rem;display:flex}@media (width<=768px){.example-container{width:auto}.actions{flex-direction:column;align-items:flex-start;gap:2rem}}.example-container{flex-direction:column;gap:.25rem;padding:.25rem;display:flex}.sdux-button{color:#fff;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;background-color:#1976d2;border:1px solid #004ba0;border-radius:.3125rem;flex-direction:row;justify-content:center;align-items:center;gap:.25rem;min-width:125px;height:40px;padding:.5rem;font-size:.875rem;font-weight:600;display:flex;overflow:hidden}
`,
    'dist/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX React Comparison Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module" crossorigin src="/assets/index-rOG6hr_Q.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CxTEQTeM.css">
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
    <title>SDuX React Comparison Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "react-comparison-example",
  "version": "2.0.0",
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
    'src/employee.cell.ts': `import { FeatureCell, Vault } from '@sdux-vault/react';
import { Employee } from './employee.model';

Vault({
  logLevel: 'off'
});

/**
 * Holds employee state and exposes the fluent pipeline used by this example.
 * The filter removes even identifiers, and the reducer sorts the remaining
 * records by name before the cell publishes the processed array.
 *
 * ⚠️ Architectural Boundary:
 * State updates are routed through the exported functions below so consumers
 * use the configured cell rather than mutating state directly.
 */
export const employeeCell = FeatureCell<Employee[]>({
  key: 'employees',
  initialState: []
});

employeeCell
  .filters([
    (examples: Employee[]) => examples.filter((example) => example.id % 2 !== 0)
  ])
  .reducers([
    (examples: Employee[]) => {
      examples.sort((left, right) => left.name.localeCompare(right.name));
      return examples;
    }
  ])
  .initialize();

/**
 * Replaces the current employee state and sends it through the pipeline.
 *
 * @param employees - Records to filter, sort, and publish as state.
 * @returns Nothing; consumers observe the result through the FeatureCell snapshot.
 */
export function replaceEmployees(employees: Employee[]): void {
  employeeCell.replaceState({
    value: employees
  });
}

/**
 * Starts an asynchronous employee-state update from the example API.
 *
 * @returns Nothing; the snapshot reports loading, success, or error state.
 */
export function replaceEmployeesAsync(): void {
  employeeCell.replaceState({
    value: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
        response.json()
      )
  });
}

/**
 * Restores the FeatureCell's configured empty-array state.
 *
 * @returns Nothing; consumers observe the reset through the cell snapshot.
 */
export function resetEmployees(): void {
  employeeCell.reset();
}
`,
    'src/employee.model.ts': `/**
 * Describes the employee records stored in the FeatureCell array. The pipeline
 * uses the identifier for filtering and the name for alphabetical sorting.
 */
export interface Employee {
  /** Identifies the employee and determines whether the filter keeps it. */
  id: number;

  /** Supplies the employee name used by the sorting reducer. */
  name: string;
}
`,
    'src/ExampleView.css': `.example-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  width: 800px;
}

.textarea {
  width: 100%;
  box-sizing: border-box;
  height: 175px;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  background: #fafafa;
  color: #222;
}

.actions {
  justify-content: flex-start;
  display: flex;
  align-items: center;
  gap: 3rem;
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

@media (max-width: 768px) {
  .example-container {
    width: auto;
  }

  .actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}
`,
    'src/ExampleView.tsx': `import {
  employeeCell,
  replaceEmployees,
  replaceEmployeesAsync,
  resetEmployees
} from './employee.cell';
import { Employee } from './employee.model';
import './ExampleView.css';

/** Records used to demonstrate filtering and alphabetical reduction. */
const sample: Employee[] = [
  { id: 11, name: 'Luke' },
  { id: 38, name: 'Leia' },
  { id: 9, name: 'Han' }
];

/**
 * Renders the employee snapshot and provides controls for the three state
 * transitions demonstrated by the example: replacement, async loading, and reset.
 *
 * @returns The interactive React view for the comparison example.
 */
export function ExampleView() {
  /** Reactive snapshot exposed by the FeatureCell's external-store hook. */
  const snapshot = employeeCell.useSyncExternalStore();

  /**
   * Sends the sample records through the configured filter and reducer stages.
   *
   * @returns Nothing; the subscribed snapshot updates after the state change.
   */
  const loadSample = () => {
    replaceEmployees(sample);
  };

  /**
   * Requests employee data through the asynchronous FeatureCell update.
   *
   * @returns Nothing; the snapshot reflects loading and settlement state.
   */
  const loadSampleAsync = () => {
    replaceEmployeesAsync();
  };

  /**
   * Restores the FeatureCell to its initial empty-array state.
   *
   * @returns Nothing; the subscribed snapshot reflects the reset.
   */
  const resetState = () => {
    resetEmployees();
  };

  return (
    <div className="example-container">
      A few changes to this React example from the original comparison example:
      <ol>
        <li>CSS styling</li>
        <li>
          Async fetch changed to "https://jsonplaceholder.typicode.com/users".
          Note: The live API causes a flash in the UI when the "Load Async
          State" button is clicked because there is a "Loading..." message
          displayed while the data is resolving. The API is too responsive to
          allow for reading the message.
        </li>
      </ol>
      <div>
        {snapshot.isLoading ? (
          <div>Loading...</div>
        ) : snapshot.error ? (
          <div>{String(snapshot.error)}</div>
        ) : (
          <textarea
            className="textarea"
            readOnly
            value={JSON.stringify(snapshot.value ?? [], null, 2)}
          />
        )}
      </div>
      <div className="actions">
        <button type="button" className="sdux-button" onClick={loadSample}>
          Load Sample State
        </button>

        <button type="button" className="sdux-button" onClick={loadSampleAsync}>
          Load Async State
        </button>

        <button type="button" className="sdux-button" onClick={resetState}>
          Reset State
        </button>
      </div>
    </div>
  );
}
`,
    'src/main.tsx': `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ExampleView } from './ExampleView';
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
