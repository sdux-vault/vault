import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-effects-without-middleware',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    PackageNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Effects Without Middleware — How Pipeline Stages Replace Thunks & Sagas"
      date="2026-07-01"
      pillar="ED"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          Redux effects are middleware — thunks dispatching thunks, sagas
          yielding sagas, observables piping into more observables. Every async
          operation becomes a dispatch chain that resolves at arbitrary times
          with no ordering guarantee. <sdux-brand-name />
          eliminates middleware entirely. Asynchronous inputs resolve through
          pipeline stages with serialized execution, deterministic ordering, and
          atomic state commitment.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Middleware Problem</div>
        <div class="section-body">
          <p>
            Redux was designed around synchronous reducer composition. When
            applications needed async operations — API calls, WebSocket
            messages, timer coordination — the core model had no answer. The
            community responded with middleware: thunks, sagas, and observables.
          </p>

          <p>
            Each middleware layer intercepts dispatched actions and performs
            side effects before (or instead of) reaching the reducer. The result
            is a parallel execution system layered on top of the store:
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Redux Thunk — Async Dispatch Chain'">
              <pre
                class="code-inline"><code class="language-ts">// A thunk dispatches multiple actions at arbitrary times
function fetchUsers() &#123;
  return async (dispatch) =&gt; &#123;
    dispatch(&#123; type: 'FETCH_USERS_START' &#125;);

    try &#123;
      const response = await fetch('/api/users');
      const users = await response.json();
      dispatch(&#123; type: 'FETCH_USERS_SUCCESS', payload: users &#125;);
    &#125; catch (error) &#123;
      dispatch(&#123; type: 'FETCH_USERS_FAILURE', payload: error &#125;);
    &#125;
  &#125;;
&#125;

// Dispatch the thunk
dispatch(fetchUsers());</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            This pattern introduces three separate dispatches for a single
            logical operation. Each dispatch broadcasts to the entire reducer
            tree. The timing of the success or failure dispatch depends on
            network latency — which means ordering relative to other operations
            is non-deterministic.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Redux Saga — Generator Orchestration'">
              <pre
                class="code-inline"><code class="language-ts">// A saga yields effects that resolve at framework-controlled times
function* fetchUsersSaga() &#123;
  yield put(&#123; type: 'FETCH_USERS_START' &#125;);

  try &#123;
    const users = yield call(api.fetchUsers);
    yield put(&#123; type: 'FETCH_USERS_SUCCESS', payload: users &#125;);
  &#125; catch (error) &#123;
    yield put(&#123; type: 'FETCH_USERS_FAILURE', payload: error &#125;);
  &#125;
&#125;

// Root saga watches for trigger actions
function* rootSaga() &#123;
  yield takeLatest('FETCH_USERS_REQUESTED', fetchUsersSaga);
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Sagas add a generator-based orchestration layer. They listen for
            actions, perform async work, and dispatch new actions. The
            complexity compounds: watchers, forks, races, channels — an entire
            concurrency framework layered on top of a state container.
          </p>

          <div class="callout callout-warning">
            <p>
              The fundamental issue is not the middleware libraries themselves.
              It is that Redux has no built-in model for async state resolution.
              Middleware exists because the core architecture cannot coordinate
              asynchronous inputs within its own execution model.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          How Async Resolution Works in the <sdux-brand-name /> Pipeline
        </div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> does not use middleware. Asynchronous input is
            handled through the Resolve stage — a core pipeline stage that
            normalizes all incoming inputs into a canonical value before
            downstream processing begins.
          </p>

          <p>
            The Resolve stage accepts multiple input forms and resolves them
            under pipeline coordination:
          </p>

          <table>
            <thead>
              <tr>
                <th>Input Form</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plain state values</td>
                <td>Passed through immediately</td>
              </tr>
              <tr>
                <td>Deferred factories (functions returning Promises)</td>
                <td>Invoked and awaited under pipeline control</td>
              </tr>
              <tr>
                <td>Observable-based inputs</td>
                <td>Subscribed and resolved within pipeline lifecycle</td>
              </tr>
              <tr>
                <td>Structured state envelopes</td>
                <td>Unwrapped and normalized</td>
              </tr>
              <tr>
                <td>Angular HttpResourceRef (<sdux-package-name />/angular)</td>
                <td>Observed until a concrete value emits, then resolved</td>
              </tr>
            </tbody>
          </table>

          <p>
            Regardless of how the input originates, the Resolve stage guarantees
            that downstream pipeline stages — operators, filters, reducers —
            always receive a predictable, normalized upstream value. No stage
            ever reasons about transport, timing, or source-specific concerns.
          </p>

          <div class="callout callout-info">
            <p>
              The Resolve stage is a core pipeline stage. It is always present
              and executes automatically. You do not install or configure it.
              Every <sdux-feature-cell /> includes resolve behavior by default.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Resolve Behaviors vs Thunks</div>
        <div class="section-body">
          <p>
            A Redux thunk dispatches new actions at arbitrary times. The store
            has no knowledge of when those actions will arrive or in what order.
            Multiple thunks executing concurrently can interleave their
            dispatches unpredictably.
          </p>

          <p>
            In <sdux-brand-name />, you submit a deferred factory directly to
            the owning <sdux-feature-cell />. The pipeline resolves the async
            value under its own coordination — serialized through the conductor
            queue, committed atomically in a microtask boundary.
          </p>

          <sdux-multi-framework-example
            description="Async State Resolution — Deferred Factory">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;User[]&gt;('users')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;User[]&gt;(UserService);

  fetchUsers() &#123;
    // Submit a deferred factory — the pipeline resolves it
    this.vault.mergeState(&#123;
      value: () =&gt; fetch('/api/users').then(r =&gt; r.json())
    &#125;);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

const userCell = FeatureCell('users', &#123; value: [] &#125;);

// Submit a deferred factory — the pipeline resolves it
userCell.mergeState(&#123;
  value: () =&gt; fetch('/api/users').then(r =&gt; r.json())
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>Compare the two approaches side by side:</p>

          <table>
            <thead>
              <tr>
                <th>Concern</th>
                <th>Redux Thunk</th>
                <th><sdux-brand-name /> Resolve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dispatch count per operation</td>
                <td>3+ (start, success, failure)</td>
                <td>1 (single mergeState call)</td>
              </tr>
              <tr>
                <td>Ordering guarantee</td>
                <td>None — resolves at arbitrary times</td>
                <td>Serialized through conductor queue</td>
              </tr>
              <tr>
                <td>Reentrancy risk</td>
                <td>Possible — dispatch during dispatch</td>
                <td>Structurally impossible</td>
              </tr>
              <tr>
                <td>State commitment</td>
                <td>Immediate on each dispatch</td>
                <td>Deferred to microtask boundary</td>
              </tr>
              <tr>
                <td>Middleware required</td>
                <td>Yes — redux-thunk</td>
                <td>No — built into the pipeline</td>
              </tr>
            </tbody>
          </table>

          <p>
            The pipeline does not dispatch new actions after resolution. It
            resolves the input, processes it through operators, filters, and
            reducers, and commits the final state — all within a single pipeline
            execution. No secondary dispatch. No intermediate states visible to
            observers.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Controllers vs Saga Orchestration</div>
        <div class="section-body">
          <p>
            Redux Sagas provide orchestration through generators — watching for
            actions, forking concurrent tasks, racing competing effects. The
            entire concurrency model lives outside the store in a parallel
            execution layer.
          </p>

          <p>
            <sdux-brand-name /> provides orchestration through Controllers.
            Controllers govern execution authority for pipeline attempts — they
            evaluate whether an update is allowed, denied, or aborted before
            pipeline computation begins.
          </p>

          <table>
            <thead>
              <tr>
                <th>Concern</th>
                <th>Redux Saga</th>
                <th><sdux-brand-name /> Controller</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Execution layer</td>
                <td>External middleware</td>
                <td>Pipeline Policy stage</td>
              </tr>
              <tr>
                <td>Coordination model</td>
                <td>Generator-based (yield, fork, race)</td>
                <td>Policy evaluation before computation</td>
              </tr>
              <tr>
                <td>Relationship to state</td>
                <td>Dispatches actions that reach reducers</td>
                <td>Does not touch data — governs execution authority only</td>
              </tr>
              <tr>
                <td>Concurrency handling</td>
                <td>Manual (takeLatest, takeEvery, race)</td>
                <td>Serialized by conductor queue</td>
              </tr>
              <tr>
                <td>Testability</td>
                <td>Generator stepping with mocked effects</td>
                <td>act → settle → assert with vaultSettled</td>
              </tr>
            </tbody>
          </table>

          <p>
            Controllers do not dispatch, yield, or fork. They declare policy.
            The pipeline enforces that policy deterministically. This separation
            means your coordination logic never interleaves with your data
            transformation logic — they occupy different pipeline layers
            entirely.
          </p>

          <div class="callout callout-info">
            <p>
              Controllers operate in the Policy Layer — the first stage of
              pipeline execution. They evaluate
              <strong>before</strong> any data processing occurs. Reducers
              operate in the Processing Layer, separated by multiple stage
              boundaries. The two concerns never mix.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Execution Guarantee</div>
        <div class="section-body">
          <p>
            Both thunks and sagas share a fundamental limitation: they dispatch
            actions at arbitrary times with no guarantee about ordering relative
            to other concurrent operations. Two thunks resolving simultaneously
            can interleave their dispatches. Two sagas forked in parallel can
            commit conflicting state.
          </p>

          <p>
            <sdux-brand-name /> eliminates this entire category of bug through
            architectural constraints:
          </p>

          <ul>
            <li>
              Every pipeline attempt is serialized through a FIFO conductor
              queue — one at a time, deterministic order
            </li>
            <li>
              Pipeline computation is pure and side-effect free — no state
              mutation until computation completes
            </li>
            <li>
              State commitment is deferred to a microtask boundary — observers
              never see partial results
            </li>
            <li>
              Reentrancy is structurally impossible — no observer can trigger a
              new pipeline run while a commit is in progress
            </li>
          </ul>

          <p>
            These are not conventions you must remember. They are architectural
            guarantees enforced by the runtime. You cannot accidentally bypass
            them.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Redux Comparison</div>
        <div class="section-body">
          <p>
            Redux handles async through middleware that dispatches new actions
            at arbitrary times. <sdux-brand-name /> resolves async inputs
            through pipeline-coordinated stages with serialized execution.
          </p>

          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Redux (Thunk/Saga/Observable)</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Async model</td>
                <td>External middleware layer</td>
                <td>Built-in Resolve stage</td>
              </tr>
              <tr>
                <td>Coordination</td>
                <td>Manual (takeLatest, debounce, race)</td>
                <td>Pipeline-managed serialization</td>
              </tr>
              <tr>
                <td>Side effect scope</td>
                <td>Anywhere in middleware chain</td>
                <td>Contained within pipeline lifecycle</td>
              </tr>
              <tr>
                <td>Ordering guarantee</td>
                <td>None without manual effort</td>
                <td>FIFO queue ensures deterministic order</td>
              </tr>
              <tr>
                <td>State visibility</td>
                <td>Intermediate states visible between dispatches</td>
                <td>Only final atomic snapshots are observable</td>
              </tr>
              <tr>
                <td>Dependencies</td>
                <td>redux-thunk, redux-saga, or redux-observable</td>
                <td>None — resolve is a core pipeline stage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Explore how <sdux-brand-name /> handles async state resolution
            without middleware:
          </p>
          <ul>
            <li>
              <a routerLink="/docs/pipeline/behaviors/resolve">
                Understanding the Resolve Stage
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/controllers/policy">
                Controllers — Policy Layer
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/execution-guarantee">
                Pipeline Execution Guarantees
              </a>
            </li>
            <li>
              <a routerLink="/docs/migration">
                Redux Concepts in <sdux-brand-name /> — Full migration reference
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
export class BlogEffectsWithoutMiddlewareComponent {}
