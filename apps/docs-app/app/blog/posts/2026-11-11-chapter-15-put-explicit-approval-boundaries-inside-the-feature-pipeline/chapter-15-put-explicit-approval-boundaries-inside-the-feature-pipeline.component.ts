import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-15-put-explicit-approval-boundaries-inside-the-feature-pipeline',
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
      id="chapter-15-put-explicit-approval-boundaries-inside-the-feature-pipeline"
      title="Chapter 15 — Put Explicit Approval Boundaries Inside the Feature Pipeline"
      date="2026-11-11"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          Approval is part of a consequential state transition. If it lives in a
          confirmation modal beside the application instead of inside the
          service-owned pipeline, the UI can ask a question without controlling
          the candidate that question is meant to protect. Chapter 15 puts an
          explicit approval boundary inside the
          <sdux-feature-cell [tm]="true" />
          pipeline, where a decision can continue or block a candidate before it
          reaches committed
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          State.
        </p>
        <p>
          The Stepwise behaviors let you inspect a candidate after Resolve,
          after Filter, or after Reducer processing. The Stepwise Controller
          coordinates those pauses, while the service owns the pending request
          and the one-use decision contract. The component can render a prompt,
          but it does not become a second state manager.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>The policy rule:</strong> choose the smallest boundary that
            exposes enough information to answer the approval question, then
            guarantee that every pending request reaches a terminal decision.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Approval Belongs at a Pipeline Boundary
        </div>
        <div class="section-body">
          <p>
            A modal is a presentation surface. It can ask a person whether a
            change should proceed, but it does not know which candidate is
            paused, what work has already run, or whether the answer is still
            relevant to the pipeline attempt that opened it. When approval is
            bolted onto the side of the application, those responsibilities tend
            to leak into click handlers and component state.
          </p>
          <p>
            Stepwise behaviors move the pause to a documented processing
            boundary. The callback receives the current value, the candidate at
            that point, and a decision object. It may inspect the candidate and
            present the question through an application-owned prompt. It does
            not transform the candidate. A Continue decision lets the same
            attempt proceed; a Block decision discards that attempt and
            preserves the previously committed State.
          </p>
          <p>
            That separation is important because a candidate is not committed
            State. The pipeline can pause while the application gathers an
            explicit answer. If the answer is Block, the old committed value
            remains authoritative. If the answer is Continue, the candidate
            keeps moving through the normal pipeline toward the commitment
            boundary.
          </p>
          <table aria-label="Stepwise approval boundaries">
            <thead>
              <tr>
                <th scope="col" class="column-150">Boundary</th>
                <th scope="col" class="column-250">Candidate inspected</th>
                <th scope="col" class="column-auto">Policy question</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Stepwise Resolve</td>
                <td>Resolved candidate before normal filtering</td>
                <td>Should this resolved input enter downstream processing?</td>
              </tr>
              <tr>
                <td>Stepwise Filter</td>
                <td>Filtered candidate before reducers</td>
                <td>Should this surviving candidate be transformed?</td>
              </tr>
              <tr>
                <td>Stepwise Reducer</td>
                <td>Fully reduced candidate with derived fields</td>
                <td>
                  Should this display-ready result proceed toward commitment?
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong>Do not install every gate by default:</strong> Chapter 15
              uses all three as a comparison lab. A production feature should
              use the smallest number of approval boundaries its policy
              requires.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Choosing Between Resolve, Filter, and Reducer Gates
        </div>
        <div class="section-body">
          <p>
            The canonical processing order places Resolve and Merge before
            Stepwise Resolve, then Operators and Filters before Stepwise Filter,
            and Before Tap, Reducers, and Stepwise Reducer before After Tap.
            That order gives each gate a different meaning. “After Resolve” is
            useful shorthand for the chapter, but Merge still occurs between
            Resolve and Stepwise Resolve in the full pipeline.
          </p>
          <p>
            Use Stepwise Resolve when the policy concerns the incoming or
            hydrated candidate before ordinary filtering. This is the earliest
            point at which the feature can ask whether an input should enter its
            normal processing path. Use Stepwise Filter when the policy depends
            on what remains after filters have removed candidates. Use Stepwise
            Reducer when the reviewer needs to see derived display fields or the
            complete reduced result before it can move toward commitment.
          </p>
          <p>
            The final approval boundary is not the final pipeline stage. A
            continued Stepwise Reducer candidate still has normal downstream
            processing before State is committed. This is why the boundary
            should be named according to the question it answers, not according
            to the visual location of a prompt.
          </p>
          <sdux-multi-framework-example
            description="Register Stepwise approval boundaries"
            [displayCopyPaste]="false">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">this.#vault.withStepwiseResolve!(&#123;
  stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
    const shouldContinue = window.confirm('Continue this candidate?');

    if (shouldContinue) &#123;
      decisions.continue();
      return;
    &#125;

    decisions.block();
  &#125;
