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
  selector: 'sdux-blog-state-management-without-a-ui-on-deno',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  template: `
    <sdux-blog-layout
      title="State Management Without a UI — Running SDuX Vault on Deno"
      date="2026-07-21"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          "State management" is almost always sold as a UI concern — a store
          bolted onto a component tree. But a <sdux-feature-cell /> is plain
          TypeScript with no framework dependency, so it runs anywhere a runtime
          does. This post shows <sdux-brand-name /> orchestrating deterministic,
          pipeline-committed state inside Deno with nothing but
          <span class="code">&#64;sdux-vault/core</span>.
        </p>
      </header>

      <section class="section">
        <div class="section-title">
          Why State Management Isn't Just a UI Problem
        </div>
        <div class="section-body">
          <p>
            The moment you have a value that changes over time, that multiple
            operations read and write, and that must stay consistent while async
            work is in flight, you have a state management problem — whether or
            not a screen is involved. A CLI that fetches records in batches, a
            job that hydrates a cache, an edge function that tracks a counter:
            all of them coordinate mutable state under concurrency.
          </p>
          <p>
            Most libraries answer that problem only for the browser. They wire
            their store to a component tree and assume a render loop exists. A
            <sdux-feature-cell /> makes no such assumption. It is a headless
            runtime primitive: you create it, you commit to it, and you read
            confirmed snapshots back — no DOM, no framework, no render cycle
            required.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">A FeatureCell Is Plain TypeScript</div>
        <div class="section-body">
          <p>
            A <sdux-feature-cell /> is not a UI widget with state attached. It
            is a typed state pipeline. On Deno, you import
            <span class="code">&#64;sdux-vault/core</span> through an
            <span class="code">npm:</span> specifier, initialize the Vault
            runtime once, create a cell, and activate it. That is the entire
            bootstrap — the same runtime you would use inside a browser app.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Bootstrapping a FeatureCell on Deno'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, Vault &#125; from 'npm:&#64;sdux-vault/core';

// Initialize the Vault runtime once, before any cell is created
Vault(&#123; logLevel: 'off', devMode: false &#125;);

// A counter cell with a zeroed initial state — no framework bootstrap
const cell = FeatureCell&lt;CounterState&gt;(&#123;
  key: 'counter',
  initialState: &#123;
    count: 0,
    label: 'Counter Example',
    lastUpdate: new Date().toISOString()
  &#125;
&#125;);

// Explicit activation starts the pipeline
cell.initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> This snippet is the
            <span class="code">&#64;sdux-vault/core</span> headless runtime — it
            is identical whether it runs in a browser tab or a Deno process.
            There is no framework-specific variant because there is no framework
            involved.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How State Interaction Maps From Redux</div>
        <div class="section-body">
          <p>
            If you reach for Redux the instant you hear "shared state," the
            headless model is a small shift. Redux positions its store as
            application UI state wired to a component tree. A
            <sdux-feature-cell /> commits deterministic state through the same
            pipeline regardless of where it runs — the interaction surface does
            not change when the UI disappears.
          </p>

          <table
            aria-label="Redux state interaction compared to a FeatureCell on Deno">
            <thead>
              <tr>
                <th scope="col" class="column-150">Concern</th>
                <th scope="col" class="column-auto">Redux</th>
                <th scope="col" class="column-auto"><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Where state lives</td>
                <td>One global store wired to the component tree</td>
                <td>The owning FeatureCell instance — no tree required</td>
              </tr>
              <tr>
                <td>Reading state</td>
                <td>Selectors project from a global tree</td>
                <td>state property / state$ stream on the cell</td>
              </tr>
              <tr>
                <td>Updating state</td>
                <td>dispatch broadcasts an action to every reducer</td>
                <td>mergeState() / replaceState() target the cell directly</td>
              </tr>
              <tr>
                <td>Runtime</td>
                <td>Assumes a browser render loop</td>
                <td>Runs anywhere a JavaScript runtime does</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — Collection Orchestration in a CLI or Script
        </div>
        <div class="section-body">
          <p>
            A script that accumulates records — log lines, imported rows,
            discovered files — needs append semantics, not replacement. Register
            <span class="code">withArrayAppendMergeBehavior</span> at cell
            creation and every <span class="code">mergeState()</span> call
            concatenates the incoming array onto the committed collection
            instead of overwriting it. Previous entries are never discarded,
            only extended.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Append-merge behavior on a FeatureCell'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; withArrayAppendMergeBehavior &#125; from 'npm:&#64;sdux-vault/addons';
import &#123; FeatureCell, Vault &#125; from 'npm:&#64;sdux-vault/core';

Vault(&#123; logLevel: 'off', devMode: false &#125;);

const cell = FeatureCell&lt;Example[]&gt;(
  // FeatureCell descriptor (identity + initial state)
  &#123;
    key: 'examples',
    initialState: [&#123; id: 66, name: 'Darth', lastName: 'Vader' &#125;]
  &#125;,

  // Definition-time behaviors — configure the merge stage of the pipeline
  [
    withArrayAppendMergeBehavior
  ],

  // Controllers — none used in this example
  []
);

cell.initialize();

// Each merge concatenates, it does not replace
cell.mergeState(&#123; loading: false, value: input, error: null &#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The behavior array is a definition-time argument, so the merge rule
            is fixed for the life of the cell. Your script never has to remember
            to concatenate manually — the pipeline does it on every write.
          </p>

          <!-- StackBlitz: deno/array-append-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — Async Data Loading With Derived State in a Job
        </div>
        <div class="section-body">
          <p>
            A background job that loads users from a remote API has two
            recurring needs: track each entry through its loading lifecycle, and
            keep a derived total consistent with the committed collection. A
            reducer registered before <span class="code">initialize()</span>
            recomputes the derived value after every commit, so there is no
            manual counting scattered across call sites.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Pipeline reducer keeping a derived total in sync'">
              <pre
                class="code-inline"><code class="language-ts">const cell = FeatureCell&lt;UsersState&gt;(&#123;
  key: 'users',
  initialState: &#123;
    users: [],
    totalLoaded: 0,
    lastRefresh: new Date().toISOString()
  &#125;
&#125;);

// Pure reducer: recompute totalLoaded from the committed collection.
// Runs after every pipeline commit — no manual counting in call sites.
cell
  .reducers([
    (current) => (&#123;
      ...current,
      totalLoaded: current.users.filter((u) => u.status === 'loaded').length
    &#125;)
  ])
  .initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Each write commits a loading placeholder first, then the resolved or
            errored entry — and a failed fetch is isolated to its own entry
            without disturbing the rest of the collection. Because the reducer
            runs inside the pipeline, <span class="code">totalLoaded</span>
            can never drift out of sync with the users array.
          </p>

          <!-- StackBlitz: deno/promise-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — Deterministic State for Edge Functions and Prototyping
        </div>
        <div class="section-body">
          <p>
            When you need a single value replaced atomically — a counter, a
            config object, a session record —
            <span class="code">replaceState()</span> swaps the entire committed
            value in one write. Readers always see a fully consistent snapshot,
            never a half-updated object. That determinism makes a
            <sdux-feature-cell /> a clean fit for edge functions and for
            prototyping state logic before any UI exists.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Atomic replaceState and reset'">
              <pre
                class="code-inline"><code class="language-ts">cell.replaceState(&#123;
  loading: false,
  error: null,
  value: &#123; count, label, lastUpdate: new Date().toISOString() &#125;
&#125;);

// Clear the value without destroying the cell or its pipeline
cell.reset();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <!-- StackBlitz: deno/replace-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Honest Limits — These Are Demos, Not Production Servers
        </div>
        <div class="section-body">
          <p>
            The Deno examples are teaching scripts. They prove that the runtime
            is genuinely headless and that the pipeline behaves the same off the
            browser — they are not a blueprint for a production service. Each
            script exits explicitly once its sequence completes, because an open
            <span class="code">state$</span> subscription keeps the Deno event
            loop alive.
          </p>

          <div class="callout callout-warning">
            <strong>Warning:</strong> Treat these as proofs of concept. A server
            that runs long-lived cells needs its own lifecycle management —
            unsubscribing from <span class="code">state$</span>, deciding cell
            ownership per request or per process, and handling shutdown. The
            examples demonstrate the runtime, not deployment architecture.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            The headless runtime is the same one the framework bindings wrap —
            so everything you learn writing a Deno script transfers directly to
            a browser app. Explore the
            <a routerLink="/docs/pipeline/api">FeatureCell API</a> to see the
            full interaction surface, or read
            <a routerLink="/docs/migration">the migration guide</a> to map your
            existing Redux store, selectors, and reducers onto a
            <sdux-feature-cell />.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogStateManagementWithoutAUiOnDenoComponent {}
