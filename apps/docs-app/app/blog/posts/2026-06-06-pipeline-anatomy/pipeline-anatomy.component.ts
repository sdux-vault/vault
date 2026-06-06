import { Component, ViewEncapsulation } from '@angular/core';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-pipeline-anatomy',
  standalone: true,
  imports: [BlogLayoutComponent],
  template: `
    <sdux-blog-layout
      title="Pipeline Anatomy — What Happens When You Update State"
      date="2026-06-06"
      pillar="ED"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Most state libraries give you a reducer and say "good luck." SDuX
          Vault™ runs every update through a structured, multi-stage pipeline —
          and every stage is composable, opt-in, and isolated. Here's every stop
          your state update travels through.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Is a Behavior?</div>
        <div class="section-body">
          <p>
            A Behavior is a composable, stage-bound unit of responsibility
            within the SDuX Vault pipeline. Each Behavior performs a single,
            well-defined function — resolving input, filtering values, reducing
            state, observing snapshots, handling errors, or persisting output.
          </p>
          <p>
            Behaviors are never implicitly enabled. A Behavior participates in a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>™
            pipeline only if it is explicitly registered during
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            configuration or is part of the minimal core pipeline. If a Behavior
            is not registered, it is not executed.
          </p>
          <p>
            Every Behavior conforms to a common contract: a type that determines
            its pipeline stage, a unique key for diagnostics, a critical
            designation for pipeline correctness, a context object for snapshot
            access, and one or more stage-specific callbacks that perform the
            Behavior's work.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Behaviors can be freely composed
            without awareness of one another. Each Behavior operates only on the
            inputs provided to its stage and returns a result or a no-op signal.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Pipeline Stages</div>
        <div class="section-body">
          <p>
            When you update state through a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            the value travels through a series of pipeline stages in a strict,
            deterministic order. Each stage has one job:
          </p>

          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Resolve</td>
                <td>
                  Normalizes input — sync values, promises, observables, and
                  streams are all handled uniformly
                </td>
              </tr>
              <tr>
                <td>Merge</td>
                <td>Combines the resolved value with current state</td>
              </tr>
              <tr>
                <td>Operators</td>
                <td>Refines or suppresses the merged candidate</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td>Examines and gates values before reduction</td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>Computes the finalized state from the processed value</td>
              </tr>
              <tr>
                <td>State</td>
                <td>Commits the result as the new immutable snapshot</td>
              </tr>
            </tbody>
          </table>

          <p>
            Each stage is isolated. Each Behavior is scoped to exactly one
            stage. No Behavior can reach into another stage's execution. The
            pipeline enforces this automatically — you don't configure stage
            boundaries, they're architectural.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Core vs Addon Behaviors</div>
        <div class="section-body">
          <p>
            Behaviors fall into two categories, and understanding the
            distinction is essential.
          </p>
          <p>
            <strong>Core Behaviors</strong> — Queue, Resolve, default Merge, and
            core error handling — are always present in every
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            They ensure correct scheduling, input normalization, and immutable
            state snapshots. You don't register them. You can't remove them.
            They're the non-negotiable foundation.
          </p>
          <p>
            <strong>Addon Behaviors</strong> are optional extensions you
            explicitly register during
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            configuration. Filters, operators, taps, caching, offline
            coordination, persistence, encryption, error shaping — all addons.
            They execute only within their declared pipeline stage and respect
            all stage boundaries.
          </p>

          <div class="callout callout-warning">
            <strong>Important:</strong> If a Behavior is not registered, it does
            not execute. There is no implicit behavior, no hidden middleware,
            and no default plugins running behind the scenes. You declare
            exactly what runs in your pipeline.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Composability in Practice</div>
        <div class="section-body">
          <p>
            A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            pipeline is assembled by listing Behaviors — not by configuring a
            monolithic store. Here's what a basic
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            declaration looks like:
          </p>

          <pre
            class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell(
  EmployeeCell,
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [
    // opt-in behavior array
  ],
  [
    // opt-in controller array
  ]
);

employeeCell.initialize()</code></pre>

          <p>
            The behavior array is where you register addons. Each entry
            represents a focused unit of work scoped to a single pipeline stage.
            The controller array is separate — controllers mediate policy
            decisions but never transform state data.
          </p>
          <p>
            This separation means your data path and your policy path are
            architecturally distinct. Behaviors handle data. Controllers handle
            policy. They never cross.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why This Design Matters</div>
        <div class="section-body">
          <p>
            Behaviors define how FeatureCells remain modular, predictable, and
            extensible:
          </p>
          <ul>
            <li>
              <strong>Composable</strong> —
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              pipelines are assembled by listing Behaviors, not by configuring a
              monolithic store
            </li>
            <li>
              <strong>Deterministic</strong> — Each Behavior has a fixed stage,
              clear inputs, and bounded effects
            </li>
            <li>
              <strong>Extensible</strong> — Custom Behaviors can be introduced
              without modifying SDuX Vault core
            </li>
            <li>
              <strong>Safe</strong> — Core Behaviors enforce invariants, while
              addon Behaviors are isolated to their declared responsibilities
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/pipeline/behaviors/what-is-a-behavior"
              >What is a Behavior? documentation</a
            >
            for the complete contract, stage descriptions, and code examples.
            Then explore the
            <a routerLink="/docs/pipeline/behaviors/complete-pipeline-spec"
              >Complete Pipeline Specification</a
            >
            to see every stage across all six layers of the pipeline
            architecture.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPipelineAnatomyComponent {}
