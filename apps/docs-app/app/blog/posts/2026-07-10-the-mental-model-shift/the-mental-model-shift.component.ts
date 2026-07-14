import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-the-mental-model-shift',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title='The Mental Model Shift — From "What Action Happened" to "What State Should Exist"'
      date="2026-07-10"
      pillar="TA"
      readingTime="8">
      <header class="docs-header">
        <p class="lead">
          Redux asks: <em>what action happened?</em> and derives state by
          replaying that history through a reducer tree.
          <sdux-brand-name /> asks: <em>what state should exist?</em> and drives
          it through a deterministic pipeline. The shift is subtle. Its
          consequences are not.
        </p>
        <p>
          This post walks through the two mental models, shows exactly where
          they differ in practice, and explains which categories of bugs
          disappear when you stop thinking in events and start thinking in
          intended state.
        </p>
        <div class="callout callout-info">
          <strong>Redux Angle:</strong> Redux derives state from dispatched
          action history through reducer composition.
        </div>
        <div class="callout callout-info">
          <strong><sdux-brand-name /></strong> expresses state intent directly
          and drives it through a deterministic pipeline.
        </div>
      </header>

      <section class="section">
        <div class="section-title">The Action-Driven Model</div>
        <div class="section-body">
          <p>
            Redux is built on a specific idea from event sourcing: state is the
            result of applying every action in sequence. The store is the
            accumulation of history. You never say "set the cart to empty" — you
            dispatch a <strong>CLEAR_CART</strong> action and every reducer that
            cares about it computes its response.
          </p>
          <p>
            This model has real benefits. Actions are serializable. You can
            replay them. You can log them. You can time-travel. The entire state
            history is a sequence of discrete, named events.
          </p>
          <p>
            But the model also carries costs that compound as applications grow:
          </p>
          <ul>
            <li>
              <strong>Actions are global.</strong> Every dispatch broadcasts to
              the entire reducer tree. Reducers that have nothing to do with the
              action still evaluate it. The cost of "not matching" scales with
              the number of reducers.
            </li>
            <li>
              <strong>State is a byproduct of events.</strong> To understand
              what the current state is, you have to trace which actions led to
              it. The further the state is from the action that set it, the
              harder it is to reason about.
            </li>
            <li>
              <strong>Middleware introduces ordering ambiguity.</strong>
              Thunks, sagas, and observables dispatch new actions at arbitrary
              times. Execution order depends on middleware composition — a
              contract that is implicit, not enforced.
            </li>
          </ul>
          <p>
            The action-driven model asks you to think about the
            <em>history of what happened</em>. That's a powerful abstraction
            when you need an audit trail. It's friction when you just need to
            update a piece of state.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The State-Driven Model</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> starts from a different question: what should
            the state be <em>right now</em>? You express that intent directly,
            without naming an action, without broadcasting to a global store,
            and without relying on middleware to coordinate the outcome.
          </p>
          <p>
            The
            <a
              [routerLink]="['/docs/migration']"
              target="_blank"
              rel="noopener noreferrer"
              >migration guide</a
            >
            documents this contrast directly:
          </p>
          <div class="callout callout-info">
            <p>
              Instead of dispatching an action object, you submit state input
              into the pipeline. The conductor serializes execution, and the
              pipeline finalizes each attempt in a controlled microtask
              boundary.
            </p>
          </div>
          <p>
            In practice this means calling <strong>mergeState()</strong> or
            <strong>replaceState()</strong> directly on the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that owns the state you want to change. The update target is always
            explicit. The execution order is always deterministic. The committed
            result is always atomic.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'State-driven update — direct intent on the owning FeatureCell'">
              <pre
                class="code-inline"><code class="language-ts">// Redux — action-driven
dispatch(&#123; type: 'CLEAR_CART' &#125;);
// → broadcast to all reducers
// → each reducer evaluates the action type
// → cart reducer clears items
// → other reducers return current state unchanged

// SDuX Vault — state-driven
cartCell.replaceState(&#123; items: [], total: 0 &#125;);
// → submitted directly to the owning FeatureCell
// → pipeline executes: resolve → filter → reduce → commit
// → only cartCell is affected</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The intent is identical. The mechanism is structurally different.
            And that structural difference eliminates an entire class of
            coordination problems.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          What Disappears When You Stop Thinking in Events
        </div>
        <div class="section-body">
          <p>
            The shift from action-driven to state-driven is not just
            philosophical. It eliminates concrete categories of bugs that are
            endemic to Redux architectures at scale.
          </p>

          <table>
            <thead>
              <tr>
                <th class="column-250">Bug Category</th>
                <th class="column-auto">Root Cause in Redux</th>
                <th class="column-auto">Status in SDuX Vault</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stale state after async operations</td>
                <td>
                  Middleware dispatches before or after other middleware settles
                </td>
                <td>Eliminated — pipeline serializes all inputs</td>
              </tr>
              <tr>
                <td>Event ordering bugs</td>
                <td>Middleware composition order is implicit, not enforced</td>
                <td>Eliminated — deterministic pipeline stage order</td>
              </tr>
              <tr>
                <td>Reducer composition failures</td>
                <td>
                  Root reducer tree evaluates all reducers for every action
                </td>
                <td>
                  Eliminated — reducers scoped to owning
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
              </tr>
              <tr>
                <td>Partial state visibility</td>
                <td>
                  Selectors may evaluate during intermediate dispatch phases
                </td>
                <td>Eliminated — atomic commit at microtask boundary</td>
              </tr>
              <tr>
                <td>Reentrancy bugs</td>
                <td>Middleware can dispatch during dispatch</td>
                <td>Eliminated — reentrancy is structurally impossible</td>
              </tr>
            </tbody>
          </table>

          <p>
            These are not edge cases. They are the normal failure modes of
            action-driven state management at production scale. The state-driven
            model eliminates them architecturally — not through discipline or
            convention, but through structural enforcement.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Practical Examples of the Shift</div>
        <div class="section-body">
          <p>
            The mental model shift becomes clearest when you look at concrete
            before-and-after scenarios. Each of these maps a Redux pattern to
            its SDuX Vault equivalent.
          </p>

          <h4>Async data loading</h4>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Async loading — Redux thunk vs SDuX Vault pipeline'">
              <pre
                class="code-inline"><code class="language-ts">// Redux — thunk dispatches loading, then data, then done
const loadUser = (id) =&gt; async (dispatch) =&gt; &#123;
  dispatch(&#123; type: 'USER_LOADING' &#125;);
  try &#123;
    const user = await fetchUser(id);
    dispatch(&#123; type: 'USER_LOADED', payload: user &#125;);
  &#125; catch (e) &#123;
    dispatch(&#123; type: 'USER_ERROR', error: e &#125;);
  &#125;
&#125;;

// SDuX Vault — state intent expressed directly
userCell.replaceState(
  () =&gt; fetchUser(userId)  // DeferredType — factory function returns the Promise
);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            In the Redux version, three separate actions represent the lifecycle
            of one operation. Each action dispatches globally. Each reducer must
            handle all three cases. In the
            <sdux-brand-name /> version, the deferred factory function enters
            the pipeline and the loading, resolved, and error states are managed
            internally through the Resolve stage — no action objects, no
            dispatch sequences, no global broadcast.
          </p>

          <h4>Reducers as pure state derivation</h4>
          <p>
            The
            <a
              [routerLink]="['/docs/migration']"
              target="_blank"
              rel="noopener noreferrer"
              >migration guide</a
            >
            confirms that existing pure Redux reducers can be reused directly:
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Pure reducer registered declaratively'">
              <pre
                class="code-inline"><code class="language-ts">// The reducer function itself is unchanged
const computeTotal = (current) =&gt; (&#123;
  ...current,
  total: current.items.reduce((sum, item) =&gt; sum + item.price, 0)
&#125;);

// Registration replaces switch-case dispatch
cartCell
  .reducers([computeTotal])
  .initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The function is identical. What changes is registration: instead of
            a switch-case inside a root reducer that matches on action type, the
            reducer is registered declaratively on the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that owns the state. It runs on every pipeline execution for that
            cell — always in the same position, always with the same execution
            guarantee.
          </p>

          <h4>Expressing "nothing changed" is not an action</h4>
          <p>
            In Redux, a reducer that does not respond to an action must
            explicitly return the current state. Every reducer does this work
            for every unmatched action type. In
            <sdux-brand-name />, the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            only executes when its own state is updated. There is no concept of
            "not matching" because there is no global broadcast to opt out of.
          </p>
          <p>
            The mental model shift here is significant: you no longer think
            about which reducers care about which actions. You think about which
            state should change, update it directly, and let the pipeline derive
            everything else.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          When Action-Like Structures Still Make Sense
        </div>
        <div class="section-body">
          <p>
            The
            <a
              [routerLink]="['/docs/migration']"
              target="_blank"
              rel="noopener noreferrer"
              >migration guide</a
            >
            is deliberate about this nuance:
          </p>
          <div class="callout callout-info">
            <p>
              If you prefer action-like structures for organization or
              traceability, you may still structure your input objects that way.
              However, they are passed directly into the owning
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              rather than dispatched globally.
            </p>
            <p>
              That said, <sdux-brand-name /> is intentionally designed to
              minimize structural boilerplate. Action creators, switch
              statements, and large type unions are not required for
              correctness. It is generally recommended to avoid recreating
              Redux-style ceremony unless it provides clear value for your
              application.
            </p>
          </div>
          <p>
            If your team has a strong preference for named operations, you can
            wrap state updates in explicit functions that communicate intent:
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Named intent functions — action-like without action overhead'">
              <pre
                class="code-inline"><code class="language-ts">// Named functions provide the clarity of action names
// without the global dispatch ceremony
function clearCart(cell: CartCell) &#123;
  cell.replaceState(&#123; items: [], total: 0 &#125;);
&#125;

function addItem(cell: CartCell, item: CartItem) &#123;
  // Pass only the new item — the Merge Behavior handles accumulation
  cell.mergeState(&#123;
    items: [item]
  &#125;);
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <div class="callout callout-info">
            <p>
              <strong>Merge Behaviors handle accumulation natively.</strong>
              A common mistake is to read the current state, spread it with new
              data (<strong>[...current.items, item]</strong>), and pass the
              pre-computed result to <strong>mergeState()</strong>. This freezes
              the snapshot at call time. If a controller delays or throttles
              pipeline execution, the state may change before the pipeline runs
              — your pre-computed spread then merges against stale data,
              producing incorrect results. Instead, pass only the new data and
              let a Merge Behavior from <strong>&#64;sdux-vault/addons</strong>
              combine it at the correct execution point inside the pipeline,
              always against the current committed state.
            </p>
          </div>
          <p>
            You get the traceability of named operations. You do not pay the
            cost of global dispatch, action type registration, or switch-case
            composition. The intent is local, explicit, and scoped to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that owns the state.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Execution Guarantee Behind the Shift
        </div>
        <div class="section-body">
          <p>
            The state-driven model only works if the pipeline is trustworthy. If
            you cannot rely on the pipeline to execute in the same order every
            time — to commit state atomically, to prevent reentrancy, to
            serialize concurrent inputs — then expressing intent directly is no
            safer than dispatching it globally.
          </p>
          <p>
            <sdux-brand-name /> provides these guarantees at the architectural
            level:
          </p>
          <ul>
            <li>
              <strong>Pipeline computation precedes state commitment.</strong>
              Filters, reducers, and operators all run before any observer sees
              a new value. There is no partial state visibility.
            </li>
            <li>
              <strong
                >State commitment is deferred to a microtask boundary.</strong
              >
              No observer can trigger a new pipeline run while a commit is in
              progress. Reentrancy is structurally impossible.
            </li>
            <li>
              <strong
                >Every successful pipeline run produces exactly one atomic
                snapshot.</strong
              >
              Either the full snapshot commits, or nothing changes. There are no
              intermediate states visible to components or selectors.
            </li>
          </ul>
          <p>
            These guarantees are not conventions. They are enforced by the
            architecture of the pipeline itself. The state-driven model is
            reliable because the execution model makes it reliable.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            The StackBlitz examples show <sdux-brand-name /> state intent
            expressed directly — no action objects, no dispatch, no reducer
            trees.
          </p>
          <ul>
            <li>
              <a [routerLink]="['/docs/migration']">
                Redux Concepts in SDuX Vault — full concept mapping
              </a>
            </li>
            <li>
              <a [routerLink]="['/docs/pipeline/execution-guarantee']">
                Pipeline Execution Guarantees
              </a>
            </li>
          </ul>
          <p>
            The mental model shift takes one feature. Replace the next Redux
            action creator you would have written with a direct
            <strong>mergeState()</strong> or
            <strong>replaceState()</strong> call on the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that owns the state. See how much of the surrounding machinery
            disappears.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTheMentalModelShiftComponent {}
