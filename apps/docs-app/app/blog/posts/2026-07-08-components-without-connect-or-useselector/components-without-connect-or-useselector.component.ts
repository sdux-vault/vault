import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-components-without-connect-or-useselector',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Components Without connect() or useSelector — Direct State Injection"
      date="2026-07-08"
      pillar="ED"
      readingTime="5">
      <header class="docs-header">
        <p class="lead">
          Redux components wire to state through
          <span class="code">connect()</span>,
          <span class="code">useSelector()</span>, and
          <span class="code">useDispatch()</span>. Every component subscribes to
          the global store and re-evaluates on every update.
          <sdux-vault-brand-name [tm]="true" /> components inject the
          <sdux-feature-cell [tm]="true" /> directly — no HOCs, no hooks
          ceremony, no store-wide re-renders.
        </p>
      </header>

      <!-- ============================================================ -->
      <!-- Redux Component Wiring                                       -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">Redux Component Wiring</div>
        <div class="section-body">
          <p>
            In Redux, components subscribe to the global Store using hooks
            (<span class="code">useSelector</span>,
            <span class="code">useDispatch</span>) or higher-order components
            (<span class="code">connect</span>). State selection and dispatch
            logic are typically colocated in the component or abstracted into
            selector files. Every dispatched action is broadcast to the entire
            reducer tree, and subscribed components re-evaluate selectors on
            each store update.
          </p>

          <p>
            A <span class="code">Provider</span> must wrap the application to
            supply the Store instance.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Redux — Component State Wiring'">
              <pre
                class="code-inline"><code class="language-ts">// UserList.tsx — Redux component wiring
import &#123; useSelector, useDispatch &#125; from 'react-redux';
import &#123; fetchUsers &#125; from './actions/userActions';

