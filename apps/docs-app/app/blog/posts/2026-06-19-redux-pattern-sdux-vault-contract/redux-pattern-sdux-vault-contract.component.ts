import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-redux-pattern-sdux-vault-contract',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Redux Gave You a Pattern — SDuX Vault™ 1.0 Gives You a Contract"
      date="2026-06-19"
      pillar="RC"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          Redux defined how a generation of developers thinks about state
          management. Actions, reducers, a single store — these ideas brought
          discipline to front-end architecture when it desperately needed it.
          But a pattern is not a contract. <sdux-brand-name />
          1.0 takes what Redux got right — explicit transitions, centralized
          state, predictable flow — and replaces what it left undefined with
          architectural guarantees you never have to enforce yourself.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Redux Got Right</div>
        <div class="section-body">
          <p>
            Redux deserves genuine credit. Before Redux, front-end state was
            scattered across component trees, service singletons, and ad-hoc
            event buses. State lived wherever the last developer decided to put
            it, and debugging meant tracing invisible mutations across
            disconnected layers.
          </p>
          <p>
            Redux brought three ideas that changed how teams thought about
            state:
          </p>
          <ul>
            <li>
              <strong>Explicit transitions</strong> — state changes happen
              through dispatched actions, not hidden mutations
            </li>
            <li>
              <strong>A single source of truth</strong> — one store holds the
              entire application state tree
            </li>
            <li>
              <strong>Pure reducers</strong> — state transitions are
              deterministic functions with no side effects
            </li>
          </ul>
          <p>
            These ideas were transformative. They made state inspectable,
            reproducible, and testable in ways that earlier approaches never
            achieved. Redux earned its place in front-end history.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Where the Pattern Breaks Down</div>
        <div class="section-body">
          <p>
            The problem was never the ideas — it was what Redux left for you to
            figure out on your own. Redux gives you a reducer and a dispatch
            function. Everything else — async handling, side effects,
            persistence, validation, caching, error normalization — is your
            responsibility, bolted on through middleware with no guaranteed
            execution order.
          </p>
          <p>
            That's where the pattern breaks down. A pattern tells you
            <em>what</em> to do. A contract tells you <em>what will happen</em>.
            Redux tells you to write pure reducers. It doesn't guarantee that
            your middleware runs in a specific order, that your side effects
            complete before state commits, or that two concurrent dispatches
            won't interleave and produce torn state.
          </p>

          <div class="callout callout-warning">
            <strong>The gap:</strong> Redux guarantees reducer purity. It does
            not guarantee execution order, async coordination, or state
            integrity across concurrent updates. Those are left to convention
            and developer discipline.
          </div>

          <p>
            The result is boilerplate. Action types. Action creators. Effect
            classes. Selector files. Barrel exports. Middleware registration.
            Each concern adds another layer of hand-wired scaffolding that
            nobody reads after the first paste. The ceremony exists because the
            architecture doesn't provide structure — so you build your own, file
            by file.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Comparison Table — Explained</div>
        <div class="section-body">
          <p>
            The <sdux-brand-name />
            <a routerLink="/docs/welcome/sdux-redux-similarities"
              >comparison page</a
            >
            lays out these differences at the concept level. Here's what each
            row means in practice:
          </p>

          <table>
            <thead>
              <tr>
                <th class="column-150">Capability</th>
                <th class="column-auto">Redux / NgRx</th>
                <th class="column-auto"><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State transitions</td>
                <td>Action + reducer pairs</td>
                <td>
                  <span class="code">replaceState</span> /
                  <span class="code">mergeState</span> — direct intent, no
                  action objects
                </td>
              </tr>
              <tr>
                <td>Execution order</td>
                <td>Unguaranteed middleware chain</td>
                <td>Nine ordered pipeline stages — deterministic every time</td>
              </tr>
              <tr>
                <td>State ownership</td>
                <td>Global store, shared by convention</td>
                <td><sdux-feature-cell /> — scoped, typed, lifecycle-aware</td>
              </tr>
              <tr>
                <td>Testing</td>
                <td>Mock dependencies, varied approaches</td>
                <td>
                  act &rarr; settle &rarr; assert — three steps, deterministic
                </td>
              </tr>
              <tr>
                <td>Governance</td>
                <td>Custom middleware per concern</td>
                <td>
                  Policy Controllers — built-in, ordered, separated from data
                </td>
              </tr>
              <tr>
                <td>Persistence</td>
                <td>Third-party middleware</td>
                <td>
                  Built-in post-commit Extensions — local, session, cookie
                </td>
              </tr>
              <tr>
                <td>Boilerplate</td>
                <td>Very high — action types, creators, effects, selectors</td>
                <td>Minimal — Pipeline Builder generates type-safe config</td>
              </tr>
            </tbody>
          </table>

          <p>
            Every row in this table represents a concern that Redux leaves to
            convention and <sdux-brand-name /> makes structural. Not through
            opinion — through pipeline architecture.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Execution Order — The Invisible Problem</div>
        <div class="section-body">
          <p>
            The single most consequential difference is execution order. In
            Redux, middleware runs in registration order — but that order is
            implicit, undocumented in your codebase, and easy to break by
            reordering an array. There's no compile-time guarantee that your
            auth middleware runs before your persistence middleware, or that
            your validation logic completes before your reducer sees the action.
          </p>
          <p>
            In <sdux-brand-name />, execution order is the architecture. Nine
            stages execute in a fixed sequence:
          </p>

          <div class="code-inline">
            Controllers &rarr; Interceptors &rarr; Resolve &rarr;
            <br />
            Merge &rarr; Operators &rarr; Filters &rarr;
            <br />
            Reducers &rarr; State &rarr; Extensions
          </div>

          <p>
            No stage can skip ahead. No stage can run out of order. When you
            read a pipeline definition, you know exactly what will happen and
            when. That's not a pattern you follow — it's a contract the engine
            enforces.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Testing — The Clearest Difference</div>
        <div class="section-body">
          <p>
            Testing reveals more about an architecture than any feature list.
            Redux testing typically requires mocking the store, wiring up
            middleware, simulating dispatches, and asserting on state after
            async effects complete. The ceremony scales with complexity — and
            when tests are hard to write, teams write fewer of them.
          </p>
          <p><sdux-brand-name /> testing follows three steps:</p>

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

          <p>
            No mock store. No middleware wiring. No marble diagrams. No fake
            timers. The pipeline is deterministic, so the test is deterministic.
            Every behavior, controller, and extension in the pipeline executes
            exactly as it would in production — because the test runs the real
            pipeline.
          </p>

          <div class="callout callout-info">
            <strong>Key insight:</strong> When testing is hard, the architecture
            is the problem. act &rarr; settle &rarr; assert works because the
            pipeline is deterministic by design — not because the test framework
            is clever.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          From Pattern to Contract — What 1.0 Proves
        </div>
        <div class="section-body">
          <p>
            Redux proved that explicit state transitions matter. That idea
            stands. What <sdux-brand-name /> 1.0 proves is that you can go
            further — that the architecture itself can enforce what Redux left
            to discipline:
          </p>
          <ul>
            <li>
              <strong>Ordered execution</strong> — nine stages, fixed sequence,
              no registration-order surprises
            </li>
            <li>
              <strong>Referential isolation</strong> — deep-cloned data at every
              pipeline boundary, so no stage corrupts another's input
            </li>
            <li>
              <strong>Atomic state commits</strong> — the full pipeline
              completes and state commits, or nothing changes
            </li>
            <li>
              <strong>Scoped ownership</strong> —
              <sdux-feature-cell /> boundaries give each feature typed,
              lifecycle-aware state
            </li>
            <li>
              <strong>Built-in cross-cutting concerns</strong> — persistence,
              caching, encryption, and error normalization are pipeline stages,
              not bolted-on middleware
            </li>
            <li>
              <strong>Deterministic testing</strong> — act, settle, assert.
              Three steps. No mocks. No ceremony.
            </li>
          </ul>
          <p>
            These aren't opinions about how you should write code. They're
            guarantees the engine provides. You don't enforce immutability — the
            pipeline enforces it. You don't coordinate async — the pipeline
            resolves it. You don't wire middleware in the right order — the
            pipeline defines the order.
          </p>
          <p>
            A pattern says "here's how you should do it." A contract says
            "here's what will happen." <sdux-brand-name /> 1.0 is the contract.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Explore the full
            <a routerLink="/docs/welcome/sdux-redux-similarities"
              >Redux / <sdux-brand-name /> comparison</a
            >
            for a detailed concept-level breakdown. Visit
            <a
              href="https://www.sdux-vault.com?utm_source=blog&utm_medium=cta&utm_campaign=redux-pattern-sdux-vault-contract"
              >sdux-vault.com</a
            >
            to explore the architecture.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogReduxPatternSduxVaultContractComponent {}
