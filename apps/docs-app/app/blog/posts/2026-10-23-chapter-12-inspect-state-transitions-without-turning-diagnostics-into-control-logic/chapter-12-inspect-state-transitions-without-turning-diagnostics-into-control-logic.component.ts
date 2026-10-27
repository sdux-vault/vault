import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-12-inspect-state-transitions-without-turning-diagnostics-into-control-logic',
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
      id="chapter-12-inspect-state-transitions-without-turning-diagnostics-into-control-logic"
      title="Chapter 12 — Inspect State Transitions Without Turning Diagnostics into Control Logic"
      date="2026-10-23"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          A final State value tells you what the user sees. It does not always
          tell you why that value appeared. Chapter 12 shows how to inspect one
          transition through the
          <sdux-feature-cell [tm]="true" />
          boundary without letting diagnostic code become a second state
          manager.
        </p>
        <p>
          You will compare the current immutable StateSnapshot, the
          <span class="code">state$</span> stream, candidate values before and
          after taps, the finalized State emission, and an application-owned
          baseline. The result is a useful diagnostic trail with a clear rule:
          observation can explain a transition, but it does not control one.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Begin with the completed
            Chapter 7 project and use one mutation throughout the lab. The same
            attempt is easier to understand when every observation surface can
            be compared side by side.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why a Final State Value Is Not Enough to Explain a Transition
        </div>
        <div class="section-body">
          <p>
            Debugging a state transition from the rendered screen alone is like
            debugging a compiler from its output binary. You can see the result,
            but you cannot tell which input was accepted, which transformation
            changed it, or whether the value was still loading when a consumer
            observed it. The missing context is often the difference between a
            real pipeline problem and a display problem.
          </p>
          <p>
            Chapter 12 adds observation at the boundaries that matter. The
            service exposes the FeatureCell's reactive state surface and stream,
            then registers tap callbacks and State-emission observation. The
            component renders those readings for the lab. The component does not
            decide which candidate wins, replace a candidate from a callback, or
            infer lifecycle from a textarea.
          </p>
          <table aria-label="Chapter 12 observation surfaces">
            <thead>
              <tr>
                <th scope="col" class="column-125">Surface</th>
                <th scope="col" class="column-250">When it is observed</th>
                <th scope="col" class="column-auto">Question it answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="code">state</span></td>
                <td>Latest reactive read</td>
                <td>What is the FeatureCell reporting now?</td>
              </tr>
              <tr>
                <td><span class="code">state$</span></td>
                <td>Each committed State event</td>
                <td>Which snapshots arrived, and what event produced them?</td>
              </tr>
              <tr>
                <td><span class="code">beforeTaps()</span></td>
                <td>After filtering, before reducers</td>
                <td>What candidate is about to be transformed?</td>
              </tr>
              <tr>
                <td><span class="code">afterTaps()</span></td>
                <td>After reducers, before emission</td>
                <td>What derived candidate is about to be committed?</td>
              </tr>
              <tr>
                <td><span class="code">emitStates()</span></td>
                <td>After final State emission</td>
                <td>What did this attempt emit?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Read the Current Immutable StateSnapshot
        </div>
        <div class="section-body">
          <sdux-multi-framework-example
            description="Expose the current StateSnapshot">
            <ng-template #beforeAngular>
              <p>
                The first observation surface is the simplest: the service
                exposes <span class="code">state</span> from its private Vault
                reference. In the Angular tutorial, the component then reads the
                current <span class="code">isLoading</span>,
                <span class="code">value</span>,
                <span class="code">error</span>, and
                <span class="code">hasValue</span> values through the service
                boundary. This is a read of the latest committed snapshot, not a
                request to run the pipeline again.
              </p>
            </ng-template>
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Expose the current reactive StateSnapshot
readonly state = this.#vault.state;</code></pre>
            </ng-template>
            <ng-template #beforeCore>
              <p>
                The core example exposes
                <span class="code">state</span> directly from the
                <span class="code">FeatureCell</span>
                reference. The current immutable snapshot contains the
                <span class="code">isLoading</span>,
                <span class="code">value</span>,
                <span class="code">error</span>, and
                <span class="code">hasValue</span> values. This is a read of the
                latest committed snapshot, not a request to run the pipeline
                again.
              </p>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Read the current committed snapshot
