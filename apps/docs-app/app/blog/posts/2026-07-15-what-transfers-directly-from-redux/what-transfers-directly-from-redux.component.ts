import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-what-transfers-directly-from-redux',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent
  ],
  template: `
    <sdux-blog-layout id="what-transfers-directly-from-redux">
      <header class="docs-header">
        <p class="lead">
          Moving from Redux to <sdux-brand-name /> is not starting over. The
          hardest parts of what you learned — writing pure reducer functions,
          designing clean state shapes, keeping updates immutable, and testing
          by outcome — carry over unchanged. What gets removed is the ceremony,
          not the skills. This post walks through exactly what transfers and why
          your investment in Redux thinking still pays off.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Redux Angle:</strong> Redux skills like pure reducers,
            immutable state design, and outcome-based testing transfer directly
            to <strong><sdux-brand-name /></strong> — the framework removes the
            ceremony while preserving the principles.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">What You Already Know That Still Works</div>
        <div class="section-body">
          <p>
            The mental model you built with Redux is mostly structural, not
            conceptual. Redux centralizes state through a global store and
            reducer tree; <sdux-brand-name /> scopes state to independent
            FeatureCells and runs updates through a deterministic pipeline. The
            plumbing differs — but the reasoning skills underneath are the same.
          </p>
          <p>Four things transfer directly:</p>
          <table aria-label="What transfers from Redux to SDuX Vault">
            <thead>
              <tr>
                <th scope="col" class="column-250">Redux skill</th>
                <th scope="col" class="column-auto">
                  How it carries into <sdux-brand-name />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pure reducer functions</td>
                <td>
                  Registered through the fluent reducers API — logic stays pure
                  and often reusable without modification
                </td>
              </tr>
              <tr>
                <td>Immutable state shapes</td>
                <td>
                  Your state interfaces stay the same — only ownership moves
                  from a global tree to a
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
              </tr>
              <tr>
                <td>Outcome-based testing</td>
                <td>
                  Reducer tests still run as pure-function tests; async is
                  awaited instead of mocked
                </td>
              </tr>
              <tr>
                <td>DevTools thinking</td>
                <td>
                  You still inspect state transitions — through the pipeline
                  inspector rather than a global action log
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Pure Functions Are Pure Functions</div>
        <div class="section-body">
          <p>
            A Redux reducer is a pure function of current state and an action. A
            <sdux-brand-name /> reducer is a pure function of current state.
            Existing reducer logic can typically be reused without modification
            as long as it stays pure, does not mutate state, and preserves the
            structural shape. The difference is registration: reducers are
            declared through the fluent <strong>.reducers()</strong> API before
            the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            is initialized.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Register Reducers'">
              <pre class="code-inline"><code class="language-ts">featureCell
  .reducers([
    (current) =&gt; (&#123; ...current, count: current.count + 1 &#125;)
  ])
  .initialize()</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> A pure function does not know or
              care what runtime calls it. That is exactly why your reducer logic
              survives the move intact.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">State Shapes Don't Change</div>
        <div class="section-body">
          <p>
            Your state shapes remain the same. The structural difference is
            where ownership lives. In Redux, every slice combines into a single
            immutable tree. In <sdux-brand-name />, each
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            owns its own isolated state. The TypeScript interface that described
            a Redux slice describes a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>'s
            initial state without edits.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'A state shape reused as-is'">
              <pre
                class="code-inline"><code class="language-ts">// The same interface you wrote for a Redux slice
export interface CartState &#123;
  items: CartItem[];
  total: number;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            That shape becomes the <strong>initialState</strong> of a cell.
            Setup differs by framework — Angular registers through providers,
            while React, Vue, and Svelte share the core API — but the shape
            itself is untouched:
          </p>
          <sdux-multi-framework-example
            description="Register a FeatureCell with an existing state shape">
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
        initialState: &#123; items: [], total: 0 &#125;
      &#125;
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">Vault(&#123; logLevel: 'off' &#125;);

export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123; items: [], total: 0 &#125;
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Testing Patterns Carry Over</div>
        <div class="section-body">
          <p>
            Reducers remain pure and directly testable — existing reducer tests
            can typically be reused without modification. What changes is the
            async story. Instead of mock stores, fake timers, and middleware
            orchestration, you await the pipeline explicitly with
            <strong>vaultSettled()</strong> and assert the committed state. The
            discipline you already have — test the outcome, not the mechanics —
            is exactly the right instinct here.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'act → settle → assert Testing Pattern'">
              <pre
                class="code-inline"><code class="language-ts">it('updates the cart total', async () =&gt; &#123;
  // act — trigger a state update
  cartCell.mergeState(&#123; value: mockItems &#125;);

  // settle — wait for the pipeline to complete
  await vaultSettled('cart');

  // assert — verify the committed state
  expect(cartCell.state.total).toBe(42);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The DevTools Mindset Transfers</div>
        <div class="section-body">
          <p>
            Redux taught a generation of developers to think in terms of
            observable state transitions — to open a tool, watch state change
            over time, and reason about how it got there. That mindset carries
            over completely. In <sdux-brand-name />, you still inspect how state
            arrived at its current value, just through the pipeline's execution
            rather than a global action stream.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Gotcha:</strong> Because state commitment is deferred to a
              microtask boundary, reading a
              <a href="/docs/references/functions/feature-cell">FeatureCell</a
              >'s state synchronously on the same tick you triggered an update
              returns the previous committed snapshot. In tests, always
              <strong>settle</strong> before you assert.
            </p>
          </div>

          <p>
            <a
              href="https://chromewebstore.google.com/detail/sdux-vault-devtools/ahhijigegohpaegehjhdojcldgigbekh"
              target="_blank"
              rel="noopener noreferrer"
              >Install the <sdux-brand-name /> DevTools from Chrome Web Store
              →</a
            >
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            None of your Redux investment is wasted — pure functions, state
            shape design, immutability, and outcome-based testing all move over
            intact. What disappears is the boilerplate. Read the
            <a href="/docs/migration">Redux migration guide</a> to see the full
            concept-by-concept mapping, and the
            <a href="/docs/pipeline/execution-guarantee"
              >Pipeline Execution Guarantees</a
            >
            for the contract your reducers now run under.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogWhatTransfersDirectlyFromReduxComponent {}