&#125;);

this.#vault.withStepwiseFilter!(&#123;
  stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
    const shouldContinue = window.confirm('Continue this candidate?');

    if (shouldContinue) &#123;
      decisions.continue();
      return;
    &#125;

    decisions.block();
  &#125;
&#125;);

this.#vault.withStepwiseReducer!(&#123;
  stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
    const shouldContinue = window.confirm('Continue this candidate?');

    if (shouldContinue) &#123;
      decisions.continue();
      return;
    &#125;

    decisions.block();
  &#125;
&#125;);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre class="code-inline"><code class="language-ts">employeeCell
  .withStepwiseResolve(&#123;
    stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
      const shouldContinue = window.confirm('Continue this candidate?');

      if (shouldContinue) &#123;
        decisions.continue();
        return;
      &#125;

      decisions.block();
    &#125;
  &#125;)
  .withStepwiseFilter(&#123;
    stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
      const shouldContinue = window.confirm('Continue this candidate?');

      if (shouldContinue) &#123;
        decisions.continue();
        return;
      &#125;

      decisions.block();
    &#125;
  &#125;)
  .withStepwiseReducer(&#123;
    stepwiseCallback: (_current, _candidate, decisions) =&gt; &#123;
      const shouldContinue = window.confirm('Continue this candidate?');

      if (shouldContinue) &#123;
        decisions.continue();
        return;
      &#125;

      decisions.block();
    &#125;
  &#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-warning">
            <p>
              <strong>Demonstration only:</strong>
              <span class="code"
                >window.confirm('Continue this candidate?')</span
              >
              keeps this example easy to run, but it is not a production
              approval experience. Production code should use an
              application-appropriate review flow with accessible UI, clear
              authorization, cancellation, and a reliable settlement policy for
              every pending decision.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">When Approval Must Happen Later</div>
        <div class="section-body">
          <p>
            Example 1 makes the decision immediately inside the callback. That
            is useful for a small, synchronous policy, but many approvals need a
            dialog, a reviewer, or another application service to respond later.
            In that case, the callback must hand the decision contract to the
            application and return without calling either terminal method.
          </p>
          <p>
            The Stepwise Controller coordinates this pause with the pipeline.
            The application owns the pending decision reference, while the
            pipeline remains the authority that determines whether the candidate
            proceeds. The example below uses one Filter boundary so the handoff
            is easy to see. The same pattern applies to Resolve or Reducer when
            the policy belongs at one of those boundaries.
          </p>
          <sdux-multi-framework-example
            description="Hand off an asynchronous Stepwise approval"
            [displayCopyPaste]="false">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; type StepwiseBehaviorDecisionShape &#125; from '@sdux-vault/addons';

interface Employee &#123;
  id: number;
  name: string;
&#125;

type PendingApproval = &#123;
  candidate: Employee[];
  decisions: StepwiseBehaviorDecisionShape;
&#125;;

pendingApproval: PendingApproval | undefined;

readonly #captureFilterApproval = (
  _current: Employee[] | undefined,
  candidate: Employee[],
  decisions: StepwiseBehaviorDecisionShape
): void =&gt; &#123;
  this.pendingApproval = &#123; candidate, decisions &#125;;
&#125;;

this.#vault.withStepwiseFilter!(&#123;
  stepwiseCallback: this.#captureFilterApproval
&#125;);

approvePending(): void &#123;
  const pending = this.pendingApproval;

  if (!pending) &#123;
    return;
  &#125;

  this.pendingApproval = undefined;
  pending.decisions.continue();
&#125;

blockPending(): void &#123;
  const pending = this.pendingApproval;

  if (!pending) &#123;
    return;
  &#125;

  this.pendingApproval = undefined;
  pending.decisions.block();
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; type StepwiseBehaviorDecisionShape &#125; from '@sdux-vault/addons';

interface Employee &#123;
  id: number;
  name: string;
&#125;

type PendingApproval = &#123;
  candidate: Employee[];
  decisions: StepwiseBehaviorDecisionShape;
&#125;;

let pendingApproval: PendingApproval | undefined;

const captureFilterApproval = (
  _current: Employee[] | undefined,
  candidate: Employee[],
  decisions: StepwiseBehaviorDecisionShape
): void =&gt; &#123;
  pendingApproval = &#123; candidate, decisions &#125;;
&#125;;

employeeCell.withStepwiseFilter(&#123;
  stepwiseCallback: captureFilterApproval
&#125;);

export const approvePending = (): void =&gt; &#123;
  const pending = pendingApproval;

  if (!pending) &#123;
    return;
  &#125;

  pendingApproval = undefined;
  pending.decisions.continue();
&#125;;

export const blockPending = (): void =&gt; &#123;
  const pending = pendingApproval;

  if (!pending) &#123;
    return;
  &#125;

  pendingApproval = undefined;
  pending.decisions.block();
&#125;;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The callback does not call a reducer, replace the candidate, or
            write committed State. It stores the candidate only so the
            application can show what is awaiting approval, and it stores the
            one-use decision so a later action can settle the paused pipeline.
            Clearing the reference before calling Continue or Block prevents the
            same decision from being reused.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Designing Reliable Settlement and Timeout Policy
        </div>
        <div class="section-body">
          <p>
            The most important operational fact in this chapter is also the
            easiest to miss: an unresolved decision can pause execution
            indefinitely. Waiting for the pipeline to settle does not answer a
            pending approval question. A test, prompt, navigation guard, or
            policy service must eventually call Continue or Block, or
            deliberately clear the decision according to the documented
            contract.
          </p>
          <p>
            The tutorial uses native prompts and asks the reader to settle each
            prompt before starting another request. A production application
            needs an explicit settlement policy that survives the ordinary ways
            a UI can disappear. Decide what happens when the user navigates
            away, a dialog is closed, an approver loses access, a request
            exceeds its response window, or the application is shutting down.
            The teaching example does not provide timeout, navigation
            cancellation, durable approvals, authorization, or audit history;
            those are application policy choices.
          </p>
          <p>
            Keep the policy small and testable. For each gate, define who can
            settle it, what the default outcome is when the deadline expires,
            how the pending UI is dismissed, and how the application proves that
            the decision was consumed once. Tests should exercise both Continue
            and Block at the boundary under review and verify that a blocked
            candidate does not replace committed State.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Settlement is part of correctness:</strong> a feature that
              can open an approval boundary must also have a reliable path to
              settle it. “The user will probably answer” is not an execution
              policy.
            </p>
          </div>
          <!-- StackBlitz: stepwise-tutorial-example -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Chapter 15’s
            <a [routerLink]="['/docs/tutorial/angular/chapters/15-stepwise']"
              >Stepwise tutorial</a
            >
            is the runnable comparison. Pair it with the
            <a
              [routerLink]="['/docs/pipeline/behaviors/complete-pipeline-spec']"
              >complete pipeline specification</a
            >
            and the
            <a [routerLink]="['/docs/pipeline/execution-guarantee']"
              >execution guarantees</a
            >
            to place each approval boundary accurately. The central design test
            is simple: can the policy see the right candidate, can the service
            settle the decision exactly once, and does Block leave committed
            State alone?
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter15PutExplicitApprovalBoundariesInsideTheFeaturePipelineComponent {}
