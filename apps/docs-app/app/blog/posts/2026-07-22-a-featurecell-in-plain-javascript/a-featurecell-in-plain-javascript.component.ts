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
  selector: 'sdux-blog-a-featurecell-in-plain-javascript',
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
      title="A FeatureCell in Plain JavaScript — No Framework, No Build Step"
      date="2026-07-22"
      pillar="TA"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          Every state library markets itself as an accessory to a UI framework —
          a store you connect to a component tree. But a
          <sdux-feature-cell [tm]="true" /> is a plain JavaScript library at
          runtime, so it runs in raw <span class="code">node main.js</span> with
          no TypeScript, no compiler, and no build step. This post shows
          <sdux-brand-name [tm]="true" /> committing deterministic,
          pipeline-backed state with no framework in sight — and how the UI,
          when you add one, simply reads committed snapshots off
          <span class="code">state$</span>.
        </p>
      </header>

      <section class="section">
        <div class="section-title">
          State Management Isn't a Framework Feature
        </div>
        <div class="section-body">
          <p>
            The moment you have a value that changes over time, that multiple
            operations read and write, and that must stay consistent while async
            work is in flight, you have a state management problem — whether or
            not a screen is involved. Yet the instant most developers leave
            Angular, React, or Vue, they reach for a global variable or a
            hand-rolled event emitter, as if determinism were something only a
            framework could provide.
          </p>
          <p>
            It isn't. A <sdux-feature-cell /> makes no assumption about a render
            loop or a component tree. It is a headless runtime primitive: you
            create it, you commit to it, and you read confirmed snapshots back —
            with nothing but <span class="code">&#64;sdux-vault/core</span> and,
            when you want append semantics,
            <span class="code">&#64;sdux-vault/addons</span>.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">A FeatureCell in Plain node main.js</div>
        <div class="section-body">
          <p>
            There is no bootstrap ceremony. You import from
            <span class="code">&#64;sdux-vault/core</span>, initialize the Vault
            runtime once, create a cell, and activate it. The same three lines
            you would write inside a browser app run unchanged in a Node script
            executed with <span class="code">node main.js</span> — no
            <span class="code">tsc</span>, no bundler, no framework.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Bootstrapping a FeatureCell in JavaScript'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/core';

