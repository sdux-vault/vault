import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-how-to-use-the-sdux-vault-stackblitz-examples-page',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout id="how-to-use-the-sdux-vault-stackblitz-examples-page">
      <header class="docs-header">
        <p class="lead">
          The <sdux-brand-name [tm]="true" /> StackBlitz Examples page is a map
          of runnable projects, not just a list of links. Use its table of
          contents to move from a first state update to filters, reducers,
          lifecycle behavior, and framework comparisons without installing a
          local toolchain first. The important part is what you carry between
          examples: the same <sdux-feature-cell [tm]="true" /> pipeline logic
          remains in focus while the UI adapter changes.
        </p>
      </header>

      <section class="section">
        <div class="section-title">
          What the StackBlitz Examples Page Is For
        </div>
        <div class="section-body">
          <p>
            Open <a href="/docs/stack-blitz">StackBlitz Examples</a> when you
            want to study a working behavior in context. Each standard example
            is a live runnable project with its dependencies pre-configured. You
            can inspect the source, run it, change a value, and see the result
            without first creating a project or choosing a package
            configuration.
          </p>
          <p>
            The collection is intentionally progressive. Getting Started covers
            Initial State, Replace State, and Reset State. Core Patterns adds
            Error, HTTP Resource, Hydrate State, Observable, and Promise.
            Intermediate examples introduce array merges, the Delay Interceptor
            Pipeline, and the Filter &amp; Reducer Pipeline. Advanced examples
            include the Built-in Debugger, Framework Comparison, and Tab Sync.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Choose an example by the behavior you
            want to understand, then use the framework button that matches the
            UI you are building.
          </div>
          <!-- StackBlitz: Filter & Reducer Pipeline -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Finding an Example with the Table of Contents
        </div>
        <div class="section-body">
          <p>
            Start at the table of contents instead of scrolling through every
            card. The framework section is grouped into Getting Started, Core
            Patterns, Intermediate, Advanced, and Tutorial. Each group and each
            example has a fragment link, and each one has a link back to the top
            of the page. That makes the page useful as a reference while you are
            moving between a browser tab and an editor.
          </p>
          <table aria-label="StackBlitz framework example groups">
            <thead>
              <tr>
                <th scope="col" class="column-150">Group</th>
                <th scope="col" class="column-auto">Use it to explore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Getting Started</td>
                <td>Initial, replacement, and reset state flows</td>
              </tr>
              <tr>
                <td>Core Patterns</td>
                <td>Async inputs, hydration, errors, and HTTP Resource</td>
              </tr>
              <tr>
                <td>Intermediate</td>
                <td>Merge behavior, delay, filters, and reducers</td>
              </tr>
              <tr>
                <td>Advanced</td>
                <td>
                  Debugging, framework comparison, and tab synchronization
                </td>
              </tr>
              <tr>
                <td>Tutorial</td>
                <td>
                  A chapter-by-chapter path from display to Stepwise Pipeline
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            For a focused tour, jump to Filter &amp; Reducer Pipeline, then
            compare it with Tutorial Chapter 7: Filters and Reducers. Chapter
            12: State Introspection and Chapter 15: Stepwise Pipeline are useful
            follow-ups when you want to inspect snapshots or extend the flow.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Stays the Same Across Frameworks</div>
        <div class="section-body">
          <p>
            Select Angular, React, Svelte, or Vue from an example's launch
            choices. The UI code changes because each framework has its own
            component and binding model. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            contract does not. Inputs still enter the declared pipeline, where
            Resolve, Merge, Operators, Filters, and Reducers process candidates
            before the resulting immutable State snapshot is available to the
            UI.
          </p>
          <p>
            That separation is the point of the Framework Comparison example.
            Use it to ask a precise question: is this difference caused by the
            runtime pipeline, or only by the adapter that renders its output? In
            most cases, the answer is the latter. Filters and reducers stay part
            of the shared pipeline; the framework-specific layer subscribes to
            the result and presents it.
          </p>
          <div class="concept-box">
            <p>
              <strong>Read across, not just down.</strong> Open the same example
              in two framework tabs and compare the state shape, pipeline
              configuration, and UI binding separately. This turns the page into
              a cross-framework learning tool instead of four unrelated demos.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Launching and Modifying a Live Project</div>
        <div class="section-body">
          <p>
            Choose a framework, launch the project, and find the smallest file
            that answers your question. Run the original example first. Then
            change one input, one filter condition, or one displayed field and
            run it again. Keeping the first edit narrow makes it easier to see
            whether you changed pipeline logic or only presentation.
          </p>
          <ol>
            <li>Open the example from its table-of-contents link.</li>
            <li>Choose Angular, React, Svelte, or Vue.</li>
            <li>
              Run the unchanged project and identify the visible State snapshot.
            </li>
            <li>Make one small edit, save, and observe the new result.</li>
            <li>
              Duplicate the project when you want to try a larger extension.
            </li>
          </ol>
          <p>
            StackBlitz is especially useful here because the dependency setup is
            already present. You can spend the first session tracing a behavior
            rather than resolving local package versions. When an experiment
            needs files or runtime capabilities that the browser preview cannot
            provide, follow the page's local-only instructions instead.
          </p>
          <div class="callout callout-warning">
            <strong>Gotcha:</strong> A browser preview is not proof that every
            runtime example can run in StackBlitz. Read the notice on the
            example card before treating a missing launch button as an error.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Understanding Specialty Runtime and Local-Only Examples
        </div>
        <div class="section-body">
          <p>
            The Specialty Runtime Examples section is a separate track. Bun,
            Deno, VanillaJS, Node.js, and TypeScript examples are marked
            <strong>Local-Only Example</strong> and do not launch in StackBlitz.
            That label tells you the example depends on a local runtime, not
            that the underlying pipeline idea is different.
          </p>
          <table aria-label="Local-only runtime setup">
            <thead>
              <tr>
                <th scope="col" class="column-150">Runtime</th>
                <th scope="col" class="column-auto">Local workflow</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bun</td>
                <td>
                  Use local Bun with <span class="code">bun install</span> and
                  <span class="code">bun start</span>.
                </td>
              </tr>
              <tr>
                <td>Deno</td>
                <td>
                  Run <span class="code">deno run src/main.ts</span>; there is
                  no install step.
                </td>
              </tr>
              <tr>
                <td>VanillaJS</td>
                <td>
                  Use local Node.js with
                  <span class="code">npm install</span> and
                  <span class="code">npm start</span>.
                </td>
              </tr>
              <tr>
                <td>Node.js</td>
                <td>
                  Use <span class="code">npm install</span> and
                  <span class="code">npm start</span>.
                </td>
              </tr>
              <tr>
                <td>TypeScript</td>
                <td>
                  Use the Node.js example directory, then install and start it
                  locally.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Tab Sync has a different limitation: StackBlitz instances have
            unique origins, so BroadcastChannel synchronization cannot be
            demonstrated in the browser preview. Clone the repository and run
            the selected Angular, React, Svelte, or Vue example locally when you
            need to test that behavior.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Extending a Pipeline in the Browser</div>
        <div class="section-body">
          <p>
            Once the original project is clear, extend the smallest boundary
            that answers your question. Keep the pipeline responsible for
            filtering and reducing data; keep the UI adapter responsible for
            displaying the immutable snapshot. This framework-agnostic helper
            illustrates the kind of view derivation you can test after changing
            a live example's pipeline configuration:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Pure view derivation'">
              <pre
                class="code-inline"><code class="language-ts">type Character = &#123;
  id: number;
  name: string;
&#125;;

const visibleCharacters = (
  state: readonly Character[],
  query: string
): Character[] =&gt;
  state.filter((character) =&gt;
    character.name.toLowerCase().includes(query.toLowerCase())
  );</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The function is pure: it receives a snapshot and returns a derived
            collection. In a live project, you can replace the query, add a
            second condition, or compare the result with the Filter &amp;
            Reducer Pipeline example. If the same edit behaves consistently in
            Angular, React, Svelte, and Vue, you have probably changed shared
            pipeline logic. If only the rendering changes, you are working in
            the thin UI adapter where you should be.
          </p>
          <p>
            For the next step, open the
            <a href="/docs/stack-blitz">StackBlitz Examples page</a>, try the
            framework comparison, and then move to the tutorial chapter that
            matches the behavior you want to add.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogHowToUseTheSduxVaultStackblitzExamplesPageComponent {}
