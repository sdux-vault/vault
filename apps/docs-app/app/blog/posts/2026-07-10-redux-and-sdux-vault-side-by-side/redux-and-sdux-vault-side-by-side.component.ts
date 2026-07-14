import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-redux-and-sdux-vault-side-by-side',
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
      title="Redux and SDuX Vault Can Run Side by Side — Indefinitely"
      date="2026-07-10"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          You do not have to choose. <sdux-brand-name /> runs alongside Redux in
          the same application with zero conflicts — no shared state, no
          Provider collision, no adapter layer. Your existing Redux stores keep
          running unchanged while new features adopt FeatureCells at whatever
          pace suits your team.
        </p>
        <div class="callout callout-info">
          <strong>Redux Angle:</strong> Redux migration typically requires a
          big-bang rewrite or complex adapter layers.
        </div>
        <div class="callout callout-info">
          <strong><sdux-brand-name /></strong>
          runs alongside Redux with zero conflicts, enabling gradual
          feature-by-feature adoption.
        </div>
      </header>

      <section class="section">
        <div class="section-title">Why Coexistence Matters</div>
        <div class="section-body">
          <p>
            Every large Redux codebase carries years of accumulated behavior.
            Selectors that other parts of the app depend on. Reducers that
            encode business logic built up over many release cycles. Middleware
            that handles authentication, logging, and async coordination.
          </p>
          <p>
            Asking teams to migrate all of that in a single release is a risk
            multiplier — more surface area, longer testing cycles, and a harder
            rollback path if something goes wrong.
          </p>
          <p>
            <sdux-brand-name /> is designed so coexistence is not a workaround —
            it is the intended adoption path. The
            <a href="/docs/migration">Redux migration guide</a> documents this
            directly:
          </p>
          <div class="callout callout-info">
            <p>
              Redux and <sdux-brand-name /> can run side by side within the same
              application. You are not required to migrate existing stores
              immediately. New state can be implemented using FeatureCells while
              existing Redux stores continue operating unchanged. Over time, you
              may choose to convert specific slices — or run both systems in
              parallel to validate behavior before switching fully.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">No Shared State. No Conflicts.</div>
        <div class="section-body">
          <p>
            Redux owns a global store tree. <sdux-brand-name /> owns independent
            FeatureCells. These are structurally separate — there is no global
            registry that both systems must register against, no shared dispatch
            channel, and no Provider that both systems fight over.
          </p>
          <p>
            A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            does not know about the Redux store. The Redux store does not know
            about FeatureCells. Each system operates in its own execution space.
            Components that read from Redux continue to work exactly as before.
            Components that read from FeatureCells get the scoped reactive API
            without any Redux involvement.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Concern</th>
                <th scope="col">Redux</th>
                <th scope="col">SDuX Vault</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State storage</td>
                <td>Global store tree</td>
                <td>Independent FeatureCells</td>
              </tr>
              <tr>
                <td>Update mechanism</td>
                <td>dispatch(action)</td>
                <td>mergeState() / replaceState()</td>
              </tr>
              <tr>
                <td>Component access</td>
                <td>useSelector / connect</td>
                <td>
                  Direct
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  injection
                </td>
              </tr>
              <tr>
                <td>Shared runtime required</td>
                <td>Yes — Provider wrapping</td>
                <td>
                  No —
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  is self-contained
                </td>
              </tr>
              <tr>
                <td>Conflicts when coexisting</td>
                <td>—</td>
                <td>None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          New Features on FeatureCells. Old Features on Redux.
        </div>
        <div class="section-body">
          <p>
            The cleanest coexistence strategy is also the simplest: leave
            existing Redux stores untouched and implement new features on
            FeatureCells. Each new slice of state you add with a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            independently scoped, independently testable, and independently
            deployable.
          </p>
          <p>
            But coexistence is not the only option. When you are ready to
            migrate an existing slice, your existing Redux reducers plug
            directly into the <strong>.reducers()</strong> fluent API — no
            rewriting, no adapters. The SDuX Vault reducer stage calls
            <strong>reducer(currentState)</strong> directly, passing a value
            that is already a defensive clone of the committed snapshot.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Existing Redux reducers reused directly in FeatureCells'">
              <pre
                class="code-inline"><code class="language-ts">// Existing Redux store — still running, untouched
