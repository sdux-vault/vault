import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-testing-without-mock-stores',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Testing Without Mock Stores — act, settle, assert"
      date="2026-07-09"
      pillar="ED"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          Redux testing requires mock stores, fake dispatch queues, middleware
          orchestration, and marathon sessions debugging non-deterministic
          behavior.
        </p>
        <div class="callout callout-info">
          <sdux-brand-name /> testing is three words: act, settle, assert.
        </div>
        <p>
          No mock store. No fake dispatch. The pipeline is deterministic — same
          input, same output, every time.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Redux Testing Tax</div>
        <div class="section-body">
          <p>
            In Redux, testing state changes means wiring up mock stores, fake
            dispatch functions, and explicit middleware stacks. Every async side
            effect — whether handled by thunks, sagas, or observables — requires
            careful orchestration and often manual timer resolution.
          </p>
          <p>
            The burden compounds when multiple middleware interact with the same
            state. Execution order is undefined. A saga might dispatch before a
            thunk settles. A reducer might commit state while an effect is in
            flight. Your tests have to account for all possible interleavings —
            which means more assertions, more setup, more brittle tests.
          </p>
          <p>
            And then come the flaky tests. Tests that pass locally but fail in
            CI. Tests that pass when run individually but fail in suite. Tests
            that hang on timers and force you to guess how much time to wait.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>The core issue:</strong> Redux's unguaranteed execution
              order means tests can't assume deterministic behavior. Every async
              flow is a potential race condition.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Deterministic Testing Looks Like</div>
        <div class="section-body">
          <p>
            <sdux-brand-name /> executes state updates through a serialized
            pipeline with explicit settlement boundaries. That means tests can
            do something Redux tests can't: trust the output without mocking the
            framework.
          </p>
          <p>The canonical testing pattern is three words:</p>
          <ul>
            <li>
              <strong>act</strong> — trigger a state mutation (or behavior)
            </li>
            <li><strong>settle</strong> — wait for the pipeline to finalize</li>
            <li><strong>assert</strong> — verify the committed state</li>
          </ul>
          <p>
            No mock store. No fake dispatch. Just the real pipeline running
            through its deterministic execution model.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'act → settle → assert Testing Pattern'">
              <pre
                class="code-inline"><code class="language-ts">it('adds an item to the cart and updates total', async () =&gt; &#123;
  // act — trigger a state mutation
  cartCell.mergeState(&#123;
    items: [&#123; id: 1, price: 29.99 &#125;],
    total: 29.99
  &#125;);

  // settle — wait for the pipeline to finish
  await vaultSettled('cart');

  // assert — verify the committed state
  expect(cartCell.state.total).toBe(29.99);
  expect(cartCell.state.items.length).toBe(1);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            That's it. No test setup. No mock store initialization. No dispatch
            sequence assertions. Just: did the state end up where we expect?
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why This Works: Determinism as a Feature
        </div>
        <div class="section-body">
          <p>
            <sdux-brand-name />'s pipeline is engineered to be deterministic.
            Every stage executes in a fixed order. State commits are atomic —
            either the snapshot commits completely or nothing changes. No
            intermediate visibility. No torn state. No reentrancy.
          </p>
          <p>That architecture makes testing simple because:</p>
          <ul>
            <li>
              <strong>No execution order surprises.</strong> When you settle,
              the pipeline has finished. You don't have to guess which
              middleware went first or whether async effects are still in
              flight.
            </li>
            <li>
              <strong>Atomic snapshots eliminate partial renders.</strong> Your
              test sees the final state, not an intermediate representation
              caught mid-update. No stale or torn views.
            </li>
            <li>
              <strong>Serialized execution prevents race conditions.</strong>
              Multiple state updates queue and execute sequentially. The test
              doesn't have to coordinate or mock dispatch timing.
            </li>
          </ul>
          <p>
            This is why <strong>determinism eliminates flaky tests</strong>.
            When execution is guaranteed, you don't need to rely on timing
            assumptions or timer trickery. Same input = same output, every time.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Common mistake:</strong> Treating
              <span class="code">vaultSettled()</span> like a timer. It's not.
              It waits for the pipeline's deterministic boundary — the point
              where all execution is complete. If you trigger multiple state
              updates, <span class="code">vaultSettled()</span> will wait for
              all of them to finish, not just the first one.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Async and Effects — No Mock Middleware Required
        </div>
        <div class="section-body">
          <p>
            In Redux, testing async effects means mock thunks, mock sagas, or
            marble diagram matchers. <sdux-brand-name /> handles async
            differently: through resolve behaviors and controllers that are part
            of the pipeline's fixed execution sequence.
          </p>
          <p>
            Because the pipeline serializes execution, you test async effects
            the same way you test sync state — act, settle, assert.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Testing Async Resolution'">
              <pre
                class="code-inline"><code class="language-ts">it('resolves and commits an API response', async () =&gt; &#123;
  // Setup: mock fetch to return resolved promise
  spyOn(window, 'fetch').and.returnValue(
    Promise.resolve(&#123;
      json: () =&gt; Promise.resolve(&#123; userId: 42, name: 'Alice' &#125;)
    &#125;)
  );

  // act — trigger a resolve behavior (or mergeState that triggers it)
  userCell.mergeState(&#123; userId: null &#125;);

  // settle — wait for the resolve behavior to complete
  await vaultSettled('user');

  // assert — the resolved value is now committed
  expect(userCell.state.userId).toBe(42);
  expect(userCell.state.name).toBe('Alice');
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            No thunk mock. No saga mock. No timer flushing. The pipeline
            orchestrates the async flow, and
            <span class="code">vaultSettled</span> waits for it to land.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Reducers Stay Pure (and Testable)</div>
        <div class="section-body">
          <p>
            One concern when migrating from Redux: "Will I have to rewrite my
            reducer tests?" The answer is no. Pure reducer functions are still
            pure. <sdux-brand-name /> reducers have a simple contract:
            <span class="code">(current: T) =&gt; T</span>. They receive the
            current state and return the next state.
          </p>
          <p>
            You can test reducers in isolation, just like in Redux. The
            difference is that in <sdux-brand-name />, reducers are registered
            declaratively and execute in a fixed pipeline order — so integration
            tests don't have to mock the state container.
          </p>
          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Pure Reducer Function Test'">
              <pre
                class="code-inline"><code class="language-ts">// Reducer receives only the current state and reduces it
const sortByNameReducer = (current) =&gt; (&#123;
  ...current,
  items: [...current.items].sort((a, b) =&gt; a.name.localeCompare(b.name))
&#125;);

// Test in isolation — pure function, no mocking needed
it('sorts items by name immutably', () =&gt; &#123;
  const initial = &#123;
    items: [
      &#123; id: 2, name: 'Bob' &#125;,
      &#123; id: 1, name: 'Alice' &#125;
    ]
  &#125;;
  const sorted = sortByNameReducer(initial);

  expect(sorted.items[0].name).toBe('Alice');
  expect(sorted.items[1].name).toBe('Bob');
  expect(initial.items[0].name).toBe('Bob'); // Original unchanged
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Pure functions are testable regardless of the framework. In
            <sdux-brand-name />, when you register reducers via
            <span class="code">.reducers()</span>, they execute in a fixed
            pipeline order — so integration tests don't have to mock the state
            container or coordinate dispatch timing.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Before and After: A Side-by-Side Comparison
        </div>
        <div class="section-body">
          <p>Here's the same test scenario in both systems:</p>
          <table>
            <thead>
              <tr>
                <th>Redux</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mock store creation and initialization</td>
                <td>
                  None — use the real
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
              </tr>
              <tr>
                <td>Mock dispatch function</td>
                <td>
                  None — call
                  <span class="code">cell.mergeState()</span> directly
                </td>
              </tr>
              <tr>
                <td>Middleware orchestration</td>
                <td>None — pipeline stages are fixed</td>
              </tr>
              <tr>
                <td>Timer resolution (fake timers)</td>
                <td>None — use <span class="code">vaultSettled()</span></td>
              </tr>
              <tr>
                <td>Async effect mocking (thunks, sagas)</td>
                <td>Just mock the API — the pipeline handles orchestration</td>
              </tr>
              <tr>
                <td>Action sequence assertions</td>
                <td>Assert final state directly — no sequence needed</td>
              </tr>
              <tr>
                <td>Flaky tests from race conditions</td>
                <td>Eliminated — deterministic pipeline</td>
              </tr>
            </tbody>
          </table>
          <p>
            The difference accumulates. Fewer mocks. Fewer timing assumptions.
            Fewer ways for tests to be wrong.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Testing Guarantee</div>
        <div class="section-body">
          <p>
            <sdux-brand-name />'s commitment to testing rigor is deliberate. The
            framework was engineered from the ground up so that tests are
            deterministic, isolated, and trustworthy. Not as an afterthought —
            as a first-class design priority.
          </p>
          <p>
            That commitment means: if your test passes locally, it will pass in
            CI. Same input, same output. No timing mysteries. No flaky retries.
            Just clear, reproducible behavior.
          </p>
          <div class="callout callout-info">
            <p>
              Want to dive deeper? Read the complete
              <a [routerLink]="['/docs/top-tier/testing']">Testing guide</a> for
              details on settlement APIs, scheduler layers, and Angular-specific
              patterns.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <ul>
            <li>
              <a [routerLink]="['/docs/top-tier/testing']"
                >Docs: Testing with <sdux-brand-name
              /></a>
            </li>
            <li>
              <a [routerLink]="['/docs/migration']"
                >Migration: Redux Concepts in <sdux-brand-name
              /></a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTestingWithoutMockStoresComponent {}
