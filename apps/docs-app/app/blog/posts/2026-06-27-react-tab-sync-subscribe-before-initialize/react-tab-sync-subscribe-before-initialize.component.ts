import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { StackBlitzTryItLiveComponent } from 'apps/docs-app/app/docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-react-tab-sync-subscribe-before-initialize',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    VaultBrandNameComponent,
    StackBlitzTryItLiveComponent
  ],
  template: `
    <sdux-blog-layout
      title="React + Tab Sync: Render the Initial Snapshot Correctly"
      date="2026-06-27"
      pillar="SP"
      [tryItNow]="false"
      readingTime="3">
      <header class="docs-header">
        <p class="lead">
          React components render <sdux-vault-brand-name [tm]="true" /> Tab Sync
          State through <strong>useSyncExternalStore()</strong>. The method
          reads the current Snapshot during render and connects the component to
          subsequent State changes, including State negotiated before the
          component mounted.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The React Rendering Requirement</div>
        <div class="section-body">
          <p>
            The Tab Sync Controller performs BroadcastChannel negotiation during
            <strong>initialize()</strong>. When peer tabs exist, the controller
            requests their current state and commits the negotiated snapshot
            synchronously — before <strong>initialize()</strong> returns.
          </p>

          <p>
            A React component must render both the current committed Snapshot
            and every subsequent State change. This matters for Tab Sync because
            the negotiated State can be committed before the component mounts.
            The render cannot depend on receiving that negotiation as a future
            Observable emission.
          </p>

          <p>
            <strong>useSyncExternalStore()</strong> provides that render
            contract. It reads the current
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            Snapshot during render and connects the component to later local and
            cross-tab State changes.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          FeatureCell and Component Responsibilities
        </div>
        <div class="section-body">
          <p>
            Create and initialize the React-augmented
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> in
            its owning module. The component imports that stable cell reference
            and calls <strong>useSyncExternalStore()</strong> at the top level
            of its render function.
          </p>

          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'React — FeatureCell Module'">
              <pre class="code-inline"><code class="language-ts">import &#123;
  withTabSyncController,
  withTabSyncStateBehavior
&#125; from '&#64;sdux-vault/core';
import &#123; FeatureCell &#125; from '&#64;sdux-vault/react';

export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [withTabSyncStateBehavior],
  [withTabSyncController]
);

employeeCell.initialize();</code></pre>
            </sdux-example-viewer-tab>

            <sdux-example-viewer-tab [label]="'React — Component Render'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; employeeCell &#125; from './employee.cell';

export function EmployeeView() &#123;
  const snapshot = employeeCell.useSyncExternalStore();

  if (snapshot.isLoading) &#123;
    return &lt;p&gt;Loading...&lt;/p&gt;;
  &#125;

  if (snapshot.error) &#123;
    return &lt;p role="alert"&gt;&#123;snapshot.error.message&#125;&lt;/p&gt;;
  &#125;

  if (!snapshot.hasValue) &#123;
    return &lt;p&gt;No synchronized State is available.&lt;/p&gt;;
  &#125;

  return &lt;pre&gt;&#123;JSON.stringify(snapshot.value, null, 2)&#125;&lt;/pre&gt;;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The component does not depend on receiving the negotiation as a new
            emission. It reads the current committed Snapshot during render and
            remains connected to later local and cross-tab State changes through
            the same React subscription contract.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Render Subscription Contract</div>
        <div class="section-body">
          <p>
            The React method owns two connected responsibilities: reading the
            current Snapshot and maintaining the render subscription.
          </p>

          <table aria-label="useSyncExternalStore render contract">
            <thead>
              <tr>
                <th scope="col" class="column-200">Responsibility</th>
                <th scope="col" class="column-auto">Contract</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Initial render</td>
                <td>Reads the latest committed Snapshot synchronously.</td>
              </tr>
              <tr>
                <td>State changes</td>
                <td>
                  Connects the React render to subsequent
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  State changes.
                </td>
              </tr>
              <tr>
                <td>Component lifecycle</td>
                <td>
                  React manages subscription attachment, cleanup, and
                  resubscription.
                </td>
              </tr>
              <tr>
                <td>Tab Sync negotiation</td>
                <td>
                  State committed before the component mounted remains available
                  as the current Snapshot.
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            Use <strong>state</strong> for synchronous reads outside render and
            <strong>state$</strong> for non-rendering consumers that explicitly
            own an Observable subscription. Neither surface replaces
            <strong>useSyncExternalStore()</strong> for React UI rendering.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">React StrictMode and Ownership</div>
        <div class="section-body">
          <p>
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            initialization belongs to the owning module rather than a component
            effect. React StrictMode can attach, clean up, and attach the render
            subscription again during development;
            <strong>useSyncExternalStore()</strong> participates in that
            lifecycle without requiring application-level flags.
          </p>

          <div class="callout callout-info">
            <strong>Keep responsibilities separate</strong>
            <p>
              The module creates and initializes the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
              The component calls <strong>useSyncExternalStore()</strong> during
              render. React owns the render subscription lifecycle, so the
              component does not need a manual subscription, cleanup callback,
              initialization effect, or StrictMode guard.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/pipeline/behaviors/tab-sync"
              >Tab Sync Behavior</a
            >
            documentation for the complete cross-tab negotiation flow, broadcast
            filtering, and persistence pairing patterns.
          </p>
        </div>
      </section>
      <sdux-stack-blitz-try-it-live [id]="'tab-sync'" />
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogReactTabSyncSubscribeBeforeInitializeComponent {}
