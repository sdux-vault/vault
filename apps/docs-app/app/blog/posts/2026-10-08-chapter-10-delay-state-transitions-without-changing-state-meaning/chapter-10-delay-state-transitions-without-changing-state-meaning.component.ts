import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-10-delay-state-transitions-without-changing-state-meaning',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  template: `
    <sdux-blog-layout
      id="chapter-10-delay-state-transitions-without-changing-state-meaning"
      title="Chapter 10 — Delay State Transitions Without Changing State Meaning"
      date="2026-10-08"
      pillar="SP"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          A delayed State transition should still mean the same thing when it
          finally continues. Chapter 10 introduces the Delay Controller as a
          timing boundary: every pipeline attempt pauses for a configured
          interval, then continues with the same candidate State. The service
          owns the <span class="code">withDelay()</span> configuration, while
          the component exposes the elapsed teaching experience without taking
          ownership of the pipeline through the
          <sdux-feature-cell [tm]="true" /> boundary.
        </p>
        <p>
          A pause can look like a debounce, a throttle, or a hidden mutation
          rule when the only visible evidence is that a button feels slower. The
          Chapter 10 lab makes the boundary explicit: the Delay Controller
          changes when an accepted update proceeds, not which update is
          processed or what its value means.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Begin with the completed
            Chapter 7 project. Chapter 10 adds a fixed three-second interval and
            a display-only elapsed timer to the existing character workflow.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">Delay Changes Time, Not Meaning</div>
        <div class="section-body">
          <p>
            A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            update still starts with a candidate value. The service submits that
            candidate through the same service-owned boundary, and the
            configured pipeline still determines whether it can become committed
            State. The new behavior is the pause before the pipeline attempt
            proceeds through its configured timing policy.
          </p>
          <p>
            That makes Delay useful when timing is part of the user experience
            but not part of the data rule. You might want a visible animation to
            settle before a panel changes, a demo to represent realistic
            latency, or an external handoff to receive a predictable interval.
            In each case, the candidate remains the candidate. Delay does not
            rewrite the object, select a different record, or turn a state
            update into a new kind of update.
          </p>
          <p>
            The service decides that this
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            uses a fixed delay, the controller applies that timing policy, and
            the component renders the result. The component does not create a
            second timer to decide when State is allowed to change.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Registering the Delay Controller</div>
        <div class="section-body">
          <p>
            The Delay Controller must be registered before the service can
            configure it. In the Angular tutorial, that registration belongs
            beside the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            provider in <span class="code">app.config.ts</span>. The application
            supplies the controller as infrastructure; the service supplies the
            interval as feature policy.
          </p>
          <sdux-multi-framework-example
            description="Register the Delay Controller">
            <ng-template #angular>
              <pre class="code-inline"><code class="language-ts">import &#123;
  withArrayByIdMergeBehavior,
  withDelayController
&#125; from '@sdux-vault/addons';

provideFeatureCell(
  ExampleService,
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [withArrayByIdMergeBehavior],
  [withDelayController]
);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">provideFeatureCell(
  ExampleService,
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [withArrayByIdMergeBehavior],
  [withDelayController]
);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            Registration makes the controller available at the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            boundary. It does not tell the feature how long to wait. That
            decision comes next, in the service that already owns the character
            State and its update methods.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Configure a Fixed Interval in the Service
        </div>
        <div class="section-body">
          <p>
            Chapter 10 keeps timing configuration next to the other
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            pipeline configuration. The service declares the interval as a named
            constant and calls <span class="code">withDelay()</span>
            before initialization. This keeps the policy discoverable and
            prevents individual component actions from inventing their own
            timing rules.
          </p>
          <sdux-multi-framework-example
            description="Configure the fixed delay in the service">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">/** Fixed Policy-stage hold applied to every tutorial pipeline attempt. */
export const EXAMPLE_DELAY_MILLISECONDS = 3_000;

constructor() &#123;
  this.#vault.withDelay?.(&#123;
    millisecondDelay: EXAMPLE_DELAY_MILLISECONDS
  &#125;);

  this.#vault.initialize();
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">const EXAMPLE_DELAY_MILLISECONDS = 3_000;

characterCell.withDelay(&#123;
  millisecondDelay: EXAMPLE_DELAY_MILLISECONDS
&#125;);

characterCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The fixed interval is not a component setting. A create, edit, or
            delete method submitted through this service encounters the same
            configured timing policy. The feature does not become fast for one
            button and delayed for another because each handler implemented its
            own waiting logic.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Keep configuration before initialization:</strong>
              Register the controller at the provider boundary and configure
              <span class="code">withDelay()</span> before calling
              <span class="code">initialize()</span>. The service should be the
              one place where this
              <a href="/docs/references/functions/feature-cell">FeatureCell</a
              >'s pipeline policy is assembled.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Make the Pause Observable Without Moving Pipeline Authority
        </div>
        <div class="section-body">
          <p>
            A three-second pause is difficult to understand if the screen only
            appears unresponsive. The tutorial therefore adds a small elapsed
            timer to the component. It starts when the service reports that an
            update is loading and stops when that update reaches its normal
            completion, finalization, or error presentation path.
          </p>
          <p>
            The timer explains what the learner is seeing; it does not control
            the update. It does not call
            <span class="code">setTimeout()</span> around a service method,
            decide whether a second click should be ignored, or delay a
            component-local copy of State. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            remains the source of loading and State information, and the service
            remains the owner of the update boundary.
          </p>
          <p>
            The configured interval can be rendered beside the live elapsed
            value, so the learner can observe that the pause is deliberate.
            Removing the display helper removes the lesson's stopwatch, but it
            does not remove the Delay policy from the service.
          </p>
          <table aria-label="Delay responsibility boundaries">
            <thead>
              <tr>
                <th scope="col" class="column-150">Concern</th>
                <th scope="col" class="column-200">Owner</th>
                <th scope="col" class="column-auto">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Timing policy</td>
                <td>Service and Delay Controller</td>
                <td>
                  Configure and apply the fixed interval for the
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  pipeline.
                </td>
              </tr>
              <tr>
                <td>Candidate State</td>
                <td>
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  pipeline
                </td>
                <td>
                  Continue the submitted candidate without changing its meaning.
                </td>
              </tr>
              <tr>
                <td>Elapsed display</td>
                <td>Component</td>
                <td>
                  Show the teaching experience without deciding when State may
                  commit.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Every Attempt Gets the Configured Interval
        </div>
        <div class="section-body">
          <p>
            Delay is easiest to reason about when its unit is an attempt. A user
            action submits a candidate, and that attempt observes the configured
            interval before it continues. The rule is not “wait until the user
            stops clicking” and it is not “run at most once per window.” It is
            simply a fixed pause associated with each pipeline attempt.
          </p>
          <p>
            If two actions are initiated close together, each one has its own
            timing experience. Delay does not secretly collapse them into one
            update or claim that the latest action is automatically the only
            meaningful one. The rest of the configured
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            pipeline still determines how those candidates are processed and
            committed.
          </p>
          <p>
            The Chapter 10 screen makes this visible with repeated updates.
            Watch the loading and elapsed values, then compare the committed
            character State. The delay changes when you see the result; it does
            not add a second business rule about which character update should
            win.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Delay Is Not Debounce or Throttle</div>
        <div class="section-body">
          <p>
            Debounce and throttle answer questions about the relationship among
            multiple incoming events. Debounce waits for quiet and typically
            keeps the latest event. Throttle limits how often work is allowed to
            start within a window. Those are event-admission rules.
          </p>
          <p>
            Delay answers a different question: once this pipeline attempt is
            accepted, how long should it pause before continuing? It does not
            change the candidate, suppress a candidate because another event
            arrived, or redefine the update as “latest wins.” Calling every
            visible pause a debounce makes the timing policy sound more powerful
            than it is and encourages ownership in the wrong layer.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Choose the policy by meaning:</strong> Use Delay for a
              fixed execution interval. Choose debounce or throttle only when
              the requirement is explicitly about admitting, grouping, or
              limiting a sequence of events. Keep the candidate State and the
              timing rule conceptually separate.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Chapter 10 Boundary</div>
        <div class="section-body">
          <p>
            The completed lab has three clear owners. The application registers
            <span class="code"
              ><a href="/docs/pipeline/controllers/with-delay-controller"
                >withDelayController</a
              ></span
            >. The service configures <span class="code">withDelay()</span> and
            keeps the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            update methods together. The component renders loading, elapsed
            time, and committed State as a teaching surface.
          </p>
          <p>
            That arrangement gives timing a place without letting timing become
            a second state architecture. You can change three seconds to a
            different fixed interval, remove the elapsed display, or use the
            same policy with another feature while preserving the underlying
            meaning of the State transition.
          </p>
          <p>
            The next time an update needs to wait, ask whether the requirement
            is about when an accepted attempt proceeds or which events should be
            admitted. If it is the former, Delay can express that intent
            directly. Keep configuration with the service, registration with
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            infrastructure, and explanation with the component.
          </p>
          <!-- StackBlitz: chapter-10-delay-state-transitions -->
          <p>
            Try the complete Chapter 10 example in StackBlitz, then compare its
            setup with the
            <a href="/docs/pipeline/controllers/with-delay-controller"
              >Delay Controller reference</a
            >
            and the
            <a href="/docs/references/functions/feature-cell">FeatureCell API</a
            >.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter10DelayStateTransitionsWithoutChangingStateMeaning {}
