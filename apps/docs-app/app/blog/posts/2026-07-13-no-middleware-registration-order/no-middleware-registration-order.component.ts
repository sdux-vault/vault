import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-no-middleware-registration-order',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="No Middleware Registration Order — Pipeline Stages That Always Execute the Same Way"
      date="2026-07-13"
      pillar="ED"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          Redux middleware runs in registration order. Change the order, change
          the behavior — and there is no contract about who goes first.
          <sdux-vault-brand-name [tm]="true" /> replaces unordered middleware
          with a fixed, guaranteed sequence of pipeline stages. Same order.
          Every time. Deterministic.
        </p>
        <p>
          This post explains why implicit middleware ordering is a source of
          production bugs, how a fixed pipeline removes the ambiguity, and what
          changes when execution order becomes an architectural guarantee
          instead of a registration accident.
        </p>
        <div class="callout callout-info">
          <strong>Redux Angle:</strong> Redux middleware executes in implicit
          registration order with no execution contract.
        </div>
        <div class="callout callout-info">
          <strong><sdux-vault-brand-name /></strong> pipeline stages execute in
          a fixed, guaranteed order every time.
        </div>
      </header>

      <section class="section">
        <div class="section-title">The Middleware Ordering Problem</div>
        <div class="section-body">
          <p>
            In Redux, middleware is composed into a chain when you configure the
            store. Each middleware wraps the next, and the order you pass them
            to
            <strong>applyMiddleware()</strong> determines the order they run.
            The chain is real, but the contract is implicit — nothing in the
            type system or the runtime tells you what order is correct.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Redux — order is defined by registration, not by contract'">
              <pre
                class="code-inline"><code class="language-ts">// The order here IS the behavior.
const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk, analytics)
);

// Swap two entries and the app behaves differently:
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger, analytics)
);
// Now the logger sees resolved thunks instead of raw actions.</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The problems this creates are subtle because the code that breaks is
            not the code that changed:
          </p>
          <ul>
            <li>
              <strong>Order is invisible at the call site.</strong> A component
              dispatching an action has no way to know which middleware will run
              first. The behavior lives in the store configuration, far from
              where the action is fired.
            </li>
            <li>
              <strong>Registration order drifts.</strong> When teams add
              middleware over time — a logger here, a crash reporter there — the
              chain grows. Each addition can change the behavior of every
              middleware downstream of it.
            </li>
            <li>
              <strong>Async middleware compounds the ambiguity.</strong> Thunks,
              sagas, and observable middleware dispatch new actions at arbitrary
              times. The order in which those follow-up actions hit the reducer
              tree depends on both the middleware chain and runtime timing.
            </li>
            <li>
              <strong>There is no enforced contract.</strong> Two valid
              orderings can both compile, both pass a subset of tests, and
              produce different results in production.
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">A Fixed, Ordered Pipeline</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> does not compose middleware. Every state
            update flows through a deterministic pipeline whose stage order is
            fixed by the architecture — not by the order in which you register
            behaviors. You register reducers, filters, taps, and other behaviors
            in any order that reads well; the pipeline still executes each stage
            in its canonical position.
          </p>
          <p>
            The
            <a
              [routerLink]="['/docs/migration']"
              target="_blank"
              rel="noopener noreferrer"
              >migration guide</a
            >
            frames the contrast directly:
          </p>
          <div class="callout callout-info">
            <p>
              Instead of middleware dispatching new actions at arbitrary times,
              asynchronous results enter the pipeline as controlled attempts.
              Async inputs are resolved under pipeline coordination before state
              commitment occurs.
            </p>
          </div>
          <p>
            Registration expresses <em>what</em> participates. The pipeline
            decides <em>when</em> each stage runs. Those two concerns are
            separated, so adding a new behavior never reorders the ones already
            in place.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'SDuX Vault — registration order does not change execution order'">
              <pre
                class="code-inline"><code class="language-ts">// Register in any order that reads well.
cartCell
  .afterTaps([logCommit])
  .filters([rejectEmptyCart])
  .reducers([computeTotal])
  .initialize();

