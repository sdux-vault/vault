import { Project } from '@stackblitz/sdk';

export const arrayAppendExampleProject: Project = {
  title: 'vanillajs-array-append-example',
  template: 'node',
  files: {
    'README.md': `# SDuX Vault Vanilla JavaScript Array Append Example

A script demonstrating array append merge behavior with SDuX Vault running in
plain Node.js with **no TypeScript** — just JavaScript and \`node\`.

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
- **No TypeScript Required**: SDuX Vault is a plain JavaScript library at
  runtime — no compiler, no build step, no type annotations needed

## This Is Not Production Code

This example is intentionally minimal. Its job is to show that SDuX Vault's
add-on behaviors work in plain JavaScript — nothing more. Take the pattern,
wire it to your own data model, and build from there.

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
=== SDuX Vault Vanilla JavaScript Array Append Example ===

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

\`\`\`javascript
class ArrayAppendExample {
  #cell = FeatureCell(
    {
      key: 'examples',
      initialState: [{ id: 66, name: 'Darth', lastName: 'Vader' }]
    },
    [withArrayAppendMergeBehavior], // append semantics registered once here
    []
  );

  constructor() {
    this.#cell.initialize();
  }

  async run() {
    // setTimeout(0) lets the microtask queue flush so initialState is committed
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.info(
      this.#cell.state.value?.map((e) => \`\${e.name} \${e.lastName}\`).join(', ')
    );
    // Darth Vader

    // Each mergeState() concatenates — it does not replace
    const after = await this.#mergeExamples([
      { id: 1, name: 'Luke', lastName: 'Skywalker' }
    ]);
    // after: [Darth Vader, Luke Skywalker]
  }
}
\`\`\`

## TypeScript vs JavaScript

This example is a direct port of the Node.js TypeScript example. The only
differences are:

| TypeScript                                      | JavaScript                       |
| ----------------------------------------------- | -------------------------------- |
| \`interface Example { ... }\`                     | Removed — no type declarations   |
| \`FeatureCell<Example[]>(...)\`                   | \`FeatureCell(...)\` — no generics |
| \`async run(): Promise<void>\`                    | \`async run()\` — no return type   |
| \`async #waitForNextState(): Promise<Example[]>\` | \`async #waitForNextState()\`      |
| \`emit.snapshot.value as Example[]\`              | \`emit.snapshot.value\` — no cast  |
| \`tsx src/main.ts\`                               | \`node src/main.js\` — no compiler |

All ECMAScript features used here — \`class\`, private fields (\`#\`), optional
chaining (\`?.\`), nullish coalescing (\`??\`) — are native JavaScript.

## Why Vanilla JavaScript for SDuX Vault?

SDuX Vault's npm packages ship as compiled JavaScript. TypeScript types are
entirely optional. This example proves that every pipeline concept — \`Vault()\`,
\`FeatureCell()\`, behaviors, \`mergeState()\`, \`state\$\` emissions — works with zero
compilation and zero type annotations.
`,
    'package.json': `{
  "name": "vanillajs-array-append-example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/main.js"
  },
  "dependencies": {
    "@sdux-vault/addons": "latest",
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