// Initialize the Vault runtime once, before any cell is created
Vault(&#123; logLevel: 'off', devMode: false &#125;);

// A counter cell with a zeroed initial state — no framework bootstrap
const cell = FeatureCell(&#123;
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
            <strong>Key takeaway:</strong> The Vault runtime must be initialized
            before any cell is created — this is what lets add-on behaviors
            register at cell creation time. After that, the code above is plain
            JavaScript. There is no framework-specific variant because there is
            no framework involved.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How This Maps From Redux</div>
        <div class="section-body">
          <p>
            Redux ships as a store you connect to a component tree and typically
            reach for through a framework's (i.e. Angular, React, etc.)
            bindings. A <sdux-feature-cell /> is plain JavaScript that runs with
            no framework and no build step — it commits deterministic state you
            read from
            <span class="code">state$</span>
            and wire into any DOM or UI layer yourself.
          </p>

          <table
            aria-label="Redux state interaction compared to a plain JavaScript FeatureCell">
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
                <td>Reached for through framework bindings</td>
                <td>Runs in raw node main.js with no build step</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — Append-Only Collections via Add-On Behaviors
        </div>
        <div class="section-body">
          <p>
            A script that accumulates records — log lines, imported rows,
            discovered files — needs append semantics, not replacement. Register
            <span class="code">withArrayAppendMergeBehavior</span> from
            <span class="code">&#64;sdux-vault/addons</span> as a
            definition-time behavior and every
            <span class="code">mergeState()</span> call concatenates the
            incoming array onto the committed collection instead of overwriting
            it. Previous entries are never discarded, only extended — and your
            script never has to remember to concatenate manually.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Append-merge behavior on a FeatureCell'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; withArrayAppendMergeBehavior &#125; from '&#64;sdux-vault/addons';
import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123; logLevel: 'off', devMode: false &#125;);

const cell = FeatureCell(
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
            is fixed for the life of the cell. Add-on behaviors are pipeline
            configuration, not runtime branching — you declare the merge stage
            once and the pipeline honors it on every write.
          </p>

          <!-- StackBlitz: vanillajs/array-append-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — Async Data Loading With Derived Counts That Stay Correct
        </div>
        <div class="section-body">
          <p>
            A script that loads users from a remote API has two recurring needs:
            track each entry through its loading lifecycle, and keep a derived
            total consistent with the committed collection. A reducer registered
            before <span class="code">initialize()</span> recomputes the derived
            value after every commit, so there is no manual counting scattered
            across call sites.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab
              [label]="'Pipeline reducer keeping a derived total in sync'">
              <pre
                class="code-inline"><code class="language-ts">const cell = FeatureCell(&#123;
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
    (current) =&gt; (&#123;
      ...current,
      totalLoaded: current.users.filter((u) =&gt; u.status === 'loaded').length
    &#125;)
  ])
  .initialize();

// Any state changes — including async fetches — go through the pipeline,
// which runs the reducer during the reducer stage. 
cell.mergeState(&#123;value : &#123; users: [users] &#125; &#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Each write commits a loading placeholder first, then the resolved or
            errored entry — and a failed fetch is isolated to its own entry
            without disturbing the rest of the collection. Because the reducer
            runs inside the pipeline, <span class="code">totalLoaded</span> can
            never drift out of sync with the users array.
          </p>

          <!-- StackBlitz: vanillajs/promise-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Use Case — A Shared State Core for a Widget or Web Component
        </div>
        <div class="section-body">
          <p>
            When you need a single value replaced atomically — a counter, a
            config object, a session record —
            <span class="code">replaceState()</span> swaps the entire committed
            value in one write. Readers always see a fully consistent snapshot,
            never a half-updated object. That determinism makes a
            <sdux-feature-cell /> a clean state core to embed inside a plain web
            component or widget, independent of whatever renders it.
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

          <!-- StackBlitz: vanillajs/replace-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Wiring Committed Snapshots to the DOM</div>
        <div class="section-body">
          <p>
            The cell never touches the DOM itself. When you add a UI, it
            subscribes to <span class="code">state$</span> and reads the
            committed snapshot off each emission — a plain
            <span class="code">addEventListener</span>-style contract you can
            point at any rendering layer. The example below is
            framework-agnostic JavaScript: the same subscription works behind a
            hand-written <span class="code">render()</span> function, a custom
            element, or a framework binding you add later.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Reading committed snapshots off state$'">
              <pre
                class="code-inline"><code class="language-ts">// state$ emits every committed snapshot — read the value and render it
cell.state$.subscribe((emit) =&gt; &#123;
  const snapshot = emit.snapshot.value;
  render(snapshot);
&#125;);

// render() is yours — plain DOM, a web component, or a framework binding
function render(snapshot) &#123;
  document.querySelector('#count').textContent = String(snapshot.count);
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The pipeline commits state; the UI
            only reads it. Because every emission is an already-committed
            snapshot, the view can never render a partial or torn update — it
            simply renders whatever the pipeline last confirmed.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Honest Limits — These Are Demos, Not Production Apps
        </div>
        <div class="section-body">
          <p>
            The vanilla JavaScript examples are teaching scripts. They prove
            that the runtime is genuinely headless and that the pipeline behaves
            the same with no framework present — they are not a blueprint for a
            production application. Each script exits explicitly once its
            sequence completes, because an open
            <span class="code">state$</span> subscription keeps the Node event
            loop alive.
          </p>

          <div class="callout callout-warning">
            <strong>Warning:</strong> Treat these as proofs of concept. A real
            application that runs long-lived cells needs its own lifecycle
            management — unsubscribing from <span class="code">state$</span>,
            deciding cell ownership, and handling teardown. The examples
            demonstrate the runtime, not a deployment architecture.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            The headless runtime is the same one the framework bindings wrap —
            so everything you learn from a plain
            <span class="code">node main.js</span>
            script transfers directly to a browser app. Explore the
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
export class BlogAFeatureCellInPlainJavascriptComponent {}
