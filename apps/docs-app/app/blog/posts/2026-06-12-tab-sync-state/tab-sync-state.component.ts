import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-tab-sync-state',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    MultiFrameworkExampleComponent,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Open a New Tab. State Is Already There."
      date="2026-06-12"
      pillar="SP"
      readingTime="4">
      <header class="docs-header">
        <p class="lead">
          Open a second browser tab. Your state is already there — no custom
          code, no manual sync.
          <sdux-vault-brand-name [tm]="true" />'s Tab Sync Controller uses
          BroadcastChannel and a localStorage registry to negotiate state across
          tabs automatically.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Multi-Tab Problem</div>
        <div class="section-body">
          <p>
            Users open multiple tabs. It's not an edge case — it's how people
            use browsers. And when they do, your state management falls apart.
            Tab A has one version of the data. Tab B has another. The user makes
            a change in one tab and nothing happens in the other.
          </p>
          <p>
            Most libraries leave this entirely to you. You end up writing custom
            BroadcastChannel listeners, localStorage watchers, or polling
            intervals — then trying to reconcile state across tabs without race
            conditions. It's fragile, hard to test, and easy to get wrong.
          </p>
          <p>
            The worst failure mode is silent: a new tab opens, broadcasts its
            empty bootstrap state, and overwrites the established state in every
            other tab. The user loses data and never sees an error.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How Tab Sync Works</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> solves this with two components that work
            together: the Tab Sync Controller and the Tab Sync State Behavior.
            The controller handles initial negotiation — figuring out whether
            peer tabs exist and synchronizing state before the first pipeline
            execution completes. The behavior handles ongoing broadcasting after
            negotiation is done.
          </p>
          <p>
            When a new tab opens, the controller reads a localStorage tab
            registry to determine whether peers exist. Each tab maintains a
            heartbeat that refreshes its registry timestamp at a fixed interval.
            Stale entries are pruned automatically. If the registry contains
            fresh entries, peers definitively exist — no timing-sensitive
            guesswork.
          </p>
          <p>
            If peers are found, the controller sends a snapshot request via
            BroadcastChannel and waits for a response. If a peer responds, the
            controller adopts that state and aborts the new tab's bootstrap
            pipeline. If no peers are found, the controller clears the
            negotiation cache and lets the pipeline proceed with initial state.
          </p>
          <div class="callout callout-info">
            <p>
              A two-phase broadcast gating mechanism prevents bootstrap state
              from overwriting established state in peer tabs. After a new tab
              determines it is the first tab online, the first pipeline finalize
              enables broadcasting but does not broadcast. Only subsequent
              pipeline finalizations are broadcast. This eliminates the exact
              production failure where a new tab's empty state overwrites real
              data.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Registration</div>
        <div class="section-body">
          <p>
            Tab Sync requires both the controller and the behavior to be
            registered on the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            No fluent API configuration is needed — registration alone enables
            cross-tab negotiation.
          </p>

          <sdux-multi-framework-example
            description="Configure a FeatureCell with Tab Sync">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService,
      &#123;
        key: 'employees',
        initialState: [],
      &#125;,
      [
        // Tab Sync State Behavior is required
        withTabSyncStateBehavior
      ],
      [
        // Tab Sync Controller is required
        withTabSyncController
      ]
    )
  ]
&#125;;

// employee.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault, FeatureCell &#125; from '@sdux-vault/core';

Vault(&#123; devMode: true, logLevel: 'off' &#125;);

export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    initialState: [],
  &#125;,
  [
    // Tab Sync State Behavior is required
    withTabSyncStateBehavior
  ],
  [
    // Tab Sync Controller is required
    withTabSyncController
  ]
);

employeeCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <div class="callout callout-info">
            <div class="title">Degraded Mode</div>
            <p>
              If BroadcastChannel or localStorage is unavailable — SSR, Node.js,
              Deno, web workers — the Tab Sync Controller degrades gracefully.
              It clears the negotiation cache, abstains, and the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              functions normally as a single-tab state container. No errors, no
              conditional logic required.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a href="/docs/pipeline/controllers/components/tab-sync"
              >Tab Sync Controller</a
            >
            documentation for the complete negotiation flow, design decisions,
            and internal configuration constants.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTabSyncStateComponent {}