const snapshot = featureCell.state;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            That distinction matters when the UI is showing a pending or empty
            state. <span class="code">hasValue</span> answers whether a value is
            present; <span class="code">isLoading</span> answers whether work is
            in progress; <span class="code">error</span> reports the current
            error condition. A diagnostic view can display all four without
            subscribing to a second source or moving state ownership into the
            component.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Read-only means read-only:</strong> treat every snapshot
              as immutable. Serializing a snapshot for a teaching view is an
              observation; mutating it and expecting the FeatureCell to adopt
              the change would bypass the State boundary.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Follow Committed Snapshots Through state$
        </div>
        <div class="section-body">
          <p>
            Use <span class="code">state$</span> when the question is temporal:
            which snapshots arrived, and what event produced each one? The
            stream carries the full immutable snapshot together with event
            context. That makes it a better diagnostic surface than repeatedly
            polling the latest value, because the latest value can no longer
            show the earlier boundary that produced it.
          </p>
          <sdux-multi-framework-example
            description="Observe committed State snapshots">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Observe committed State snapshots
readonly state$ = this.#vault.state$;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Observe committed State snapshots
const state$ = featureCell.state$;</code></pre>
            </ng-template>
            <ng-template #afterAngular>
              <p>
                The Chapter 12 component subscribes through the Angular
                lifecycle, reads the snapshot from each event, and renders a
                serialized view. The subscription is not a control channel. It
                does not feed a new candidate back into the FeatureCell, and it
                does not change the event that has already been committed.
              </p>
            </ng-template>
            <ng-template #afterCore>
              <p>
                The core example subscribes to the FeatureCell's
                <span class="code">state$</span> stream and reads each committed
                snapshot for diagnostics. The subscription is not a control
                channel: it does not feed a new candidate back into the
                FeatureCell or change an event that has already been committed.
              </p>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            This is the right place to record a bounded event trail for a test
            or diagnostic screen. Keep the record useful: include the event
            context needed to explain the transition, redact sensitive fields,
            and avoid retaining every high-frequency emission forever.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Compare Candidates Before and After Taps
        </div>
        <div class="section-body">
          <p>
            A committed snapshot still leaves a transformation question: did the
            candidate change between filtering and reduction? The relevant
            observation order is Filters, Before Tap, Reducers, After Tap, then
            State and State Emission. The tap surfaces let you inspect that
            progression without replacing the candidate.
          </p>
          <sdux-multi-framework-example
            description="Register observational tap surfaces">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Capture candidates before and after reducers
this.#vault.beforeTaps([this.#captureBeforeTapInput]);
this.#vault.afterTaps([this.#captureAfterTapInput]);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Capture candidates before and after reducers
featureCell.beforeTaps([captureBeforeTapInput]);
featureCell.afterTaps([captureAfterTapInput]);</code></pre>
            </ng-template>
            <ng-template #afterAngular>
              <p>
                <span class="code">beforeTaps()</span> shows the filtered
                candidate immediately before reducers run.
                <span class="code">afterTaps()</span> shows the derived
                candidate after reducers have finished and before State
                emission. In the lab, each callback writes an observation into a
                private writable Signal and exposes only a read-only view to the
                component.
              </p>
            </ng-template>
            <ng-template #afterCore>
              <p>
                <span class="code">beforeTaps()</span> shows the filtered
                candidate immediately before reducers run.
                <span class="code">afterTaps()</span> shows the derived
                candidate after reducers have finished and before State
                emission. In a core TypeScript diagnostic, each callback can
                record its observation in an application-owned diagnostic value
                without changing the candidate.
              </p>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-info">
            <p>
              <strong>Diagnostic boundary:</strong> a tap callback records what
              it sees. It does not return a replacement candidate, and the
              component does not use the recorded value as an alternative write
              path. That keeps the observation trustworthy.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Observe Final State Emission Without Taking Control
        </div>
        <div class="section-body">
          <p>
            The last observation surface answers a different question from the
            taps: what finalized StateSnapshot did this attempt emit? Register
            <span class="code">emitStates()</span> to capture the finalized
            snapshot after the pipeline has completed its transformation and
            State emission work.
          </p>
          <sdux-multi-framework-example
            description="Capture the finalized State emission">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Capture the finalized State emission
