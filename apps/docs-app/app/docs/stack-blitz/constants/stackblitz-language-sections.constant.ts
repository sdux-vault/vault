/** Language-specific example section definitions for specialty runtimes. */
export function createLanguageSections(brandName: string) {
  const sections = [
    {
      heading: 'Bun',
      id: 'bun',
      icon: 'assets/brand/bun/bun-icon.svg',
      description:
        'Server-side state management with Bun — a learning example for the SDuX pipeline model running outside the browser. These examples require a local Bun installation and are not available in the StackBlitz browser runtime.',
      examples: [
        {
          title: 'Replace State',
          id: 'bun-replace-state',
          exampleName: 'replace-example',
          localOnly: true,
          notice: `
            <p>
              Bun examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/bun/replace-example</code></li>
              <li><code>bun install</code></li>
              <li><code>bun start</code></li>
            </ol>
            <p>
              This example demonstrates server-side state replacement using
              <code>Bun.serve()</code> and ${brandName}.
            </p>
          `,
          description: `Demonstrates server-side replaceState with Bun — ${brandName} manages a local HTTP counter service through deterministic state replacement. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun. Refer to the README file.`,
          languages: [{ name: 'Bun', key: 'bun' }]
        },
        {
          title: 'Promise',
          id: 'bun-promise',
          exampleName: 'promise-example',
          localOnly: true,
          notice: `
            <p>
              Bun examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/bun/promise-example</code></li>
              <li><code>bun install</code></li>
              <li><code>bun start</code></li>
            </ol>
            <p>
              This example demonstrates deterministic async state loading with
              Promise-based API calls and local Bun execution.
            </p>
          `,
          description: `Demonstrates Promise-driven state updates with Bun — ${brandName} loads async user data through deterministic settlement boundaries and ordered reducers. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun. Refer to the README file.`,
          languages: [{ name: 'Bun', key: 'bun' }]
        },
        {
          title: 'HTTP Resource',
          id: 'bun-http-resource',
          exampleName: 'http-resource-example',
          localOnly: true,
          notice: `
            <p>
              Bun examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/bun/http-resource-example</code></li>
              <li><code>bun install</code></li>
              <li><code>bun start</code></li>
            </ol>
            <p>
              This example demonstrates HTTP resource orchestration with Bun,
              remote fetches, and deterministic pipeline settlement.
            </p>
          `,
          description: `Demonstrates HTTP resource management with Bun — ${brandName} fetches remote API data and commits state deterministically through a local Bun server. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun. Refer to the README file.`,
          languages: [{ name: 'Bun', key: 'bun' }]
        }
      ]
    },
    {
      heading: 'VanillaJS',
      id: 'vanillajs',
      icon: 'assets/brand/vanillajs/vanillajs-icon.svg',
      description:
        'Plain JavaScript state management with Node.js — learning examples for the SDuX pipeline model with no TypeScript, no bundler, and no framework. These examples require a local Node.js installation.',
      examples: [
        {
          title: 'Array Append',
          id: 'vanillajs-array-append',
          exampleName: 'array-append-example',
          localOnly: true,
          notice: `
            <p>
              VanillaJS examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/vanillajs/array-append-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates array append merge behavior using
              plain JavaScript and ${brandName}.
            </p>
          `,
          description: `Demonstrates mergeState with withArrayAppendMergeBehavior in plain JavaScript — ${brandName} concatenates incoming arrays with existing FeatureCell state on every mergeState() call, with no TypeScript or build step required. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'VanillaJS', key: 'vanillajs' }]
        },
        {
          title: 'Promise',
          id: 'vanillajs-promise',
          exampleName: 'promise-example',
          localOnly: true,
          notice: `
            <p>
              VanillaJS examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/vanillajs/promise-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates async Promise-based state updates using
              plain JavaScript and ${brandName}.
            </p>
          `,
          description: `Demonstrates async Promise-based state updates in plain JavaScript — ${brandName} handles two-step async commits with loading placeholders and settled results through a reducer-derived pipeline, with no TypeScript or build step required. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'VanillaJS', key: 'vanillajs' }]
        },
        {
          title: 'Replace State',
          id: 'vanillajs-replace-state',
          exampleName: 'replace-example',
          localOnly: true,
          notice: `
            <p>
              VanillaJS examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/vanillajs/replace-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates atomic full-state replacement using
              plain JavaScript and ${brandName}.
            </p>
          `,
          description: `Demonstrates replaceState in plain JavaScript — ${brandName} atomically swaps the entire FeatureCell state in a single pipeline write, with no TypeScript or build step required. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'VanillaJS', key: 'vanillajs' }]
        }
      ]
    },
    {
      heading: 'Node.js',
      id: 'nodejs',
      icon: 'assets/brand/nodejs/nodejs-icon.svg',
      description:
        'Server-side state management with Node.js — learning examples for the SDuX pipeline model running outside the browser. These examples require a local Node.js installation.',
      examples: [
        {
          title: 'Array Append',
          id: 'nodejs-array-append',
          exampleName: 'array-append-example',
          localOnly: true,
          notice: `
            <p>
              Node.js examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/array-append-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates array append merge behavior with
              Node.js and ${brandName}.
            </p>
          `,
          description: `Demonstrates mergeState with withArrayAppendMergeBehavior in Node.js — ${brandName} concatenates incoming arrays with existing FeatureCell state on every mergeState() call, with initialState seeding and reset support. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'Node.js', key: 'nodejs' }]
        },
        {
          title: 'Promise',
          id: 'nodejs-promise',
          exampleName: 'promise-example',
          localOnly: true,
          notice: `
            <p>
              Node.js examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/promise-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates async Promise-based state updates with
              Node.js and ${brandName}.
            </p>
          `,
          description: `Demonstrates async Promise-based state updates in Node.js — ${brandName} handles two-step async commits with loading placeholders, concurrent fetches, and reducer-derived totals. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'Node.js', key: 'nodejs' }]
        },
        {
          title: 'Replace State',
          id: 'nodejs-replace-state',
          exampleName: 'replace-example',
          localOnly: true,
          notice: `
            <p>
              Node.js examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/replace-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates atomic full-state replacement with
              Node.js and ${brandName}.
            </p>
          `,
          description: `Demonstrates replaceState in Node.js — ${brandName} atomically swaps the entire FeatureCell state in a single pipeline write, with awaited confirmation via state$ before the next operation proceeds. Run the example locally with Node.js. Refer to the README file.`,
          languages: [{ name: 'Node.js', key: 'nodejs' }]
        }
      ]
    },
    {
      heading: 'TypeScript',
      id: 'typescript',
      icon: 'assets/brand/typescript/typescript-icon.svg',
      description:
        'State management in plain TypeScript — runtime-neutral learning examples for the SDuX pipeline model that run anywhere TypeScript runs, including Node.js, Bun, and Deno. These examples require a local Node.js installation to run.',
      examples: [
        {
          title: 'Array Append',
          id: 'typescript-array-append',
          exampleName: 'array-append-example',
          localOnly: true,
          notice: `
            <p>
              TypeScript examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/array-append-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates array append merge behavior in plain
              TypeScript with ${brandName}.
            </p>
          `,
          description: `Demonstrates mergeState with withArrayAppendMergeBehavior in plain TypeScript — ${brandName} concatenates incoming arrays with existing FeatureCell state on every mergeState() call, with initialState seeding and reset support. Runtime-neutral TypeScript that runs anywhere TypeScript runs. Refer to the README file.`,
          languages: [{ name: 'TypeScript', key: 'typescript' }]
        },
        {
          title: 'Promise',
          id: 'typescript-promise',
          exampleName: 'promise-example',
          localOnly: true,
          notice: `
            <p>
              TypeScript examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/promise-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates async Promise-based state updates in plain
              TypeScript with ${brandName}.
            </p>
          `,
          description: `Demonstrates async Promise-based state updates in plain TypeScript — ${brandName} handles two-step async commits with loading placeholders, concurrent fetches, and reducer-derived totals. Runtime-neutral TypeScript that runs anywhere TypeScript runs. Refer to the README file.`,
          languages: [{ name: 'TypeScript', key: 'typescript' }]
        },
        {
          title: 'Replace State',
          id: 'typescript-replace-state',
          exampleName: 'replace-example',
          localOnly: true,
          notice: `
            <p>
              TypeScript examples are designed to run locally and are not available in
              the StackBlitz browser runtime.
            </p>
            <p>To run this example locally:</p>
            <ol>
              <li><code>git clone https://github.com/sdux-vault/stackblitz-examples.git</code></li>
              <li><code>cd stackblitz-examples/stackblitz/nodejs/replace-example</code></li>
              <li><code>npm install</code></li>
              <li><code>npm start</code></li>
            </ol>
            <p>
              This example demonstrates atomic full-state replacement in plain
              TypeScript with ${brandName}.
            </p>
          `,
          description: `Demonstrates replaceState in plain TypeScript — ${brandName} atomically swaps the entire FeatureCell state in a single pipeline write, with awaited confirmation via state$ before the next operation proceeds. Runtime-neutral TypeScript that runs anywhere TypeScript runs. Refer to the README file.`,
          languages: [{ name: 'TypeScript', key: 'typescript' }]
        }
      ]
    }
  ];

  return sections
    .sort((a, b) => a.heading.localeCompare(b.heading))
    .map((section) => ({
      ...section,
      examples: [...section.examples].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }));
}
