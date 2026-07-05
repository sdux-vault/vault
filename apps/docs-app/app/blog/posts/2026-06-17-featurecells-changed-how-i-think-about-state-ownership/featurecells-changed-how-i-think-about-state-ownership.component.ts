import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-featurecells-changed-how-i-think-about-state-ownership',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="FeatureCells™ Changed How I Think About State Ownership"
      date="2026-06-17"
      pillar="ED"
      readingTime="5">
      <header class="docs-header">
        <p class="lead">
          Every state library I used before
          <sdux-vault-brand-name [tm]="true" /> shared the same fundamental
          assumption: state lives in a global store, and every feature reaches
          into it. <sdux-feature-cell />s changed that assumption entirely. One
          feature, one cell, one truth — and the problems that come with
          shared-everything architectures simply disappear.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Global Store Trap</div>
        <div class="section-body">
          <p>
            Global stores seem elegant at first. One tree of state, one set of
            selectors, one place to look. But at team scale, that single tree
            becomes a shared dependency that every feature must coordinate
            around.
          </p>
          <p>
            <span class="code">Feature A</span> adds a property.
            <span class="code">Feature B</span> renames one.
            <span class="code">Feature C</span> depends on a selector that
            touches both. Now renames one.
            <span class="code">Feature C</span> depends on a selector that
            touches both. Now every pull request requires cross-team review,
            every refactor risks breaking unrelated features, and your "single
            source of truth" becomes a single point of contention.
          </p>
          <p>
            The global store doesn't scale with teams. It scales with discipline
            — and discipline doesn't survive deadline pressure.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">One Feature, One Cell, One Truth</div>
        <div class="section-body">
          <p>
            A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> in
            <sdux-vault-brand-name /> is an isolated unit of state ownership.
            Each cell encapsulates its own typed state, its own pipeline, and
            its own lifecycle boundary. No other cell can read or write another
            cell's state directly.
          </p>
          <sdux-multi-framework-example
            description="Registering a FeatureCell with Typed State">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),
    provideFeatureCell(
      CartService,
      &#123;
        key: 'cart',
        initialState: &#123;
          items: [],
          total: 0,
          status: 'idle'
        &#125;
      &#125;
    )
  ]
&#125;;

// cart.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;CartState&gt;('cart')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CartService &#123;
  readonly vault = injectVault&lt;CartState&gt;(CartService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';

Vault(&#123; devMode: true, logLevel: 'off' &#125;);

export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123;
    items: [],
    total: 0,
    status: 'idle'
  &#125;
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p></p>
          <p>
            That's a complete ownership boundary. The cart feature owns its
            state, its pipeline stages, and its lifecycle. No other feature can
            mutate it, subscribe to its internals, or couple to its shape.
          </p>
          <div class="callout callout-info">
            <p>
              Each
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              is identified by a unique key and may be registered exactly once.
              Registration establishes the cell's identity and execution
              boundaries without triggering pipeline execution.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Scoped Pipelines and Why They Matter</div>
        <div class="section-body">
          <p>
            In a global store, middleware runs against all state updates. Every
            action passes through every reducer, every effect, every selector
            evaluation. A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>'s
            pipeline is scoped — its behaviors and controllers execute only for
            that cell's state.
          </p>
          <p>
            This means you can add a persistence behavior to the cart cell
            without affecting the user profile cell. You can add a validation
            filter to the checkout cell without slowing down the product
            catalog. Each cell's pipeline is independent, composable, and
            testable in isolation.
          </p>
          <sdux-multi-framework-example
            description="Scoped Pipeline with Behaviors and Controllers">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),
    provideFeatureCell(
      CartService,
      &#123; key: 'cart', initialState &#125;,
      [
        withLocalStoragePersistBehavior,
        withAes256EncryptBehavior
      ],
      [
        withMaxFailuresController(3)
      ]
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';
import &#123; withLocalStoragePersistBehavior, withAes256EncryptBehavior &#125; from '@sdux-vault/behaviors';
import &#123; withMaxFailuresController &#125; from '@sdux-vault/controllers';

Vault(&#123; devMode: true, logLevel: 'off' &#125;);

export const cartCell = FeatureCell(
  &#123; key: 'cart', initialState &#125;,
  [
    withLocalStoragePersistBehavior,
    withAes256EncryptBehavior
  ],
  [
    withMaxFailuresController(3)
  ]
);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The behaviors and controllers registered here operate exclusively
            within the cart cell's pipeline. They cannot leak into other cells,
            and other cells' behaviors cannot interfere with cart state.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Lifecycle-Aware State — Mount, Unmount, Done
        </div>
        <div class="section-body">
          <p>
            <sdux-feature-cell />s are lifecycle-aware. They mount when their
            feature activates and unmount when it deactivates — releasing
            memory, subscriptions, and pipeline resources automatically.
          </p>
          <p>
            This solves the stale-state problem that plagues global stores. When
            a user navigates away from a feature, its cell unmounts. When they
            return, the cell remounts with fresh initial state or restored
            persisted state — depending on how you've configured its behaviors.
          </p>
          <p>
            You don't need manual cleanup. You don't need to remember which
            subscriptions to unsubscribe. The cell's lifecycle boundary handles
            it.
          </p>
          <div class="callout callout-warning">
            <p>
              Calling methods on a destroyed
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              is invalid. The cell's lifecycle is terminal — once destroyed, it
              cannot be reactivated. Register a new cell if the feature
              remounts.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What This Means for Your Team</div>
        <div class="section-body">
          <p>
            <sdux-feature-cell />s map directly to team ownership. One team owns
            the cart cell. Another owns the user profile cell. A third owns the
            notification cell. Each team can evolve its state shape, add or
            remove behaviors, and refactor its pipeline without coordinating
            with anyone else.
          </p>
          <p>
            No cross-feature state leaks. No selector collisions. No shared
            reducer files that become merge-conflict magnets. The architecture
            enforces the boundaries that team agreements alone cannot sustain.
          </p>

          <table>
            <thead>
              <tr>
                <th>Global Store</th>
                <th>
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shared state tree</td>
                <td>Isolated typed state per feature</td>
              </tr>
              <tr>
                <td>Global middleware</td>
                <td>Scoped pipeline per cell</td>
              </tr>
              <tr>
                <td>Manual cleanup</td>
                <td>Lifecycle-aware mount/unmount</td>
              </tr>
              <tr>
                <td>Cross-team coordination</td>
                <td>Independent team ownership</td>
              </tr>
              <tr>
                <td>Selector coupling</td>
                <td>No cross-cell access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <!-- StackBlitz: featurecells-ownership -->
          <p>
            Explore the
            <a [routerLink]="['/docs/pipeline/apis/feature-cell']"
              >FeatureCell API documentation</a
            >
            to see the full registration surface, or jump into a live StackBlitz
            demo to create your own isolated cells with typed state and scoped
            pipelines.
          </p>
        </div>
      </section>
      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video
            videoId="koAAo1B-__Y"
            [tooltip]="'FeatureCell Definition'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogFeaturecellsChangedHowIThinkAboutStateOwnershipComponent {}
