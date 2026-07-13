import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-from-redux-to-sdux-vault',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="From Redux to SDuX Vault — A Migration Guide That Doesn't Ask You to Rewrite Everything"
      date="2026-06-22"
      pillar="TA"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          You have a Redux codebase. It works. It has tests. It has years of
          institutional knowledge baked into reducer trees, selector files, and
          middleware stacks. Nobody is going to approve a two-sprint rewrite to
          swap state management libraries — nor should they.
          <sdux-vault-brand-name [tm]="true" /> runs alongside Redux with zero
          conflicts. This guide maps every Redux concept to its
          <sdux-vault-brand-name /> equivalent, shows you how to run both
          systems in the same application, and gives you a phased migration path
          that lets you prove value before committing fully.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Redux Got Right</div>
        <div class="section-body">
          <p>
            Redux deserves credit for establishing principles that
            <sdux-vault-brand-name /> builds on:
          </p>
          <ul>
            <li>
              <strong>Explicit state transitions</strong> — no hidden mutations
            </li>
            <li>
              <strong>Predictable reducers</strong> — pure functions computing
              next state
            </li>
            <li>
              <strong>Single source of truth</strong> — centralized, inspectable
              state
            </li>
            <li>
              <strong>Time-travel debugging</strong> — action replay and state
              inspection
            </li>
          </ul>
          <p>
            These ideas shaped how an entire generation thinks about front-end
            state. <sdux-vault-brand-name /> doesn't reject them — it formalizes
            them into architectural guarantees and eliminates the ceremony
            required to maintain them.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Where Redux Shows Its Age</div>
        <div class="section-body">
          <p>The problems aren't conceptual — they're structural:</p>
          <p>
            <strong>Boilerplate scales linearly with features.</strong> Every
            feature needs action types, action creators, reducer cases, selector
            files, effect classes, and barrel exports. The ceremony exists
            because Redux doesn't provide structure — so you build your own,
            file by file.
          </p>
          <p>
            <strong>Execution order is undefined.</strong> Middleware runs in
            registration order, not in a guaranteed sequence. Two middleware
            that interact with the same state have no contract about who goes
            first. Side effects can dispatch actions at any point, creating
            non-deterministic execution paths.
          </p>
          <p>
            <strong>Async coordination is your problem.</strong> Thunks, sagas,
            observables — each approach solves async differently, and none
            guarantees that concurrent dispatches won't produce torn state.
          </p>
          <p>
            <strong>The single store is a coupling vector.</strong> Every
            selector reads from a global tree. Every action broadcasts to every
            reducer. Feature boundaries exist by convention, not by
            architecture.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Concept Map: Redux &rarr; SDuX Vault
        </div>
        <div class="section-body">
          <table>
            <thead>
              <tr>
                <th class="column-150">Redux Concept</th>
                <th class="column-auto">
                  <sdux-vault-brand-name /> Equivalent
                </th>
                <th class="column-auto">Key Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Store (global)</td>
                <td>Vault + <sdux-feature-cell />s</td>
                <td>
                  State is scoped per feature, not shared in a global tree
                </td>
              </tr>
              <tr>
                <td>Actions</td>
                <td>
                  <span class="code">replaceState()</span> /
                  <span class="code">mergeState()</span>
                </td>
                <td>Direct intent — no action objects, no type strings</td>
              </tr>
              <tr>
                <td>Dispatch</td>
                <td>Method call on <sdux-feature-cell /></td>
                <td>No global broadcast — update targets the owner directly</td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>Reducer Behaviors (pipeline stage)</td>
                <td>
                  Same pure functions, registered declaratively via
                  <span class="code">.reducers()</span>
                </td>
              </tr>
              <tr>
                <td>Middleware</td>
                <td>Pipeline Stages (ordered, deterministic)</td>
                <td>
                  Nine guaranteed stages replace unordered middleware chains
                </td>
              </tr>
              <tr>
                <td>Selectors</td>
                <td>
                  <span class="code">cell.state</span> /
                  <span class="code">cell.state$</span> /
                  <span class="code">cell.state.value()</span>
                </td>
                <td>
                  Scoped to the owning <sdux-feature-cell />, not projected from
                  a global tree
                </td>
              </tr>
              <tr>
                <td>Effects (thunks/sagas)</td>
                <td>Resolve Behaviors / Controllers</td>
                <td>
                  Async resolution is pipeline-coordinated, not
                  middleware-driven
                </td>
              </tr>
              <tr>
                <td>createStore()</td>
                <td>
                  <span class="code">Vault()</span> +
                  <span class="code"
                    ><a href="/docs/references/functions/feature-cell"
                      >FeatureCell</a
                    >()</span
                  >
                </td>
                <td>No monolithic root store — cells are independent</td>
              </tr>
              <tr>
                <td>combineReducers()</td>
                <td>Not needed</td>
                <td>
                  Each <sdux-feature-cell /> owns its own state — no composition
                  required
                </td>
              </tr>
              <tr>
                <td>Provider wrapper</td>
                <td>Not needed</td>
                <td>
                  <sdux-feature-cell />s are injectable/importable directly
                </td>
              </tr>
              <tr>
                <td>DevTools</td>
                <td><sdux-vault-brand-name /> DevTools (Chrome extension)</td>
                <td>
                  Pipeline-aware — shows stage execution, not just action
                  history
                </td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-info">
            <strong>The core mental model shift:</strong> Redux asks "what
            action happened?" <sdux-vault-brand-name /> asks "what state should
            exist?"
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Running Both Side by Side</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> and Redux can coexist in the same
            application. There is no conflict, no shared global state, and no
            Provider collision. Your existing Redux store continues operating
            unchanged while new features use <sdux-feature-cell />s.
          </p>

          <sdux-multi-framework-example
            description="Both Systems Registered Together">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts — both systems registered together
