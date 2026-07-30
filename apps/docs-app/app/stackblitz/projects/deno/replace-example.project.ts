import { Project } from '@stackblitz/sdk';

export const replaceExampleProject: Project = {
  title: 'replace-example',
  template: 'node',
  files: {
    'deno.json': `{
  "tasks": {
    "start": "deno run src/main.ts"
  }
}
`,
    'deno.lock': `{
  "version": "5",
  "specifiers": {
    "npm:@sdux-vault/core@*": "1.0.5_rxjs@7.8.2",
    "npm:rxjs@*": "7.8.2"
  },
  "npm": {
    "@sdux-vault/core@1.0.5_rxjs@7.8.2": {
      "integrity": "sha512-g3FBzzSYc3UFK9VhOvJQjYq41YoiHgjbCp801rBcJEKAivpk1/bj96JrqGKfQPtdzu+pXXjJ9WBUwUOAi+Sfgg==",
      "dependencies": [
        "@sdux-vault/engine",
        "rxjs",
        "tslib"
      ]
    },
    "@sdux-vault/devtools@1.0.6_rxjs@7.8.2": {
      "integrity": "sha512-Hpn+7huQow7QQzOBfA63JVzFsw0Y7b1ctFtltjjE4R33Pi1k59yNY79lW5rrX7viTGYk5vno7xmXiI8315lTLw==",
      "dependencies": [
        "rxjs",
        "tslib"
      ]
    },
    "@sdux-vault/engine@1.0.5_rxjs@7.8.2": {
      "integrity": "sha512-qa8OsLbOOgaZfBYQzZy1cQLm+SIWlz5/bdolTrNsuxQFdqKCeVJwYFwV61Ei4pGbrOG0Sg8zKuvwfHeMOYUc7w==",
      "dependencies": [
        "@sdux-vault/devtools",
        "@sdux-vault/shared",
        "rxjs",
        "tslib"
      ]
    },
    "@sdux-vault/shared@1.0.4_rxjs@7.8.2": {
      "integrity": "sha512-Q0mH4gHBlSN1Ir0YYX82fUbNsKrKMUbKV6mtvmL8UbVL43cqByxGgH5Xifivto2k1rHfZMFPtGJQ593rBfX/Ww==",
      "dependencies": [
        "rxjs",
        "tslib"
      ]
    },
    "rxjs@7.8.2": {
      "integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
      "dependencies": [
        "tslib"
      ]
    },
    "tslib@2.8.1": {
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w=="
    }
  }
}
`,
    'README.md': `# SDuX Vault Deno Replace Example

A script demonstrating atomic full-state replacement with SDuX Vault in plain
TypeScript running directly in Deno. Dependencies use Deno's \`npm:\` specifiers,
so no Node.js package manifest, npm installation, or TypeScript runner is needed.

## What This Example Shows

- **State Shape**: Simple \`CounterState\` with \`count\`, \`label\`, and \`lastUpdate\`
- **State Replacement**: Using \`replaceState()\` to atomically swap the entire
  state in one pipeline write
- **Awaited Confirmation**: Registering a \`state\$\` listener _before_ calling
  \`replaceState()\` so the script awaits the committed snapshot — not the raw input
- **Class-Based Runner**: All methods and the FeatureCell live on a single class
  so every \`await\` has a proper \`async\` context — no top-level await, no
  frameworks, no HTTP server, just plain TypeScript

## This Is Not Production Code

This example is intentionally minimal. Its job is to show that SDuX Vault works
directly in Deno — nothing more. The patterns here are a starting point. Take
what applies to your use case and build from there.

> The runner calls \`Deno.exit(0)\` after completion because an open RxJS
> subscription can otherwise keep the event loop alive.

## Prerequisites

- Deno 2 or later

## Quick Start

\`\`\`bash
deno run src/main.ts
\`\`\`

## Expected Output

\`\`\`
=== SDuX Vault Deno Replace Example ===

[CELL] Counter cell created
[STATE] Initial: count=0, label="Counter Example"

[ACTION] Incrementing counter...
[STATE]  count=1, label="Counter Example"

[ACTION] Incrementing counter...
[STATE]  count=2, label="Counter Example"

[ACTION] Incrementing counter...
[STATE]  count=3, label="Counter Example"

[ACTION] Replacing with custom state: count=42, label="My Custom Count"
[STATE]  count=42, label="My Custom Count"

[ACTION] Incrementing counter...
[STATE]  count=43, label="My Custom Count"

[ACTION] Resetting counter to zero...
[STATE]  count=0, label="Counter Reset"

=== Done ===
\`\`\`

## How It Works

1. **Create**: \`FeatureCell()\` builds the state container; \`initialize()\` is
   called in the constructor to start the pipeline.
2. **Await Initial State**: \`initialize()\` queues the initialState commit in the
   microtask queue. A \`setTimeout(0)\` tick yields to the event loop so the queue
   flushes and \`state.value\` is populated before the initial log.
3. **Listen**: Before every \`replaceState()\` write, \`#waitForNextState()\` registers
   a \`firstValueFrom(state\$.pipe(skip(1)))\` listener. \`skip(1)\` discards the
   BehaviorSubject's current value so the promise resolves only with the next
   real emission.
4. **Write**: \`replaceState()\` sends the new value through the pipeline.
5. **Confirm**: The awaited promise resolves with the committed snapshot.

\`\`\`typescript
class ReplaceExample {
  #cell = FeatureCell<CounterState>({
    key: 'counter',
    initialState: { count: 0, label: 'Counter Example', ... }
  });

  constructor() {
    this.#cell.initialize();
  }

  async run(): Promise<void> {
    // setTimeout(0) lets the microtask queue flush so initialState is committed
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.info(\`count=\${this.#cell.state.value?.count}\`);

    // Each write registers the listener first, then commits
    const next = await this.#replaceCounter(42, 'My Custom Count');
  }

  async #replaceCounter(count: number, label: string): Promise<CounterState> {
    const nextEmission = this.#waitForNextState(); // register first
    this.#cell.replaceState({ loading: false, error: null, value: { count, label, ... } });
    return nextEmission; // resolves with the confirmed committed state
  }
}
\`\`\`

## Why Deno for SDuX Vault?

SDuX Vault is a plain TypeScript library with no browser dependencies. The same
\`FeatureCell\` API that manages UI state in Angular, React, Vue, or Svelte works
runs directly in Deno through \`npm:@sdux-vault/core\`. The conductor queue
serializes writes, so the correctness guarantees remain the same.
`,
    'src/main.ts': `import { FeatureCell, Vault } from 'npm:@sdux-vault/core';
import { firstValueFrom } from 'npm:rxjs';
import { skip } from 'npm:rxjs/operators';

/**
 * Defines the domain state managed by the counter FeatureCell.
 * Every field is replaced atomically on each pipeline commit so readers
 * always see a fully consistent snapshot — never a partially updated object.
 */
interface CounterState {
  /** Current counter value, incremented by each pipeline write. */
  count: number;

  /** Descriptive label carried forward unchanged through increments. */
  label: string;

  /** ISO timestamp of the last committed state update. */
  lastUpdate: string;
}

/**
 * Narrows the shape of each emission from \`state\$\` to the fields this
 * script reads. The \`snapshot.value\` property holds the fully committed
 * domain value after the pipeline finishes processing.
 */
interface CounterStateEmit {
  snapshot: {
    value: CounterState | undefined;
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
 * Orchestrates the replace example script. The FeatureCell and all helper
 * methods live on the class so every \`await\` has a proper \`async\` context and
 * state is fully encapsulated within the single instance.
 */
class ReplaceExample {
  /**
   * The counter FeatureCell with a zeroed initial state. No Vault configuration
   * or framework bootstrap is needed — SDuX Vault runs as a plain TypeScript
   * module in Deno with no extra wiring.
   */
  #cell = FeatureCell<CounterState>({
    key: 'counter',
    initialState: {
      count: 0,
      label: 'Counter Example',
      lastUpdate: new Date().toISOString()
    }
  });

  /**
   * Creates the runner and starts the FeatureCell pipeline. \`initialize()\` is
   * called here so the cell is ready before \`run()\` issues any state mutations.
   */
  constructor() {
    this.#cell.initialize();
  }

  /**
   * Runs the full example sequence: reads initial state, increments three times,
   * replaces with a custom value, then resets to zero. Each step awaits a
   * confirmed committed snapshot before logging.
   */
  async run(): Promise<void> {
    console.info('=== SDuX Vault Deno Replace Example ===\\n');

    // initialize() queues the initialState commit in the microtask queue.
    // A zero-timeout tick yields to the event loop so the microtask queue
    // flushes and the committed initialState is available before we read it.
    await new Promise((resolve) => setTimeout(resolve, 0));

    console.info('[CELL] Counter cell created');
    console.info(
      \`[STATE] Initial: count=\${this.#cell.state.value?.count}, label="\${this.#cell.state.value?.label}"\\n\`
    );

    // Increment three times — each call awaits a confirmed committed snapshot
    for (let i = 0; i < 3; i++) {
      console.info('[ACTION] Incrementing counter...');
      const state = await this.#incrementCounter();
      console.info(\`[STATE]  count=\${state.count}, label="\${state.label}"\\n\`);
    }

    // Replace with an entirely different state in one atomic write
    console.info(
      '[ACTION] Replacing with custom state: count=42, label="My Custom Count"'
    );
    const replaced = await this.#replaceCounter(42, 'My Custom Count');
    console.info(
      \`[STATE]  count=\${replaced.count}, label="\${replaced.label}"\\n\`
    );

    // Increment once more — shows the counter continuing from the replaced state
    console.info('[ACTION] Incrementing counter...');
    const afterReplace = await this.#incrementCounter();
    console.info(
      \`[STATE]  count=\${afterReplace.count}, label="\${afterReplace.label}"\\n\`
    );

    // Reset to zero — the label also changes to reflect the reset intent
    console.info('[ACTION] Resetting counter to zero...');
    const reset = await this.#replaceCounter(0, 'Counter Reset');
    console.info(\`[STATE]  count=\${reset.count}, label="\${reset.label}"\\n\`);

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
   * @returns A promise resolving with the next committed \`CounterState\`.
   */
  async #waitForNextState(): Promise<CounterState> {
    const emit = await firstValueFrom<CounterStateEmit>(
      this.#cell.state\$.pipe(skip(1))
    );
    return emit.snapshot.value as CounterState;
  }

  /**
   * Replaces the entire counter state atomically and returns the committed
   * result. The next-emission listener is registered before \`replaceState\` is
   * called so the promise resolves with exactly the snapshot produced by this
   * write — not a stale value from a previous commit.
   *
   * @param count - The new counter value.
   * @param label - The new counter label.
   * @returns A promise resolving with the committed \`CounterState\`.
   */
  async #replaceCounter(count: number, label: string): Promise<CounterState> {
    const nextEmission = this.#waitForNextState();
    this.#cell.replaceState({
      loading: false,
      error: null,
      value: { count, label, lastUpdate: new Date().toISOString() }
    });
    return nextEmission;
  }

  /**
   * Increments the counter by one and commits the change through the pipeline.
   * The current label is read from the live cell state so only \`count\` and
   * \`lastUpdate\` change — the label carries forward unchanged.
   *
   * @returns A promise resolving with the committed \`CounterState\`.
   */
  async #incrementCounter(): Promise<CounterState> {
    const current = this.#cell.state.value ?? {
      count: 0,
      label: 'Counter Example',
      lastUpdate: ''
    };
    return this.#replaceCounter(current.count + 1, current.label);
  }
}

// Exit explicitly after the example completes because the open RxJS
// subscription can otherwise keep the Deno event loop alive.
new ReplaceExample().run().then(() => {
  Deno.exit(0);
});
`
  }
};
