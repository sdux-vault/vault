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
  selector: 'sdux-blog-the-boilerplate-audit',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="The Boilerplate Audit — Counting the Files Redux Requires for One Feature"
      date="2026-07-18"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Add one feature to a Redux app and count the files: action types,
          action creators, a reducer, selectors, an effect class, a barrel
          export, and a test for each. Now add the same feature with a single
          <sdux-feature-cell [tm]="true" /> definition. This is a boilerplate
          audit &mdash; a direct file count &mdash; and the ceremony gap it
          exposes is not subtle. It is structural.
          <sdux-brand-name [tm]="true" />
          keeps the architectural knowledge Redux taught you while removing the
          repetitive scaffolding that surrounds it.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Redux File Count for One Feature</div>
        <div class="section-body">
          <p>
            Redux centralizes state through a global store and a reducer tree.
            To wire a single feature into that model, the conventional structure
            spreads across several files, each with a distinct job:
          </p>
          <ul>
            <li>
              <strong>Action types</strong> &mdash; string constants describing
              every transition the feature can make.
            </li>
            <li>
              <strong>Action creators</strong> &mdash; functions that build the
              plain action objects dispatched to the store.
            </li>
            <li>
              <strong>Reducer</strong> &mdash; a pure function, usually a
              <span class="code">switch</span> statement, composed into the root
              reducer tree.
            </li>
            <li>
              <strong>Selectors</strong> &mdash; projections that read a subset
              of the global state tree, frequently memoized with a library such
              as Reselect.
            </li>
            <li>
              <strong>Effects</strong> &mdash; middleware (Thunk, Saga,
              Observable) handling asynchronous work and dispatching follow-up
              actions.
            </li>
            <li>
              <strong>Barrel export</strong> &mdash; an index file re-exporting
              the pieces so the rest of the app can import them.
            </li>
            <li>
              <strong>A test per artifact</strong> &mdash; and complex flows
              often need mock stores, fake timers, and middleware orchestration.
            </li>
          </ul>
          <p>
            None of these files is wrong. Each exists to satisfy the mechanics
            of a global store: actions must be broadcast, reducers must decide
            whether to respond, selectors must project out of one large tree,
            and middleware must coordinate async work. The file count is the
            cost of that centralization.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The FeatureCell File Count</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> scopes state to independent FeatureCells and
            executes updates through a deterministic pipeline. There is no
            monolithic root store: you initialize the Vault once, then register
            each <sdux-feature-cell /> individually. A feature's state, its
            identity, and its pipeline configuration live in one definition.
          </p>
          <sdux-example-viewer-source>
            <sdux-example-viewer-tab [label]="'Angular'">
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
import &#123; provideVault, provideFeatureCell &#125; from '&#64;sdux-vault/angular';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),
    provideFeatureCell(CounterService, &#123;
      key: 'counter',
      initialState: 0
    &#125;)
  ]
&#125;;

// counter.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;number&gt;('counter')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CounterService &#123;
  readonly vault = injectVault&lt;number&gt;(CounterService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </sdux-example-viewer-tab>
            <sdux-example-viewer-tab [label]="'React'">
              <pre
                class="code-inline"><code class="language-ts">// counter.cell.ts
import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/react';

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
            <sdux-example-viewer-tab [label]="'Svelte'">
              <pre
                class="code-inline"><code class="language-ts">// counter.cell.ts
import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/svelte';

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
            <sdux-example-viewer-tab [label]="'Vue'">
              <pre
                class="code-inline"><code class="language-ts">// counter.cell.ts
import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/vue';

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
          <p>
            Reducers, filters, and other pipeline behavior are registered
            declaratively on that same cell before
            <span class="code">initialize()</span> is called &mdash; behavior
            registration methods take arrays, so additions are a list entry, not
            a new file. There are no separate action-type constants, action
            creators, or global selector registries to maintain, because there
            is no global store to negotiate with.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> The reduced surface area is not a
              simplification of capability &mdash; it is a simplification of
              mechanics. One <sdux-feature-cell /> definition replaces the
              action / creator / reducer / selector / effect / barrel spread.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Where the Ceremony Lives</div>
        <div class="section-body">
          <p>
            The audit is clearest side by side. Each row is a concern every
            application has to handle. The difference is how many moving parts
            each model requires to handle it.
          </p>
          <table
            aria-label="Redux boilerplate versus SDuX Vault FeatureCell per feature">
            <thead>
              <tr>
                <th scope="col" class="column-125">Concern</th>
                <th scope="col" class="column-auto">Redux (per feature)</th>
                <th scope="col" class="column-auto">SDuX Vault</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State updates</td>
                <td>Action type constants and action creators</td>
                <td>
                  Direct <span class="code">replaceState()</span> or
                  <span class="code">mergeState()</span> on the owning cell
                </td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>Reducer file with switch composition into the root tree</td>
                <td>
                  Pure reducers registered declaratively via
                  <span class="code">.reducers()</span>
                </td>
              </tr>
              <tr>
                <td>Selectors</td>
                <td>Selector files projecting the global tree, memoized</td>
                <td>Scoped getters or RxJS operators on the cell's state</td>
              </tr>
              <tr>
                <td>Effects</td>
                <td>Thunk / Saga / Observable middleware</td>
                <td>Resolve behaviors, interceptors, or controllers</td>
              </tr>
              <tr>
                <td>Store setup</td>
                <td>
                  <span class="code">createStore()</span>, reducer composition,
                  and a Provider wrapping the app
                </td>
                <td>Initialize the Vault once; register cells individually</td>
              </tr>
              <tr>
                <td>Components</td>
                <td>Connect via selectors and dispatch under a Provider</td>
                <td>Import or inject the specific cell they depend on</td>
              </tr>
            </tbody>
          </table>
          <p>
            The ceremony lives in the columns Redux needs to make a global store
            work: broadcasting actions, deciding which reducer responds, and
            projecting out of one shared tree. <sdux-brand-name /> formalizes
            execution inside the pipeline instead of requiring repetitive
            structural code around it.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Fewer Files Means Fewer Bugs</div>
        <div class="section-body">
          <p>
            File count is a proxy for surface area, and surface area is where
            bugs live. Every action type is a string that can be misspelled.
            Every barrel export is an import that can drift. Every selector is a
            place the global tree's shape can leak into a component. Removing
            those files removes the seams where they fail.
          </p>
          <p>
            The architectural knowledge still transfers. Reducer functions stay
            pure and deterministic, and existing Redux reducer logic can
            typically be reused without modification as long as it stays pure,
            does not mutate state, and preserves structural shape. What
            disappears is the ceremony around them: action creators, switch
            statements, and large type unions are not required for correctness.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Warning:</strong> Fewer files is a consequence, not the
              goal. Do not recreate Redux-style ceremony &mdash; action
              creators, dispatch indirection, global selector registries &mdash;
              on top of a <sdux-feature-cell /> unless it provides clear value.
              Reintroducing the scaffolding gives back the surface area the
              model was designed to remove.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Count the files in one of your own Redux features, then rebuild it
            as a single <sdux-feature-cell />. The live example below starts
            from the counter definition above &mdash; edit it, register a
            reducer, and watch the whole feature stay in one place.
          </p>
          <!-- StackBlitz: feature-cell-counter -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            For the full concern-by-concern mapping from Redux to
            <sdux-brand-name /> &mdash; actions, reducers, selectors, effects,
            store setup, components, and testing &mdash; read the
            <a [routerLink]="['/docs/migration']">migration guide</a>, and
            explore the project on
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
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTheBoilerplateAuditComponent {}
