import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-selectors-without-a-global-tree',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Selectors Without a Global Tree — Scoped State Access That Scales"
      date="2026-07-02"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Redux selectors project slices from a global store tree. When the tree
          changes shape, every selector downstream breaks. Memoization libraries
          patch the performance problem but not the coupling problem.
          <sdux-vault-brand-name [tm]="true" /> eliminates the global tree
          entirely. State access is scoped to the owning
          <sdux-feature-cell [tm]="true" /> — no global registry, no tree
          coupling, no cascade failures.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Global Selectors and Their Fragility</div>
        <div class="section-body">
          <p>
            In Redux, every selector receives the entire state tree. A selector
            that reads <span class="code">state.users.active</span> is coupled
            to the exact shape of the root store. Rename the slice, nest it
            under a feature module, or restructure the reducer tree — and every
            selector that touches that path breaks.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Redux Selector — Global Tree Projection'">
              <pre
                class="code-inline"><code class="language-ts">// Redux selector — coupled to the global store shape
const selectActiveUsers = (state: RootState) =&gt;
  state.users.active;

// If the tree restructures:
// state.users.active → state.features.users.active
// This selector breaks silently — returns undefined</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The fragility compounds at team scale. When two teams share a global
            store, one team's reducer restructuring silently breaks the other
            team's selectors. Memoization libraries like Reselect help avoid
            unnecessary recomputation, but they do not solve the structural
            coupling — they optimize a selector that is still tightly bound to a
            global path.
          </p>

          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Root Cause</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Selectors break on store restructuring</td>
                <td>Coupled to global state tree paths</td>
              </tr>
              <tr>
                <td>Cross-team selector collisions</td>
                <td>Shared global namespace</td>
              </tr>
              <tr>
                <td>Memoization complexity</td>
                <td>Reselect required to prevent unnecessary recomputation</td>
              </tr>
              <tr>
                <td>Cascade failures</td>
                <td>One tree change breaks downstream selectors</td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <p>
              The problem is not the selector pattern itself — projecting
              derived state from a data source is sound engineering. The problem
              is that Redux selectors project from a <strong>global</strong>
              tree, making every selector an implicit dependency on the store's
              structural shape.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Scoped State Access in <sdux-brand-name />
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> does not use a global store. State is
            owned by individual FeatureCells. Each
            <sdux-feature-cell /> maintains its own isolated state and execution
            lifecycle. There is no root reducer tree, no global namespace, and
            no shared state path.
          </p>

          <p>
            State access is scoped to the <sdux-feature-cell /> that owns it.
            You access state through the cell's reactive APIs — not through a
            global projection function:
          </p>

          <ul>
            <li>
              <span class="code">.state</span> — synchronous immutable snapshot
            </li>
            <li>
              <span class="code">.state$</span> — reactive observable stream
            </li>
            <li>
              <span class="code">.state.value()</span> — Angular signal (when
              using <sdux-package-name />/angular)
            </li>
          </ul>

          <sdux-multi-framework-example description="Scoped State Access">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;User[]&gt;('users')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;User[]&gt;(UserService);

  // Computed signal — derived state, no global tree path
  readonly activeUsers = computed(() =&gt;
    this.vault.state.value()
      .filter(u =&gt; u.active)
  );

  // Reactive stream — scoped to this FeatureCell
  readonly activeUsers$ = this.vault.state$.pipe(
    map(snapshot =&gt; snapshot.value.filter(u =&gt; u.active))
  );
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

const userCell = FeatureCell('users', &#123; value: [] &#125;);
userCell.initialize();

// Synchronous snapshot — no global tree path
const activeUsers = userCell.state.value
  .filter(u =&gt; u.active);

// Reactive stream — scoped to this FeatureCell
userCell.state$.subscribe(snapshot =&gt; &#123;
  const active = snapshot.value.filter(u =&gt; u.active);
  console.log(active);
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            Because the <sdux-feature-cell /> itself is injectable, any
            component, service, or controller that injects it receives the same
            reactive state source. There is no global selector registry to
            maintain, no path strings to keep in sync, and no cascade failures
            when another team changes their state shape.
          </p>

          <div class="callout callout-info">
            <p>
              Selectors in <sdux-vault-brand-name /> are not global projections.
              They are scoped, reusable views of a specific state owner. The
              owning <sdux-feature-cell /> is the boundary — not a position in a
              global tree.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Reactive APIs — .state$ and .state.value()
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> provides multiple state access surfaces to
            match different consumption patterns. All surfaces read from the
            same atomic snapshot produced by the pipeline — they differ only in
            how they deliver updates to consumers.
          </p>

          <table>
            <thead>
              <tr>
                <th>API</th>
                <th>Type</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="code">.state</span></td>
                <td>Synchronous snapshot</td>
                <td>Read current value in imperative code</td>
              </tr>
              <tr>
                <td><span class="code">.state$</span></td>
                <td>Observable stream</td>
                <td>React to state changes over time</td>
              </tr>
              <tr>
                <td><span class="code">.state.value()</span></td>
                <td>Angular signal</td>
                <td>Signal-based rendering in Angular templates</td>
              </tr>
            </tbody>
          </table>

          <p>
            Every surface reads from the same committed snapshot. When the
            pipeline completes and commits state, all surfaces update
            atomically. There are no intermediate values, no stale reads, and no
            timing-dependent inconsistencies between the synchronous getter and
            the reactive stream.
          </p>

          <p>
            Derived state can be implemented using plain TypeScript functions,
            computed signals (Angular), RxJS operators on
            <span class="code">.state$</span>, or getter methods colocated with
            the <sdux-feature-cell />.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">When Memoization Still Matters</div>
        <div class="section-body">
          <p>
            Scoped state access eliminates the structural coupling that makes
            Redux selectors fragile, but it does not eliminate the need for
            memoization in all cases. If you derive expensive computed values
            from state — filtering large arrays, joining across multiple
            properties, computing aggregates — memoization still helps avoid
            unnecessary recomputation.
          </p>

          <p>
            The difference is that memoization in
            <sdux-vault-brand-name /> is simpler to reason about:
          </p>

          <ul>
            <li>
              State updates are atomic and deterministic — you know exactly when
              recomputation will trigger
            </li>
            <li>
              The input to your derived function is a single
              <sdux-feature-cell /> snapshot, not a global tree slice
            </li>
            <li>
              Angular signals and RxJS
              <span class="code">distinctUntilChanged</span> provide built-in
              change detection without a separate memoization library
            </li>
          </ul>

          <p>
            You do not need Reselect, createSelector, or any selector
            composition library. Standard language-level memoization patterns
            work because the input boundary is well-defined and stable.
          </p>

          <div class="callout callout-info">
            <p>
              Memoization strategies remain valid in
              <sdux-vault-brand-name />. However, because state updates are
              atomic and deterministic, recomputation behavior is easier to
              reason about. You know exactly when the snapshot changed and
              exactly what changed — no Reselect dependency graph required.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Redux Comparison</div>
        <div class="section-body">
          <p>
            Redux selectors project from a global store tree, requiring
            composition and memoization libraries to manage coupling and
            performance. <sdux-vault-brand-name /> provides scoped reactive
            state directly from the owning <sdux-feature-cell />.
          </p>

          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Redux Selectors</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data source</td>
                <td>Global state tree</td>
                <td>Owning <sdux-feature-cell /></td>
              </tr>
              <tr>
                <td>Coupling</td>
                <td>Coupled to tree path structure</td>
                <td>Scoped to cell — no tree dependency</td>
              </tr>
              <tr>
                <td>Memoization</td>
                <td>Required (Reselect / createSelector)</td>
                <td>Optional — built-in signals and distinctUntilChanged</td>
              </tr>
              <tr>
                <td>Cross-team impact</td>
                <td>One restructure breaks downstream selectors</td>
                <td>Cells are independent — no cascade failures</td>
              </tr>
              <tr>
                <td>Derived state</td>
                <td>Selector composition chains</td>
                <td>Plain functions, computed signals, RxJS operators</td>
              </tr>
              <tr>
                <td>State consistency</td>
                <td>Depends on middleware ordering</td>
                <td>Atomic snapshots from deterministic pipeline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Explore scoped state access and reactive APIs in a live example:
          </p>
          <!-- StackBlitz: selectors-without-global-tree -->
          <ul>
            <li>
              <a routerLink="/docs/pipeline/apis/feature-cell-api">
                FeatureCell API — state, state$, and state.value()
              </a>
            </li>
            <li>
              <a routerLink="/docs/migration" fragment="selectors">
                Redux Concepts in <sdux-brand-name /> — Selectors
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/execution-guarantee">
                Pipeline Execution Guarantees
              </a>
            </li>
            <li>
              <a routerLink="/docs/stackblitz"> StackBlitz Examples </a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogSelectorsWithoutAGlobalTreeComponent {}
