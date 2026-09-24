import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-chapter-6-feature-lifecycle-null-reset-destroy',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      id="chapter-6-feature-lifecycle-null-reset-destroy"
      title="Chapter 6 — Make Feature Lifecycle Intentional with Null, Reset, and Destroy"
      date="2026-09-24"
      pillar="SP"
      readingTime="8">
      <header class="docs-header">
        <p class="lead">
          An empty feature is not necessarily an ended feature. In
          <a href="/tutorial/angular/chapters/06-lifecycle" target="new"
            >Chapter 6</a
          >, the Angular tutorial separates intentional
          <span class="code">null</span> persistence, reusable
          <span class="code">reset()</span>, and terminal
          <span class="code">destroy()</span> so your UI can respond to the
          lifecycle outcome instead of guessing from an empty collection.
        </p>
        <p>
          The boundary stays consistent with the earlier chapters: the service
          owns the
          <a href="/docs/references/functions/feature-cell"
            ><sdux-feature-cell
          /></a>
          and every lifecycle API, while the component owns temporary form,
          selection, confirmation, and feedback state. That separation makes
          sign-out, account switching, reusable screens, and teardown explicit
          design decisions.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Clearing data and ending a feature
            are different operations. Choose
            <span class="code">replaceState(null)</span>,
            <span class="code">reset()</span>, or
            <span class="code">destroy()</span>
            by the outcome your application needs.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Empty Data Is Not the Same as an Ended Feature
        </div>
        <div class="section-body">
          <p>
            A sign-out flow may clear the current user's data. An account switch
            may need a clean runtime before loading another account. A screen
            that is being permanently torn down may need to stop accepting
            requests altogether. All three can look like an empty screen, but
            they have different lifecycle meanings.
          </p>
          <p>
            Inferring lifecycle from an empty array or a missing record makes
            the UI responsible for a decision that belongs to the feature owner.
            It also makes later behavior ambiguous: should the next request be
            accepted, should the feature return to its neutral runtime state, or
            should the instance be recreated first?
          </p>
          <p>
            Chapter 6 makes that decision visible with three operations. A
            committed <span class="code">null</span> is an intentional value.
            <span class="code">reset()</span> clears the runtime snapshot while
            leaving the
            <span class="code"><sdux-feature-cell /></span> reusable. And
            <span class="code">destroy()</span> finalizes the active instance.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Persisting Null vs Resetting the Runtime Snapshot
        </div>
        <div class="section-body">
          <p>
            The first two operations both clear what a user sees, but they do
            not make the same statement about state. The tutorial service sends
            <span class="code">null</span> through the normal replacement path.
            That makes the value intentional: the feature is alive, and the
            application has explicitly committed an empty value.
          </p>
          <p>
            <span class="code">reset()</span> has a different contract. It does
            not store a replacement value supplied by the caller. It returns the
            current runtime snapshot to its neutral state and leaves the
            <span class="code"><sdux-feature-cell /></span> available for later
            work. This is the useful choice when a reusable feature should start
            over without being destroyed.
          </p>

          <table aria-label="Feature lifecycle operations">
            <thead>
              <tr>
                <th scope="col" class="column-150">Operation</th>
                <th scope="col" class="column-auto">Meaning</th>
                <th scope="col" class="column-auto">
                  Can the instance accept later work?
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="code">replaceState(null)</span></td>
                <td>Commit an intentional null value</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><span class="code">reset()</span></td>
                <td>Return to a neutral runtime snapshot</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><span class="code">destroy()</span></td>
                <td>Finalize the active <sdux-feature-cell /> instance</td>
                <td>Only after recreation</td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-warning">
            <p>
              <strong>Gotcha:</strong> Do not describe every clear operation as
              "resetting state." That wording hides whether the application
              committed a meaningful null, returned to a neutral runtime, or
              ended the feature entirely.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Keep Lifecycle APIs in the Service Boundary
        </div>
        <div class="section-body">
          <p>
            The Chapter 6 component does not reach through the service to call
            the <span class="code"><sdux-feature-cell /></span> directly.
            Instead, the service exposes named operations that describe the
            application's intent. That keeps ownership in one place and gives
            the component a stable domain-facing API.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Angular service lifecycle operations'">
              <pre
                class="code-inline"><code class="language-ts">destroyFeatureCell(): void &#123;
  this.#vault.destroy();
&#125;

resetState(): void &#123;
  this.#vault.reset();
&#125;

persistNullValue(): void &#123;
  this.#vault.replaceState(&#123; value: null &#125;);
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The names are not cosmetic. They prevent callers from having to know
            which low-level method represents the intended lifecycle outcome.
            They also make the service spec readable: one test can verify an
            intentional null write, another can verify a reusable reset, and
            another can verify terminal destruction.
          </p>
          <p>
            This is the same ownership rule used for create, update, and delete.
            The service owns committed Feature State and lifecycle authority;
            the component owns presentation state that can be cleared or
            disabled in response.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Finalizing a Feature with destroy()</div>
        <div class="section-body">
          <p>
            <span class="code">destroy()</span> is the operation that changes
            the UI's available future. It does not clear a value for reuse. It
            permanently finalizes the active
            <span class="code"><sdux-feature-cell /></span>
            instance, so later requests from that instance are invalid.
          </p>
          <p>
            That distinction matters for a screen that is leaving the runtime, a
            feature whose ownership is complete, or a workflow that must not
            accept accidental writes after teardown. The component should make
            the final state visible instead of leaving controls that appear to
            work but target a destroyed instance.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Use this rule:</strong> If the feature will be used again,
              choose a clear or reset operation. If the active instance is
              finished, destroy it and require a documented recreation path
              before offering new requests.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Disable the UI After Teardown</div>
        <div class="section-body">
          <p>
            Lifecycle authority still belongs to the service, but the component
            must respond to the result. Chapter 6 clears the editor form after a
            lifecycle action. After destruction, it also tracks a destroyed
            state, disables later interaction, and renders an explicit message
            telling the learner that the instance must be recreated.
          </p>
          <p>
            This is more than a visual detail. Local form values, selected
            identities, pending confirmations, and feedback messages are all
            temporary UI state. Leaving them active after destruction would
            suggest that the feature is still usable. Clearing them preserves
            the architectural boundary in the user experience as well as in the
            code.
          </p>
          <p>
            The recovery rule is equally important: after testing
            <span class="code">destroy()</span>, reload or replace the project
            with a fresh Chapter 6 checkpoint before continuing to Chapter 7. A
            future application runtime may recreate a feature, but it should do
            so through the lifecycle contract documented for that application,
            including any persistence cleanup it requires.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Work through the
            <a href="/tutorial/angular/chapters/06-lifecycle" target="new"
              >Angular Chapter 6 lifecycle tutorial</a
            >, then compare the API details for
            <a href="/docs/pipeline/api/feature-cell-methods/replace-state"
              >replaceState()</a
            >,
            <a href="/docs/pipeline/api/feature-cell-methods/reset">reset()</a>,
            and
            <a href="/docs/pipeline/api/feature-cell-methods/destroy"
              >destroy()</a
            >. The next lifecycle decision becomes much easier once your code
            names the intended outcome instead of treating every empty view as
            the same state.
          </p>
        </div>
      </section>

      <!-- StackBlitz: lifecycle-tutorial -->
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogChapter6FeatureLifecycleNullResetDestroyComponent {}
