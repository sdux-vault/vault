import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-reducers-cant-change-after-init',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Reducers That Can't Change After Init — Why That's a Feature"
      date="2026-06-29"
      pillar="ED"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Redux lets you dynamically inject, replace, and reorder reducers at
          runtime. <sdux-vault-brand-name [tm]="true" /> locks the pipeline
          after <span class="code">initialize()</span>. That sounds restrictive
          — until you realize it eliminates an entire class of runtime
          state-logic bugs.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Dynamic Reducers in Redux</div>
        <div class="section-body">
          <p>
            Redux was designed for flexibility.
            <span class="code">replaceReducer()</span> lets you swap the entire
            reducer tree while the application is running. Lazy-loaded modules
            inject new slices into a living store. Code-splitting strategies
            depend on this capability.
          </p>

          <p>
            The flexibility comes with costs that surface in production, not in
            tutorials:
          </p>

          <ul>
            <li>
              A reducer injected after initialization changes the behavior of
              every subsequent dispatch — retroactively altering what the store
              does with no visible code change at the call site.
            </li>
            <li>
              Reducer ordering shifts when new slices register. If two reducers
              depend on shared state-shape assumptions, injection order
              determines correctness.
            </li>
            <li>
              Race conditions emerge when lazy-loaded modules register reducers
              at unpredictable times. The store behaves differently depending on
              which route the user visited first.
            </li>
            <li>
              Testing becomes non-deterministic. The same dispatch produces
              different results depending on which reducers have been injected
              at the moment of execution.
            </li>
          </ul>

          <p>
            The root problem is not that dynamic injection exists. The problem
            is that the store's behavior becomes a function of
            <em>time</em> — not just of code.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why <sdux-vault-brand-name /> Locks the Pipeline
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> takes the opposite position. Every
            <a routerLink="/docs/welcome/what-is-a-behavior">Behavior</a> and
            <a routerLink="/docs/welcome/what-is-a-controller">Controller</a>
            is registered before
            <span class="code">initialize()</span> is called. After
            initialization the pipeline is sealed. No additions. No removals. No
            reordering.
          </p>

          <sdux-multi-framework-example description="Sealed Pipeline">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

// user.service.ts
&#64;FeatureCell&lt;UserState&gt;('user')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;UserState&gt;(UserService);

  constructor() &#123;
    // After initialize(): the pipeline is sealed.
    this.vault
      .reducers([userReducer])
      .filters([activeUserFilter])
      .afterTaps([userAnalyticsTap])
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