this.#vault.emitStates([this.#captureEmittedState]);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Capture the finalized State emission
featureCell.emitStates([captureEmittedState]);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            Comparing the after-tap value with the emitted StateSnapshot gives
            you a precise checkpoint. If the two differ, the question is no
            longer “what did the reducer do?” but “which later boundary explains
            the finalized result?” If they match, the observation has ruled out
            one class of transformation without changing the application.
          </p>
          <p>
            This also makes tests easier to explain. A test can perform one
            mutation, settle the application through its normal test harness,
            and assert the observations at the boundaries it cares about. The
            callbacks remain instrumentation, not a replacement for the
            FeatureCell's update API.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Capture a Baseline Safely for Diagnostics and Tests
        </div>
        <div class="section-body">
          <p>
            Chapter 12 also needs a known collection to restore after each
            experiment. It captures the first
            <span class="code">state$</span> snapshot with
            <span class="code">hasValue</span>, clones the value, and keeps that
            clone as an application-owned teaching baseline. The clone matters:
            the baseline is a reference point, not a live alias that later
            mutations can silently change.
          </p>
          <p>
            Restoring that captured collection through
            <span class="code">replaceState()</span> is different from calling
            <span class="code">reset()</span>. The first restores the lab's
            captured collection. The second invokes the FeatureCell lifecycle
            reset behavior. Keeping those actions separate prevents a diagnostic
            label such as “Initial State” from hiding a different lifecycle
            operation.
          </p>
          <table aria-label="Chapter 12 baseline and lifecycle distinction">
            <thead>
              <tr>
                <th scope="col" class="column-150">Action</th>
                <th scope="col" class="column-auto">Meaning in the lab</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Captured baseline</td>
                <td>
                  One cloned value from the first State stream snapshot with a
                  value
                </td>
              </tr>
              <tr>
                <td><span class="code">replaceState()</span></td>
                <td>
                  Restore that known collection through the normal State API
                </td>
              </tr>
              <tr>
                <td><span class="code">reset()</span></td>
                <td>Run the separate FeatureCell lifecycle reset operation</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong>Production telemetry needs limits:</strong> the tutorial
              serializes complete values so the boundary is visible. A shipped
              diagnostic surface should redact sensitive fields, sample noisy
              emissions, cap payload size, and avoid retaining snapshots longer
              than necessary.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">A Practical Diagnostic Workflow</div>
        <div class="section-body">
          <p>
            Start with the smallest surface that can answer the question. If the
            question is simply “what is committed now?”, read
            <span class="code">state</span>. If the question is “what happened
            over time?”, inspect <span class="code">state$</span>. If the final
            value is surprising, compare the filtered candidate before reducers
            with the derived candidate after reducers. Only then move to the
            finalized State emission and its event context.
          </p>
          <p>
            This order keeps the diagnostic trail causal. You are not collecting
            every possible value because more logs are always better; you are
            placing a small number of observations where the pipeline changes
            meaning. A before-tap value can show that filtering removed a
            record. An after-tap value can show that a reducer derived or
            reordered a collection. A State emission can show what was finally
            exposed to consumers. The committed snapshot can then confirm what
            the UI reads after the attempt settles.
          </p>
          <p>
            Keep the component's job equally narrow. It can render the captured
            values, label the observation moment, and provide a teaching action
            that submits one normal mutation. It should not inspect a diagnostic
            value and then decide to call
            <span class="code">replaceState()</span>
            as an invisible correction. If the application needs a recovery
            action, make that action explicit in the service API and give it a
            separate explanation from the instrumentation that reported the
            problem.
          </p>
          <p>
            The same discipline helps when a diagnostic view becomes telemetry.
            A teaching textarea can show a complete collection because the goal
            is to make the boundary concrete. An operational view should expose
            only the fields needed for the question it answers. That might mean
            counts, identifiers, status flags, or a redacted error category
            instead of the full State value. The observation API stays the same;
            the retention and presentation policy becomes more careful.
          </p>
          <p>
            Finally, remove observations that no longer answer a useful
            question. A callback that remains forever because it was once
            helpful can turn into noise, memory pressure, or an accidental
            record of sensitive data. Bounded diagnostic code is easier to trust
            because its purpose, lifetime, and data shape are all visible next
            to the feature that owns it.
          </p>
          <div class="concept-box">
            <p>
              <strong>One mutation, several read-only views:</strong> the lab is
              most useful when every surface observes the same attempt. That
              makes differences visible without introducing a second path that
              can change the result.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Work through
            <a href="/tutorial/angular/chapters/12-state-introspection">
              Chapter 12: State Introspection</a
            >
            in the Angular tutorial, then run the same mutation through each
            observation surface. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            reference explains the public state boundary, while the tutorial
            makes the boundary visible in a working diagnostic lab.
          </p>
          <!-- StackBlitz: chapter-12-state-introspection -->
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter12InspectStateTransitionsWithoutTurningDiagnosticsIntoControlLogicComponent {}