export const appConfig: ApplicationConfig = &#123;
  providers: [
    // Existing NgRx store
    provideStore(&#123; users: usersReducer, cart: cartReducer &#125;),
    provideEffects(UserEffects, CartEffects),

    // New SDuX Vault features alongside
    provideVault(&#123; logLevel: 'off' &#125;),
    provideFeatureCell(
      SettingsService,
      &#123;
        key: 'settings',
        initialState: defaultSettings
      &#125;
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';

// SDuX Vault cells are imported directly — no Provider needed
Vault(&#123; devMode: true, logLevel: 'off' &#125;);

export const settingsCell = FeatureCell(&#123;
  key: 'settings',
  initialState: defaultSettings
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            No adapters. No bridges. No shared state layer. Each system owns its
            own features independently.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">A Phased Migration Plan</div>
        <div class="section-body">
          <p>
            Migration doesn't mean replacement. It means coexistence, then
            gradual adoption, then confidence.
          </p>

          <h4>Phase 1: New Features Only</h4>
          <p>
            Pick the next feature on your roadmap — something new that doesn't
            exist in Redux yet. Implement it entirely with a
            <sdux-feature-cell />. Ship it alongside your existing Redux store.
          </p>
          <p>What you'll notice immediately:</p>
          <ul>
            <li>No action type file</li>
            <li>No action creator file</li>
            <li>No effect class</li>
            <li>No selector file</li>
            <li>No barrel export wiring</li>
          </ul>
          <p>One <sdux-feature-cell /> definition. One pipeline. Done.</p>

          <sdux-multi-framework-example
            description="Complete State Contract for a New Feature">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),
    provideFeatureCell(
      NotificationsService,
      &#123;
        key: 'notifications',
        initialState: &#123; items: [], unreadCount: 0 &#125;
      &#125;
    )
  ]
&#125;;

// notifications.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;NotificationState&gt;('notifications')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class NotificationsService &#123;
  readonly vault = injectVault&lt;NotificationState&gt;(NotificationsService);

  constructor() &#123;
    this.vault.initialize();
  &#125;

  addNotification(notification: Notification) &#123;
    this.vault.mergeState(&#123;
      items: [...this.vault.state.items, notification],
      unreadCount: this.vault.state.unreadCount + 1
    &#125;);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';

Vault(&#123; devMode: true, logLevel: 'off' &#125;);

export const notificationsCell = FeatureCell(&#123;
  key: 'notifications',
  initialState: &#123; items: [], unreadCount: 0 &#125;
&#125;);

notificationsCell.initialize();

// Update state — no action objects required
notificationsCell.mergeState(&#123;
  items: [...notificationsCell.state.items, newNotification],
  unreadCount: notificationsCell.state.unreadCount + 1
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <h4>Phase 2: Parallel Validation</h4>
          <p>
            Choose a simple, well-tested Redux slice. Implement the same feature
            as a <sdux-feature-cell />. Run both in parallel. Compare outputs.
          </p>
          <p>
            If the <sdux-feature-cell /> produces identical results to the Redux
            slice under the same inputs, you have proof that migration preserves
            behavior. That's your safety net.
          </p>

          <h4>Phase 3: Feature-by-Feature Migration</h4>
          <p>For each feature you migrate:</p>
          <ol>
            <li>Port the state shape — usually unchanged</li>
            <li>
              Port reducer logic — pure functions transfer directly into
              <span class="code">.reducers()</span>
            </li>
            <li>
              Replace selectors — use
              <span class="code">cell.state$</span> or
              <span class="code">cell.state.value()</span> directly
            </li>
            <li>
              Remove action/effect boilerplate — replace with direct
              <span class="code">mergeState()</span> /
              <span class="code">replaceState()</span> calls
            </li>
            <li>Update tests — act &rarr; settle &rarr; assert</li>
            <li>
              Remove the Redux slice — once all consumers use the
              <sdux-feature-cell />
            </li>
          </ol>

          <h4>Phase 4: Redux Removal (When Ready)</h4>
          <p>
            Once every feature has migrated, remove Redux store configuration,
            middleware registrations, action/reducer/selector/effect files, and
            the Redux dependency itself. There's no deadline — the systems
            coexist without conflict indefinitely.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Transfers Directly</div>
        <div class="section-body">
          <p>
            Your existing knowledge isn't wasted. These concepts carry over
            unchanged:
          </p>
          <ul>
            <li>
              <strong>Pure reducer functions</strong> — if your Redux reducer is
              pure and doesn't mutate, it works as a
              <sdux-vault-brand-name /> reducer behavior with zero modification
            </li>
            <li>
              <strong>State shape design</strong> — your interfaces and types
              are the same
            </li>
            <li>
              <strong>Immutability patterns</strong> — same discipline, now
              enforced by pipeline isolation
            </li>
            <li>
              <strong>Testing patterns</strong> — outcome-based assertions
              remain valid
            </li>
            <li>
              <strong>DevTools mindset</strong> — inspecting state transitions
              is still the debugging model
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What You Leave Behind</div>
        <div class="section-body">
          <p>
            These concerns evaporate — not because they're handled differently,
            but because the architecture eliminates the need:
          </p>
          <table>
            <thead>
              <tr>
                <th class="column-auto">Redux Ceremony</th>
                <th class="column-auto">Why It's Gone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Action type strings</td>
                <td>No actions — state intent is expressed directly</td>
              </tr>
              <tr>
                <td>Action creator functions</td>
                <td>
                  <span class="code">mergeState()</span> /
                  <span class="code">replaceState()</span> replace all creators
                </td>
              </tr>
              <tr>
                <td>Switch statements in reducers</td>
                <td>Reducers receive resolved state, not action types</td>
              </tr>
              <tr>
                <td>Effect classes</td>
                <td>
                  Async resolution is a pipeline stage, not a side-effect layer
                </td>
              </tr>
              <tr>
                <td>Selector composition</td>
                <td>
                  State is scoped to the owner — no global tree to project from
                </td>
              </tr>
              <tr>
                <td>Middleware registration order</td>
                <td>Nine ordered pipeline stages replace unordered chains</td>
              </tr>
              <tr>
                <td>combineReducers()</td>
                <td>
                  Each <sdux-feature-cell /> is independent — no composition
                  needed
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Testing Difference</div>
        <div class="section-body">
          <p>
            Redux testing often requires mocking stores, faking dispatches, and
            orchestrating async middleware. <sdux-vault-brand-name /> testing is
            three steps:
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'act → settle → assert Testing Pattern'">
              <pre
                class="code-inline"><code class="language-ts">it('filters invalid state', async () =&gt; &#123;
  // act — trigger a state update
  usersCell.mergeState(&#123; users: [invalidUser] &#125;);

  // settle — wait for the pipeline to complete
  await vaultSettled('users');

  // assert — verify the committed state
  expect(usersCell.state.users).toEqual([]);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            No mock store. No fake dispatch. No marble diagrams. No flaky async
            waits. The pipeline is deterministic — same input, same output,
            every time.
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
            for a detailed concept-level breakdown. Read the
            <a routerLink="/docs/migration"
              >Redux Concepts in <sdux-brand-name
            /></a>
            page for a section-by-section mapping of State, Actions, Dispatch,
            Reducers, Effects, Selectors, and Testing. Visit
            <a
              href="https://www.sdux-vault.com?utm_source=blog&utm_medium=cta&utm_campaign=from-redux-to-sdux-vault"
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
export class BlogFromReduxToSduxVaultComponent {}
