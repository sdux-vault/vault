import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-global-dispatch-broadcasts-scoped-updates-dont',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Global Dispatch Broadcasts to Everything — Scoped Updates Don't"
      date="2026-06-25"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Every Redux dispatch broadcasts to the entire reducer tree. Every
          reducer evaluates. Every selector re-checks. In
          <sdux-vault-brand-name [tm]="true" />, updates target the owning
          <sdux-feature-cell [tm]="true" /> directly — no broadcast, no global
          evaluation, no wasted cycles.
        </p>
      </header>

      <section class="section">
        <div class="section-title">How Dispatch Works in Redux</div>
        <div class="section-body">
          <p>
            <strong>Redux</strong> uses a single global store. When you call
            <span class="code">dispatch(action)</span>, that action is sent
            through middleware and then delivered to the entire reducer tree.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Redux Global Dispatch'">
              <pre
                class="code-inline"><code class="language-ts">// Every dispatch broadcasts globally
dispatch(&#123; type: 'ADD_USER', payload: user &#125;);

// This action is delivered to EVERY reducer in the tree:
// - userReducer ✓ (handles it)
// - cartReducer ✗ (evaluates, returns current state)
// - settingsReducer ✗ (evaluates, returns current state)
// - notificationsReducer ✗ (evaluates, returns current state)
// - analyticsReducer ✗ (evaluates, returns current state)</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Each reducer decides whether to respond based on the action type.
            Reducers that do not handle the action still execute — they evaluate
            the switch statement and return the current state unchanged. Every
            selector downstream then re-checks whether its derived value has
            changed.
          </p>

          <p>
            For a single dispatch in a ten-feature application, you may trigger
            10 reducer evaluations and 20+ selector re-checks — even though only
            one feature cares about that action.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Cost of Global Broadcasting</div>
        <div class="section-body">
          <p>
            The broadcast model was a design choice in Redux: simplicity over
            precision. Every action goes everywhere, and reducers opt in by
            matching the type string. This has compounding costs:
          </p>

          <table>
            <thead>
              <tr>
                <th>Cost</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reducer evaluations</td>
                <td>Every reducer runs on every dispatch — O(n) per action</td>
              </tr>
              <tr>
                <td>Selector re-checks</td>
                <td>
                  Memoized selectors still compare references on every store
                  change
                </td>
              </tr>
              <tr>
                <td>Middleware overhead</td>
                <td>Every action passes through the full middleware chain</td>
              </tr>
              <tr>
                <td>Cognitive coupling</td>
                <td>
                  Any reducer can respond to any action — ownership is implicit
                </td>
              </tr>
              <tr>
                <td>Debugging noise</td>
                <td>
                  DevTools show every action globally, making feature-level
                  tracing harder
                </td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <p>
              The performance cost is often acceptable in small applications.
              But as your reducer tree grows, every dispatch pays a tax
              proportional to the total number of reducers and selectors —
              regardless of how many actually need to respond.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Scoped Updates in <sdux-vault-brand-name />
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> does not use global dispatch. State
            updates are invoked directly on the owning
            <sdux-feature-cell /> using
            <span class="code">mergeState()</span> or
            <span class="code">replaceState()</span>.
          </p>

          <sdux-multi-framework-example description="Scoped State Update">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;UserState&gt;('user')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;UserState&gt;(UserService);

  updateUser(name: string, role: string) &#123;
    // Update targets ONLY the user FeatureCell
    // No other FeatureCell evaluates. No global broadcast.
    this.vault.mergeState(&#123; value: &#123; name, role &#125; &#125;);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

const userCell = FeatureCell('user', &#123; value: defaultUser &#125;);

// Update targets ONLY the user FeatureCell
// No other FeatureCell evaluates. No global broadcast.
userCell.mergeState(&#123; value: &#123; name: 'Alice', role: 'admin' &#125; &#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            When you call <span class="code">mergeState()</span>, you are
            explicitly updating that specific <sdux-feature-cell /> — not
            broadcasting an event to a global store. No other
            <sdux-feature-cell /> evaluates. No reducer tree walks. No selector
            cascade.
          </p>

          <div class="callout callout-info">
            <p>
              The update target is unambiguous. The state owner is known at the
              call site, and execution flows through a deterministic pipeline
              scoped to that single <sdux-feature-cell />. Other FeatureCells
              remain completely unaffected.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What This Means for Performance</div>
        <div class="section-body">
          <p>
            The difference is structural. In Redux, cost scales with total
            application size. In <sdux-vault-brand-name />, cost scales with the
            feature being updated.
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
                <td>Update routing</td>
                <td>Global broadcast to all reducers</td>
                <td>Direct method call on owning <sdux-feature-cell /></td>
              </tr>
              <tr>
                <td>Evaluation scope</td>
                <td>Entire reducer tree (O(n) reducers)</td>
                <td>Single <sdux-feature-cell /> pipeline (O(1))</td>
              </tr>
              <tr>
                <td>Selector impact</td>
                <td>All subscribed selectors re-check</td>
                <td>Only observers of the updated cell re-evaluate</td>
              </tr>
              <tr>
                <td>Scaling cost</td>
                <td>Grows with total app feature count</td>
                <td>Constant per update — independent of app size</td>
              </tr>
              <tr>
                <td>Ownership clarity</td>
                <td>Implicit — any reducer can respond to any action</td>
                <td>Explicit — method called on state owner</td>
              </tr>
            </tbody>
          </table>

          <p>
            A fifty-feature application with Redux pays the broadcast tax on
            every single dispatch. A fifty-feature application with
            <sdux-vault-brand-name /> pays only the cost of the single
            <sdux-feature-cell /> being updated — the other forty-nine are
            untouched.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Beyond Performance — Ownership and Intent
        </div>
        <div class="section-body">
          <p>
            Scoped updates are not just a performance optimization. They enforce
            architectural clarity:
          </p>

          <ul>
            <li>
              <strong>Ownership is explicit.</strong> The method is called on
              the state owner. There is no ambiguity about which feature handles
              the update.
            </li>
            <li>
              <strong>Cross-feature coupling is eliminated.</strong> One
              <sdux-feature-cell /> cannot accidentally respond to another
              feature's state change. Each cell only knows about its own state.
            </li>
            <li>
              <strong>Debugging is scoped.</strong> Pipeline execution traces
              show exactly what happened within a single <sdux-feature-cell /> —
              no global action log to filter through.
            </li>
            <li>
              <strong>Testing is isolated.</strong> You test one
              <sdux-feature-cell /> at a time without mock stores, middleware
              stacks, or global setup.
            </li>
          </ul>

          <p>
            Instead of dispatching an action object and hoping the right reducer
            picks it up, you submit state input directly into the owning
            pipeline. The conductor serializes execution, and the pipeline
            finalizes each attempt in a controlled microtask boundary.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            See how <sdux-vault-brand-name /> eliminates global dispatch
            broadcasting in favor of scoped, direct state updates:
          </p>

          <ul>
            <li>
              <a routerLink="/docs/migration">
                Redux Concepts in <sdux-brand-name /> — Full migration reference
              </a>
            </li>
            <li>
              <a
                routerLink="/docs/pipeline/apis/feature-cell-api/merge-state-method">
                Understanding mergeState()
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline"> Understanding the Pipeline </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/execution-guarantee">
                Pipeline Execution Guarantees
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
export class BlogGlobalDispatchBroadcastsScopedUpdatesDontComponent {}
