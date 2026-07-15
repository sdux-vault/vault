import { Project } from '@stackblitz/sdk';

export const replaceExampleProject: Project = {
  title: 'bun-replace-example',
  template: 'node',
  files: {
    'README.md': `# SDuX Vault Bun Replace Example

A simple HTTP server demonstrating state replacement with SDuX Vault running on Bun.

## What This Example Shows

- **State Shape**: Simple \`CounterState\` with \`count\`, \`label\`, and \`lastUpdate\`
- **State Replacement**: Using \`replaceState()\` to update the entire state atomically
- **Deterministic Pipeline**: Commit state and await the next \`state\$\` emission for a confirmed snapshot
- **Clear API Responses**: \`GET /state\` returns the current domain value, not the full snapshot wrapper
- **Server Integration**: Running SDuX Vault on Bun as a backend state manager

## The Queue Is the Architecture

State management in a server only works reliably when two conditions are met:

1. **A serializing queue** — every write enters a single ordered execution path
2. **A long-lived singleton** — the cell outlives any individual request

This server satisfies both. The \`counter\` cell is a module-level singleton created once at startup. Every \`replaceState()\` call enters the SDuX Vault conductor queue, which serializes all pipeline writes in FIFO order. The queue is the correctness mechanism — not the application code around it.

The point of these Bun examples is to demonstrate that SDuX Vault _can_ do server-side state management with the correct architecture. Most state libraries cannot, because they lack an explicit serialization boundary. SDuX Vault has one built in.

> **Community note**: If you want to take this further, move state derivation entirely into reducers so it runs under the queue's serialization guarantee. That closes the read-modify-write window that exists when application code reads \`cell.state.value\` before calling \`replaceState()\`. That's a great first contribution.

## Quick Start

\`\`\`bash
bun install
bun start
\`\`\`

Server starts at \`http://localhost:3000\`

## API Endpoints

### GET /state

Get the current counter value from \`snapshot.value\`

\`\`\`bash
curl http://localhost:3000/state
\`\`\`

Response:

\`\`\`json
{
  "count": 0,
  "label": "Counter Example",
  "lastUpdate": "2026-07-09T12:34:56.789Z"
}
\`\`\`

### POST /increment

Increment counter by 1

\`\`\`bash
curl -X POST http://localhost:3000/increment
\`\`\`

### POST /reset

Reset counter to 0

\`\`\`bash
curl -X POST http://localhost:3000/reset
\`\`\`

### POST /replace

Replace the counter state with a new value. \`count\` and \`label\` are required; \`lastUpdate\` is optional and will be generated if omitted.

\`\`\`bash
curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"count": 42, "label": "Custom Count"}' \\
  http://localhost:3000/replace
\`\`\`

## How It Works

1. **Initialize**: \`createCounterCell()\` creates a FeatureCell with initial state
2. **Act**: Send a request that calls \`replaceCounter()\`
3. **Observe**: await the next \`state\$\` emission to receive the committed snapshot
4. **Assert**: Return the committed state to the client

\`\`\`typescript
async function replaceCounter(
  cell: FeatureCell<CounterState>,
  newState: { count: number; label: string; lastUpdate?: string }
): Promise<CounterState> {
  const nextEmission = waitForNextCounterState(cell);

  cell.replaceState({
    loading: false,
    error: null,
    value: {
      count: newState.count,
      label: newState.label,
      lastUpdate: newState.lastUpdate ?? new Date().toISOString()
    }
  });

  return nextEmission;
}
\`\`\`

## Why Bun for SDuX Vault?

- **Zero Dependencies**: SDuX Vault runs in plain TypeScript with no runtime magic
- **Deterministic**: Pipeline execution guarantees → predictable server state
- **Fast Startup**: Bun's native TypeScript support means no build step
- **Reactive confirmation**: \`state\$\` gives you an explicit observable signal when a committed snapshot is ready

## Development Mode

\`\`\`bash
bun --watch src/main.ts
\`\`\`

Server auto-restarts on file changes.

## Try It Live

In one terminal:

\`\`\`bash
bun start
\`\`\`

In another terminal:

\`\`\`bash
# Get initial state
curl http://localhost:3000/state

# Increment a few times
curl -X POST http://localhost:3000/increment
curl -X POST http://localhost:3000/increment
curl http://localhost:3000/state

# Reset
curl -X POST http://localhost:3000/reset
curl http://localhost:3000/state
\`\`\`
`,
    'package.json': `{
  "name": "bun-replace-example",
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

import {
  createCounterCell,
  incrementCounter,
  replaceCounter,
  resetCounter
} from './state';

/**
 * Simple HTTP server demonstrating state replacement with SDuX Vault
 *
 * Endpoints:
 * GET  /state         — Get current counter state
 * POST /increment     — Increment counter by 1
 * POST /reset         — Reset counter to 0
 * POST /replace       — Replace entire counter state
 */

const PORT = 3000;
const counter = createCounterCell();

/**
 * Returns the current committed counter domain value from \`snapshot.value\`.
 * This is the value exposed to HTTP clients — the full SDuX Vault snapshot
 * wrapper is intentionally stripped so responses contain only domain data.
 *
 * @returns The current \`CounterState\`, or \`undefined\` if the cell has no commit yet.
 */
function getCounterResponse() {
  return counter.state.value;
}

/**
 * Type guard that validates the shape of the POST /replace request body.
 * Ensures callers supply the required \`count\` and \`label\` fields before the
 * server attempts a state replacement, preventing pipeline errors from
 * malformed input.
 *
 * @param body - The raw parsed JSON value from the request.
 * @returns \`true\` when \`body\` is a valid \`ReplaceCounterInput\` shape.
 */
function isReplaceCounterBody(body: unknown): body is {
  count: number;
  label: string;
  lastUpdate?: string;
} {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    typeof payload.count === 'number' &&
    typeof payload.label === 'string' &&
    (payload.lastUpdate === undefined || typeof payload.lastUpdate === 'string')
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
      // GET /state — Return current counter state
      if (pathname === '/state' && request.method === 'GET') {
        return new Response(JSON.stringify(getCounterResponse(), null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /increment — Increment by 1
      if (pathname === '/increment' && request.method === 'POST') {
        const newState = await incrementCounter(counter);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /reset — Reset to 0
      if (pathname === '/reset' && request.method === 'POST') {
        const newState = await resetCounter(counter);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /replace — Replace entire state
      if (pathname === '/replace' && request.method === 'POST') {
        const body = await request.json();

        if (!isReplaceCounterBody(body)) {
          return new Response(
            JSON.stringify({
              error: 'Bad Request',
              message:
                'POST /replace requires a JSON body with numeric count and string label. lastUpdate is optional.'
            }),
            {
              status: 400,
              headers: corsHeaders
            }
          );
        }

        const newState = await replaceCounter(counter, body);
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
              message: 'SDuX Vault Bun Replace Example',
              endpoints: {
                'GET /state': 'Get current counter state',
                'POST /increment': 'Increment counter by 1',
                'POST /reset': 'Reset counter to 0',
                'POST /replace':
                  'Replace the counter state (send JSON body with count and label; lastUpdate optional)'
              },
              example: {
                curl_get_state: 'curl http://localhost:3000/state',
                curl_increment: 'curl -X POST http://localhost:3000/increment',
                curl_replace:
                  'curl -X POST -H "Content-Type: application/json" -d \\'{"count": 42, "label": "Custom Count"}\\' http://localhost:3000/replace'
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
`,
    'src/state.ts': `import { FeatureCell } from '@sdux-vault/core';
import { firstValueFrom } from 'rxjs';
import { skip } from 'rxjs/operators';

/**
 * Defines the domain state managed by the counter FeatureCell.
 * Every field is replaced atomically on each pipeline commit, so readers
 * always see a fully consistent snapshot.
 */
interface CounterState {
  count: number;
  label: string;
  lastUpdate: string;
}

/**
 * Describes the payload accepted by POST /replace. All fields except
 * \`lastUpdate\` are required so the server can perform a full state
 * replacement rather than a partial merge.
 */
interface ReplaceCounterInput {
  count: number;
  label: string;
  lastUpdate?: string;
}

/**
 * Narrows the shape of each emission from \`state\$\` to the fields this
 * example reads. The \`snapshot.value\` property holds the fully committed
 * domain value after the pipeline has finished processing.
 */
interface CounterStateEmit {
  snapshot: {
    value: CounterState | undefined;
  };
}

/**
 * Convenience alias for the return type of \`createCounterCell\`. Lets
 * helper functions accept the live cell instance without importing a
 * separate type.
 */
type CounterCell = ReturnType<typeof createCounterCell>;

/**
 * Builds a complete \`CounterState\` from a \`ReplaceCounterInput\`, filling in
 * \`lastUpdate\` with the current timestamp when the caller omits it. This
 * keeps timestamp generation outside the reducer so reducers remain pure.
 *
 * @param nextState - The incoming replacement payload.
 * @returns A fully populated \`CounterState\` ready to pass to \`replaceState\`.
 */
function normalizeCounterState(nextState: ReplaceCounterInput): CounterState {
  return {
    count: nextState.count,
    label: nextState.label,
    lastUpdate: nextState.lastUpdate ?? new Date().toISOString()
  };
}

/**
 * Reads the current committed counter value from the FeatureCell snapshot.
 * Falls back to a zeroed default when the cell has not yet received a commit,
 * ensuring callers always have a valid object to work with.
 *
 * @param cell - The live counter FeatureCell instance.
 * @returns The current \`CounterState\`, or a zeroed default if no commit exists.
 */
function getCounterValue(cell: CounterCell): CounterState {
  return (
    cell.state.value ?? {
      count: 0,
      label: 'Counter Example',
      lastUpdate: new Date().toISOString()
    }
  );
}

/**
 * Subscribes to \`state\$\` and resolves with the next committed snapshot.
 * Calling code registers this listener before issuing a \`replaceState\` so
 * the resulting emission is guaranteed to correspond to that specific write.
 *
 * @param cell - The live counter FeatureCell instance.
 * @returns A promise that resolves with the next committed \`CounterState\`.
 */
async function waitForNextCounterState(
  cell: CounterCell
): Promise<CounterState> {
  const emit = await firstValueFrom<CounterStateEmit>(
    cell.state\$.pipe(skip(1))
  );
  return emit.snapshot.value as CounterState;
}

/**
 * Creates the counter FeatureCell and initializes it with a starting state.
 * The cell is a module-level singleton; every HTTP request operates against
 * the same instance, and the SDuX Vault conductor queue serializes all writes.
 *
 * @returns The initialized counter FeatureCell instance.
 */
function createCounterCell() {
  const cell = FeatureCell<CounterState>({
    key: 'counter',
    initialState: {
      count: 0,
      label: 'Counter Example',
      lastUpdate: new Date().toISOString()
    }
  });

  cell.initialize();

  return cell;
}

/**
 * Performs a full state replacement on the counter FeatureCell and returns
 * the committed result. The listener for the next \`state\$\` emission is
 * registered before \`replaceState\` is called so the promise resolves with
 * exactly the snapshot produced by this write.
 *
 * @param cell - The live counter FeatureCell instance.
 * @param newState - The replacement payload containing the new counter values.
 * @returns A promise that resolves with the committed \`CounterState\`.
 */
export async function replaceCounter(
  cell: CounterCell,
  newState: ReplaceCounterInput
): Promise<CounterState> {
  const nextEmission = waitForNextCounterState(cell);

  cell.replaceState({
    loading: false,
    error: null,
    value: normalizeCounterState(newState)
  });

  return nextEmission;
}

/**
 * Increments the counter by one and commits the replacement through the
 * pipeline. The current label is preserved so only the count field changes.
 *
 * @param cell - The live counter FeatureCell instance.
 * @returns A promise that resolves with the committed \`CounterState\`.
 */
export async function incrementCounter(
  cell: CounterCell
): Promise<CounterState> {
  const current = getCounterValue(cell);
  return replaceCounter(cell, {
    count: current.count + 1,
    label: current.label,
    lastUpdate: new Date().toISOString()
  });
}

/**
 * Resets the counter to zero and relabels it, committing a full replacement
 * through the pipeline. Any previous label or count is discarded.
 *
 * @param cell - The live counter FeatureCell instance.
 * @returns A promise that resolves with the committed \`CounterState\`.
 */
export async function resetCounter(cell: CounterCell): Promise<CounterState> {
  return replaceCounter(cell, {
    count: 0,
    label: 'Counter Reset',
    lastUpdate: new Date().toISOString()
  });
}

/**
 * Re-exports the factory so the server module can create the singleton cell
 * without importing internal helpers directly.
 */
export { createCounterCell };
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
