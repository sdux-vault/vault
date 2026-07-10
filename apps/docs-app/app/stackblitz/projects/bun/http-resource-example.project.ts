import { Project } from '@stackblitz/sdk';

export const httpResourceExampleProject: Project = {
  title: 'bun-http-resource-example',
  template: 'node',
  files: {
    'README.md': `# SDuX Vault Bun HTTP Resource Example

A REST API demonstrating stateful HTTP resource management with deterministic pipeline orchestration using SDuX Vault on Bun.

## What This Example Shows

- **Stateful HTTP Resources**: Managing remote API data in a structured state model
- **Concurrent Resource Loading**: Fetch multiple resources in parallel with deterministic state updates
- **Deterministic Pipeline**: Resource fetches commit complete snapshots and use pure reducers for derived totals
- **Real External API**: Uses JSONPlaceholder (free, public API) for realistic data fetching
- **Error Handling**: Graceful failure handling with state tracking
- **Resource Selection**: Manage selected/focused resources as first-class state

## The Queue Is the Architecture

State management in a server only works reliably when two conditions are met:

1. **A serializing queue** — every write enters a single ordered execution path
2. **A long-lived singleton** — the cell outlives any individual request

This server satisfies both. The \`blogCell\` is a module-level singleton created once at startup. Every \`replaceState()\` call enters the SDuX Vault conductor queue, which serializes all pipeline writes in FIFO order. The queue is the correctness mechanism — not the application code around it.

HTTP resource orchestration is one of the most natural fits for this model: fetch data from a remote API, commit it to state, let the reducer derive counts and metadata, observe the confirmed snapshot, respond to the client. The pipeline handles each commit atomically — reducers always see the fully resolved previous state, never a partial intermediate.

> **Community note**: If you want to take this further, move state derivation entirely into reducers so it runs under the queue's serialization guarantee. That closes the read-modify-write window that exists when application code reads \`cell.state.value\` before calling \`replaceState()\`. That's a great first contribution.

## Quick Start

\`\`\`bash
bun install
bun start
\`\`\`

Server starts at \`http://localhost:3000\`

## API Endpoints

### GET /

API documentation with all endpoints and examples

\`\`\`bash
curl http://localhost:3000
\`\`\`

### GET /state

Get the current blog domain value from \`snapshot.value\` (including posts, selection, and counts)

\`\`\`bash
curl http://localhost:3000/state
\`\`\`

Response:

\`\`\`json
{
  "posts": [
    {
      "id": 1,
      "userId": 1,
      "title": "sunt aut facere repellat provident...",
      "body": "quia et suscipit...",
      "status": "loaded",
      "createdAt": "2026-07-09T12:34:56.789Z"
    }
  ],
  "selectedPostId": null,
  "totalPosts": 1,
  "lastFetch": "2026-07-09T12:34:56.789Z",
  "isRefreshing": false
}
\`\`\`

### POST /posts/:id

Fetch a single post by ID from JSONPlaceholder API

\`\`\`bash
# Fetch post 1
curl -X POST http://localhost:3000/posts/1

# Fetch post 10
curl -X POST http://localhost:3000/posts/10

# Check state
curl http://localhost:3000/state
\`\`\`

Post progresses through states:

1. \`loading\` — added to collection
2. \`loaded\` — data received from API
3. \`error\` — if fetch fails

### POST /posts/batch

Fetch multiple posts concurrently. The request body must include \`postIds\` as an array of positive integers. Duplicate IDs are deduplicated in first-seen order.

\`\`\`bash
curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"postIds": [1, 5, 10, 15, 20]}' \\
  http://localhost:3000/posts/batch
\`\`\`

All posts fetch in parallel, but the batch path first commits one loading snapshot so every requested post is visible before the remote fetches resolve. After each committed emission, the pure reducer updates:

1. Total post count

### POST /posts/:id/select

Select a specific post to focus on

\`\`\`bash
curl -X POST http://localhost:3000/posts/1/select
curl http://localhost:3000/state
\`\`\`

### POST /clear

Clear all posts and deselect

\`\`\`bash
curl -X POST http://localhost:3000/clear
curl http://localhost:3000/state
\`\`\`

## How It Works

### Commit → Emission for HTTP Resources

\`\`\`typescript
async function fetchPost(
  cell: FeatureCell<BlogState>,
  postId: number
): Promise<BlogState> {
  await commitBlogState(cell, {
    ...getBlogValue(cell),
    posts: [...getBlogValue(cell).posts, { id: postId, status: 'loading' }]
  });

  try {
    const postData = await fetchPostFromAPI(postId);

    return commitBlogState(cell, {
      ...getBlogValue(cell),
      posts: getBlogValue(cell).posts.map((p) =>
        p.id === postId ? { ...p, ...postData } : p
      )
    });
  } catch (error) {
    return commitBlogState(cell, {
      ...getBlogValue(cell),
      posts: getBlogValue(cell).posts.map((p) =>
        p.id === postId
          ? { ...p, status: 'error', errorMessage: String(error) }
          : p
      )
    });
  }
}
\`\`\`

### Reducer Composition for Resource Counts

\`\`\`typescript
cell.reducers([
  // Reducer 1: Update total count
  (current) => ({
    ...current,
    totalPosts: current.posts.filter((p) => p.status === 'loaded').length
  })
]);
\`\`\`

\`lastFetch\` is stamped in the request helper before each \`replaceState()\` call so the reducer stays side-effect free while the count remains accurate.

## Why This Pattern is Powerful

1. **No Redux action boilerplate**: Just call \`fetchPost()\`, reducers update automatically
2. **Deterministic concurrency**: Fetch 100 posts in parallel; committed emissions still produce correct counts
3. **Single source of truth**: All resource state lives in one FeatureCell
4. **Server-side rendering ready**: Entire state can be serialized and sent to clients
5. **No lost updates**: Concurrent fetches merge against the latest committed collection so parallel requests keep every post
6. **Visible batch startup**: Batch requests commit one loading snapshot before parallel fetches begin
7. **Duplicate-safe batches**: Repeated IDs do not trigger redundant fetches or duplicate posts in state

## Try It Live

Terminal 1:

\`\`\`bash
bun start
\`\`\`

Terminal 2:

\`\`\`bash
# Check initial state
curl http://localhost:3000/state

# Fetch a few posts
curl -X POST http://localhost:3000/posts/1
curl -X POST http://localhost:3000/posts/2
curl -X POST http://localhost:3000/posts/3

# Check state — 3 loaded posts
curl http://localhost:3000/state

# Load a batch all at once (fetches in parallel)
curl -X POST -H "Content-Type: application/json" \\
  -d '{"postIds": [10, 11, 12, 13, 14]}' \\
  http://localhost:3000/posts/batch

# State now shows 8 loaded posts total
curl http://localhost:3000/state

# Select one
curl -X POST http://localhost:3000/posts/1/select

# Clear and start over
curl -X POST http://localhost:3000/clear
curl http://localhost:3000/state
\`\`\`

## Development Mode

\`\`\`bash
bun --watch src/main.ts
\`\`\`

Server auto-restarts on file changes.

## Real-World Extensions

This example is a foundation for:

- **Pagination**: Add \`pageIndex\` and \`pageSize\` to state, manage page loads
- **Filtering**: Add \`tags\` or \`search\` filter, re-fetch with criteria
- **Caching**: Check if post already loaded before fetching
- **Refresh**: Mark specific resources as stale, refresh on demand
- **Mutations**: POST/PUT endpoints that trigger update-and-refetch flows
- **Subscriptions**: Real-time updates push new posts to clients
`,
    'package.json': `{
  "name": "bun-http-resource-example",
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
  clearPosts,
  createBlogCell,
  fetchPost,
  fetchPosts,
  selectPost
} from './state';

/**
 * REST API demonstrating stateful HTTP resource handling with SDuX Vault
 *
 * Uses JSONPlaceholder (free public API) for post data.
 *
 * Endpoints:
 * GET  /                  — API documentation and examples
 * GET  /state             — Get current blog state
 * POST /posts/:id         — Fetch a single post by ID
 * POST /posts/batch       — Fetch multiple posts (send JSON: {"postIds": [1,2,3]})
 * POST /posts/:id/select  — Select a post
 * POST /clear             — Clear all posts
 */

const PORT = 3000;
const blogCell = createBlogCell();

/**
 * Returns the current committed blog domain value from \`snapshot.value\`.
 * The full SDuX Vault snapshot wrapper is stripped so HTTP clients receive
 * only the domain data they need.
 *
 * @returns The current \`BlogState\`, or \`undefined\` if no commit has occurred.
 */
function getBlogResponse() {
  return blogCell.state.value;
}

/**
 * Validates that a given value is a positive integer. Used by the batch
 * body type guard to verify each element in the \`postIds\` array before
 * the server dispatches parallel fetch operations.
 *
 * @param value - The value to check.
 * @returns \`true\` when \`value\` is an integer greater than zero.
 */
function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

/**
 * Type guard that validates the shape of the POST /posts/batch request body.
 * Ensures the \`postIds\` field is present and contains only positive integers
 * before the server attempts concurrent post fetches.
 *
 * @param body - The raw parsed JSON value from the request.
 * @returns \`true\` when \`body\` is a valid batch fetch payload.
 */
function isFetchPostsBody(body: unknown): body is { postIds: number[] } {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    Array.isArray(payload.postIds) &&
    payload.postIds.every((postId) => isPositiveInteger(postId))
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
      // GET /state — Return current blog state
      if (pathname === '/state' && request.method === 'GET') {
        return new Response(JSON.stringify(getBlogResponse(), null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /posts/:id — Fetch a single post
      const postMatch =
        pathname.match(/^\\/posts\\/(\\d+)\$/) && request.method === 'POST';
      if (postMatch) {
        const postId = parseInt(pathname.split('/')[2], 10);
        const newState = await fetchPost(blogCell, postId);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /posts/batch — Fetch multiple posts
      if (pathname === '/posts/batch' && request.method === 'POST') {
        const body = await request.json();

        if (!isFetchPostsBody(body)) {
          return new Response(
            JSON.stringify({
              error: 'Bad Request',
              message:
                'POST /posts/batch requires a JSON body with postIds as an array of positive integers.'
            }),
            {
              status: 400,
              headers: corsHeaders
            }
          );
        }

        const postIds = body.postIds;
        const newState = await fetchPosts(blogCell, postIds);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /posts/:id/select — Select a post
      const selectMatch =
        pathname.match(/^\\/posts\\/(\\d+)\\/select\$/) && request.method === 'POST';
      if (selectMatch) {
        const postId = parseInt(pathname.split('/')[2], 10);
        const newState = await selectPost(blogCell, postId);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // POST /clear — Clear all posts
      if (pathname === '/clear' && request.method === 'POST') {
        const newState = await clearPosts(blogCell);
        return new Response(JSON.stringify(newState, null, 2), {
          status: 200,
          headers: corsHeaders
        });
      }

      // GET / — API documentation
      if (pathname === '/' && request.method === 'GET') {
        return new Response(
          JSON.stringify(
            {
              message: 'SDuX Vault Bun HTTP Resource Example',
              description:
                'Stateful REST API for managing blog posts with deterministic pipeline orchestration',
              dataSource:
                'JSONPlaceholder (https://jsonplaceholder.typicode.com)',
              endpoints: {
                'GET /state': 'Get current blog state',
                'POST /posts/:id': 'Fetch a single post by ID from remote API',
                'POST /posts/batch':
                  'Fetch multiple posts concurrently (send JSON: {"postIds": [1,2,3]}; duplicate IDs are ignored)',
                'POST /posts/:id/select': 'Select/focus a specific post',
                'POST /clear': 'Clear all posts'
              },
              examples: {
                get_state: 'curl http://localhost:3000/state',
                fetch_single: 'curl -X POST http://localhost:3000/posts/1',
                fetch_batch:
                  'curl -X POST -H "Content-Type: application/json" -d \\'{"postIds": [1,2,3]}\\' http://localhost:3000/posts/batch',
                select_post:
                  'curl -X POST http://localhost:3000/posts/1/select',
                clear: 'curl -X POST http://localhost:3000/clear'
              },
              architecture: {
                state_management:
                  'All API responses update a single FeatureCell and expose the current domain value from snapshot.value',
                determinism:
                  'Each fetch commits a complete snapshot, then a pure reducer recomputes totalPosts from the committed posts collection',
                pipeline:
                  'HTTP resources commit state and await the next state\$ emission for the finalized snapshot',
                batch_validation:
                  'POST /posts/batch requires postIds to be an array of positive integers',
                batch_loading:
                  'POST /posts/batch commits one loading snapshot up front so every requested post is visible before parallel fetches complete',
                concurrency:
                  'Batch fetches load in parallel but commit state deterministically'
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

console.log(\`✅ Server running at http://localhost:\${PORT}\`);
console.log(\`📝 Try: curl http://localhost:\${PORT}\`);
console.log(\`📖 Fetch post: curl -X POST http://localhost:\${PORT}/posts/1\`);
console.log(
  \`📚 Fetch batch: curl -X POST -H "Content-Type: application/json" -d '{"postIds": [1,2,3]}' http://localhost:\${PORT}/posts/batch\`
);
`,
    'src/state.ts': `import { FeatureCell } from '@sdux-vault/core';
import { firstValueFrom } from 'rxjs';
import { skip } from 'rxjs/operators';

/**
 * Represents a single blog post entry. The \`status\` field tracks the post
 * through its async loading lifecycle so each committed snapshot reflects
 * the exact state of every resource in the collection.
 */
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  status: 'loading' | 'loaded' | 'error';
  createdAt: string;
  errorMessage?: string;
}

/**
 * Defines the domain state managed by the blog FeatureCell. Holds the full
 * post collection alongside derived counts and metadata. \`totalPosts\` is
 * recomputed by the reducer after each commit; \`lastFetch\` is stamped before
 * each \`replaceState\` call to keep the reducer side-effect free.
 */
export interface BlogState {
  posts: Post[];
  selectedPostId: number | null;
  totalPosts: number;
  lastFetch: string;
  isRefreshing: boolean;
}

/**
 * Convenience alias for the return type of \`createBlogCell\`. Lets helper
 * functions accept the live cell instance without importing a separate type.
 */
type BlogCell = ReturnType<typeof createBlogCell>;

/**
 * Constructs a placeholder \`Post\` entry in the \`loading\` status. This record
 * is committed to state before the remote fetch begins so observers see the
 * post appear immediately rather than only after the network round-trip.
 *
 * @param postId - The numeric ID of the post being fetched.
 * @returns A \`Post\` object with \`status: 'loading'\` and empty content fields.
 */
function createLoadingPost(postId: number): Post {
  return {
    id: postId,
    userId: 0,
    title: '',
    body: '',
    status: 'loading',
    createdAt: new Date().toISOString()
  };
}

/**
 * Performs an immutable insert-or-replace of a post in the collection.
 * Matching is done by \`id\`; if no entry exists the post is appended.
 * This ensures concurrent fetches each read the latest committed array
 * and apply their update without losing entries added by other requests.
 *
 * @param posts - The current committed posts array.
 * @param nextPost - The post record to insert or replace.
 * @returns A new array with the post inserted or updated in place.
 */
function upsertPost(posts: Post[], nextPost: Post): Post[] {
  const postIndex = posts.findIndex((post) => post.id === nextPost.id);

  if (postIndex === -1) {
    return [...posts, nextPost];
  }

  return posts.map((post) => (post.id === nextPost.id ? nextPost : post));
}

/**
 * Removes duplicate IDs from a batch request in first-seen order. Calling
 * this before dispatching parallel fetches prevents the same post from being
 * fetched twice and appearing as duplicate entries in state.
 *
 * @param postIds - The raw array of post IDs from the HTTP request body.
 * @returns A deduplicated array of post IDs preserving original order.
 */
function uniquePostIds(postIds: number[]): number[] {
  return [...new Set(postIds)];
}

/**
 * Applies a fresh \`lastFetch\` timestamp to the next state before it enters
 * the pipeline. Stamping happens here rather than inside a reducer so that
 * reducers stay pure and operate only on already-committed domain values.
 *
 * @param nextState - The state object to stamp.
 * @returns A copy of \`nextState\` with \`lastFetch\` set to the current time.
 */
function stampBlogState(nextState: BlogState): BlogState {
  return {
    ...nextState,
    lastFetch: new Date().toISOString()
  };
}

/**
 * Reads the current committed blog state from the FeatureCell snapshot.
 * Falls back to an empty collection when the cell has not yet received a
 * commit, ensuring callers always receive a valid \`BlogState\` object.
 *
 * @param cell - The live blog FeatureCell instance.
 * @returns The current \`BlogState\`, or an empty default if no commit exists.
 */
function getBlogValue(cell: BlogCell): BlogState {
  return (
    cell.state.value ?? {
      posts: [],
      selectedPostId: null,
      totalPosts: 0,
      lastFetch: new Date().toISOString(),
      isRefreshing: false
    }
  );
}

/**
 * Subscribes to \`state\$\` and resolves with the next committed snapshot.
 * Calling code registers this listener before issuing a \`replaceState\` so
 * the resulting emission corresponds to that specific write.
 *
 * @param cell - The live blog FeatureCell instance.
 * @returns A promise that resolves with the next committed \`BlogState\`.
 */
async function waitForNextBlogState(cell: BlogCell): Promise<BlogState> {
  const emit = await firstValueFrom(cell.state\$.pipe(skip(1)));
  return emit.snapshot.value as BlogState;
}

/**
 * Stamps the next state, submits it to the FeatureCell via \`replaceState\`,
 * and awaits the resulting committed emission. Every state change in this
 * example flows through this helper so callers always receive a confirmed
 * snapshot after the full pipeline has executed.
 *
 * @param cell - The live blog FeatureCell instance.
 * @param nextState - The domain state to commit.
 * @param loading - Whether to mark the snapshot as loading. Defaults to \`false\`.
 * @param error - An optional error to attach to the snapshot. Defaults to \`null\`.
 * @returns A promise that resolves with the committed \`BlogState\`.
 */
async function commitBlogState(
  cell: BlogCell,
  nextState: BlogState,
  loading = false,
  error: Error | null = null
): Promise<BlogState> {
  const nextEmission = waitForNextBlogState(cell);
  cell.replaceState({
    loading,
    error,
    value: stampBlogState(nextState)
  });
  return nextEmission;
}

/**
 * Creates the blog FeatureCell with an empty initial collection and registers
 * a pure reducer that recomputes \`totalPosts\` from the committed posts array
 * after each pipeline execution. The cell is a module-level singleton; all
 * HTTP requests share this instance and the SDuX Vault conductor queue
 * serializes every write.
 *
 * @returns The initialized blog FeatureCell instance.
 */
export function createBlogCell() {
  const cell = FeatureCell<BlogState>({
    key: 'blog',
    initialState: {
      posts: [],
      selectedPostId: null,
      totalPosts: 0,
      lastFetch: new Date().toISOString(),
      isRefreshing: false
    }
  });

  cell
    .reducers([
      // Reducer 1: Update total count
      (current: BlogState) => ({
        ...current,
        totalPosts: current.posts.filter((p) => p.status === 'loaded').length
      })
    ])
    .initialize();

  return cell;
}

/**
 * Fetches a single post from JSONPlaceholder and maps the response to the
 * \`Post\` shape. Throws when the HTTP response is not successful so the
 * calling code can commit an error state for that entry.
 *
 * @param postId - The ID of the post to fetch from the remote API.
 * @returns A promise that resolves with a loaded \`Post\` record.
 * @throws When the remote API returns a non-2xx response.
 */
export async function fetchPostFromAPI(postId: number): Promise<Post> {
  const response = await fetch(
    \`https://jsonplaceholder.typicode.com/posts/\${postId}\`
  );
  if (!response.ok) {
    throw new Error(\`Failed to fetch post \${postId}\`);
  }
  const data = await response.json();
  return {
    id: data.id,
    userId: data.userId,
    title: data.title,
    body: data.body,
    status: 'loaded',
    createdAt: new Date().toISOString()
  };
}

/**
 * Fetches a single post through the full commit → emission pattern. If the
 * post is not yet in state, a loading placeholder is committed first so the
 * entry is immediately visible. The remote fetch then resolves — or rejects
 * — and a second commit captures the final status.
 *
 * @param cell - The live blog FeatureCell instance.
 * @param postId - The ID of the post to fetch.
 * @returns A promise that resolves with the committed \`BlogState\` after the post is loaded or errored.
 */
export async function fetchPost(
  cell: BlogCell,
  postId: number
): Promise<BlogState> {
  const existingPost = getBlogValue(cell).posts.find(
    (post) => post.id === postId
  );

  if (!existingPost) {
    const nextState = getBlogValue(cell);

    await commitBlogState(cell, {
      ...nextState,
      posts: upsertPost(nextState.posts, createLoadingPost(postId))
    });
  }

  try {
    const postData = await fetchPostFromAPI(postId);
    const resolved = getBlogValue(cell);

    return commitBlogState(cell, {
      ...resolved,
      posts: upsertPost(resolved.posts, postData)
    });
  } catch (error) {
    const resolved = getBlogValue(cell);
    return commitBlogState(cell, {
      ...resolved,
      posts: upsertPost(resolved.posts, {
        ...createLoadingPost(postId),
        status: 'error',
        errorMessage: String(error)
      })
    });
  }
}

/**
 * Fetches multiple posts concurrently by first committing all pending loading
 * placeholders and setting \`isRefreshing: true\` in a single snapshot, then
 * dispatching parallel remote fetches. Duplicate IDs are deduplicated before
 * dispatch. A final commit clears \`isRefreshing\` once all fetches settle.
 *
 * @param cell - The live blog FeatureCell instance.
 * @param postIds - The array of post IDs to fetch.
 * @returns A promise that resolves with the final \`BlogState\` after all posts settle.
 */
export async function fetchPosts(
  cell: BlogCell,
  postIds: number[]
): Promise<BlogState> {
  const nextPostIds = uniquePostIds(postIds);
  const current = getBlogValue(cell);
  const existingPostIds = new Set(current.posts.map((post) => post.id));
  const pendingPosts = nextPostIds
    .filter((postId) => !existingPostIds.has(postId))
    .map((postId) => createLoadingPost(postId));

  await commitBlogState(cell, {
    ...current,
    posts: [...current.posts, ...pendingPosts],
    isRefreshing: true
  });

  await Promise.all(nextPostIds.map((id) => fetchPost(cell, id)));

  return commitBlogState(cell, {
    ...getBlogValue(cell),
    isRefreshing: false
  });
}

/**
 * Sets the \`selectedPostId\` field and commits the updated state. This is a
 * pure domain selection operation — no remote fetch is triggered.
 *
 * @param cell - The live blog FeatureCell instance.
 * @param postId - The ID of the post to select.
 * @returns A promise that resolves with the committed \`BlogState\`.
 */
export async function selectPost(
  cell: BlogCell,
  postId: number
): Promise<BlogState> {
  return commitBlogState(cell, {
    ...getBlogValue(cell),
    selectedPostId: postId
  });
}

/**
 * Clears all posts and deselects the current selection in a single committed
 * snapshot. The reducer runs after the commit and resets \`totalPosts\` to zero.
 *
 * @param cell - The live blog FeatureCell instance.
 * @returns A promise that resolves with the committed \`BlogState\` after clearing.
 */
export async function clearPosts(cell: BlogCell): Promise<BlogState> {
  return commitBlogState(cell, {
    ...getBlogValue(cell),
    posts: [],
    selectedPostId: null
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
