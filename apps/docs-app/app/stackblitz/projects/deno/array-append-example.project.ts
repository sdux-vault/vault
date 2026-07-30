import { Project } from '@stackblitz/sdk';

export const arrayAppendExampleProject: Project = {
  title: 'array-append-example',
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
    "npm:@sdux-vault/addons@*": "1.0.3_rxjs@7.8.2",
    "npm:@sdux-vault/core@*": "1.0.5_rxjs@7.8.2",
    "npm:rxjs@*": "7.8.2"
  },
  "npm": {
    "@sdux-vault/addons@1.0.3_rxjs@7.8.2": {
      "integrity": "sha512-DnI/w/QOPEIJswvKkSMLhNnD+6IuWH2WKyFcG24qpcmWGeqN0Y0sNhQpTtLn/hjMQW2p7IaHtw/44FIwZprOTg==",
      "dependencies": [
        "rxjs",
        "tslib"
      ]
    },
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
    'README.md': `# SDuX Vault Deno Array Append Example

A script demonstrating array append merge behavior with SDuX Vault in plain
TypeScript running directly in Deno. Dependencies use Deno's \`npm:\` specifiers,
so no Node.js package manifest, npm installation, or TypeScript runner is needed.

## What This Example Shows

- **\`withArrayAppendMergeBehavior\`**: A definition-time add-on behavior from
  \`@sdux-vault/addons\` that changes how \`mergeState()\` writes land in the
  pipeline — each call concatenates the incoming array with the existing state
  rather than replacing it
- **Behaviors as Pipeline Configuration**: Registering a behavior at
  \`FeatureCell()\` creation time and seeing its effect on every subsequent write
- **\`initialState\` Seeding**: Starting the cell with pre-populated state so the
  first \`initialize()\` call produces a non-empty committed snapshot
- **\`reset()\`**: Clearing state to \`undefined\` without destroying the cell or
  its pipeline configuration

## This Is Not Production Code

This example is intentionally minimal. Its job is to show that SDuX Vault's
add-on behaviors work directly in Deno — nothing more. Take the pattern, wire
it to your own data model, and build from there.

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
=== SDuX Vault Deno Array Append Example ===

[CELL] Examples cell created with initialState + withArrayAppendMergeBehavior
[STATE] Initial: [Darth Vader]

[ACTION] Merging [Luke Skywalker]...
[STATE]  [Darth Vader, Luke Skywalker]

[ACTION] Merging [Han Solo, Leia Organa]...
[STATE]  [Darth Vader, Luke Skywalker, Han Solo, Leia Organa]

[ACTION] Resetting state...
[STATE]  undefined (state cleared, cell pipeline intact)

=== Done ===
\`\`\`

## How It Works

1. **Initialize Vault**: \`Vault()\` must be called before \`FeatureCell()\` when
   using behaviors from \`@sdux-vault/addons\`.
2. **Register the Behavior**: \`withArrayAppendMergeBehavior\` is passed in the
   behaviors array at \`FeatureCell()\` creation. It configures the merge stage
   of the pipeline once — all subsequent \`mergeState()\` calls use it.
3. **Seed State**: \`initialState\` in the descriptor seeds the committed value
   when \`initialize()\` is called. The commit is queued in the microtask queue,
   not applied synchronously. A \`setTimeout(0)\` tick yields to the event loop
   so the queue flushes and \`state.value\` is populated before the initial log.
4. **Await Merge Emissions**: Each \`mergeState()\` result is read by awaiting the
   next \`state\$\` emission via \`firstValueFrom(state\$.pipe(skip(1)))\`. \`skip(1)\`
   discards the BehaviorSubject's current value so the promise resolves only
   when the merge write lands.
5. **Append**: Each \`mergeState()\` call adds to the existing array rather than
   replacing it. Previous entries are never lost.

\`\`\`typescript
class ArrayAppendExample {
  #cell = FeatureCell<Example[]>(
    {
      key: 'examples',
      initialState: [{ id: 66, name: 'Darth', lastName: 'Vader' }]
    },
    [withArrayAppendMergeBehavior], // append semantics registered once here
    []
  );

  constructor() {
    // Starts the pipeline — initialState commit is queued in the microtask queue
    this.#cell.initialize();
  }

  async run(): Promise<void> {
    // setTimeout(0) lets the microtask queue flush so initialState is committed
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.info(this.#cell.state.value?.map(label).join(', '));
    // [Darth Vader]

    // Each mergeState() concatenates — it does not replace
    const after = await this.#mergeExamples([
      { id: 1, name: 'Luke', lastName: 'Skywalker' }
    ]);
    // after: [Darth Vader, Luke Skywalker]
  }
}
\`\`\`

## Why Deno for SDuX Vault?

SDuX Vault is a plain TypeScript library with no browser dependencies. Add-on
behaviors from \`npm:@sdux-vault/addons\` run directly in Deno — the same behavior
registered in an Angular or Svelte app configures the pipeline the same way here.
`,
    'src/main.ts': `import { withArrayAppendMergeBehavior } from 'npm:@sdux-vault/addons';
import { FeatureCell, Vault } from 'npm:@sdux-vault/core';
import { firstValueFrom } from 'npm:rxjs';
import { skip } from 'npm:rxjs/operators';

/**
 * Shape representing a single example entity in the FeatureCell state.
 * Used as the typed element of the \`Example[]\` collection managed by the cell.
 */
interface Example {
  /** Unique identifier for the example entry. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;
}

/**
 * Narrows the shape of each emission from \`state\$\` to the fields this
 * script reads. The \`snapshot.value\` property holds the fully committed
 * domain value after the pipeline finishes processing.
 */
interface ExamplesStateEmit {
  snapshot: {
    value: Example[] | undefined;
  };
}

/**
 * Initializes the Vault runtime before any FeatureCell is created. This is
 * required when using add-on behaviors from \`@sdux-vault/addons\` — the Vault
 * must be present before behaviors are registered at cell creation time.
 * \`logLevel: 'off'\` suppresses internal pipeline logs so the script output
 * contains only the console statements written below.
 */
Vault({ logLevel: 'off', devMode: false });

// ─── Example Runner ───────────────────────────────────────────────────────────

/**
 * Orchestrates the array append example script. The FeatureCell and all helper
 * methods live on the class so every \`await\` has a proper \`async\` context and
 * state is fully encapsulated within the single instance.
 */
class ArrayAppendExample {
  /**
   * The examples FeatureCell with a seed entry in \`initialState\` and
   * \`withArrayAppendMergeBehavior\` registered as a definition-time behavior.
   * After \`initialize()\`, every \`mergeState()\` call concatenates the incoming
   * array with the existing state rather than replacing it — previous entries
   * are never discarded, only extended.
   */
  #cell = FeatureCell<Example[]>(
    // FeatureCell descriptor (identity + initial state)
    {
      key: 'examples',
      initialState: [{ id: 66, name: 'Darth', lastName: 'Vader' }]
    },

    // Definition-time behaviors — configure the merge stage of the pipeline
    [
      // Concatenates the incoming array with the existing state on every mergeState() call
      withArrayAppendMergeBehavior
    ],

    // Controllers — none used in this example
    []
  );

  /**
   * Creates the runner and starts the FeatureCell pipeline. \`initialize()\` is
   * called here so the cell is ready before \`run()\` issues any state mutations.
   */
  constructor() {
    this.#cell.initialize();
  }

  /**
   * Runs the full example sequence: seeds initial state, merges two batches,
   * then resets. Each step awaits a confirmed committed snapshot before
   * logging so the output always reflects the actual pipeline result.
   */
  async run(): Promise<void> {
    console.info('=== SDuX Vault Deno Array Append Example ===\\n');

    // initialize() queues the initialState commit in the microtask queue.
    // A zero-timeout tick yields to the event loop so the microtask queue
    // flushes and the committed initialState is available before we read it.
    await new Promise((resolve) => setTimeout(resolve, 0));

    console.info(
      '[CELL] Examples cell created with initialState + withArrayAppendMergeBehavior'
    );
    console.info(
      \`[STATE] Initial: [\${this.#cell.state.value?.map((e) => this.#label(e)).join(', ')}]\\n\`
    );

    // Merge one entry — withArrayAppendMergeBehavior concatenates, not replaces
    console.info('[ACTION] Merging [Luke Skywalker]...');
    const after1 = await this.#mergeExamples([
      { id: 1, name: 'Luke', lastName: 'Skywalker' }
    ]);
    console.info(
      \`[STATE]  [\${after1.map((e) => this.#label(e)).join(', ')}]\\n\`
    );

    // Merge two more entries — all previous entries are preserved in the committed snapshot
    console.info('[ACTION] Merging [Han Solo, Leia Organa]...');
    const after2 = await this.#mergeExamples([
      { id: 2, name: 'Han', lastName: 'Solo' },
      { id: 3, name: 'Leia', lastName: 'Organa' }
    ]);
    console.info(
      \`[STATE]  [\${after2.map((e) => this.#label(e)).join(', ')}]\\n\`
    );

    // Reset clears state to undefined without destroying the cell or its pipeline
    console.info('[ACTION] Resetting state...');
    this.#cell.reset();
    console.info(
      \`[STATE]  \${this.#cell.state.value ?? 'undefined'} (state cleared, cell pipeline intact)\\n\`
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
   * @returns A promise resolving with the next committed \`Example[]\`.
   */
  async #waitForNextState(): Promise<Example[]> {
    const emit = await firstValueFrom<ExamplesStateEmit>(
      this.#cell.state\$.pipe(skip(1))
    );
    return emit.snapshot.value as Example[];
  }

  /**
   * Appends \`input\` to the existing state array through the pipeline and
   * returns the committed result. The \`withArrayAppendMergeBehavior\` registered
   * at cell creation concatenates \`input\` with the current state — the incoming
   * array does not replace the existing entries, it extends them.
   *
   * @param input - The array of Example records to append.
   * @returns A promise resolving with the committed \`Example[]\` after the merge.
   */
  async #mergeExamples(input: Example[]): Promise<Example[]> {
    const nextEmission = this.#waitForNextState();
    this.#cell.mergeState({ loading: false, value: input, error: null });
    return nextEmission;
  }

  /**
   * Returns a compact display label for a single example entry.
   *
   * @param e - The example to label.
   * @returns A formatted "First Last" string.
   */
  #label(e: Example): string {
    return \`\${e.name} \${e.lastName}\`;
  }
}

// Exit explicitly after the example completes because the open RxJS
// subscription can otherwise keep the Deno event loop alive.
new ArrayAppendExample().run().then(() => {
  Deno.exit(0);
});
`
  }
};
