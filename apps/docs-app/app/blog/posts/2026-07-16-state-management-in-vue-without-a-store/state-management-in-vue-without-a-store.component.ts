import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-state-management-in-vue-without-a-store',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent,
    DiagramComponent,
    PackageNameComponent
  ],
  template: `
    <sdux-blog-layout id="state-management-in-vue-without-a-store">
      <header class="docs-header">
        <p class="lead">
          Reaching for Pinia or Vuex the moment two Vue components need to share
          state has become reflex. But cross-component state does not actually
          require a global store. <sdux-brand-name [tm]="true" /> runs the same
          deterministic pipeline in Vue through a universal core API &mdash; npm
          install <sdux-package-name [package]="'core'" /> paired with the thin
          npm install <sdux-package-name [package]="'vue'" /> reactive surface.
          No adapter ceremony, no Provider tree, no store singleton. You own
          scoped, reactive, atomically-committed state in a few lines that plug
          straight into Vue's composition API.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Installing npm install
            <sdux-package-name [package]="'vue'" /> is all you need. It pulls in
            npm install <sdux-package-name [package]="'core'" /> as a
            dependency, so the full runtime and API surface come with it &mdash;
            one install, nothing else to wire up.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Install SDuX Packages'">
              <pre
                class="code-inline"><code class="language-ts">npm install &#64;sdux-vault/vue</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </header>

      <section class="section">
        <div class="section-title">The Vue State Question Beyond Pinia</div>
        <div class="section-body">
          <p>
            A global store solves a real problem: two components that are not
            parent and child still need to agree on the same data. Pinia and
            Vuex answer that by hoisting the data into an application-wide
            container that every component can reach.
          </p>
          <p>
            That answer comes with <strong>costs you inherit</strong> whether
            you want them or not. The store is a shared dependency: every slice
            lives in one reactive object, unrelated features are coupled through
            the same container, and testing a single piece of state means
            standing up the whole store. As the app grows, the store becomes the
            place every feature has to negotiate with.
          </p>
          <p>The questions worth asking are narrower than "which store?"</p>
          <div class="callout callout-info">
            <p><i>Which components actually need to share this state?</i></p>
            <p>
              <i
                >Can that ownership live with the feature instead of in a global
                tree?</i
              >
            </p>
          </div>
          <p>
            <strong><sdux-brand-name /></strong> answers by giving each domain
            concern its own isolated
            <strong><sdux-feature-cell /></strong> &mdash; a self-contained unit
            of state you import where you need it, with no central container in
            the middle.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">One Universal Core API in Vue</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> is built on a
            <strong>Plain TypeScript, Zero Magic</strong> core. Every concept
            &mdash; FeatureCells, pipelines, reducers, filters, immutable state
            snapshots &mdash; is a language-level primitive, not a framework
            abstraction. The payoff for you is direct:
            <span class="code">Vault()</span> and
            <span class="code"
              ><a href="/docs/references/functions/feature-cell">FeatureCell</a
              >()</span
            >
            are the same battle-tested core running inside your Vue app &mdash;
            no Vue-specific reimplementation, no behavior that only exists here.
          </p>
          <p>
            Vue integration is delivered as a thin wrapper, npm install
            <sdux-package-name [package]="'vue'" />, that preserves the core
            <sdux-feature-cell /> contract and adds one Vue-native addition:
            <span class="code">useReactiveState()</span>. That single composable
            connects a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>'s
            committed state to Vue's effect scope, so your component re-renders
            reactively with no manual subscription and no cleanup code.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> There is no Provider and no store
            instance to register at the root. You create a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            once as a module-level constant and import its stable reference
            wherever you need it &mdash; the same way you would import any other
            module.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Creating a FeatureCell with Vault and FeatureCell
        </div>
        <div class="section-body">
          <p>
            Two calls set up ownership. Initialize the Vault runtime once, then
            register a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            with a unique key and its initial state. Registration binds identity
            and configuration; it does not run the pipeline. Calling
            <span class="code">initialize()</span> prepares the cell for state
            updates. Create and initialize the cell <em>outside</em> the
            component so its reference stays stable across renders.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'FeatureCell'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/vue';

Vault(&#123;
  logLevel: 'off',
  devMode: false
&#125;);

export const counterCell = FeatureCell&lt;number&gt;(&#123;
  key: 'counter',
  initialState: 0
&#125;);

counterCell.initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <div class="callout callout-warning">
            <strong>Warning:</strong> Vault initialization must precede
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            registration. Registering a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            before the Vault runtime is initialized is invalid and results in a
            runtime error. Each
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            key may be registered exactly once.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Reading Reactive State in a Vue Component
        </div>
        <div class="section-body">
          <p>
            Inside the component, call
            <span class="code">useReactiveState()</span> once during
            <span class="code">setup</span> and render from the readonly
            reactive Snapshot it returns. The Snapshot exposes
            <span class="code">value</span>, <span class="code">hasValue</span>,
            <span class="code">isLoading</span>, and
            <span class="code">error</span> fields that stay reactive as state
            changes &mdash; the effect scope owns the subscription lifecycle, so
            there is nothing to unsubscribe.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Vue'">
              <pre
                class="code-inline"><code class="language-ts">&lt;script setup lang="ts"&gt;
import &#123; counterCell &#125; from './counter.cell';

const snapshot = counterCell.useReactiveState();

function increment() &#123;
  counterCell.replaceState(counterCell.state.value + 1);
&#125;
&lt;/script&gt;

&lt;template&gt;
  &lt;p v-if="snapshot.isLoading"&gt;Loading...&lt;/p&gt;
  &lt;p
    v-else-if="snapshot.error"
    role="alert"
    v-text="snapshot.error.message"&gt;
  &lt;/p&gt;
  &lt;p v-else-if="!snapshot.hasValue"&gt;No State is available.&lt;/p&gt;
  &lt;p v-else v-text="'Count: ' + snapshot.value"&gt;&lt;/p&gt;
  &lt;button type="button" @click="increment"&gt;Increment&lt;/button&gt;
&lt;/template&gt;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Two details make this example behave the way you'd expect &mdash;
            where you read reactively, and where you read imperatively.
          </p>
          <ul>
            <li>
              The handler reads
              <span class="code">counterCell.state.value</span>, not the
              reactive <span class="code">snapshot</span>. Imperative code
              &mdash; event handlers and logic outside an effect scope &mdash;
              uses the synchronous <span class="code">state</span> surface,
              while <span class="code">useReactiveState()</span> stays the
              render surface.
            </li>
            <li>
              There is no <span class="code">async</span> or
              <span class="code">await</span>.
              <span class="code">replaceState()</span> returns
              <span class="code">void</span>, and the reactive Snapshot updates
              the <span class="code">Count:</span> line on its own the moment
              the pipeline commits.
            </li>
          </ul>
          <div class="callout callout-warning">
            <strong>Warning:</strong> Call
            <span class="code">useReactiveState()</span> during component setup
            or within an active Vue effect scope. It hands the component the
            current Snapshot <em>and</em> connects it to later changes. A manual
            <span class="code">state$</span> subscription created after the cell
            has initialized can miss the emission that committed the initial
            state.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Atomic Updates and Why They Matter</div>
        <div class="section-body">
          <p>
            You update a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> by
            submitting a new value into its pipeline.
            <span class="code">replaceState()</span> fully replaces the
            committed state with the resolved incoming value;
            <span class="code">mergeState()</span> structurally combines the
            existing state with an incoming value. Both run the full pipeline
            and return <span class="code">void</span> &mdash; you never await
            anything. Call one and move on. When the pipeline commits the new
            state, the reactive Snapshot from
            <span class="code">useReactiveState()</span> updates on its own and
            your component re-renders. The commit drives the UI; your call site
            doesn't wait for it.
          </p>
          <p>
            The update does not mutate the existing state directly. The incoming
            value is resolved and processed through the pipeline, and the
            current committed state is replaced only when that work finishes.
            Your component observes the new
            <a href="/docs/references/shapes/state-snapshot-shape"
              >StateSnapshotShape</a
            >
            as one complete value &mdash; never a half-applied intermediate.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Because state snapshots are immutable
            and commitment is atomic, a Vue component reading through
            <span class="code">useReactiveState()</span> always sees a whole,
            consistent value. There is no window where the UI can render a
            partially updated state.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <!-- StackBlitz: vue-feature-cell-counter -->
          <p>
            Scoped ownership, reactive reads, and atomic updates &mdash; all in
            a few lines, with the same core engine you would run anywhere else.
            Explore the full
            <a [routerLink]="['/docs/pipeline/api/vue']"
              >Vue integration reference</a
            >
            to see <span class="code">useReactiveState()</span> in depth, and
            read the
            <a [routerLink]="['/docs/references/functions/feature-cell']"
              >FeatureCell API</a
            >
            for the full registration contract.
          </p>
          <p>
            Learn more about <sdux-brand-name /> on
            <a
              href="https://github.com/sdux-vault"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the SDuX Vault GitHub organization in a new window"
              >GitHub &rarr;</a
            >
          </p>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video videoId="m7ClyWSh754" [tooltip]="'Pipeline Overview'" />

          <sdux-video videoId="TRlvCmluBcE" [tooltip]="'Atomic State'" />

          <sdux-diagram
            image="diagrams/2.2/2.2-full-pipeline-flow.svg"
            [tooltip]="'Full Pipeline Flow'"></sdux-diagram>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogStateManagementInVueWithoutAStoreComponent {}
