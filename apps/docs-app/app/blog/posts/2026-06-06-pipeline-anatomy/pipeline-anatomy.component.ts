import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-pipeline-anatomy',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule, VaultBrandNameComponent],
  template: `
    <sdux-blog-layout
      title="Pipeline Anatomy — What Happens When You Update State"
      date="2026-06-06"
      pillar="ED"
      readingTime="8">
      <header class="docs-header">
        <p class="lead">
          What actually happens when you call
          <code>replaceState</code> or <code>mergeState</code> in
          <sdux-vault-brand-name [tm]="true" />? The answer is not "the value
          gets written to a store." The answer is a deterministic, multi-stage
          pipeline that resolves, filters, reduces, and commits your state
          change — atomically, every time. This post walks through that journey
          step by step.
        </p>
      </header>

      <!-- ─── A State Update's Journey ─── -->
      <section class="section">
        <div class="section-title">A State Update's Journey</div>
        <div class="section-body">
          <p>
            When you update state in <sdux-vault-brand-name />, your value
            enters a structured pipeline. The pipeline is not a metaphor — it's
            a literal, ordered sequence of stages that every state update passes
            through before it becomes visible to your application.
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
                <td>Policy (Controllers)</td>
                <td>Can this update proceed at all?</td>
              </tr>
              <tr>
                <td>Interceptors</td>
                <td>Should this update be admitted?</td>
              </tr>
              <tr>
                <td>Resolve</td>
                <td>Normalize the input into a resolved candidate value</td>
              </tr>
              <tr>
                <td>Merge</td>
                <td>Combine the candidate with the current committed state</td>
              </tr>
              <tr>
                <td>Operators</td>
                <td>Refine or suppress the merged candidate</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td>Further refine or reject the candidate before reduction</td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>Compute the finalized state from the processed value</td>
              </tr>
              <tr>
                <td>Taps</td>
                <td>Observe the result (before and after reduction)</td>
              </tr>
              <tr>
                <td>Persist / Encrypt</td>
                <td>Store the committed snapshot externally</td>
              </tr>
              <tr>
                <td>State Commitment</td>
                <td>Emit the final, immutable snapshot</td>
              </tr>
            </tbody>
          </table>

          <p>
            Every stage is opt-in. A minimal
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            uses only the core stages (resolve, merge, state). When you add a
            filter behavior, it runs at the filter stage. When you add a
            persistence behavior, it runs at the persist stage. Nothing runs
            unless you declare it.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The pipeline is not a black box.
            Every stage has a fixed position, a clear responsibility, and
            explicit opt-in registration.
          </div>
        </div>
      </section>

      <!-- ─── Behaviors — The Data Path ─── -->
      <section class="section">
        <div class="section-title">Behaviors — The Data Path</div>
        <div class="section-body">
          <p>
            <strong>Behaviors</strong> are the composable building blocks that
            occupy pipeline stages. Each Behavior performs exactly one function:
            resolving input, filtering values, reducing state, observing
            snapshots, or persisting output.
          </p>
          <p>
            Here's what makes Behaviors different from middleware or effects in
            other state systems:
          </p>
          <ul>
            <li>
              <strong>Stage-bound.</strong> A Behavior runs at exactly one
              pipeline stage. A filter Behavior cannot run during reduction. A
              persist Behavior cannot intercept input. The pipeline enforces
              this structurally.
            </li>
            <li>
              <strong>Explicitly registered.</strong> A Behavior participates
              only if you include it in the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              declaration. If it's not listed, it doesn't execute. There is no
              implicit behavior discovery.
            </li>
            <li>
              <strong>Composable without coupling.</strong> Behaviors don't
              invoke or coordinate with each other. Each one operates on the
              inputs provided to its stage and returns a result. The pipeline
              handles ordering and execution.
            </li>
          </ul>
          <p>There are two categories:</p>
          <p>
            <strong>Core Behaviors</strong> — Always present. These handle
            scheduling, input normalization, default merge, and error
            finalization. You don't register them; they're guaranteed for every
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </p>
          <p>
            <strong>Addon Behaviors</strong> — Optional, engineer-selected.
            These provide capabilities like filtering, operators, taps,
            persistence, encryption, and error shaping. You register them
            explicitly when configuring a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </p>

          <pre
            class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell(
  EmployeeCell,
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [
    // Addon behaviors — each occupies a specific pipeline stage
    withArrayMergeBehavior,
    withDistinctUntilChangedOperator,
    withLocalStoragePersistBehavior
  ]
);
</code></pre>

          <p>In this declaration, three addon Behaviors extend the pipeline:</p>
          <ul>
            <li>
              <code>withArrayMergeBehavior</code> runs at the
              <strong>merge</strong> stage, replacing the default merge strategy
              with array-aware merging.
            </li>
            <li>
              <code>withDistinctUntilChangedOperator</code> runs at the
              <strong>operators</strong> stage, suppressing duplicate emissions.
            </li>
            <li>
              <code>withLocalStoragePersistBehavior</code> runs at the
              <strong>persist</strong> stage, writing committed snapshots to
              localStorage.
            </li>
          </ul>
          <p>
            Each one has a fixed position in the pipeline. You don't think about
            ordering — <sdux-vault-brand-name /> validates and inserts each
            Behavior into the correct stage automatically.
          </p>
        </div>
      </section>

      <!-- ─── Controllers — The Policy Path ─── -->
      <section class="section">
        <div class="section-title">Controllers — The Policy Path</div>
        <div class="section-body">
          <p>
            While Behaviors handle the <em>data path</em> (what happens to the
            value), <strong>Controllers</strong> handle the
            <em>policy path</em> (whether execution proceeds at all).
          </p>
          <p>
            Controllers are coordinating authorities. They don't transform
            state. They don't produce values. Instead, they mediate, arbitrate,
            and finalize control decisions that govern how the pipeline
            executes.
          </p>
          <p>
            Think of Controllers as policy enforcement for your state updates:
          </p>
          <ul>
            <li>
              A <strong>throttle controller</strong> limits how frequently
              updates can run.
            </li>
            <li>
              A <strong>max-failures controller</strong> halts the pipeline
              after repeated errors.
            </li>
            <li>
              A <strong>tab-sync controller</strong> coordinates state updates
              across browser tabs.
            </li>
            <li>
              A <strong>stepwise controller</strong> manages multi-phase
              resolution.
            </li>
          </ul>
          <p>
            Controllers operate <em>across</em> pipeline stages rather than
            within a single stage. They observe requests emitted by Behaviors,
            apply centralized decision logic, and issue authoritative outcomes —
            proceed, deny, buffer, or retry.
          </p>

          <pre
            class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell(
  EmployeeCell,
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [
    withStepwiseResolveBehavior   // Behavior (data path)
  ],
  [
    withStepwiseController        // Controller (policy path)
  ]
);
</code></pre>

          <p>
            The fourth array in a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            declaration is the controller array. Like Behaviors, Controllers are
            explicitly registered. If a Behavior requires a Controller for
            coordination, both must be declared —
            <sdux-vault-brand-name /> fails fast if a dependency is missing,
            rather than silently executing with incomplete authority.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Behaviors define
            <em>what</em> happens to your data. Controllers define
            <em>whether</em> and <em>when</em> it happens. This separation keeps
            control logic centralized and deterministic instead of scattered
            across middleware.
          </div>
        </div>
      </section>

      <!-- ─── The Execution Guarantee ─── -->
      <section class="section">
        <div class="section-title">The Execution Guarantee</div>
        <div class="section-body">
          <p>
            This is where <sdux-vault-brand-name /> fundamentally differs from
            other state management systems. The pipeline doesn't just process
            your update — it guarantees <em>how</em> that processing occurs.
          </p>

          <h4>Compute First, Commit Later</h4>
          <p>
            <sdux-vault-brand-name /> executes state updates in two distinct
            phases:
          </p>
          <ol>
            <li>
              <strong>Pipeline computation</strong> — Determines what the next
              state should be. All interceptor evaluation, resolve execution,
              operator/filter/reducer processing, and error normalization
              happens here. No state is mutated during this phase.
            </li>
            <li>
              <strong>State commitment</strong> — Makes the result visible.
              Signal updates, state callbacks, DevTools notifications, and
              controller notifications all occur inside a
              <code>queueMicrotask</code> after computation completes.
            </li>
          </ol>
          <p>
            These phases are intentionally separated and never interleaved. No
            mutation, signal emission, or observer notification occurs until
            pipeline computation has completed successfully. Partial results and
            intermediate values are never observable outside the pipeline.
          </p>

          <h4>Atomic Snapshots</h4>
          <p>
            Every successful pipeline execution produces exactly one atomic
            snapshot. That snapshot is:
          </p>
          <ul>
            <li>Fully resolved</li>
            <li>Fully filtered</li>
            <li>Fully reduced</li>
            <li>Fully normalized</li>
            <li>Fully encrypted and persisted (if applicable)</li>
          </ul>
          <p>
            Observers never see intermediate states, partially reduced values,
            or pre-normalized data. Either the entire snapshot is committed, or
            no state change is visible at all.
          </p>

          <h4>Reentrancy Is Structurally Impossible</h4>
          <p>
            Because state commitment is deferred to a microtask, any attempt to
            trigger a new state update from within a reducer, state callback, or
            error handler will always occur <em>after</em> the current commit
            has completed.
          </p>
          <p>This eliminates entire classes of bugs:</p>
          <ul>
            <li>Dispatching during reducer execution</li>
            <li>Promise resolution interleaving with state writes</li>
            <li>Observer-triggered infinite loops</li>
          </ul>
          <p>
            These aren't prevented by convention or lint rules. They're
            prevented by architecture.
          </p>
        </div>
      </section>

      <!-- ─── Why This Matters: Before vs. After ─── -->
      <section class="section">
        <div class="section-title">Why This Matters: Before vs. After</div>
        <div class="section-body">
          <h4>Before (Traditional State Management)</h4>
          <p>
            In a typical Redux-style system, a state update triggers middleware,
            reducers, and effects — often in unpredictable order. Side effects
            fire during reduction. Observers see partial state. Race conditions
            emerge when async actions resolve out of order.
          </p>
          <p>
            Debugging means tracing through action dispatches, middleware
            chains, effect handlers, and selector memoization — with no
            guarantee that what you see in DevTools represents what actually
            happened.
          </p>

          <h4>After (<sdux-vault-brand-name /> Pipeline)</h4>
          <p>
            A state update enters the pipeline. It passes through declared
            stages in deterministic order. Every Behavior has a fixed position.
            Controllers enforce policy before data processing begins.
            Computation finishes completely before any observer is notified.
          </p>
          <p>
            Debugging means looking at one pipeline execution: input in,
            snapshot out, every stage visible in DevTools with timing and
            category markers.
          </p>
          <p>
            The difference isn't incremental. When your state system guarantees
            atomic, deterministic, reentrant-safe execution by construction,
            entire categories of bugs simply cannot exist.
          </p>
        </div>
      </section>

      <!-- ─── Try It Yourself ─── -->
      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Open a live StackBlitz demo to see the pipeline in action — trigger
            state updates and watch each stage execute in real time:
          </p>
          <p>
            <a routerLink="/docs/stackblitz">Open a StackBlitz demo →</a>
          </p>
          <p>
            For the full pipeline stage reference, see the
            <a routerLink="/docs/pipeline/behaviors/complete-pipeline-spec"
              >Pipeline Architecture</a
            >
            documentation. To understand how Behaviors and Controllers compose,
            start with
            <a routerLink="/docs/pipeline/behaviors/what-is-a-behavior"
              >What Is a Behavior?</a
            >
            and
            <a routerLink="/docs/pipeline/controllers/what-is-a-controller"
              >What Is a Controller?</a
            >.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPipelineAnatomyComponent {}
