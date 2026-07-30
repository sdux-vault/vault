import { Project } from '@stackblitz/sdk';

export const promiseExampleProject: Project = {
  title: 'node-typescript-promise-example',
  template: 'node',
  files: {
    'package.json': `{
  "name": "node-typescript-promise-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "tsx src/main.ts"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
    "rxjs": "^7.8.2"
  },
  "devDependencies": {
    "@types/node": "latest",
    "tsx": "^4.19.4",
    "typescript": "~5.9.2"
  }
}
`,
    'README.md': `# SDuX Vault TypeScript Promise Example

A script demonstrating async promise resolution with SDuX Vault in plain
TypeScript. It uses only runtime-neutral APIs, so the same file runs in Node,
Bun, Deno, or the browser — this folder runs it with Node via \`tsx\`.

## What This Example Shows

- **Two-Step Async Commit**: Committing a \`loading\` placeholder before an async
  operation begins, then committing the \`loaded\` or \`error\` result when it settles
- **Reducers**: A pure reducer that recomputes \`totalLoaded\` after every pipeline
  commit — derived state stays consistent without manual counting in call sites
- **Concurrent Loading**: Batch-loading multiple users by committing all
  placeholders in a single write before dispatching parallel fetches
- **Error State**: User ID 999 always rejects, demonstrating that error entries
  are committed to state without disrupting the rest of the collection

## This Is Not Production Code

This example is intentionally minimal. Its job is to show that SDuX Vault handles
async promise resolution in plain TypeScript — nothing more. Adapt the
patterns to your own data-fetching use case and build from there.

> The runner guards \`process.exit(0)\` with a \`typeof process\` check so the
> script exits cleanly under Node (an open RxJS subscription can otherwise keep
> the event loop alive) while remaining a no-op in non-Node runtimes.

## Prerequisites

- Node.js 18 or later
- npm

## Quick Start

\`\`\`bash
npm install
npm start
\`\`\`

## Expected Output

\`\`\`
=== SDuX Vault Node.js Promise Example ===

[CELL] Users cell created with reducer (counts loaded users)
[STATE] Initial: 0 users

[ACTION] Loading user 1...
[STATE]  user 1: loaded → name: User 1, email: user1@example.com
[STATE]  totalLoaded (from reducer): 1

[ACTION] Loading users 2 and 3 concurrently...
[STATE]  user 2: loaded → User 2
[STATE]  user 3: loaded → User 3
[STATE]  totalLoaded (from reducer): 3

[ACTION] Loading user 999 (will error)...
[ERROR]  user 999: error → Error: User 999 not found
[STATE]  loaded users still in state: user 1, user 2, user 3

[ACTION] Clearing all users...
[STATE]  0 users, totalLoaded: 0

=== Done ===
\`\`\`

> Timing varies slightly between runs due to the simulated random delay in
> \`fetchUser()\`. The order of users 2 and 3 in the output may also vary
> depending on which fetch resolves first.

## How It Works

1. **Create**: \`FeatureCell()\` with a \`reducers()\` call registers the derived
   field computation. \`initialize()\` is called in the constructor to start the
   pipeline.
2. **Await Initial State**: \`initialize()\` queues the initialState commit in the
   microtask queue. A \`setTimeout(0)\` tick yields to the event loop so the queue
   flushes and \`state.value\` is populated before the initial log.
3. **Placeholder First**: A \`loading\` entry is committed to state before \`fetch\`
   starts, so the entry is visible immediately.
4. **Settle**: When the promise resolves or rejects, a second commit captures the
   final \`loaded\` or \`error\` status.
5. **Reducer Runs**: After each commit the registered reducer recomputes
   \`totalLoaded\` from the current collection — no manual counting.

\`\`\`typescript
class PromiseExample {
  #cell = FeatureCell<UsersState>({ key: 'users', initialState: { users: [], ... } });

  constructor() {
    this.#cell.reducers([
      (current) => ({ ...current, totalLoaded: current.users.filter(u => u.status === 'loaded').length })
    ]).initialize();
  }

  async run(): Promise<void> {
    // setTimeout(0) lets the microtask queue flush so initialState is committed
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.info(\`\${this.#getUsersValue().users.length} users\`);

    // Placeholder committed before async work begins
    await this.#commitUsersState({
      ...current,
      users: this.#upsertUser(current.users, this.#createLoadingUser(userId))
    });

    // Resolved value committed after the promise settles
    const userData = await this.#fetchUser(userId);
    return this.#commitUsersState({
      ...this.#getUsersValue(),
      users: this.#upsertUser(this.#getUsersValue().users, userData)
    });
  }
}
\`\`\`

## Why Node.js for SDuX Vault?

SDuX Vault is a plain TypeScript library with no browser dependencies. The same
\`FeatureCell\` API that manages async state in Angular, React, Vue, or Svelte
works identically here — no adaptation needed. The conductor queue serializes
writes in both environments, so concurrent commits are safe without any extra
locking logic.
`,
    'src/main.ts': `import { FeatureCell, Vault } from '@sdux-vault/core';
import { firstValueFrom } from 'rxjs';
import { skip } from 'rxjs/operators';

/**
 * Represents a single user entry. The \`status\` field tracks the user through
 * its async loading lifecycle so each committed snapshot reflects the exact
 * stage of every entry in the collection — not just the final resolved value.
 */
interface User {
  /** Numeric identifier for the user entry. */
  id: number;

  /** Display name of the user. */
  name: string;

  /** Email address, empty while the user is in \`loading\` status. */
  email: string;

  /** Lifecycle status of the user entry within the collection. */
  status: 'loading' | 'loaded' | 'error';

  /** Error description set when \`status\` is \`'error'\`. */
  errorMessage?: string;
}

/**
 * Defines the domain state managed by the users FeatureCell. \`totalLoaded\`
 * is derived by a reducer after each commit rather than computed in
 * application code — this keeps the value consistent with the committed
 * snapshot and demonstrates the reducer's role in the pipeline.
 */
interface UsersState {
  /** Collection of user entries, each tracked through its loading lifecycle. */
  users: User[];

  /** Count of users with \`status: 'loaded'\`, recomputed by the reducer after each commit. */
  totalLoaded: number;

  /** ISO timestamp of the last committed state update. */
  lastRefresh: string;
}

/**
 * Narrows the shape of each emission from \`state\$\` to the fields this
 * script reads. The \`snapshot.value\` property holds the fully committed
 * domain value after the pipeline finishes processing.
 */
interface UsersStateEmit {
  snapshot: {
    value: UsersState | undefined;
  };
}

/**
 * Initializes the Vault runtime before any FeatureCell is created.
 * \`logLevel: 'off'\` suppresses internal pipeline logs so the script output
 * contains only the console statements written below.
 */
Vault({ logLevel: 'off', devMode: false });

// ─── Example Runner ───────────────────────────────────────────────────────────

/**
 * Orchestrates the promise example script. The FeatureCell and all helper
 * methods live on the class so every \`await\` has a proper \`async\` context and
 * state is fully encapsulated within the single instance.
 */
class PromiseExample {
  /**
   * The users FeatureCell with an empty initial collection and a reducer that
   * recomputes \`totalLoaded\` after each committed snapshot. The reducer
   * demonstrates how derived state stays consistent without any manual
   * computation in application code — the pipeline does the work.
   */
  #cell = FeatureCell<UsersState>({
    key: 'users',
    initialState: {
      users: [],
      totalLoaded: 0,
      lastRefresh: new Date().toISOString()
    }
  });

  /**
   * Creates the runner, registers the reducer, and starts the FeatureCell
   * pipeline. \`initialize()\` is called here so the cell is ready before
   * \`run()\` issues any state mutations.
   */
  constructor() {
    this.#cell
      .reducers([
        // Pure reducer: recompute totalLoaded from the committed collection.
        // Runs after every pipeline commit — no manual counting in call sites.
        (current) => ({
          ...current,
          totalLoaded: current.users.filter((u) => u.status === 'loaded').length
        })
      ])
      .initialize();
  }

  /**
   * Runs the full example sequence: reads initial state, loads a single user,
   * loads a concurrent batch, triggers an error case, then clears all users.
   * Each step awaits a confirmed committed snapshot before logging.
   */
  async run(): Promise<void> {
    console.info('=== SDuX Vault Node.js Promise Example ===\\n');

    // initialize() queues the initialState commit in the microtask queue.
    // A zero-timeout tick yields to the event loop so the microtask queue
    // flushes and the committed initialState is available before we read it.
    await new Promise((resolve) => setTimeout(resolve, 0));

    console.info(
      '[CELL] Users cell created with reducer (counts loaded users)'
    );
    console.info(
      \`[STATE] Initial: \${this.#getUsersValue().users.length} users\\n\`
    );

    // Load a single user — two-step: loading placeholder committed first, then resolved
    console.info('[ACTION] Loading user 1...');
    const afterUser1 = await this.#loadUser(1);
    const user1 = afterUser1.users.find((u) => u.id === 1)!;
    console.info(
      \`[STATE]  user 1: \${user1.status} → name: \${user1.name}, email: \${user1.email}\`
    );
    console.info(
      \`[STATE]  totalLoaded (from reducer): \${afterUser1.totalLoaded}\\n\`
    );

    // Load two users concurrently — all placeholders committed before any fetch resolves
    console.info('[ACTION] Loading users 2 and 3 concurrently...');
    const afterBatch = await this.#loadUsers([2, 3]);
    const user2 = afterBatch.users.find((u) => u.id === 2)!;
    const user3 = afterBatch.users.find((u) => u.id === 3)!;
    console.info(\`[STATE]  user 2: \${user2.status} → \${user2.name}\`);
    console.info(\`[STATE]  user 3: \${user3.status} → \${user3.name}\`);
    console.info(
      \`[STATE]  totalLoaded (from reducer): \${afterBatch.totalLoaded}\\n\`
    );

    // Load user 999 — always rejects; the error state is committed for that entry only
    console.info('[ACTION] Loading user 999 (will error)...');
    const afterError = await this.#loadUser(999);
    const errUser = afterError.users.find((u) => u.id === 999)!;
    console.info(
      \`[ERROR]  user 999: \${errUser.status} → \${errUser.errorMessage}\`
    );
    // The rest of the collection is unchanged — error is isolated to user 999
    console.info(
      \`[STATE]  loaded users still in state: \${afterError.users
        .filter((u) => u.status === 'loaded')
        .map((u) => \`user \${u.id}\`)
        .join(', ')}\\n\`
    );

    // Clear all users — demonstrates resetting the collection through the pipeline
    console.info('[ACTION] Clearing all users...');
    const cleared = await this.#commitUsersState({
      users: [],
      totalLoaded: 0,
      lastRefresh: new Date().toISOString()
    });
    console.info(
      \`[STATE]  \${cleared.users.length} users, totalLoaded: \${cleared.totalLoaded}\\n\`
    );

    console.info('=== Done ===');
  }

  /**
   * Registers a listener on \`state\$\` that resolves with the next committed
   * snapshot. \`skip(1)\` discards the BehaviorSubject's current value on
   * subscription so the promise resolves only when a new pipeline write arrives.
   *
   * Register this listener _before_ issuing any state mutation so the promise
   * is guaranteed to correspond to that specific write.
   *
   * @returns A promise resolving with the next committed \`UsersState\`.
   */
  async #waitForNextState(): Promise<UsersState> {
    const emit = await firstValueFrom<UsersStateEmit>(
      this.#cell.state\$.pipe(skip(1))
    );
    return emit.snapshot.value as UsersState;
  }

  /**
   * Stamps the next state with a fresh \`lastRefresh\` timestamp, submits it
   * to the pipeline via \`replaceState\`, and awaits the confirmed emission.
   * This is the canonical write boundary in the example — every state change
   * passes through here so callers always receive a confirmed snapshot.
   *
   * @param nextState - The domain state to commit.
   * @returns A promise resolving with the committed \`UsersState\`.
   */
  async #commitUsersState(nextState: UsersState): Promise<UsersState> {
    const nextEmission = this.#waitForNextState();
    this.#cell.replaceState({
      loading: false,
      error: null,
      value: { ...nextState, lastRefresh: new Date().toISOString() }
    });
    return nextEmission;
  }

  /**
   * Returns the current committed users state, falling back to an empty
   * collection when the cell has not yet received a commit.
   *
   * @returns The current \`UsersState\`, or an empty default if no commit exists.
   */
  #getUsersValue(): UsersState {
    return (
      this.#cell.state.value ?? {
        users: [],
        totalLoaded: 0,
        lastRefresh: new Date().toISOString()
      }
    );
  }

  /**
   * Constructs a placeholder \`User\` in the \`loading\` status. This entry is
   * committed to state before the async resolution begins so the collection
   * immediately reflects the in-flight request — observers see the user appear
   * at the start of the operation, not just after it completes.
   *
   * @param userId - The numeric ID of the user being loaded.
   * @returns A \`User\` with \`status: 'loading'\` and an empty email field.
   */
  #createLoadingUser(userId: number): User {
    return { id: userId, name: \`User \${userId}\`, email: '', status: 'loading' };
  }

  /**
   * Performs an immutable insert-or-replace of a user in the collection.
   * Matching is by \`id\`; if no entry exists the user is appended. Using this
   * helper ensures concurrent writes each apply cleanly to the latest committed
   * array without overwriting entries added by other in-flight operations.
   *
   * @param users - The current committed users array.
   * @param nextUser - The user record to insert or replace.
   * @returns A new array with the user inserted or updated in place.
   */
  #upsertUser(users: User[], nextUser: User): User[] {
    const index = users.findIndex((u) => u.id === nextUser.id);
    if (index === -1) return [...users, nextUser];
    return users.map((u) => (u.id === nextUser.id ? nextUser : u));
  }

  /**
   * Simulates a remote API call that resolves with user data after a short
   * random delay. User ID 999 always rejects to demonstrate how the pipeline
   * handles async errors and commits an error state for that entry without
   * disrupting the rest of the collection.
   *
   * @param userId - The ID of the user to load.
   * @returns A promise resolving with a loaded \`User\`, or rejecting for ID 999.
   */
  async #fetchUser(userId: number): Promise<User> {
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 200)
    );

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
   * Loads a single user through the full two-step commit pattern. A loading
   * placeholder is committed first so the entry is immediately visible in state.
   * The async fetch then resolves — or rejects — and a second commit captures
   * the final \`loaded\` or \`error\` status for that entry.
   *
   * @param userId - The ID of the user to load.
   * @returns A promise resolving with the committed \`UsersState\` after the user settles.
   */
  async #loadUser(userId: number): Promise<UsersState> {
    const current = this.#getUsersValue();
    const alreadyExists = current.users.some((u) => u.id === userId);

    if (!alreadyExists) {
      // Commit the loading placeholder before the async work begins
      await this.#commitUsersState({
        ...current,
        users: this.#upsertUser(current.users, this.#createLoadingUser(userId))
      });
    }

    try {
      const userData = await this.#fetchUser(userId);
      return this.#commitUsersState({
        ...this.#getUsersValue(),
        users: this.#upsertUser(this.#getUsersValue().users, userData)
      });
    } catch (error) {
      return this.#commitUsersState({
        ...this.#getUsersValue(),
        users: this.#upsertUser(this.#getUsersValue().users, {
          ...this.#createLoadingUser(userId),
          status: 'error',
          errorMessage: String(error)
        })
      });
    }
  }

  /**
   * Loads multiple users concurrently by first committing all loading
   * placeholders in a single snapshot, then dispatching parallel fetches.
   * Duplicate IDs are deduplicated so each user is fetched exactly once.
   * All placeholders appear in state before any individual fetch resolves —
   * this is the batch loading pattern that makes concurrent updates safe.
   *
   * @param userIds - The array of user IDs to load.
   * @returns A promise resolving with the final \`UsersState\` after all users settle.
   */
  async #loadUsers(userIds: number[]): Promise<UsersState> {
    const uniqueIds = [...new Set(userIds)];
    const current = this.#getUsersValue();
    const existing = new Set(current.users.map((u) => u.id));
    const pending = uniqueIds
      .filter((id) => !existing.has(id))
      .map((id) => this.#createLoadingUser(id));

    if (pending.length > 0) {
      // Commit all placeholders in one write before any fetch starts
      await this.#commitUsersState({
        ...current,
        users: [...current.users, ...pending]
      });
    }

    await Promise.all(uniqueIds.map((id) => this.#loadUser(id)));
    return this.#getUsersValue();
  }
}

// The example logic uses only runtime-neutral APIs, so this same file runs in
// Node, Bun, Deno, or the browser. \`process\` only exists in Node-like runtimes,
// so guard the call: in Node it forces a clean exit (an open RxJS subscription
// can otherwise keep the event loop alive and hang the script); everywhere else
// this is a harmless no-op.
new PromiseExample().run().then(() => {
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(0);
  }
});
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "lib": ["ES2022"],
    "module": "ES2022",
    "target": "ES2022",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "types": ["node"]
  }
}
`
  }
};
