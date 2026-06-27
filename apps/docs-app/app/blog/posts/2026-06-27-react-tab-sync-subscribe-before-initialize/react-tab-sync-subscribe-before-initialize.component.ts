import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-react-tab-sync-subscribe-before-initialize',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="React + Tab Sync: Subscribe Before Initialize"
      date="2026-06-27"
      pillar="SP"
      readingTime="3">
      <header class="docs-header">
        <p class="lead">
          The <sdux-vault-brand-name [tm]="true" /> Tab Sync works identically
          across Angular, Vue, and Svelte — but React requires one extra step.
          If you subscribe to state after calling <strong>initialize()</strong>,
          your component misses the negotiated cross-tab snapshot entirely. Here
          is why it happens and how to fix it.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem</div>
        <div class="section-body">
          <p>
            The Tab Sync Controller performs BroadcastChannel negotiation during
            <strong>initialize()</strong>. When peer tabs exist, the controller
            requests their current state and commits the negotiated snapshot
            synchronously — before <strong>initialize()</strong> returns.
          </p>

          <p>
            In Angular, this is invisible. Services are instantiated by the DI
            container and subscriptions are established during construction. By
            the time the pipeline fires, observers are already listening.
          </p>

          <p>
            In React, component state subscriptions live inside
            <strong>useEffect</strong>, which runs after the first render. If
            you call <strong>initialize()</strong> at the module level (during
            import) or before the effect runs, the negotiated snapshot commits
            to a state observable that has no subscribers yet. The component
            renders with empty bootstrap state and never receives the cross-tab
            data.
          </p>

          <div class="callout callout-warning">
            <strong>Silent Failure</strong>
            <p>
              This is not a crash or an error. The component simply renders with
              initial state while the negotiated snapshot sits in the observable
              unobserved. The user sees an empty screen in the new tab even
              though another tab has data. No console warning is produced.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Fix</div>
        <div class="section-body">
          <p>
            Subscribe to the state observable <strong>before</strong> calling
            <strong>initialize()</strong>. Place both operations inside
            <strong>useEffect</strong> in the correct order: subscribe first,
            initialize second.
          </p>

          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab
              [label]="'React — Subscribe Before Initialize'">
              <pre
                class="code-inline"><code class="language-ts">useEffect(() =&gt; &#123;
  // 1. Subscribe FIRST — catches the negotiation snapshot
  const sub = employeeState$.subscribe((emit) =&gt; &#123;
    setSnapshot(emit.snapshot);
  &#125;);

  // 2. Initialize AFTER — negotiation commits synchronously
  initializeCell();

  return () =&gt; sub.unsubscribe();
&#125;, []);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            This ordering guarantees the subscription is active when the Tab
            Sync Controller commits the negotiated snapshot. The component
            receives the cross-tab state on its very first emission.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Other Frameworks Don't Need This</div>
        <div class="section-body">
          <p>
            The subscription timing issue is unique to React's rendering model.
            Here is why Angular, Vue, and Svelte avoid it entirely:
          </p>

          <table aria-label="Framework subscription timing comparison">
            <thead>
              <tr>
                <th scope="column-175">Framework</th>
                <th scope="column-auto">Subscription Timing</th>
                <th scope="column-100">Issue?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Angular</td>
                <td>
                  Constructor / DI instantiation — before template renders
                </td>
                <td>No</td>
              </tr>
              <tr>
                <td>Vue</td>
                <td>
                  <strong>onMounted</strong> runs synchronously after the
                  instance is created
                </td>
                <td>No</td>
              </tr>
              <tr>
                <td>Svelte</td>
                <td>
                  <strong>onMount</strong> runs synchronously after first DOM
                  insert
                </td>
                <td>No</td>
              </tr>
              <tr>
                <td>React</td>
                <td>
                  <strong>useEffect</strong> runs asynchronously after paint
                </td>
                <td>Yes — if initialize runs before the effect</td>
              </tr>
            </tbody>
          </table>

          <p>
            The key distinction: React defers side effects until after the
            browser paints. If <strong>initialize()</strong> runs at module
            scope or during render, the negotiation completes before
            <strong>useEffect</strong> has a chance to subscribe.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">React StrictMode Considerations</div>
        <div class="section-body">
          <p>
            In development, React StrictMode invokes effects twice to detect
            impure side effects. Because <strong>initialize()</strong> is
            idempotent — calling it multiple times on the same FeatureCell has
            no additional effect after the first call — StrictMode
            double-invocation does not cause duplicate negotiation or
            double-broadcasting.
          </p>

          <p>
            If your cell initialization has expensive setup logic outside the
            FeatureCell itself, guard the effect with a module-level flag:
          </p>

          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'React — StrictMode Guard'">
              <pre
                class="code-inline"><code class="language-ts">let initialized = false;

useEffect(() =&gt; &#123;
  const sub = employeeState$.subscribe((emit) =&gt; &#123;
    setSnapshot(emit.snapshot);
  &#125;);

  if (!initialized) &#123;
    initialized = true;
    initializeCell();
  &#125;

  return () =&gt; sub.unsubscribe();
&#125;, []);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/pipeline/behaviors/tab-sync"
              >Tab Sync Behavior</a
            >
            documentation for the complete cross-tab negotiation flow, broadcast
            filtering, and persistence pairing patterns.
          </p>
          <p>
            Launch the
            <a routerLink="/docs/stackblitz" fragment="tab-sync"
              >Tab Sync StackBlitz example</a
            >
            to see the configuration in action across all four frameworks.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogReactTabSyncSubscribeBeforeInitializeComponent {}
