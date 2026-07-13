import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import { DiagramComponent } from '../../../../../../libs/ui/web-components/src/public-api';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-circuit-breaker-state-pipeline',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    DiagramComponent,
    RouterModule,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Circuit Breaker Pattern, Built Into Your State Pipeline"
      date="2026-06-08"
      pillar="ED"
      readingTime="4">
      <header class="docs-header">
        <p class="lead">
          Every backend engineer knows the circuit breaker pattern: after N
          failures, stop trying. But frontend state management? Most libraries
          let you crash-loop forever.
          <sdux-vault-brand-name [tm]="true" /> brings deterministic failure
          termination to your state pipeline with the Max Failures controller.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem: Unbounded Failure</div>
        <div class="section-body">
          <p>
            When a state update fails in most libraries, you get an error
            callback. What happens next is entirely up to you. Retry? How many
            times? What if the retry fails? What if a user action triggers
            another attempt while the retry is still in flight?
          </p>
          <p>
            Without a structural answer to these questions, you end up writing
            ad-hoc retry counters, wrapping operations in try-catch blocks, and
            hoping your error boundaries catch everything. The result is
            unpredictable: crash loops, infinite retries, and failure states
            that silently corrupt your application.
          </p>
          <p>
            Backend systems solved this decades ago with the circuit breaker
            pattern. After a defined number of failures, the circuit opens and
            requests stop flowing. Your frontend state deserves the same
            discipline.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How Max Failures Works</div>
        <div class="section-body">
          <p>
            The Max Failures controller operates within the Policy stage of the
            <sdux-vault-brand-name /> pipeline. It responds exclusively to
            failure events — it does not observe, derive, or modify state
            values, and it does not participate in normal attempt admission.
          </p>
          <p>
            Each execution trace is evaluated independently. For every failure
            encountered, the controller increments an internal failure counter.
            Once the configured maximum is reached, the controller issues an
            abort decision, permanently terminating that trace within the
            pipeline.
          </p>
          <p>
            The controller does not retry attempts, delay execution, or suppress
            intermediate failures. Its sole responsibility is to enforce a
            strict, trace-scoped failure ceiling that guarantees deterministic
            termination after the defined threshold is exceeded.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The Max Failures controller governs
            failure tolerance, not execution timing or value admission. It
            intervenes only when a failure is reported and does not affect
            successful executions or traces that have not exceeded their
            configured limit.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Configuring Max Failures</div>
        <div class="section-body">
          <p>
            The controller is registered structurally when you define your
            <a href="/docs/references/functions/feature-cell">FeatureCell</a
            >&#8482;. This determines that the cell participates in
            failure-threshold enforcement at runtime. The failure limit itself
            is configured via the fluent API during initialization.
          </p>

          <p>
            Here is a complete example showing how to register the Max Failures
            controller and set the failure threshold to 3:
          </p>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Diagrams</div>

        <div class="section-body">
          <sdux-diagram
            image="blog/b-006.png"
            [tooltip]="'Max Failures Controller Configuration'"
            alt="Code snippet showing SDuX Vault's Max Failures controller configuration. A FeatureCell is defined with a typed Employee array, registered with withMaxFailuresController, and initialized with a failure threshold of 3." />
        </div>
      </section>
      <section class="section">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="column-250">maxFailures: number</td>
              <td>
                Positive integer representing the maximum number of failures
                permitted for a single execution trace. Once the threshold is
                reached, the controller issues an abort decision and permanently
                terminates that trace.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="section">
        <div class="section-title">What Happens at the Threshold</div>
        <div class="section-body">
          <p>
            When the failure count reaches the configured maximum, the
            controller issues an abort decision. This is not a retry with
            backoff. It is not a warning. The trace is permanently terminated —
            no further execution of that trace will occur within the pipeline.
          </p>
          <p>
            This behavior is deterministic: given the same sequence of failures,
            the controller will always terminate at the same point. There is no
            timing dependency, no race condition, and no ambiguity about whether
            the trace is still alive.
          </p>

          <div class="callout callout-warning">
            <strong>Important:</strong> If used in isolation without a
            controller that attempts retries, your pipeline will be inoperable
            after the first failure. The Max Failures controller is most
            commonly paired with retry or recovery controllers that give the
            pipeline additional attempts before the ceiling is reached.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">When to Use Max Failures</div>
        <div class="section-body">
          <p>
            The Max Failures controller is most appropriate when failures may
            resolve due to external conditions — network requests, third-party
            API calls, or external system dependencies. In these cases, a
            bounded number of retries gives the operation a fair chance to
            succeed without allowing unbounded failure loops.
          </p>
          <p>
            For purely synchronous pipeline logic, a failure typically
            represents a terminal condition. Retrying without an external state
            change will reproduce the same failure deterministically. Ensure a
            clear business justification exists before introducing failure-based
            retry tolerance.
          </p>
          <p>Common use cases include:</p>
          <ul>
            <li>
              Enforcing strict failure tolerance policies for externally
              dependent operations
            </li>
            <li>
              Implementing circuit-breaking behavior to protect downstream
              systems
            </li>
            <li>
              Guaranteeing bounded execution attempts for unstable integrations
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/pipeline/controllers/max-failures"
              >Max Failures Controller documentation</a
            >
            to see the complete configuration options, diagrams, and integration
            patterns with other controllers like Replay Global Error for
            coordinated recovery semantics.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogCircuitBreakerStatePipelineComponent {}
