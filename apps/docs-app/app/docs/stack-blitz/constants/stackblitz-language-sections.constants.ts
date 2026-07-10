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
          description: `Demonstrates server-side replaceState with Bun — ${brandName} manages a local HTTP counter service through deterministic state replacement. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun.`,
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
          description: `Demonstrates Promise-driven state updates with Bun — ${brandName} loads async user data through deterministic settlement boundaries and ordered reducers. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun.`,
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
          description: `Demonstrates HTTP resource management with Bun — ${brandName} fetches remote API data and commits state deterministically through a local Bun server. A learning example for the SDuX pipeline model; not a production-hardened server. Run the example locally with Bun.`,
          languages: [{ name: 'Bun', key: 'bun' }]
        }
      ]
    }
  ];

  return sections.map((section) => ({
    ...section,
    examples: [...section.examples].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  }));
}
