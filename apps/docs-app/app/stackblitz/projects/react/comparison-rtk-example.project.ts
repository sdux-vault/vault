import { Project } from '@stackblitz/sdk';

export const comparisonRtkExampleProject: Project = {
  title: 'react-redux-v2-example',
  template: 'node',
  files: {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React RTK Query Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'package.json': `{
  "name": "react-redux-v2-example",
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
    "@reduxjs/toolkit": "latest",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-redux": "latest"
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
    'src/employee.actions.ts': `import { employeeApi, prepareEmployees } from './employee.api';
import type { Employee } from './employee.model';
import { store } from './store';

/**
 * Replaces the cached collection after applying the same filter and sort transformation used by the remote response.
 *
 * @param employees Records to transform and place in the employee query cache.
 * @returns Nothing; subscribed query state updates from the cache write.
 */
export function replaceEmployees(employees: Employee[]): void {
  store.dispatch(
    employeeApi.util.upsertQueryData(
      'getEmployees',
      undefined,
      prepareEmployees(employees)
    )
  );
}

/**
 * Starts a fresh employee request through the RTK Query endpoint.
 *
 * @returns Nothing; the subscribed query state reports the request lifecycle.
 */
export function replaceEmployeesAsync(): void {
  void store.dispatch(
    employeeApi.endpoints.getEmployees.initiate(undefined, {
      forceRefetch: true,
      subscribe: false
    })
  );
}

/**
 * Clears the employee query cache so the view returns to its initial state.
 *
 * @returns Nothing; subscribed query state updates after the cache reset.
 */
export function resetEmployees(): void {
  store.dispatch(employeeApi.util.resetApiState());
}
`,
    'src/employee.api.ts': `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Employee } from './employee.model';

export const prepareEmployees = (employees: Employee[]): Employee[] => {
  return employees
    .filter((employee) => employee.id % 2 !== 0)
    .sort((left, right) => left.name.localeCompare(right.name));
};

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (build) => ({
    getEmployees: build.query<Employee[], void>({
      query: () => 'users',
      transformResponse: prepareEmployees
    })
  })
});

export const useGetEmployeesState =
  employeeApi.endpoints.getEmployees.useQueryState;
`,
    'src/employee.model.ts': `export interface Employee {
  id: number;
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
  height: 200px;
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
  replaceEmployees,
  replaceEmployeesAsync,
  resetEmployees
} from './employee.actions';
import { useGetEmployeesState } from './employee.api';
import type { Employee } from './employee.model';
import './ExampleView.css';

/** Supplies records for the synchronous replacement path so the query cache can demonstrate its transformation pipeline. */
const sample: Employee[] = [
  { id: 11, name: 'Luke' },
  { id: 38, name: 'Leia' },
  { id: 9, name: 'Han' }
];

/** Renders the query state and exposes the three state transitions demonstrated by this comparison example. */
export function ExampleView() {
  const snapshot = useGetEmployeesState();

  /** Sends the sample records through the filtering and sorting transformation before displaying them. */
  const loadSample = () => {
    replaceEmployees(sample);
  };

  /** Starts the remote request and lets the query state expose loading, success, or error results. */
  const loadSampleAsync = () => {
    replaceEmployeesAsync();
  };

  /** Clears the query cache and returns the displayed collection to its initial state. */
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
            value={JSON.stringify(snapshot.data ?? [], null, 2)}
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
import { Provider } from 'react-redux';
import { ExampleView } from './ExampleView';
import { store } from './store';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ExampleView />
    </Provider>
  </StrictMode>
);
`,
    'src/store.ts': `import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeeApi } from './employee.api';

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
`,
    'src/styles.css': `body {
  margin: 0;
  font-family: Arial, sans-serif;
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