const store = configureStore(&#123;
  reducer: &#123;
    cart: cartReducer,
    user: userReducer
  &#125;
&#125;);

// Migrating cart slice — cartReducer passes through unchanged
export const cartCell = FeatureCell&lt;CartState&gt;(&#123;
  key: 'cart',
  initialState: initialCartState
&#125;);

cartCell
  .reducers([cartReducer])  // your existing Redux reducer, unmodified
  .initialize();

// Migrating user slice — userReducer passes through unchanged
export const userCell = FeatureCell&lt;UserState&gt;(&#123;
  key: 'user',
  initialState: initialUserState
&#125;);

userCell
  .reducers([userReducer])  // your existing Redux reducer, unmodified
  .initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The Redux store and the FeatureCells operate independently. Neither
            system has any awareness of the other. As you validate each
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> in
            production, you retire the corresponding Redux slice — one feature
            at a time, at your own pace.
          </p>
          <div class="callout callout-info">
            <p>
              <strong
                >Why this works — and why it's safer than you expect:</strong
              >
              SDuX Vault applies referential isolation at every pipeline
              boundary via <strong>structuredClone</strong>. By the time your
              reducer is called, the value it receives is already a defensive
              copy of the committed snapshot. This means that even if your
              reducer is <strong>impure</strong> and
              <strong>mutates its input</strong>, it cannot corrupt the
              previously committed state — the mutation targets a clone, not the
              live snapshot. The only constraint that matters is the
              <em>return shape</em>: your reducer must return a value that
              matches the state type.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Parallel Validation Strategy</div>
        <div class="section-body">
          <p>
            Coexistence also enables a lower-risk validation approach: implement
            a new version of an existing Redux slice as a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            and run both in parallel before committing to the migration.
          </p>
          <p>
            Your existing Redux slice keeps driving the UI. Your new
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            receives the same inputs and you compare outputs. Once you are
            confident the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            produces correct behavior under real usage, you flip the component
            to read from the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            and retire the Redux slice.
          </p>
          <p>
            This is especially useful for slices with complex async effects,
            conditional business logic, or tight integration with legacy
            middleware. You validate the new implementation in production
            traffic without exposing users to risk.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>No coordination required:</strong> because Redux and
              <sdux-brand-name /> are structurally separate, neither system
              needs to be aware that the other is running in parallel.
              Validation is a component-level concern, not a store-level one.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Testing Both Systems in the Same Suite</div>
        <div class="section-body">
          <p>
            Coexisting systems still need to be tested together. Redux tests and
            <sdux-brand-name /> tests use different patterns — Redux tests
            require mock stores and dispatch sequences while
            <sdux-brand-name /> tests use act → settle → assert — but they live
            in the same test suite without conflict.
          </p>
          <p>
            A component that reads from both a Redux selector and a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            can be tested with a Redux mock store alongside a
            <sdux-brand-name /> test environment. The two isolation boundaries
            do not interfere because they operate on different state channels.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'Testing a FeatureCell while Redux runs alongside'">
              <pre
                class="code-inline"><code class="language-ts">it('adds a notification and updates unread count', async () =&gt; &#123;
  // act — update the FeatureCell directly
  notificationsCell.mergeState(&#123;
    items: [&#123; id: 1, message: 'New message', read: false &#125;]
  &#125;);

  // settle — wait for the pipeline to commit
  await vaultSettled('notifications');

  // assert — verify the committed snapshot
  expect(notificationsCell.state.value.unreadCount).toBe(1);
&#125;);

// Redux tests in the same file — no conflict
it('cart reducer adds items correctly', () =&gt; &#123;
  const state = cartReducer(undefined, addItem(&#123; id: 1, price: 29.99 &#125;));
  expect(state.items.length).toBe(1);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            The StackBlitz examples demonstrate
            <sdux-brand-name /> running in isolation — the same patterns you
            would use when introducing a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            alongside an existing Redux store.
          </p>
          <ul>
            <li>
              <a [routerLink]="['/docs/migration']">
                Redux Concepts in SDuX Vault — full concept mapping
              </a>
            </li>
            <li>
              <a [routerLink]="['/docs/pipeline/behaviors/reducers']">
                Reducer Behaviors — register existing pure reducers directly
              </a>
            </li>
          </ul>
          <p>
            Start with one feature. Run both systems in parallel. Validate on
            real traffic. Retire the Redux slice when you are ready — or never.
            The choice is yours.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogReduxAndSduxVaultSideBySideComponent {}
