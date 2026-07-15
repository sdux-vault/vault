import { Project } from '@stackblitz/sdk';

export const promiseExampleProject: Project = {
  title: 'bun-promise-example',
  template: 'node',
  files: {
    'README.md': `# SDuX Vault Bun Promise Example

A server demonstrating async promise resolution with deterministic pipeline execution using SDuX Vault on Bun.

## What This Example Shows

- **Async State Management**: Loading data from async APIs
- **Deterministic Async**: Each write awaits the next committed \`state\$\` emission
- **Error Handling**: Graceful error handling with state updates
- **Pure State Derivation**: A pure reducer recomputes derived totals after each committed snapshot
- **Concurrent Loading**: Load multiple users in parallel, state settles predictably

## The Queue Is the Architecture

State management in a server only works reliably when two conditions are met:

1. **A serializing queue** — every write enters a single ordered execution path
2. **A long-lived singleton** — the cell outlives any individual request

This server satisfies both. The \`usersCell\` is a module-level singleton created once at startup. Every \`replaceState()\` call enters the SDuX Vault conductor queue, which serializes all pipeline writes in FIFO order. The queue is the correctness mechanism — not the application code around it.

Async state management is hard in any system because promises introduce concurrency gaps. The SDuX pipeline handles async inputs natively by resolving them inside the queue boundary. This example demonstrates how to work _with_ that model: commit state, await the resulting \`state\$\` emission, then proceed.

> **Community note**: If you want to take this further, move state derivation entirely into reducers so it runs under the queue's serialization guarantee. That closes the read-modify-write window that exists when application code reads \`cell.state.value\` before calling \`replaceState()\`. That's a great first contribution.

## Quick Start

\`\`\`bash
bun install
bun start
\`\`\`

Server starts at \`http://localhost:3000\`

## API Endpoints

### GET /state

Get the current users domain value from \`snapshot.value\` (including loading status for each user)

\`\`\`bash
curl http://localhost:3000/state
\`\`\`

Response:

\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "User 1",
      "email": "user1@example.com",
      "status": "loaded"
    }
  ],
  "totalLoaded": 1,
  "lastRefresh": "2026-07-09T12:34:56.789Z"
}
\`\`\`

### POST /load/:id

Load a single user by ID (simulates 500-1000ms API delay)

\`\`\`bash
# Load user 1
curl -X POST http://localhost:3000/load/1

# Check state again
curl http://localhost:3000/state
\`\`\`

User progresses through states:

1. \`loading\` — added to collection
2. \`loaded\` — data received from API
3. \`error\` — if API fails (e.g., user ID 999)

### POST /load-batch

Load multiple users concurrently. The request body must include \`userIds\` as an array of positive integers. Duplicate IDs are deduplicated in first-seen order.

\`\`\`bash
curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"userIds": [1, 2, 3, 4, 5]}' \\
  http://localhost:3000/load-batch
\`\`\`

All users load in parallel, but the batch path first commits one loading snapshot so every requested user is visible before the async work resolves. After each committed emission, the pure reducer recomputes:

1. Count of loaded users

### POST /clear

Clear all users

\`\`\`bash
curl -X POST http://localhost:3000/clear
\`\`\`

## How It Works

### The Commit → Emission Pattern for Async

\`\`\`typescript
async function loadUser(
  cell: FeatureCell<UsersState>,
  userId: number
): Promise<UsersState> {
  await commitUsersState(cell, {
    ...getUsersValue(cell),
    users: [...getUsersValue(cell).users, { id: userId, status: 'loading' }]
  });

  try {
    const userData = await loadUserFromAPI(userId);

    return commitUsersState(cell, {
      ...getUsersValue(cell),
      users: getUsersValue(cell).users.map((u) =>
        u.id === userId ? { ...u, ...userData } : u
      )
    });
  } catch (error) {
    return commitUsersState(cell, {
      ...getUsersValue(cell),
      users: getUsersValue(cell).users.map((u) =>
        u.id === userId
          ? { ...u, status: 'error', errorMessage: String(error) }
          : u
      )
    });
  }
}
\`\`\`

### Reducer Composition

The example keeps reducers pure by deriving totals only:

\`\`\`typescript
cell.reducers([
  // Reducer 1: Count loaded users
  (current) => ({
    ...current,
    totalLoaded: current.users.filter((u) => u.status === 'loaded').length
  })
]);
\`\`\`

\`lastRefresh\` is stamped in the request helper before each \`replaceState()\` call so the reducer stays side-effect free.

## Why This Pattern Works

1. **Async waits for committed emissions**: each update awaits the next \`state\$\` emission before continuing
2. **Reducers stay pure**: Derived totals come from the committed collection, while timestamps are stamped before pipeline entry
3. **Deterministic outcome**: Same sequence of API calls always produces the same final state
4. **No lost updates**: Concurrent user loads merge against the latest committed collection so parallel requests keep every user
5. **Visible batch startup**: Batch requests commit one loading snapshot before parallel API work begins
6. **Duplicate-safe batches**: Repeated IDs do not trigger redundant loads or duplicate records in state

## Try It Live

Terminal 1:

\`\`\`bash
bun start
\`\`\`

Terminal 2:

\`\`\`bash
# Initial state
curl http://localhost:3000/state

# Load one user
curl -X POST http://localhost:3000/load/1

# Check state — user is now loaded, totalLoaded=1
curl http://localhost:3000/state

# Load batch of users
curl -X POST -H "Content-Type: application/json" \\
  -d '{"userIds": [2, 3, 4]}' \\
  http://localhost:3000/load-batch

# All loaded, state is deterministic
curl http://localhost:3000/state

# Test error handling (user 999 will fail)
curl -X POST http://localhost:3000/load/999

# State shows error with message
curl http://localhost:3000/state

# Clear and start over
curl -X POST http://localhost:3000/clear
curl http://localhost:3000/state
\`\`\`

## The Queue Is the Architecture

State management in a server only works reliably when two conditions are met:

1. **A serializing queue** — every write enters a single ordered execution path
2. **A long-lived singleton** — the cell outlives any individual request

This server satisfies both. The \`usersCell\` is a module-level singleton created once at startup. Every \`replaceState()\` call enters the SDuX Vault conductor queue, which serializes all pipeline writes in FIFO order. The queue is the correctness mechanism — not the application code around it.

Async state management is hard in any system because promises introduce concurrency gaps. The SDuX pipeline handles async inputs natively by resolving them inside the queue boundary. This example demonstrates how to work _with_ that model: commit state, await the resulting \`state\$\` emission, then proceed.

> **Community note**: If you want to take this further, move state derivation entirely into reducers so it runs under the queue's serialization guarantee. That closes the read-modify-write window that exists when application code reads \`cell.state.value\` before calling \`replaceState()\`. That's a great first contribution.

## Development Mode

\`\`\`bash
bun --watch src/main.ts
\`\`\`

Server auto-restarts on file changes.
`,
    'package.json': `{
  "name": "bun-promise-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "bun src/main.ts",
    "dev": "bun --watch src/main.ts",
    "test": "bun test"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
    "rxjs": "^7.8.2"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "~5.9.2"
  }
}
`,
    'src/main.ts': `declare const Bun: {
  serve(options: {
    port: number;
    fetch(request: Request): Response | Promise<Response>;
  }): unknown;
};

import { clearUsers, createUsersCell, loadUser, loadUsers } from './state';

/**
 * HTTP server demonstrating async promise resolution with SDuX Vault
 *
 * Endpoints:
 * GET  /state         — Get current users state
 * POST /load/:id      — Load a single user by ID
 * POST /load-batch    — Load multiple users (send JSON array: {"userIds": [1,2,3]})
 * POST /clear         — Clear all users
 */

const PORT = 3000;
const usersCell = createUsersCell();

/**
 * Returns the current committed users domain value from \`snapshot.value\`.
 * The full SDuX Vault snapshot wrapper is stripped so HTTP clients receive
 * only the domain data they need.
 *
 * @returns The current \`UsersState\`, or \`undefined\` if no commit has occurred.
 */
function getUsersResponse() {
  return usersCell.state.value;
}

/**
 * Validates that a given value is a positive integer. Used by the batch
 * body type guard to verify each element in the \`userIds\` array before
 * the server dispatches parallel load operations.
 *
 * @param value - The value to check.
 * @returns \`true\` when \`value\` is an integer greater than zero.
 */
function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

/**
 * Type guard that validates the shape of the POST /load-batch request body.
 * Ensures the \`userIds\` field is present and contains only positive integers
 * before the server attempts concurrent user loads.
 *
 * @param body - The raw parsed JSON value from the request.
 * @returns \`true\` when \`body\` is a valid batch load payload.
 */
function isLoadBatchBody(body: unknown): body is { userIds: number[] } {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    Array.isArray(payload.userIds) &&
    payload.userIds.every((userId) => isPositiveInteger(userId))
  );
}

const _server = Bun.serve({
  port: PORT,
  async fetch(request: Request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // GET /state — Return current users state
      if (pathname === '/state' && request.method === 'GET') {
        return new Response(JSON.stringify(getUsersResponse(), null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /load/:id — Load a single user
      const loadMatch = pathname.match(/^\\/load\\/(\\d+)\$/);
      if (loadMatch && request.method === 'POST') {
        const userId = parseInt(loadMatch[1], 10);
        const newState = await loadUser(usersCell, userId);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /load-batch — Load multiple users
      if (pathname === '/load-batch' && request.method === 'POST') {
        const body = await request.json();

        if (!isLoadBatchBody(body)) {
          return new Response(
            JSON.stringify({
              error: 'Bad Request',
              message:
                'POST /load-batch requires a JSON body with userIds as an array of positive integers.'
            }),
            {
              status: 400,
              headers: corsHeaders
            }
          );
        }

        const userIds = body.userIds;
        const newState = await loadUsers(usersCell, userIds);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /clear — Clear all users
      if (pathname === '/clear' && request.method === 'POST') {
        const newState = await clearUsers(usersCell);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // GET / — Health check with instructions
      if (pathname === '/' && request.method === 'GET') {
        return new Response(
          JSON.stringify(
            {
              message: 'SDuX Vault Bun Promise Example',
              description:
                'Demonstrates async promise resolution with deterministic pipeline',
              endpoints: {
                'GET /state': 'Get current users state',
                'POST /load/:id':
                  'Load a single user by ID (simulates 500-1000ms API delay)',
                'POST /load-batch':
                  'Load multiple users concurrently (send JSON: {"userIds": [1,2,3]}; duplicate IDs are ignored)',
                'POST /clear': 'Clear all users'
              },
              examples: {
                get_state: 'curl http://localhost:3000/state',
                load_single: 'curl -X POST http://localhost:3000/load/1',
                load_batch:
                  'curl -X POST -H "Content-Type: application/json" -d \\'{"userIds": [1,2,3]}\\' http://localhost:3000/load-batch',
                load_error: 'curl -X POST http://localhost:3000/load/999',
                clear: 'curl -X POST http://localhost:3000/clear'
              },
              notes: {
                determinism:
                  'Each API call commits one snapshot, then a pure reducer recomputes totalLoaded from the committed users collection',
                settlement:
                  'Each write awaits the next state\$ emission to observe the committed snapshot',
                batch_validation:
                  'POST /load-batch requires userIds to be an array of positive integers',
                batch_loading:
                  'POST /load-batch commits one loading snapshot up front so every requested user is visible before parallel API work completes',
                errors:
                  'User ID 999 will simulate an error; you can observe the error handling in the returned state'
              },
              responses: {
                state_endpoint:
                  'GET /state returns the current domain value from snapshot.value, not the full SDuX Vault snapshot wrapper'
              }
            },
            null,
            2
          ),
          {
            status: 200,
            headers: corsHeaders
          }
        );
      }

      // 404 Not Found
      return new Response(
        JSON.stringify({ error: 'Not Found', path: pathname }),
        {
          status: 404,
          headers: corsHeaders
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: String(error)
        }),
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
});

console.info(\`✅ Server running at http://localhost:\${PORT}\`);
console.info(\`📝 Try: curl http://localhost:\${PORT}\`);
console.info(\`⚡ Load a user: curl -X POST http://localhost:\${PORT}/load/1\`);
console.info(
  \`📦 Load batch: curl -X POST -H "Content-Type: application/json" -d '{"userIds": [1,2,3]}' http://localhost:\${PORT}/load-batch\`
);
`,
    'src/state.ts': `import { FeatureCell } from '@sdux-vault/core';
import { firstValueFrom } from 'rxjs';
import { skip } from 'rxjs/operators';

/**
 * Represents a single user entry in the collection. The \`status\` field
 * tracks the user through the async loading lifecycle so the UI — or in
 * this case the HTTP client — can observe progress at each committed stage.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  status: 'loading' | 'loaded' | 'error';
  errorMessage?: string;
}

/**
 * Defines the domain state managed by the users FeatureCell. The collection
 * holds all loaded users while \`totalLoaded\` and \`lastRefresh\` are derived
 * values recomputed by the reducer after each committed snapshot.
 */
export interface UsersState {
  users: User[];
  totalLoaded: number;
  lastRefresh: string;
}

/**
 * Narrows the shape of each emission from \`state\$\` to the fields this
 * example reads. The \`snapshot.value\` property holds the fully committed
 * domain value after the pipeline has finished processing.
 */
interface UsersStateEmit {
  snapshot: {
    value: UsersState | undefined;
  };
}

/**
 * Convenience alias for the return type of \`createUsersCell\`. Lets helper
 * functions accept the live cell instance without importing a separate type.
 */
type UsersCell = ReturnType<typeof createUsersCell>;

/**
 * Constructs a placeholder \`User\` entry in the \`loading\` status. This record
 * is committed to state before the async API call begins so observers see the
 * user appear immediately rather than only after the network round-trip.
 *
 * @param userId - The numeric ID of the user being loaded.
 * @returns A \`User\` object with \`status: 'loading'\` and an empty email.
 */
function createLoadingUser(userId: number): User {
  return {
    id: userId,
    name: \`User \${userId}\`,
    email: '',
    status: 'loading'
  };
}

/**
 * Performs an immutable insert-or-replace of a user in the collection.
 * Matching is done by \`id\`; if no entry exists the user is appended.
 * This ensures concurrent writes each read the latest committed array
 * and apply their update without losing entries added by other requests.
 *
 * @param users - The current committed users array.
 * @param nextUser - The user record to insert or replace.
 * @returns A new array with the user inserted or updated in place.
 */
function upsertUser(users: User[], nextUser: User): User[] {
  const userIndex = users.findIndex((user) => user.id === nextUser.id);

  if (userIndex === -1) {
    return [...users, nextUser];
  }

  return users.map((user) => (user.id === nextUser.id ? nextUser : user));
}

/**
 * Removes duplicate IDs from a batch request in first-seen order. Calling
 * this before dispatching parallel loads prevents the same user from being
 * fetched twice and appearing as duplicate entries in state.
 *
 * @param userIds - The raw array of user IDs from the HTTP request body.
 * @returns A deduplicated array of user IDs preserving original order.
 */
function uniqueUserIds(userIds: number[]): number[] {
  return [...new Set(userIds)];
}

/**
 * Applies a fresh \`lastRefresh\` timestamp to the next state before it enters
 * the pipeline. Stamping happens here rather than inside a reducer so that
 * reducers stay pure and operate only on already-committed domain values.
 *
 * @param nextState - The state object to stamp.
 * @returns A copy of \`nextState\` with \`lastRefresh\` set to the current time.
 */
function stampUsersState(nextState: UsersState): UsersState {
  return {
    ...nextState,
    lastRefresh: new Date().toISOString()
  };
}

/**
 * Reads the current committed users state from the FeatureCell snapshot.
 * Falls back to an empty collection when the cell has not yet received a
 * commit, ensuring callers always receive a valid \`UsersState\` object.
 *
 * @param cell - The live users FeatureCell instance.
 * @returns The current \`UsersState\`, or an empty default if no commit exists.
 */
function getUsersValue(cell: UsersCell): UsersState {
  return (
    cell.state.value ?? {
      users: [],
      totalLoaded: 0,
      lastRefresh: new Date().toISOString()
    }
  );
}

/**
 * Subscribes to \`state\$\` and resolves with the next committed snapshot.
 * Calling code registers this listener before issuing a \`replaceState\` so
 * the resulting emission corresponds to that specific write.
 *
 * @param cell - The live users FeatureCell instance.
 * @returns A promise that resolves with the next committed \`UsersState\`.
 */
async function waitForNextUsersState(cell: UsersCell): Promise<UsersState> {
  const emit = await firstValueFrom<UsersStateEmit>(cell.state\$.pipe(skip(1)));
  return emit.snapshot.value as UsersState;
}

/**
 * Stamps the next state, submits it to the FeatureCell via \`replaceState\`,
 * and awaits the resulting committed emission. This is the canonical write
 * boundary in the example: every state change goes through this helper so
 * the caller always receives a confirmed snapshot rather than the raw input.
 *
 * @param cell - The live users FeatureCell instance.
 * @param nextState - The domain state to commit.
 * @param loading - Whether to mark the snapshot as loading. Defaults to \`false\`.
 * @param error - An optional error to attach to the snapshot. Defaults to \`null\`.
 * @returns A promise that resolves with the committed \`UsersState\`.
 */
async function commitUsersState(
  cell: UsersCell,
  nextState: UsersState,
  loading = false,
  error: Error | null = null
): Promise<UsersState> {
  const nextEmission = waitForNextUsersState(cell);
  cell.replaceState({
    loading,
    error,
    value: stampUsersState(nextState)
  });
  return nextEmission;
}

/**
 * Creates the users FeatureCell with an empty initial collection and registers
 * a pure reducer that recomputes \`totalLoaded\` after each committed snapshot.
 * The cell is a module-level singleton; all HTTP requests share this instance
 * and the SDuX Vault conductor queue serializes every write.
 *
 * @returns The initialized users FeatureCell instance.
 */
export function createUsersCell() {
  const cell = FeatureCell<UsersState>({
    key: 'users',
    initialState: {
      users: [],
      totalLoaded: 0,
      lastRefresh: new Date().toISOString()
    }
  });

  cell
    .reducers([
      // Reducer 1: Count loaded users
      (current) => ({
        ...current,
        totalLoaded: current.users.filter((u) => u.status === 'loaded').length
      })
    ])
    .initialize();

  return cell;
}

/**
 * Simulates a remote API call that resolves with user data after a short
 * random delay. User ID 999 always rejects to demonstrate how the pipeline
 * handles async errors and commits an error state for that entry.
 *
 * @param userId - The ID of the user to load.
 * @returns A promise that resolves with a loaded \`User\`, or rejects for ID 999.
 */
export async function loadUserFromAPI(userId: number): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 500)
  );

  // Simulate occasional failures
  if (userId === 999) {
    throw new Error(\`User \${userId} not found\`);
  }

  return {
    id: userId,
    name: \`User \${userId}\`,
    email: \`user\${userId}@example.com\`,
    status: 'loaded'
  };
}

/**
 * Loads a single user through the full commit → emission pattern. If the user
 * is not yet in state, a loading placeholder is committed first so the entry
 * is immediately visible. The API call then resolves — or rejects — and a
 * second commit captures the final status.
 *
 * @param cell - The live users FeatureCell instance.
 * @param userId - The ID of the user to load.
 * @returns A promise that resolves with the committed \`UsersState\` after the user is loaded or errored.
 */
export async function loadUser(
  cell: UsersCell,
  userId: number
): Promise<UsersState> {
  const existingUser = getUsersValue(cell).users.find(
    (user) => user.id === userId
  );

  if (!existingUser) {
    const nextState = getUsersValue(cell);

    await commitUsersState(cell, {
      ...nextState,
      users: upsertUser(nextState.users, createLoadingUser(userId))
    });
  }

  try {
    const userData = await loadUserFromAPI(userId);
    const resolved = getUsersValue(cell);

    return commitUsersState(cell, {
      ...resolved,
      users: upsertUser(resolved.users, userData)
    });
  } catch (error) {
    const resolved = getUsersValue(cell);
    return commitUsersState(cell, {
      ...resolved,
      users: upsertUser(resolved.users, {
        ...createLoadingUser(userId),
        status: 'error',
        errorMessage: String(error)
      })
    });
  }
}

/**
 * Loads multiple users concurrently by first committing all pending loading
 * placeholders in a single snapshot, then dispatching parallel API calls.
 * Duplicate IDs are deduplicated before dispatch so each user is fetched once.
 *
 * @param cell - The live users FeatureCell instance.
 * @param userIds - The array of user IDs to load.
 * @returns A promise that resolves with the final \`UsersState\` after all users settle.
 */
export async function loadUsers(
  cell: UsersCell,
  userIds: number[]
): Promise<UsersState> {
  const nextUserIds = uniqueUserIds(userIds);
  const current = getUsersValue(cell);
  const existingUserIds = new Set(current.users.map((user) => user.id));
  const pendingUsers = nextUserIds
    .filter((userId) => !existingUserIds.has(userId))
    .map((userId) => createLoadingUser(userId));

  if (pendingUsers.length > 0) {
    await commitUsersState(cell, {
      ...current,
      users: [...current.users, ...pendingUsers]
    });
  }

  await Promise.all(nextUserIds.map((id) => loadUser(cell, id)));
  return getUsersValue(cell);
}

/**
 * Removes all users from state and commits the cleared collection. The
 * reducer runs after the commit and resets \`totalLoaded\` to zero.
 *
 * @param cell - The live users FeatureCell instance.
 * @returns A promise that resolves with the committed \`UsersState\` after clearing.
 */
export async function clearUsers(cell: UsersCell): Promise<UsersState> {
  const current = getUsersValue(cell);
  return commitUsersState(cell, {
    ...current,
    users: []
  });
}
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "lib": ["ES2020", "DOM"],
    "module": "ES2020",
    "target": "ES2020",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "moduleResolution": "bundler"
  }
}
`
  }
};