// The pipeline still runs stages in their canonical order:
// resolve &#8594; merge &#8594; filter &#8594; reduce &#8594; after-tap &#8594; state
// The reducer always runs before the after-tap, regardless of
// the order the methods were called above.</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Guaranteed Pipeline Stages</div>
        <div class="section-body">
          <p>
            Every update traverses the same ordered stages, grouped into layers.
            The order below is fixed for the lifetime of the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            For the complete architectural index, see the
            <a
              [routerLink]="['/docs/pipeline/behaviors/complete-pipeline-spec']"
              target="_blank"
              rel="noopener noreferrer"
              >pipeline architecture reference</a
            >.
          </p>
          <table aria-label="Guaranteed pipeline stage order">
            <thead>
              <tr>
                <th scope="col" class="column-150">Stage</th>
                <th scope="col" class="column-150">Layer</th>
                <th scope="col" class="column-auto">Primary Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Queue</td>
                <td>Policy</td>
                <td>Serializes attempts through a FIFO queue, one at a time</td>
              </tr>
              <tr>
                <td>Policy (Controllers)</td>
                <td>Policy</td>
                <td>Allows, denies, or aborts an update before computation</td>
              </tr>
              <tr>
                <td>Interceptors</td>
                <td>Pre-Processing</td>
                <td>Admission control and conditional gating</td>
              </tr>
              <tr>
                <td>Resolve</td>
                <td>Processing</td>
                <td>Normalizes incoming input into a resolved candidate</td>
              </tr>
              <tr>
                <td>Merge</td>
                <td>Processing</td>
                <td>Combines committed state with the resolved candidate</td>
              </tr>
              <tr>
                <td>Operators</td>
                <td>Processing</td>
                <td>Refines or suppresses the merged candidate</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td>Processing</td>
                <td>Refines or suppresses candidates before reduction</td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>Processing</td>
                <td>Computes the finalized candidate state</td>
              </tr>
              <tr>
                <td>State</td>
                <td>Post-Processing</td>
                <td>Commits and reactively emits the finalized snapshot</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-info">
            <p>
              Observational taps run in fixed positions too: Before Tap executes
              prior to reduction and After Tap executes after reduction. Their
              position is guaranteed by the pipeline, not by the order you
              register them.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Order Matters More Than You Think</div>
        <div class="section-body">
          <p>
            Execution order is not a stylistic detail — it decides correctness.
            When order is implicit, the same code produces different results
            depending on how the chain was assembled.
          </p>
          <table aria-label="Ordering behavior comparison">
            <thead>
              <tr>
                <th scope="col" class="column-250">Concern</th>
                <th scope="col" class="column-auto">Redux Middleware</th>
                <th scope="col" class="column-auto">
                  <sdux-vault-brand-name /> Pipeline
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What defines order</td>
                <td>Registration sequence in applyMiddleware()</td>
                <td>Fixed pipeline stage architecture</td>
              </tr>
              <tr>
                <td>Effect of adding a new participant</td>
                <td>Can reorder every downstream middleware</td>
                <td>Slots into its canonical stage; nothing else moves</td>
              </tr>
              <tr>
                <td>Contract enforcement</td>
                <td>Implicit — no runtime or type guarantee</td>
                <td>Guaranteed — stage order is invariant</td>
              </tr>
              <tr>
                <td>Reproducibility</td>
                <td>Depends on chain assembly and runtime timing</td>
                <td>Identical on every execution</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              The most expensive middleware ordering bugs are the ones that only
              appear after a refactor. A crash reporter added to the end of the
              chain silently changes what an earlier logging middleware sees.
              Nothing in the changed file is wrong — the defect lives in the
              interaction between registration order and runtime behavior.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Debugging Deterministic Execution</div>
        <div class="section-body">
          <p>
            A fixed pipeline changes what debugging feels like. When the stage
            order can never vary, a reproduction is a reproduction — the
            pipeline that produced a bug in production is the same pipeline that
            runs in your test.
          </p>
          <ul>
            <li>
              <strong>No timing-dependent surprises.</strong> The
              <a
                [routerLink]="['/docs/pipeline/execution-guarantee']"
                target="_blank"
                rel="noopener noreferrer"
                >execution guarantee</a
              >
              serializes concurrent inputs and commits state at a microtask
              boundary, so observers never see partial or interleaved results.
            </li>
            <li>
              <strong>The stage list is the mental model.</strong> To reason
              about an update you follow the fixed order top to bottom. There is
              no separate "middleware chain" to reconstruct from store
              configuration.
            </li>
            <li>
              <strong>Tests match production.</strong> Because order cannot
              drift, the act &#8594; settle &#8594; assert test path exercises
              the exact stage sequence your users hit.
            </li>
          </ul>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'act → settle → assert against a deterministic pipeline'">
              <pre
                class="code-inline"><code class="language-ts">it('applies the total after reduction', async () =&gt; &#123;
  // act — submit a state update
  cartCell.mergeState(&#123; items: mockItems &#125;);

  // settle — wait for the pipeline to complete
  await vaultSettled('cart');

  // assert — the reducer ran before the after-tap, every time
  expect(cartCell.state.total).toBe(42);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            The clearest way to feel the difference is to stop reasoning about
            registration order entirely. Register your behaviors in whatever
            order reads best and trust the pipeline to run each stage in its
            fixed position.
          </p>
          <ul>
            <li>
              <a
                [routerLink]="[
                  '/docs/pipeline/behaviors/complete-pipeline-spec'
                ]">
                Pipeline Architecture — the full ordered stage index
              </a>
            </li>
            <li>
              <a [routerLink]="['/docs/pipeline/execution-guarantee']">
                Pipeline Execution Guarantee
              </a>
            </li>
            <li>
              <a [routerLink]="['/docs/migration']">
                Redux Concepts in SDuX Vault — full concept mapping
              </a>
            </li>
          </ul>
          <p>
            Add one behavior to a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            then reorder your registration calls and watch the committed result
            stay identical. Order stops being something you manage and becomes
            something you can rely on.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogNoMiddlewareRegistrationOrderComponent {}
