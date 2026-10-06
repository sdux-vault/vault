import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-chapter-8-observe-pipeline-failures',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  template: `
    <sdux-blog-layout
      id="chapter-8-observe-pipeline-failures"
      title="Chapter 8 — Observe Pipeline Failures Without Turning UI Feedback into Control"
      date="2026-10-01"
      pillar="SP"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          What should the UI do when a user action enters the pipeline but a
          registered filter throws before the candidate can become State? This
          lab follows that failure through the same service-owned
          <sdux-feature-cell [tm]="true" />
          boundary, where the feature finalizes an error, the application can
          observe it globally, and the UI can acknowledge the condition without
          quietly becoming responsible for recovery.
        </p>
        <p>
          You will keep the Chapter 7 CRUD workflow, pure filter, and ordered
          reducers. The lab adds one intentional throwing filter, an
          <span class="code">errors()</span> callback, and a global error
          response. The point is to watch the same service-owned boundary handle
          failure, then prove that clearing a message is not the same as
          removing the cause.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Use the completed Chapter 7
            project as your starting checkpoint. Do not rebuild the feature from
            scratch; Chapter 8 changes the service, component, template, and
            specs while normal CRUD requests remain the same.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">What Chapter 7 Already Gives You</div>
        <div class="section-body">
          <p>
            In Chapter 7, Resolve produces the incoming character collection,
            Filters removes the teaching record whose last name is
            <span class="code">unknown</span>, and Reducers derive the
            display-ready collection. The service registers those rules, while
            the component consumes the committed State for selection, editing,
            and rendering.
          </p>
          <p>
            That completed checkpoint matters because Chapter 8 does not replace
            the data flow. It places a controlled failure into the existing
            filter path. Every later create, update, or delete request still
            enters through the same service methods and reaches the same
            pipeline. When the teaching flag is enabled, the candidate fails
            before it can become committed State.
          </p>
          <table
            aria-label="Chapter 7 checkpoint carried into the Chapter 8 lab">
            <thead>
              <tr>
                <th scope="col" class="column-250">Existing checkpoint</th>
                <th scope="col" class="column-auto">What the lab adds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Service-owned
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
                <td>A controlled failure inside the registered filter path</td>
              </tr>
              <tr>
                <td>Pure filter and ordered reducers</td>
                <td>
                  A filter that throws only while the teaching flag is armed
                </td>
              </tr>
              <tr>
                <td>Component renders committed State</td>
                <td>
                  Component observes global and feature-specific error outputs
                </td>
              </tr>
              <tr>
                <td>Normal CRUD requests</td>
                <td>
                  Reset action that disarms the cause without another request
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong
                >Do not copy the failure pattern into ordinary
                validation.</strong
              >
              The lab throws deliberately so the Error stage is visible.
              Expected invalid form or domain input should use the documented
              validation or rejection mechanism instead of unexpected
              exceptions.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Lab Step 1: Arm a Controlled Pipeline Failure
        </div>
        <div class="section-body">
          <p>
            Begin in the Chapter 7 service. Keep the existing
            <span class="code">removeUnknownLastNameFilter</span>, then add a
            second inline filter after it. Most of the time this filter returns
            the candidate unchanged. When the signal-backed teaching flag is
            enabled, it throws an intentional error.
          </p>
          <p>
            The component does not construct a special failed request. The
            service arms the flag and submits a fresh replacement candidate with
            <span class="code">replaceState()</span>. That fresh identity makes
            each demonstration attempt observable, while the enabled filter
            stops the candidate before State commitment.
          </p>
          <p>
            This is the important lab boundary: the failure is part of the
            pipeline configuration, not a component-side branch around normal
            CRUD behavior. Once armed, later create, update, and delete calls
            continue to enter the same failing filter until you reset it.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Observe the cause, not just the symptom:</strong> a global
              banner may tell the user that something failed, but the enabled
              throwing filter explains why the next candidate will fail too.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Lab Step 2: Register an Observational Error Callback
        </div>
        <div class="section-body">
          <p>
            The Chapter 8 service registers an
            <span class="code">errors()</span> callback alongside the existing
            filter and reducer registrations. The callback receives the
            finalized Vault error and the immutable
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            snapshot after error handling has completed. It records those values
            for the tutorial output; it does not transform the error, replace
            State, or decide whether the pipeline should continue.
          </p>
          <p>
            The documented method contract is deliberately small. Use it for
            observation such as diagnostics, monitoring, logging, or a
            compatibility bridge. Keep error authority in the pipeline and keep
            presentation decisions in the component.
          </p>
          <sdux-multi-framework-example
            description="Register a finalized error observer">
            <ng-template #angular>
              <pre class="code-inline"><code class="language-ts">this.#vault
  .errors([
    (error, state) =&gt; &#123;
      console.error('Employee FeatureCell error:', error.message);
      console.info('Last known state:', state.value);
    &#125;
  ])
  .initialize();</code></pre>
            </ng-template>
            <ng-template #core>
              <pre class="code-inline"><code class="language-ts">employeeCell
  .errors([
    (error, state) =&gt; &#123;
      console.error('Employee FeatureCell error:', error.message);
      console.info('Last known state:', state.value);
    &#125;
  ])
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            In the lab's Angular service, the equivalent callback stores the
            error and snapshot in a read-only teaching signal. The component
            serializes that signal into the Error Emission output so you can
            inspect what was finalized without giving the template permission to
            mutate it.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Lab Step 3: Compare Two Error Surfaces</div>
        <div class="section-body">
          <p>
            The lab displays two related but separate results. First,
            <span class="code"
              ><a href="/docs/references/functions/vault-error-service"
                >VaultErrorService</a
              ></span
            >
            exposes application-level error state. The component subscribes to
            its global stream and uses it for the visible error banner. That
            singleton is independent of any one
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            which makes it suitable for shared application concerns such as
            monitoring, banners, and recovery guidance.
          </p>
          <p>
            Second, the service-owned
            <span class="code">errors()</span> callback emits the finalized
            error together with the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            snapshot. That output is specific to this feature and this lab. It
            is useful for understanding what the pipeline finalized, but it is
            not a replacement for the application-level error surface.
          </p>
          <table aria-label="Chapter 8 error representations">
            <thead>
              <tr>
                <th scope="col" class="column-200">Surface</th>
                <th scope="col" class="column-150">Consumer</th>
                <th scope="col" class="column-auto">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Finalized
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  error
                </td>
                <td><span class="code">errors()</span> callback</td>
                <td>
                  Observe the error and immutable snapshot for feature-specific
                  work
                </td>
              </tr>
              <tr>
                <td>Global Vault error</td>
                <td>
                  <span class="code"
                    ><a href="/docs/references/functions/vault-error-service"
                      >VaultErrorService</a
                    ></span
                  >
                </td>
                <td>
                  Present application-level status or shared operational
                  feedback
                </td>
              </tr>
              <tr>
                <td>User-facing message</td>
                <td>Component template</td>
                <td>
                  Show an actionable, non-sensitive summary and acknowledgement
                  control
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong>Redact before telemetry:</strong> raw exceptions and State
              snapshots can contain credentials, personal data, or domain
              secrets. Render a safe message for the user and define a separate
              redacted diagnostic payload for operators.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Lab Step 4: Prove That Clear Is Not Recovery
        </div>
        <div class="section-body">
          <p>
            Click <span class="code">Throw Error</span> and observe the global
            error banner and the serialized Error Emission output. Then try an
            add, edit, or delete action while the control reads
            <span class="code">Reset Error</span>. The same pipeline failure
            should appear again because the filter is still armed.
          </p>
          <p>
            Now click <span class="code">Clear</span>. The banner disappears,
            but the cause remains enabled. Trigger another mutation and the
            failure returns. Clearing the singleton error acknowledges the
            current message; it does not disable the filter or retry the failed
            candidate.
          </p>
          <p>
            Finally, click <span class="code">Reset Error</span>. The service
            disarms the throwing filter and clears the global error without
            sending another pipeline request. Later CRUD actions now pass
            through the original Chapter 7 filter-and-reducer flow and can
            commit normally again.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Verification sequence:</strong> Throw Error, try a CRUD
              action, Clear, try another CRUD action, Reset Error, then try CRUD
              again. The sequence separates acknowledgement from recovery in a
              way a static error banner cannot.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Chapter 8 Lab Takeaway</div>
        <div class="section-body">
          <p>
            Chapter 8 builds directly on the completed Chapter 7 lab checkpoint:
            same service-owned
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            same character collection, same filter and reducers, same CRUD
            requests. The new work is a focused experiment in failure
            observation. You deliberately arm one filter, watch the Error stage
            finalize the failure, compare feature-level and application-level
            outputs, and then remove the cause.
          </p>
          <p>
            The resulting boundary is practical beyond the tutorial. Pipelines
            should own error authority and finalization. Services should
            register the feature's observational hooks. Components should
            present safe feedback and local acknowledgement state. Recovery
            should change the failing condition or explicitly retry according to
            a defined policy; dismissing a message alone should not pretend that
            the underlying operation succeeded.
          </p>
          <p>
            Save this completed checkpoint before moving to
            <a
              href="/tutorial/angular/chapters/09-async-input"
              target="_blank"
              rel="noopener noreferrer"
              >Chapter 9: Async Input</a
            >. The next lab carries the same error model into asynchronous
            inputs.
          </p>
          <!-- StackBlitz: chapter-8-observe-pipeline-failures -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Continue with the
            <a
              [routerLink]="[
                '/docs/pipeline/api/feature-cell-methods/methods/errors'
              ]"
              target="_blank"
              rel="noopener noreferrer"
              ><span class="code">errors()</span> method reference</a
            >,
            <a
              [routerLink]="['/docs/global-error-handler']"
              target="_blank"
              rel="noopener noreferrer"
              >Global Error Handler</a
            >, and the
            <a
              [routerLink]="['/tutorial/angular/chapters/08-errors']"
              target="_blank"
              rel="noopener noreferrer"
              >complete Chapter 8 lab</a
            >.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogChapter8ObservePipelineFailuresComponent {}