const userCell = FeatureCell(&#123;
  key: 'user',
  initialState: &#123; users: [] &#125;
&#125;)
  .reducers([userReducer])
  .filters([activeUserFilter])
  .afterTaps([userAnalyticsTap])
  .initialize();

// After initialize(): the pipeline is sealed.
// userCell.reducers([anotherReducer]) &#8594; throws</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            This is not a limitation — it is a contract. The pipeline that runs
            on the first state update is identical to the pipeline that runs on
            the ten-thousandth. Same stages. Same order. Same behavior. Every
            time.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Bugs This Eliminates</div>
        <div class="section-body">
          <p>
            Locking the pipeline after initialization removes an entire category
            of defects that are notoriously difficult to diagnose:
          </p>

          <p>
            <strong>Ghost reducer bugs.</strong> A lazy-loaded module injects a
            reducer that silently changes how an unrelated feature's state is
            computed. The bug report says "the dashboard stopped updating after
            we added the analytics module." The root cause is invisible at the
            call site.
          </p>

          <p>
            <strong>Ordering-dependent state.</strong> Two reducers both respond
            to the same action type. When reducer A runs before reducer B the
            output is correct. When the registration order flips — because a
            module loaded faster on a cold cache — the output is wrong. Same
            code. Different result. Different boot sequence.
          </p>

          <p>
            <strong>Test-environment divergence.</strong> Tests register
            reducers in a predictable order. Production does not. The test suite
            passes. The deployed application fails. The gap between test and
            production widens every time a new lazy-loaded slice is added.
          </p>

          <p>
            <strong>Debugging opacity.</strong> When the reducer tree can change
            shape at runtime, logging a dispatch tells you what action fired —
            but not which reducers were present when it fired. Reproduction
            requires knowing the exact injection state at the exact moment of
            failure.
          </p>

          <div class="callout callout-info">
            <p>
              <sdux-vault-brand-name /> eliminates all four by making the
              pipeline a build-time decision, not a runtime variable.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Predictable Execution for the Lifetime of a Cell
        </div>
        <div class="section-body">
          <p>
            Once a <sdux-feature-cell [tm]="true" /> is initialized, its
            pipeline is a fixed, ordered sequence of stages:
          </p>

          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Resolve</td>
                <td>Async inputs settle</td>
              </tr>
              <tr>
                <td>Filter</td>
                <td>Gate conditions evaluate</td>
              </tr>
              <tr>
                <td>Reduce</td>
                <td>State transforms apply</td>
              </tr>
              <tr>
                <td>After Tap</td>
                <td>Observational callbacks after reduction</td>
              </tr>
              <tr>
                <td>State</td>
                <td>Commits and reactively emits finalized state snapshots</td>
              </tr>
              <tr>
                <td>Persist</td>
                <td>Stores snapshots to external storage</td>
              </tr>
            </tbody>
          </table>

          <p>
            Every stage runs in this order. Every update traverses the same
            path. The pipeline does not change because a new module loaded, a
            route changed, or a network request completed.
          </p>

          <p>This means:</p>

          <ul>
            <li>
              <strong>Debugging is reproducible.</strong> The pipeline that
              produced the bug is the same pipeline that runs in your test. No
              injection timing to reconstruct.
            </li>
            <li>
              <strong>Testing is deterministic.</strong> Same cell, same
              pipeline, same behaviors. The test environment matches production
              exactly.
            </li>
            <li>
              <strong>Code review is complete.</strong> The pipeline definition
              is the single source of truth. There is no runtime path that adds
              behavior the reviewer did not see.
            </li>
            <li>
              <strong>Onboarding is faster.</strong> A new team member reads the
              cell definition and knows every transformation, filter, and
              after-tap that will ever run. There is no hidden registration
              scattered across lazy-loaded modules.
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What About Lazy Loading?</div>
        <div class="section-body">
          <p>
            The natural objection: "We need dynamic reducers for code
            splitting."
          </p>

          <p>
            <sdux-vault-brand-name /> handles this differently. Instead of
            injecting reducers into a shared store, each lazy-loaded feature
            creates its own <sdux-feature-cell /> with its own sealed pipeline.
            The cell is constructed and initialized when the module loads. It is
            destroyed when the module unloads.
          </p>

          <sdux-multi-framework-example description="Lazy-Loaded FeatureCell">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

// analytics.service.ts
&#64;FeatureCell&lt;AnalyticsState&gt;('analytics')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class AnalyticsService &#123;
  readonly vault = injectVault&lt;AnalyticsState&gt;(AnalyticsService);

  constructor() &#123;
    this.vault
      .reducers([analyticsReducer])
      .afterTaps([analyticsReporter])
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

// Lazy-loaded analytics module
export function initAnalytics() &#123;
  return FeatureCell(&#123;
    key: 'analytics',
    initialState: &#123; events: [] &#125;
  &#125;)
    .reducers([analyticsReducer])
    .afterTaps([analyticsReporter])
    .initialize();
&#125;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            No injection into a global tree. No modification of existing
            pipelines. The analytics cell owns its state, its pipeline, and its
            lifecycle — independent of every other cell in the application.
          </p>

          <p>
            Code splitting works. Lazy loading works. The difference is that
            adding a module never changes the behavior of an existing module.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Design Principle</div>
        <div class="section-body">
          <p>
            Redux optimized for runtime flexibility.
            <sdux-vault-brand-name /> optimized for runtime predictability.
          </p>

          <p>
            Both are valid design choices. But predictability compounds. Every
            feature you add to a locked pipeline is one more feature you can
            reason about in isolation. Every feature you add to a dynamic store
            is one more variable in a system whose behavior depends on execution
            order.
          </p>

          <p>
            After initialization, a <sdux-feature-cell />'s pipeline is not just
            immutable — it is <em>knowable</em>. And knowable systems are
            debuggable, testable, and trustworthy at any scale.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <ul>
            <li>
              <a routerLink="/docs/welcome/core-concepts">
                Core Concepts — FeatureCell Architecture
              </a>
            </li>
            <li>
              <a routerLink="/docs/migration">
                Migration Guide — From Redux to SDuX Vault
              </a>
            </li>
            <li>
              <a routerLink="/docs/welcome/what-is-a-behavior">
                What Is a Behavior?
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/execution-guarantee">
                The Execution Guarantee
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
export class BlogReducersCantChangeAfterInitComponent {}
