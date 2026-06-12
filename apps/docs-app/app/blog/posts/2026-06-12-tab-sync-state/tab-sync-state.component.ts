import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-tab-sync-state',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MatTab,
    MatTabGroup,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
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
          code, no manual sync. SDuX Vault&#8482;'s Tab Sync Controller uses
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
            SDuX Vault solves this with two components that work together: the
            Tab Sync Controller and the Tab Sync State Behavior. The controller
            handles initial negotiation — figuring out whether peer tabs exist
            and synchronizing state before the first pipeline execution
            completes. The behavior handles ongoing broadcasting after
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
            registered on the same FeatureCell. No fluent API configuration is
            needed — registration alone enables cross-tab negotiation.
          </p>

          <div class="sdux-tab-container">
            <mat-tab-group
              animationDuration="200ms"
              mat-stretch-tabs="false"
              class="sdux-tabs"
              [selectedIndex]="0">
              <mat-tab label="Angular">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab
                        [label]="'Configure a FeatureCell with Tab Sync'">
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
&#125;;</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>

              <mat-tab label="React">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab
                        [label]="'Configure a FeatureCell with Tab Sync'">
                        <pre
                          class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell&lt;Employee[]>(
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
);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>

              <mat-tab label="Vue">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab
                        [label]="'Configure a FeatureCell with Tab Sync'">
                        <pre
                          class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell&lt;Employee[]>(
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
);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>
            </mat-tab-group>
          </div>

          <div class="callout callout-info">
            <div class="title">Degraded Mode</div>
            <p>
              If BroadcastChannel or localStorage is unavailable — SSR, Node.js,
              Deno, web workers — the Tab Sync Controller degrades gracefully.
              It clears the negotiation cache, abstains, and the FeatureCell
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
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTabSyncStateComponent {}