function UserList() &#123;
  // Subscribe to a slice of the global store
  const users = useSelector((state: RootState) =&gt; state.users.list);
  const loading = useSelector((state: RootState) =&gt; state.users.loading);
  const dispatch = useDispatch();

  useEffect(() =&gt; &#123;
    dispatch(fetchUsers());
  &#125;, [dispatch]);

  if (loading) return &lt;p&gt;Loading...&lt;/p&gt;;

  return (
    &lt;ul&gt;
      &#123;users.map(u =&gt; &lt;li key=&#123;u.id&#125;&gt;&#123;u.name&#125;&lt;/li&gt;)&#125;
    &lt;/ul&gt;
  );
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Three hooks. Two selectors. One dispatch. And the component
            re-evaluates both selectors every time <em>any</em> action is
            dispatched anywhere in the application — not just actions relevant
            to users.
          </p>

          <table>
            <thead>
              <tr>
                <th>Redux Wiring Step</th>
                <th>What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>useSelector()</td>
                <td>Subscribes to a slice of the global store tree</td>
              </tr>
              <tr>
                <td>useDispatch()</td>
                <td>Returns the store dispatch function</td>
              </tr>
              <tr>
                <td>connect()</td>
                <td>
                  HOC that maps state and dispatch to component props (class
                  components)
                </td>
              </tr>
              <tr>
                <td>Provider</td>
                <td>
                  Wraps the app root to supply the store via React context
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- SDuX Vault Direct Injection                                  -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">
          <sdux-vault-brand-name /> Direct Injection
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> components do not connect to a global
            store. Instead, they inject or import the specific
            <sdux-feature-cell /> whose state they depend on. Because
            FeatureCells are state owners, a component interacts directly with
            the state it cares about — not a centralized root tree.
          </p>

          <p>State can be consumed through:</p>

          <ul>
            <li>
              <span class="code">cell.state</span> — synchronous immutable
              snapshot
            </li>
            <li>
              <span class="code">cell.state$</span> — reactive observable stream
            </li>
            <li>
              <span class="code">cell.state.value()</span> — Angular signal (if
              applicable)
            </li>
          </ul>

          <sdux-multi-framework-example description="Component State Access">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// employee.component.ts — Angular state access
export class EmployeeComponent &#123;
  private employeeService = inject(EmployeeService);

  // Direct injection — no useSelector, no connect
  state = this.employeeService.vault.state;

  // Signal-based (reactive, zero subscriptions)
  // state.value()    — Angular Signal
  // state.hasValue() — true when state has been set
  // state.isLoading() — true during async resolution
  // state.error()    — error if pipeline failed

  // Observable stream (RxJS integration)
  state$ = this.employeeService.vault.state$
    .subscribe((&#123; snapshot, type, options &#125;) =&gt; &#123;
      console.info('State value:', snapshot.value);
      console.info('Origin type:', type);
    &#125;);
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Reading state from a FeatureCell (React / Vue / Svelte)

// Synchronous snapshot — no useSelector, no connect
const snapshot = employeeCell.state;
console.info(snapshot.value);     // current state value
console.info(snapshot.hasValue);  // true when state has been set
console.info(snapshot.isLoading); // true during async resolution
console.info(snapshot.error);     // error if pipeline failed

// Observable stream (RxJS integration)
employeeCell.state$
  .subscribe((&#123; snapshot, type, options &#125;) =&gt; &#123;
    console.info('State value:', snapshot.value);
    console.info('Origin type:', type);
  &#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            No <span class="code">useSelector</span>. No
            <span class="code">useDispatch</span>. No
            <span class="code">connect</span>. The component injects the
            <sdux-feature-cell /> it owns and reads state directly.
          </p>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- No Provider Wrapper Needed                                   -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">No Provider Wrapper Needed</div>
        <div class="section-body">
          <p>
            Redux requires a
            <span class="code">Provider</span> component at the application root
            to make the store available via React context. Every component that
            reads state must be a descendant of that Provider. Move a component
            outside the Provider tree and it silently loses access to state.
          </p>

          <p>
            <sdux-vault-brand-name /> has no Provider requirement. FeatureCells
            are registered at application startup and are globally addressable
            by key. In Angular, you inject the owning service. In React, Vue,
            and Svelte, you import the cell directly. There is no context
            boundary to manage and no wrapper to forget.
          </p>

          <div class="callout callout-info">
            <strong>No context boundary</strong>
            <p>
              Because <sdux-feature-cell /> state is accessed through direct
              injection or module imports — not React context — there is no
              Provider tree to manage, no context nesting to debug, and no risk
              of components silently disconnecting from state.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- Atomic Snapshots Eliminate Partial Renders                    -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">
          Atomic Snapshots Eliminate Partial Renders
        </div>
        <div class="section-body">
          <p>
            Redux components can observe intermediate state. If a dispatch
            triggers multiple reducer evaluations and a component re-renders
            between them, the UI may briefly display a partially reduced state.
            Libraries like <span class="code">batch()</span> exist specifically
            to mitigate this.
          </p>

          <p>
            <sdux-vault-brand-name /> eliminates the problem architecturally.
            State commitment is atomic and deferred to a microtask. Components
            never observe intermediate values or partially reduced state. Every
            render sees a finalized snapshot.
          </p>

          <table>
            <thead>
              <tr>
                <th class="column-175">Concern</th>
                <th class="column-auto">Redux</th>
                <th class="column-auto"><sdux-vault-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State access</td>
                <td>useSelector() / connect()</td>
                <td>Direct injection or import</td>
              </tr>
              <tr>
                <td>Dispatch plumbing</td>
                <td>useDispatch() + action creators</td>
                <td>mergeState / replaceState on the cell</td>
              </tr>
              <tr>
                <td>Provider requirement</td>
                <td>Required at app root</td>
                <td>Not needed</td>
              </tr>
              <tr>
                <td>Re-render scope</td>
                <td>Store-wide — selectors re-evaluate on every dispatch</td>
                <td>Scoped — only the owning <sdux-feature-cell /> updates</td>
              </tr>
              <tr>
                <td>Partial state visibility</td>
                <td>Possible without batch()</td>
                <td>Impossible — atomic commitment</td>
              </tr>
              <tr>
                <td>Intermediate values</td>
                <td>Components may see mid-reduction state</td>
                <td>Components see only finalized snapshots</td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <strong>Redux re-render scope</strong>
            <p>
              Every <span class="code">useSelector</span> callback runs on every
              store dispatch — even when the selected slice has not changed.
              Referential equality checks prevent a re-render, but the selector
              still executes. In large applications with many selectors, this
              evaluation cost adds up. <sdux-vault-brand-name /> scoped updates
              do not trigger evaluation outside the owning
              <sdux-feature-cell />.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- Redux Comparison                                             -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">The Mental Model Shift</div>
        <div class="section-body">
          <p>
            Redux trains you to think in terms of a global store. You select
            slices, dispatch actions, and compose selectors. The store is the
            center of gravity. Every component orbits it.
          </p>

          <p>
            <strong><sdux-vault-brand-name /></strong> inverts that
            relationship.
            <strong
              ><i>The <sdux-feature-cell /> is the state owner.</i></strong
            >
            Components inject or import the cell they depend on and consume its
            state directly. There is no global tree to navigate, no selector
            composition to maintain, and no dispatch ceremony to perform.
          </p>

          <p>The mental model shifts from:</p>

          <ul>
            <li>
              <em>Subscribe to a global store and select a slice</em>
            </li>
          </ul>

          <p>to:</p>

          <ul>
            <li>
              <em>Inject the state owner and consume it directly</em>
            </li>
          </ul>

          <p>
            This reduces wiring, eliminates dispatch plumbing, and keeps state
            access explicit and localized.
          </p>
          <div class="callout callout-info">
            <div class="title">Direct Injection</div>

            <p>
              Any component that needs the same state simply injects the same
              <sdux-feature-cell /> — no duplicated selectors, no shared action
              creators, no selector files to maintain. The state surface is the
              cell itself.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- Deeper Dive                                              -->
      <!-- ============================================================ -->
      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            See how <sdux-feature-cell /> state injection works across
            frameworks:
          </p>
          <ul>
            <li>
              <a routerLink="/docs/pipeline/apis/feature-cell-methods/state">
                FeatureCell State Property — API Reference
              </a>
            </li>
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
              <a routerLink="/docs/migration">
                Redux to SDuX Vault Migration Guide
              </a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponentsWithoutConnectOrUseselectorComponent {}
