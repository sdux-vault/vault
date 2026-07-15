import { Project } from '@stackblitz/sdk';

export const replaceExampleProject: Project = {
  title: 'vanillajs-replace-example',
  template: 'node',
  files: {
    'README.md': `# SDuX Vault Vanilla JavaScript Replace Example

A script demonstrating atomic full-state replacement with SDuX Vault running in
plain Node.js with **no TypeScript** — just JavaScript and \`node\`.

## What This Example Shows

- **State Shape**: Simple counter object with \`count\`, \`label\`, and \`lastUpdate\`
- **State Replacement**: Using \`replaceState()\` to atomically swap the entire
  state in one pipeline write
- **Awaited Confirmation**: Registering a \`state\$\` listener _before_ calling
  \`replaceState()\` so the script awaits the committed snapshot — not the raw input
- **Class-Based Runner**: All methods and the FeatureCell live on a single class
  so every \`await\` has a proper \`async\` context — no top-level await
- **No TypeScript Required**: SDuX Vault is a plain JavaScript library at
  runtime — no compiler, no build step, no type annotations needed

## This Is Not Production Code

This example is intentionally minimal. Its job is to show that SDuX Vault works
in plain JavaScript — nothing more. The patterns here are a starting point. Take
what applies to your use case and build from there.

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
=== SDuX Vault Vanilla JavaScript Replace Example ===

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

\`\`\`javascript
class ReplaceExample {
  #cell = FeatureCell({
    key: 'counter',
    initialState: {
      count: 0,
      label: 'Counter Example',
      lastUpdate: new Date().toISOString()
    }
  });

  constructor() {
    this.#cell.initialize();
  }

  async run() {
    // setTimeout(0) lets the microtask queue flush so initialState is committed
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.info(\`count=\${this.#cell.state.value?.count}\`);

    // Each write registers the listener first, then commits
    const next = await this.#replaceCounter(42, 'My Custom Count');
  }

  async #replaceCounter(count, label) {
    const nextEmission = this.#waitForNextState(); // register first
    this.#cell.replaceState({
      loading: false,
      error: null,
      value: { count, label, lastUpdate: new Date().toISOString() }
    });
    return nextEmission; // resolves with the confirmed committed state
  }
}
\`\`\`

## TypeScript vs JavaScript

This example is a direct port of the Node.js TypeScript example. The only
differences are:

| TypeScript                                                                   | JavaScript                            |
| ---------------------------------------------------------------------------- | ------------------------------------- |
| \`interface CounterState { ... }\`                                             | Removed — no type declarations        |
| \`interface CounterStateEmit { ... }\`                                         | Removed                               |
| \`FeatureCell<CounterState>(...)\`                                             | \`FeatureCell(...)\` — no generics      |
| \`async run(): Promise<void>\`                                                 | \`async run()\` — no return type        |
| \`async #replaceCounter(count: number, label: string): Promise<CounterState>\` | \`async #replaceCounter(count, label)\` |
| \`emit.snapshot.value as CounterState\`                                        | \`emit.snapshot.value\` — no cast       |
| \`tsx src/main.ts\`                                                            | \`node src/main.js\` — no compiler      |

## Why Vanilla JavaScript for SDuX Vault?

SDuX Vault's npm packages ship as compiled JavaScript. TypeScript types are
entirely optional. This example proves that every pipeline concept — \`Vault()\`,
\`FeatureCell()\`, \`replaceState()\`, \`state\$\` emissions — works with zero
compilation and zero type annotations.
`,
    'package.json': `{
  "name": "vanillajs-replace-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/main.js"
  },
  "dependencies": {
    "@sdux-vault/core": "latest",
    "rxjs": "^7.8.2"
  }
}
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
