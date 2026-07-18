import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-no-createstore-no-combinereducers-no-provider',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="No createStore, No combineReducers, No Provider — Setting Up State in 3 Lines"
      date="2026-07-07"
      pillar="ED"
      readingTime="4">
      <header class="docs-header">
        <p class="lead">
          Redux setup is a ceremony. You create a store, compose your reducers
          into a root tree, wrap your app in a Provider, register middleware,
          and configure enhancers — all before you write a single line of
          feature logic. <sdux-brand-name /> replaces that entire ceremony with
          two function calls and zero root configuration.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Redux Store Ceremony</div>
        <div class="section-body">
          <p>
            A typical Redux application requires several files and configuration
            steps before state management is operational. Here is what a minimal
            Redux setup looks like for a single feature:
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Redux — Minimal Store Setup'">
              <pre class="code-inline"><code class="language-ts">// store.ts
import &#123; createStore, combineReducers, applyMiddleware &#125; from 'redux';
import thunk from 'redux-thunk';
import &#123; userReducer &#125; from './reducers/userReducer';

const rootReducer = combineReducers(&#123;
  users: userReducer,
&#125;);

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// App.tsx — Provider wrapper required
import &#123; Provider &#125; from 'react-redux';
import &#123; store &#125; from './store';

function App() &#123;
  return (
    &lt;Provider store=&#123;store&#125;&gt;
      &lt;UserList /&gt;
    &lt;/Provider&gt;
  );
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            That is 20+ lines of configuration across multiple files — and it
            only covers one feature. Add a second feature and you are back in
            the <span class="code">combineReducers</span> file, composing
            another slice into the tree. Add middleware and you are threading
            enhancers through <span class="code">applyMiddleware</span>. Add
            DevTools and you are composing
            <span class="code">composeWithDevTools</span> on top.
          </p>

          <p>Every new feature touches the root configuration.</p>

          <table>
            <thead>
              <tr>
                <th>Redux Requirement</th>
                <th>What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>createStore()</td>
                <td>Creates the single global store instance</td>
              </tr>
              <tr>
                <td>combineReducers()</td>
                <td>Composes feature reducers into a root tree</td>
              </tr>
              <tr>
                <td>applyMiddleware()</td>
                <td>Registers middleware (thunk, saga, etc.)</td>
              </tr>
              <tr>
                <td>Provider</td>
                <td>Makes the store available to all components via context</td>
              </tr>
              <tr>
                <td>composeWithDevTools()</td>
                <td>Enables Redux DevTools integration</td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <p>
              Every entry in that table is root-level configuration. Adding a
              new feature means editing the root reducer composition, possibly
              the middleware stack, and potentially the Provider hierarchy. Root
              configuration is a shared dependency — every team touches the same
              files.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Vault + <sdux-feature-cell /> Setup</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> does not have a root store. There is no reducer
            tree to compose, no middleware to register, and no Provider to wrap.
            Setup is two function calls:
          </p>

          <ol>
            <li>Initialize the Vault (once, at application startup).</li>
            <li>Register a <sdux-feature-cell /> (per feature).</li>
          </ol>

          <sdux-multi-framework-example description="Complete State Setup">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService,
      &#123;
        key: 'employees',
        initialState: []
      &#125;
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre class="code-inline"><code class="language-ts">Vault(&#123;
  devMode: true,
  logLevel: 'debug'
&#125;);

export const employeeCell = FeatureCell(&#123;
  key: 'employees',
  initialState: [],
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            That is the entire setup. No root reducer. No combineReducers. No
            Provider wrapper. No middleware composition. The
            <sdux-feature-cell /> is self-contained — it owns its state, its
            pipeline configuration, and its execution lifecycle.
          </p>

          <p>
            Adding a second feature does not require editing any root
            configuration. You register a second <sdux-feature-cell /> and it
            operates independently:
          </p>

          <sdux-multi-framework-example
            description="Adding a Second FeatureCell">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService,
      &#123; key: 'employees', initialState: [] &#125;
    ),

    provideFeatureCell(
      CartService,
      &#123; key: 'cart', initialState: &#123; items: [], total: 0 &#125; &#125;
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">Vault(&#123; logLevel: 'debug' &#125;);

export const employeeCell = FeatureCell(&#123;
  key: 'employees',
  initialState: [],
&#125;);

export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123; items: [], total: 0 &#125;,
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            Each <sdux-feature-cell /> is registered independently. They share
            nothing — no root reducer, no global namespace, no store-level
            coupling. Adding the tenth feature is exactly as simple as adding
            the first.
          </p>

          <div class="callout callout-info">
            <p>
              In <sdux-brand-name />, there is no root configuration ceremony.
              Each <sdux-feature-cell /> declares its own state, its own
              behaviors, and its own controllers. The Vault coordinates
              execution — you do not compose a global tree.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">No Provider Required</div>
        <div class="section-body">
          <p>
            Redux requires a Provider component at the root of your application
            to make the store available via React context. Every component that
            needs state must be a descendant of that Provider.
          </p>

          <p>
            <sdux-brand-name /> has no Provider. FeatureCells are registered at
            application startup and are globally accessible by injection
            (Angular) or direct import (React, Vue, Svelte, Node). There is no
            context hierarchy to manage and no Provider nesting to debug.
          </p>

          <table>
            <thead>
              <tr>
                <th>Concern</th>
                <th>Redux</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Store creation</td>
                <td>createStore() + combineReducers()</td>
                <td>Vault() — one call</td>
              </tr>
              <tr>
                <td>Feature registration</td>
                <td>Add to root reducer tree</td>
                <td>
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >() — independent
                </td>
              </tr>
              <tr>
                <td>Middleware</td>
                <td>applyMiddleware() composition</td>
                <td>Pipeline behaviors — declarative</td>
              </tr>
              <tr>
                <td>Provider wrapper</td>
                <td>Required at app root</td>
                <td>Not needed</td>
              </tr>
              <tr>
                <td>Adding a feature</td>
                <td>Edit root reducer + store</td>
                <td>
                  Register a new
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
              </tr>
              <tr>
                <td>DevTools</td>
                <td>composeWithDevTools()</td>
                <td>Built-in — zero config</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Side-by-Side Coexistence During Migration
        </div>
        <div class="section-body">
          <p>
            Because <sdux-brand-name /> does not use a global store, it can run
            alongside Redux in the same application. You do not need to rewrite
            your Redux setup to start using FeatureCells. Register a Vault, add
            a <sdux-feature-cell /> for your next feature, and let the two
            systems coexist.
          </p>

          <p>
            Your existing Redux store continues to manage its features. New
            features use FeatureCells. Over time, features can be migrated one
            at a time — each migration is isolated and does not affect the Redux
            store or other FeatureCells.
          </p>

          <p>
            There is no big-bang migration. No root configuration rewrite. No
            flag day.
          </p>

          <div class="callout callout-info">
            <p>
              For a complete mapping of Redux concepts to
              <sdux-brand-name /> equivalents, see the
              <a routerLink="/docs/migration">Migration Guide</a>.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            See the full <sdux-feature-cell /> registration API and
            configuration options:
          </p>

          <ul>
            <li>
              <a routerLink="/docs/pipeline/apis/provide-feature-cell">
                How to Define a FeatureCell (Angular)
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/apis/feature-cell">
                How to Define a FeatureCell
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/apis/vault">
                How to Define a Vault
              </a>
            </li>
            <li>
              <a routerLink="/docs/migration">
                Redux to SDuX Vault Migration Guide
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video
            videoId="aFTiIvR0H4M"
            [tooltip]="'SDUX vs Redux O(n) Comparison'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogNoCreatestoreNoCombinereducersNoProviderComponent {}
