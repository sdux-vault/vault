import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-svelte-reactivity-without-a-second-state-subscription',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  template: `
    <sdux-blog-layout
      id="svelte-reactivity-without-a-second-state-subscription">
      <header class="docs-header">
        <p class="lead">
          Svelte state integration should not require a second subscription in
          every component. <sdux-brand-name [tm]="true" /> keeps the core
          <sdux-feature-cell [tm]="true" /> contract intact while
          <span class="code"><sdux-package-name [package]="'svelte'" /></span>
          makes the existing <strong>State Snapshot</strong> reactive through
          Svelte 5 effects.
        </p>
        <p>
          The result is a Svelte-native read model: create the
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          once, read <strong>state</strong> through <strong>$derived</strong>,
          and render the current Snapshot. The wrapper connects that read to the
          Svelte effect lifecycle without asking the component to manage a
          separate <strong>state$</strong> subscription and cleanup path.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> The Svelte integration preserves
            synchronous Snapshot access while making reads of the existing
            <span class="code">state</span> getter reactive inside Svelte.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">Why Svelte Needs an Integration Wrapper</div>
        <div class="section-body">
          <p>
            The core
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            already exposes a FluentApi, a synchronous State Snapshot, and a
            State Stream. Svelte adds its own reactive effect model, so the
            integration challenge is not replacing the core state contract. It
            is connecting an existing state read to the lifecycle that Svelte
            understands.
          </p>
          <p>
            <span class="code"><sdux-package-name [package]="'svelte'" /></span>
            is that integration wrapper. The
            <a href="/docs/references/classes/svelte-feature-cell-adapter"
              >SvelteFeatureCellAdapter</a
            >
            receives the core
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            preserves its original State getter, and returns the same cell with
            a Svelte-aware State getter. Your Svelte component still reads a
            Snapshot; the wrapper supplies the reactive connection behind that
            read.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Version requirement:</strong>
              <span class="code"
                ><sdux-package-name [package]="'svelte'"
              /></span>
              requires Svelte 5.7 or a later Svelte 5 release because its
              reactive State getter uses
              <span class="code">createSubscriber()</span>.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Install the Svelte Integration</div>
        <div class="section-body">
          <p>
            The Svelte package is available separately from the core APIs. You
            can use the core APIs in a Svelte application without the package,
            but the Svelte-reactive <strong>state</strong> getter is supplied by
            <span class="code"><sdux-package-name [package]="'svelte'" /></span
            >.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Svelte'">
              <pre
                class="code-inline"><code class="language-ts">npm install &#64;sdux-vault/svelte</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Create the FeatureCell Outside the Component
        </div>
        <div class="section-body">
          <p>
            Create and initialize the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> in
            a stable module, then import that reference into the Svelte
            component. This keeps cell creation separate from component
            rendering while allowing the component to read the same reactive
            Snapshot.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'FeatureCell'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/svelte';

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
        </div>
      </section>

      <section class="section">
        <div class="section-title">Read the Snapshot Through $derived</div>
        <div class="section-body">
          <p>
            In the Svelte component, derive a local reference from
            <span class="code">counterCell.state</span>. The adapter tracks the
            reactive read, returns the current synchronous Snapshot, and lets
            Svelte reevaluate the derived value when State changes.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Svelte'">
              <pre
                class="code-inline"><code class="language-ts">&lt;script lang="ts"&gt;
import &#123; counterCell &#125; from './counter.cell';

let snapshot = $derived(counterCell.state);
&lt;/script&gt;

&#123;#if snapshot.isLoading&#125;
  &lt;p&gt;Loading...&lt;/p&gt;
&#123;:else if snapshot.error&#125;
  &lt;p role="alert"&gt;&#123;snapshot.error.message&#125;&lt;/p&gt;
&#123;:else if !snapshot.hasValue&#125;
  &lt;p&gt;No State is available.&lt;/p&gt;
&#123;:else&#125;
  &lt;p&gt;Count: &#123;snapshot.value&#125;&lt;/p&gt;
&#123;/if&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The Snapshot exposes <strong>value</strong>,
            <strong>hasValue</strong>, <strong>isLoading</strong>, and
            <strong>error</strong>. The template can render those fields
            directly without maintaining a second local subscription state.
          </p>
          <table aria-label="Svelte FeatureCell Snapshot fields">
            <thead>
              <tr>
                <th class="column-150" scope="col">Field</th>
                <th class="column-auto" scope="col">
                  Use in a Svelte component
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="code">value</span></td>
                <td>Render the current State value.</td>
              </tr>
              <tr>
                <td><span class="code">hasValue</span></td>
                <td>Determine whether State is available to render.</td>
              </tr>
              <tr>
                <td><span class="code">isLoading</span></td>
                <td>Display a loading state while State is being resolved.</td>
              </tr>
              <tr>
                <td><span class="code">error</span></td>
                <td>Render an accessible error message when State fails.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why a Manual state$ Subscription Can Miss Initial State
        </div>
        <div class="section-body">
          <p>
            A manual <span class="code">state$</span> subscription created after
            the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            initializes can miss the emission that committed the initial State.
            Later State updates may still reach that subscription, but the
            component can begin without the current Snapshot.
          </p>
          <p>
            Reading <span class="code">state</span> inside Svelte reactivity
            gives the component the current Snapshot during its evaluation and
            connects that read to subsequent State changes through the same
            effect lifecycle. Outside Svelte reactivity, use
            <span class="code">state</span> for the latest synchronous Snapshot
            or use <span class="code">state$</span> when an explicitly managed
            Observable subscription is required.
          </p>
          <!-- StackBlitz: svelte-reactivity-without-a-second-state-subscription -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the
            <a href="/docs/pipeline/api/svelte"
              >Svelte integration documentation</a
            >
            and the
            <a href="/docs/pipeline/apis/feature-cell-api/state-property"
              >FeatureCell State property documentation</a
            >
            for the complete Svelte usage pattern.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogSvelteReactivityWithoutASecondStateSubscriptionComponent {}
