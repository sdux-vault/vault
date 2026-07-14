import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-global-store-shared-dependency',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Global Store Is a Shared Dependency — Why Scoped State Ownership Wins"
      date="2026-06-23"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Redux popularized the idea of a single global store — one tree of
          state, one set of reducers, one source of truth. It works well with
          one team and ten slices. It breaks down with five teams and fifty. The
          global store isn't just where your state lives — it's a shared
          dependency that every feature, every team, and every pull request must
          coordinate around.
          <sdux-brand-name /> eliminates that coordination cost by scoping state
          to independent <sdux-feature-cell />s.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Single Store Assumption</div>
        <div class="section-body">
          <p>
            Redux centralizes state through a global store and reducer tree.
            Every feature adds slices to the same root object. Every selector
            projects from the same tree. Every action broadcasts to every
            reducer.
          </p>
          <p>
            At small scale, this is manageable. One developer understands the
            full tree. Renames are safe because the blast radius is visible.
            Selectors compose predictably because nobody else is changing the
            shape under you.
          </p>
          <p>
            At team scale, the single store becomes a shared mutable dependency
            — not in the Redux sense of mutable state, but in the organizational
            sense. Every team's code touches the same tree. Every refactor
            requires cross-team awareness. Every selector is one shape change
            away from a silent regression.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Global State Becomes a Liability</div>
        <div class="section-body">
          <p>
            The problems are structural, not conceptual. Redux's ideas about
            immutability, pure functions, and predictable state transitions are
            sound. What breaks is the organizational model.
          </p>
          <ul>
            <li>
              <strong>Shape coupling:</strong> Selectors depend on the global
              tree structure. When Team A renames a property in their slice,
              Team B's selector that composes across slices breaks silently.
            </li>
            <li>
              <strong>Action namespace collisions:</strong> Two teams define
              <span class="code">RESET</span> action types. Both reducers
              respond. Neither team realizes the collision until production.
            </li>
            <li>
              <strong>Middleware interference:</strong> Team A adds logging
              middleware. Team B adds analytics middleware. Both intercept the
              same actions. Registration order determines behavior — and nobody
              documents what the correct order is.
            </li>
            <li>
              <strong>Merge conflict magnets:</strong> The root reducer file,
              the root state interface, and the barrel export index are touched
              by every feature branch. They become the most contested files in
              the repository.
            </li>
          </ul>
          <p>
            None of these problems are bugs in Redux. They are consequences of
            putting every feature's state in one shared structure. The global
            store doesn't scale with teams — it scales with discipline. And
            discipline doesn't survive deadline pressure.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Scoped Ownership with FeatureCells</div>
        <div class="section-body">
          <p>
            In <sdux-brand-name />, state is owned by independent
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>s.
            Each cell encapsulates its own typed state, its own pipeline, and
            its own lifecycle boundary. No other cell can read or write another
            cell's state directly.
          </p>

          <sdux-multi-framework-example
            description="Independent FeatureCells with Scoped Ownership">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts &#8212; each cell is independent
export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    // Team A owns cart state
    provideFeatureCell(
      CartService,
      &#123;
        key: 'cart',
        initialState: &#123; items: [], total: 0 &#125;
      &#125;
    ),

    // Team B owns user profile state
    provideFeatureCell(
      UserProfileService,
      &#123;
        key: 'user-profile',
        initialState: &#123; name: '', preferences: &#123;&#125; &#125;
      &#125;
    ),

    // Team C owns notifications state
    provideFeatureCell(
      NotificationsService,
      &#123;
        key: 'notifications',
        initialState: &#123; items: [], unreadCount: 0 &#125;
      &#125;
    )
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';

Vault(&#123; devMode: true, logLevel: 'off' &#125;);

// Team A owns cart state
export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123; items: [], total: 0 &#125;
&#125;);

// Team B owns user profile state
export const userProfileCell = FeatureCell(&#123;
  key: 'user-profile',
  initialState: &#123; name: '', preferences: &#123;&#125; &#125;
&#125;);

// Team C owns notifications state
export const notificationsCell = FeatureCell(&#123;
  key: 'notifications',
  initialState: &#123; items: [], unreadCount: 0 &#125;
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            Three teams. Three cells. Zero shared state. Team A can rename every
            property in the cart state shape without Team B or Team C knowing or
            caring. There is no root reducer file. There is no global state
            interface. There is no barrel export that every branch touches.
          </p>

          <div class="callout callout-info">
            <p>
              Each
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              is identified by a unique key and may be registered exactly once.
              No other cell can access its state directly — isolation is
              enforced by architecture, not by team agreement.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Changes for Your Team</div>
        <div class="section-body">
          <p>
            The organizational impact is immediate. When state ownership is
            scoped to cells, team boundaries align with state boundaries.
          </p>

          <table>
            <thead>
              <tr>
                <th class="column-auto">Global Store</th>
                <th class="column-auto"><sdux-feature-cell /> Ownership</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Every team touches the root state interface</td>
                <td>Each team owns only its cell's type</td>
              </tr>
              <tr>
                <td>Selector changes require cross-team review</td>
                <td>State access is scoped to the owning cell</td>
              </tr>
              <tr>
                <td>Action namespace collisions are possible</td>
                <td>No actions — updates target the owner directly</td>
              </tr>
              <tr>
                <td>Root reducer file is a merge conflict magnet</td>
                <td>No root reducer — cells are registered independently</td>
              </tr>
              <tr>
                <td>Middleware affects all state</td>
                <td>Pipeline behaviors are scoped per cell</td>
              </tr>
              <tr>
                <td>Feature removal requires tree surgery</td>
                <td>Remove the cell registration — done</td>
              </tr>
            </tbody>
          </table>

          <p>
            This isn't just a technical improvement — it's an organizational
            one. Teams stop coordinating around shared files. Pull requests
            shrink because they only touch the code their feature owns.
            Refactors become safe because the blast radius is bounded by the
            cell boundary.
          </p>

          <div class="callout callout-info">
            <strong>The core shift:</strong> Redux scopes state by convention
            (slice naming, selector discipline, action prefixing).
            <sdux-brand-name /> scopes state by architecture — the cell boundary
            is enforced, not agreed upon.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/migration"
              >Redux Concepts in <sdux-brand-name
            /></a>
            page for a section-by-section mapping of State, Actions, Dispatch,
            Reducers, Effects, Selectors, and Testing. Explore the
            <a routerLink="/docs/references/functions/feature-cell"
              >FeatureCell API documentation</a
            >
            to see the full registration surface.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogGlobalStoreSharedDependencyComponent {}
