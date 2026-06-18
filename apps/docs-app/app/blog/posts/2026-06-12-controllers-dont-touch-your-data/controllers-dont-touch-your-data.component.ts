import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-controllers-dont-touch-your-data',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule, VaultBrandNameComponent],
  template: `
    <sdux-blog-layout
      title="Controllers Don't Touch Your Data"
      date="2026-06-12"
      pillar="ED"
      readingTime="3">
      <header class="docs-header">
        <p class="lead">
          In most state libraries, middleware can do anything — transform data,
          block requests, retry, persist.
          <sdux-vault-brand-name [tm]="true" /> enforces a strict separation:
          Behaviors transform state, Controllers enforce policy. They can never
          cross.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Data Path vs the Policy Path</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> splits pipeline execution into two
            distinct paths. The data path is where Behaviors operate — they
            resolve, filter, reduce, encrypt, and persist state values. The
            policy path is where Controllers operate — they mediate, arbitrate,
            and finalize control decisions that affect how pipeline execution
            proceeds.
          </p>
          <p>
            A Controller cannot access the state value. A Behavior cannot block
            a request. This isn't a convention you're expected to follow — it's
            enforced by the architecture itself. Controllers and Behaviors
            receive different inputs, operate at different layers, and have
            different capabilities by design.
          </p>
          <p>
            All cross-cutting decisions flow through Controllers. Behaviors
            never coordinate with one another directly. If a pipeline needs
            stepwise approval, failure thresholds, or external gating, that
            logic lives in a Controller — never scattered across individual
            Behaviors.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Controllers Actually Do</div>
        <div class="section-body">
          <p>
            Controllers are coordinating authorities within the pipeline. They
            observe requests emitted by Behaviors, apply centralized decision
            logic, and issue authoritative outcomes. Those outcomes determine
            whether execution buffers, retries, completes, denies progression,
            or fails with an error.
          </p>
          <p>
            Controllers operate across pipeline stages rather than within a
            single stage. They don't need to know which Behavior emitted a
            request — only how to arbitrate the decision it represents. This
            keeps Controllers reusable and composable.
          </p>
          <p>
            Controllers are never implicitly enabled. A Controller participates
            in a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            pipeline only if it is explicitly registered during configuration.
            If a required Controller is omitted, the pipeline fails fast rather
            than executing with incomplete authority.
          </p>
          <div class="callout callout-info">
            <p>
              Controllers are not required for a
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              to store, update, or emit state. They are introduced only when
              additional coordination, arbitration, or policy enforcement is
              needed.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why Separation Matters</div>
        <div class="section-body">
          <p>
            When control logic and data transformation live in the same layer,
            you get middleware that does too many things. A single function
            might validate, transform, log, and conditionally block — making it
            hard to test, hard to reason about, and impossible to reuse.
          </p>
          <p>
            <sdux-vault-brand-name />'s separation means you can test data
            transformations without worrying about policy, and test policy
            decisions without worrying about data shape. Controllers are
            authoritative, centralized, deterministic, and safe — decisions are
            serialized, validated, and finalized in one place.
          </p>
          <p>
            Data flows through Behaviors. Policy flows through Controllers. They
            never cross.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a href="/docs/pipeline/controllers/what-is-a-controller"
              >What Is a Controller?</a
            >
            documentation to see the complete Controller anatomy, the Decision
            Engine coordination layer, and the Controller–Behavior dependency
            rules. If you want to see a Controller in action, check out the
            <a href="/docs/pipeline/controllers/components/max-failures"
              >Max Failures controller</a
            >
            — a built-in circuit breaker for your state pipeline.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogControllersDontTouchYourDataComponent {}
