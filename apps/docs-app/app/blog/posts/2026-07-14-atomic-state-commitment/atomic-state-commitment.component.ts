import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-atomic-state-commitment',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="Atomic State Commitment — Why Components Never See Partial Updates"
      date="2026-07-14"
      pillar="ED"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          In Redux, a selector can read intermediate state in the middle of a
          dispatch, and middleware can dispatch while another dispatch is still
          running. <sdux-brand-name /> removes that entire category of bugs by
          separating <em>computing</em> the next state from
          <em>committing</em> it. The pipeline either commits one complete
          snapshot or changes nothing at all — your components never see torn
          state. And because there is no global store to funnel through, many
          FeatureCells can be resolving updates at the same moment while each
          one stays perfectly atomic on its own.
        </p>
        <div class="callout callout-info">
          <strong>Redux Angle:</strong> Redux routes every update through a
          single global store and dispatch system, so intermediate state can be
          visible during dispatch and middleware re-dispatch.
        </div>
        <div class="callout callout-info">
          <strong><sdux-brand-name /> Angle:</strong> <sdux-brand-name /> scopes
          state to isolated FeatureCells and defers commitment to a microtask
          boundary, guaranteeing atomic snapshots with no partial visibility.
        </div>
      </header>

      <section class="section">
        <div class="section-title">Partial State Visibility in Redux</div>
        <div class="section-body">
          <p>
            Redux dispatch is synchronous and eager. When you call
            <strong>dispatch(action)</strong>, the action travels through
            middleware and then through the reducer tree, and the store's state
            is replaced as that work unfolds. This creates two well-known
            hazards.
          </p>
          <p>
            First, <strong>intermediate visibility</strong>. If middleware or a
            subscriber reads the store while a dispatch is still in flight, it
            can observe a state that is neither the fully previous value nor the
            fully next value — a partially updated tree.
          </p>
          <p>
            Second, <strong>re-dispatch during dispatch</strong>. Middleware
            that dispatches a new action while the current one is still being
            processed interleaves two updates. The ordering of what each
            subscriber sees becomes dependent on middleware composition and call
            timing.
          </p>
          <p>
            Both hazards share a root cause: computing the next state and making
            it visible are the same operation. There is no boundary between
            them.
          </p>
          <p>
            There is a second, quieter cost to the single global store: every
            dispatch in the entire application funnels through one reducer tree.
            Atomicity — to whatever degree Redux provides it — is coupled to a
            single global serialization point. Unrelated slices of state cannot
            settle independently because they all share the same dispatch
            channel.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How Atomic Commitment Works</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> executes every state update in two distinct
            phases that are never interleaved:
            <strong>pipeline computation</strong> and
            <strong>state commitment</strong>. Pipeline computation determines
            <em>what</em> the next state should be. State commitment determines
            <em>when</em> and <em>how</em> that result becomes visible to
            synchronous getters, reactive observers, callbacks, and DevTools.
          </p>
          <p>
            During computation, the pipeline performs all of its work
            <em>without mutating state</em> — interceptor evaluation, resolve
            behavior execution, operator, filter, and reducer processing, error
            normalization, and the final outcome decision. Only after the
            pipeline has fully determined a final outcome does
            <sdux-brand-name /> proceed to commit.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Partial results, intermediate reducer
            output, and transient values are never observable outside the
            pipeline. Either the entire snapshot is committed, or no state
            change is visible at all.
          </div>
          <p>
            State ownership lives in independent
            <a href="/docs/references/functions/feature-cell">FeatureCells</a>,
            each with its own isolated state and execution lifecycle. Here is
            how you create one across frameworks:
          </p>

          <sdux-multi-framework-example description="Create a FeatureCell">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
import &#123; provideVault &#125; from '&#64;sdux-vault/angular';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      CartService,
      &#123;
        key: 'cart',
        initialState: &#123; items: [], total: 0 &#125;
      &#125;
    )
  ]
&#125;;

// cart.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';
import &#123; CartState &#125; from './cart.shape';

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
              <pre class="code-inline"><code class="language-ts">// main.ts
import &#123; Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123; logLevel: 'off' &#125;);

// cart.cell.ts
import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123; items: [], total: 0 &#125;
&#125;);

cartCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Microtask Boundary</div>
        <div class="section-body">
          <p>
            Once pipeline computation completes,
            <sdux-brand-name /> schedules state commitment on a
            <strong>microtask boundary</strong>. Signal updates, state
            callbacks, DevTools notifications, and controller notifications are
            all executed inside a <strong>queueMicrotask</strong> callback.
          </p>
          <p>This boundary guarantees three things:</p>
          <table aria-label="Microtask boundary guarantees">
            <thead>
              <tr>
                <th scope="col" class="column-250">Guarantee</th>
                <th scope="col" class="column-auto">What it prevents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  The current pipeline run completes fully before any observer
                  is notified
                </td>
                <td>Partial snapshot visibility</td>
              </tr>
              <tr>
                <td>
                  No observer can trigger a new pipeline run while a commit is
                  in progress
                </td>
                <td>Interleaved updates and re-entrant writes</td>
              </tr>
              <tr>
                <td>All observers see the same finalized snapshot</td>
                <td>Timing-dependent inconsistencies between subscribers</td>
              </tr>
            </tbody>
          </table>
          <p>
            The result is an <strong>atomic snapshot</strong>: fully resolved,
            fully filtered, fully reduced, and fully normalized. Observers never
            see intermediate states or partially reduced values. This atomicity
            applies equally to synchronous inputs, promises, observables, and
            streams.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Atomicity Without a Global Bottleneck</div>
        <div class="section-body">
          <p>
            Atomic commitment in <sdux-brand-name /> is not enforced by a single
            global lock. There is no global store, no global dispatch channel,
            and no shared selector tree that every update must pass through.
            Instead, each
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            owns its own execution boundary — its own
            <a href="/docs/pipeline/execution-guarantee/conductor">Conductor</a>
            and
            <a href="/docs/pipeline/execution-guarantee/conductor-queue"
              >queue</a
            >
            — and serialization is scoped <em>to that cell alone</em>.
          </p>
          <p>
            The practical consequence is worth sitting with: a cart cell, a
            user-profile cell, and a notifications cell can all be resolving
            updates in the same tick. Each runs its own compute-then-commit
            cycle and finalizes on its own microtask boundary. None of them
            waits on the others, and none of them can leak a half-finished value
            into another. Atomicity is preserved <em>per cell</em>, in parallel,
            rather than rationed through one global chokepoint.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Because serialization is scoped to a
            single
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>, N
            cells can update concurrently while every cell still commits one
            complete, atomic snapshot. Independence is the default — not
            something you coordinate.
          </div>
          <table aria-label="Global store versus scoped FeatureCells">
            <thead>
              <tr>
                <th scope="col" class="column-250">Concern</th>
                <th scope="col" class="column-auto">Redux global store</th>
                <th scope="col" class="column-auto">
                  <sdux-brand-name /> FeatureCells
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Serialization scope</td>
                <td>One global dispatch channel</td>
                <td>Per-cell — one Conductor queue each</td>
              </tr>
              <tr>
                <td>Independent settlement</td>
                <td>No — all slices share the reducer tree</td>
                <td>Yes — each cell finalizes on its own microtask</td>
              </tr>
              <tr>
                <td>Cross-slice interference</td>
                <td>Possible via shared dispatch and subscribers</td>
                <td>Structurally impossible — no shared state tree</td>
              </tr>
            </tbody>
          </table>
          <p>
            This is why atomicity in <sdux-brand-name /> scales with the number
            of features rather than contending against it. Adding a new
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            adds an independent execution boundary — it never widens a global
            surface that every other update has to negotiate.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Reentrancy Is Structurally Impossible</div>
        <div class="section-body">
          <p>
            Because state commitment is deferred to a microtask, any attempt to
            trigger a new state update from within a reducer, a state callback,
            a DevTools hook, or an error handler always occurs
            <em>after</em> the current commit has completed. There is no window
            in which a new update can wedge itself into an in-progress one.
          </p>
          <p>
            This eliminates entire classes of bugs common in Redux-style
            systems:
          </p>
          <ul>
            <li>Dispatching during reducer execution</li>
            <li>Promise resolution interleaving with state writes</li>
            <li>Observer-triggered infinite loops</li>
          </ul>
          <div class="callout callout-warning">
            <strong>Gotcha:</strong> Because commitment is deferred, reading a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>'s
            state synchronously on the same tick you triggered an update returns
            the previous committed snapshot — not the pending one. In tests, use
            the settlement API to wait for the pipeline before asserting.
          </div>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'act → settle → assert Testing Pattern'">
              <pre
                class="code-inline"><code class="language-ts">it('commits a complete snapshot', async () =&gt; &#123;
  // act — trigger a state update
  cartCell.mergeState(&#123; value: mockItems &#125;);

  // settle — wait for the pipeline to commit
  await vaultSettled('cart');

  // assert — verify the committed snapshot
  expect(cartCell.state.total).toBe(42);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Videos</div>

        <div class="section-body">
          <sdux-video videoId="TRlvCmluBcE" [tooltip]="'Pipeline Isolation'" />
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Atomic commitment is not an incidental optimization — it is a
            deliberate architectural boundary that separates computation from
            visibility. Read the
            <a href="/docs/pipeline/execution-guarantee"
              >Pipeline Execution Guarantees</a
            >
            for the full execution contract, and the
            <a href="/docs/migration">Redux migration guide</a> to see how your
            existing reducer and selector knowledge carries directly into
            <sdux-brand-name />.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogAtomicStateCommitmentComponent {}
