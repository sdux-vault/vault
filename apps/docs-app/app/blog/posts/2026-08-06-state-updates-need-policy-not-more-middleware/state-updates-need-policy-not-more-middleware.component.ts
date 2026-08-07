import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-state-updates-need-policy-not-more-middleware',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="State Updates Need Policy, Not More Middleware"
      date="2026-08-06"
      pillar="ED"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          State computation and execution authority are different problems.
          <sdux-brand-name [tm]="true" /> uses a Policy Layer to decide whether
          a pipeline attempt may proceed, pause, retry, or terminate, while
          Behaviors handle the work of resolving, filtering, reducing, and
          committing state.
        </p>
        <p>
          That boundary matters whenever an update must obey a rule that spans
          more than one operation: a fixed execution interval, a failure limit,
          a global recovery condition, an external approval, or coordination
          with another browser tab. Those rules belong to execution policy, not
          to a reducer or a callback hidden inside a Behavior.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> A controller does not calculate a new
            state value. It supplies execution authority. The Decision Engine
            resolves that authority, and the Conductor enforces the resulting
            decision before pipeline work continues.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why State Pipelines Need an Authority Boundary
        </div>
        <div class="section-body">
          <p>
            A Behavior answers a data question: how should this input be
            resolved, filtered, reduced, persisted, or observed? A Controller
            answers an execution question: is this attempt allowed to continue
            right now, and what should happen if the surrounding conditions do
            not permit it?
          </p>
          <p>
            Mixing those questions creates state logic that is difficult to
            reason about. A reducer that also tracks retry counts has to know
            about failure history. A callback that also implements throttling
            has to decide which attempts count. A tab synchronization handler
            that also commits state has to coordinate two responsibilities at
            once. Each addition makes the data path less explicit.
          </p>
          <p>
            The Policy Layer gives those decisions a dedicated boundary. It is
            always present in the <sdux-brand-name /> pipeline, but its optional
            controllers participate only when you explicitly register them.
            Controllers operate on execution lifecycle signals. They do not
            derive candidate values, mutate state, or emit snapshots.
          </p>
          <p>
            This also makes omission meaningful. A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that needs no extra timing, failure, approval, or coordination rule
            can use the core pipeline without a controller. A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            that does need one declares that authority beside its other pipeline
            configuration.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How an Attempt Moves Through Policy</div>
        <div class="section-body">
          <p>
            The Policy stage sits at the execution boundary before pipeline
            computation begins. When a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            receives an update attempt, the Conductor presents its execution
            context to the Decision Engine. The Decision Engine coordinates the
            registered Controllers and resolves their responses into one
            authoritative outcome.
          </p>
          <p>
            The Conductor then enforces that outcome. An allowed attempt can
            continue into the pipeline.
          </p>

          <ul>
            <li>
              A <strong>paused</strong> attempt waits for the policy that owns
              the pause to release it.
            </li>
            <li>
              A <strong>denied</strong> or <strong>aborted</strong> attempt does
              not proceed into state computation.
            </li>
            <li>
              <strong>Failure</strong> notifications and
              <strong>successful</strong> completion are also sent back through
              the same coordination boundary so controllers can enforce policies
              that depend on the lifecycle of an execution trace.
            </li>
          </ul>
          <p>
            The important design point is ownership. Controllers do not invoke
            Behaviors directly, and Behaviors do not coordinate with one
            another. The Policy Layer decides whether execution may proceed; the
            pipeline stages decide what value should be produced once it does.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Warning:</strong> Registering a controller is not the same
              as configuring every policy it supports. Controllers that accept
              options must be registered structurally and configured through
              their documented
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              API. Controllers with no options still need to be registered
              before execution begins.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Explicit Registration Makes Policy Visible
        </div>
        <div class="section-body">
          <p>
            Controller participation is an explicit part of the
            <sdux-feature-cell /> definition. The registration shape accepts a
            descriptor, an array of Behaviors, and an
            <strong>array of Controllers</strong>. The arrays make the execution
            contract visible at the ownership boundary instead of hiding policy
            inside a service or callback.
          </p>

          <sdux-example-viewer-source [displayTabs]="false">
            <sdux-example-viewer-tab [label]="'Register a Throttle Controller'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';
import &#123; withThrottleController &#125; from '&#64;sdux-vault/addons';

interface Employee &#123;
  id: string;
&#125;

export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [ 
    // Optional Behavior Registration
  ],
  [
    // Optional Controllers Registration
    withThrottleController
  ]
);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The controller array is intentionally separate from the Behavior
            array. This example opts the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            into throttle-based execution control without asking the Behavior
            layer to know anything about timing. The controller's interval is
            then supplied through the documented
            <span class="code">withThrottle</span>
            fluent configuration during initialization.
          </p>

          <div class="callout callout-info">
            The same structural rule applies to every controller in this post:
            add the required controller explicitly, include any required
            companion Behavior, and configure the controller only through its
            own documentation.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Delay and Throttle Are Different Timing Policies
        </div>
        <div class="section-body">
          <p>
            The
            <a href="/docs/pipeline/controllers/with-delay-controller"
              >Delay Controller</a
            >
            is for preserving attempts while pausing execution for a fixed
            interval. Use it when every update must eventually continue, such as
            staging a transition, coordinating UI timing, simulating network
            latency, or aligning execution with an external temporal constraint.
            It does not collapse, replace, or suppress attempts.
          </p>
          <p>
            The
            <a href="/docs/pipeline/controllers/with-throttle-controller"
              >Throttle Controller</a
            >
            is for limiting execution frequency. The first eligible attempt
            opens a fixed window; attempts arriving during that window are not
            delayed for later execution. Use it for high-frequency inputs such
            as telemetry, resize-driven updates, or repeated user actions when
            only one execution per interval should be admitted.
          </p>
          <table aria-label="Delay and throttle policy comparison">
            <thead>
              <tr>
                <th scope="col" class="column-100">Controller</th>
                <th scope="col" class="column-250">Policy question</th>
                <th scope="col" class="column-auto">Use it when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delay</td>
                <td>When may this attempt continue?</td>
                <td>
                  Every attempt should be preserved and released after a fixed
                  pause.
                </td>
              </tr>
              <tr>
                <td>Throttle</td>
                <td>How often may execution begin?</td>
                <td>
                  Attempts inside an active interval should not enter execution.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Choosing between them is not a performance tweak. It is a contract
            about which update attempts your feature is willing to preserve.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Failure Limits and Global Error Recovery
        </div>
        <div class="section-body">
          <p>
            The
            <a href="/docs/pipeline/controllers/with-max-failures-controller"
              >Max Failures Controller</a
            >
            enforces a trace-scoped failure ceiling. It is useful for an
            externally dependent operation where conditions may change, such as
            a temporary network dependency or an unstable integration. It limits
            how long one execution trace may continue failing; it does not
            initiate retries or change the candidate value.
          </p>
          <p>
            Pair it deliberately with a recovery policy when the application has
            a meaningful way to clear the underlying condition. The
            <a
              href="/docs/pipeline/controllers/with-replay-global-error-controller"
              >Replay Global Error Controller</a
            >
            is intended for system-level or consistency-critical failures that
            should pause coordinated execution across FeatureCells until an
            explicit recovery action clears the global error.
          </p>
          <p>
            That distinction prevents a local validation failure from becoming
            an application-wide pause. Use local error handling for a failure
            that affects one
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            Reserve global replay for conditions such as backend outages,
            authentication invalidation, corrupted environment state, or
            invariant violations where continued state mutation could leave the
            application incoherent.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Policy pairing:</strong> Max Failures bounds failure
              tolerance. Replay Global Error coordinates deliberate recovery.
              Neither controller is a substitute for an external action that
              changes the condition causing the failure.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Stepwise Approval for External Decisions
        </div>
        <div class="section-body">
          <p>
            The
            <a href="/docs/pipeline/controllers/with-stepwise-controller"
              >Stepwise Controller</a
            >
            is for execution that must pause and await an explicit decision. It
            is required whenever a Stepwise Filter, Stepwise Reducer, or
            Stepwise Resolve Behavior is configured.
          </p>
          <p>
            Use Stepwise Filter for pre-admission policy such as feature flags,
            access checks, environment enablement, or soft validation. Use
            Stepwise Reducer when a derived candidate needs business-rule or
            multi-entity validation before it becomes authoritative. Use
            Stepwise Resolve when the complete resolved value needs moderation,
            compliance review, human approval, or transactional confirmation.
          </p>
          <p>
            The controller owns the pause and the routing of the decision. The
            external authority owns the answer. That separation lets a review
            service, policy engine, or user-driven workflow decide whether the
            candidate proceeds without putting that coordination inside a
            reducer.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Tab Sync Is Browser Coordination, Not Server Replication
        </div>
        <div class="section-body">
          <p>
            The
            <a href="/docs/pipeline/controllers/with-tab-sync-controller"
              >Tab Sync Controller</a
            >
            coordinates the initial state relationship between FeatureCells in
            multiple tabs on the same origin. It is a good fit for multi-tab
            dashboards, form continuity, session-wide preferences, and browser
            workflows where a user expects an action in one tab to be reflected
            in another.
          </p>
          <p>
            Its scope is intentionally limited. Tab Sync uses browser
            coordination through localStorage and BroadcastChannel; it is not a
            replacement for server-side synchronization across browsers,
            devices, or origins. If the browser APIs are unavailable, the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            continues as a single-tab state container.
          </p>
          <p>
            This is another example of why policy deserves its own layer. The
            controller coordinates when a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            may proceed with its initial pipeline interaction, while the
            companion synchronization Behavior handles the browser-facing state
            exchange.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          When No Controller Is the Correct Choice
        </div>
        <div class="section-body">
          <p>
            Controllers are <em>optional</em> because policy is not
            automatically a requirement. If your
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            only needs ordinary state computation and commitment, adding a
            controller creates no value. Keep the pipeline focused on Behaviors
            that perform the work it actually needs.
          </p>
          <p>Add a controller when you can state the execution rule clearly:</p>
          <ul>
            <li>Every attempt must pause for a fixed interval</li>
            <li>Only one attempt may begin per window</li>
            <li>A trace must stop after a failure ceiling</li>
            <li>A global error must block coordinated execution</li>
            <li>Authority must approve a candidate</li>
            <li>Peer tabs must coordinate their initial state</li>
          </ul>
          <div class="callout callout-info">
            <div class="title">Practical Test</div>
            <p>
              If the rule controls
              <strong>whether, when, or how</strong> execution proceeds, it
              belongs in policy.
            </p>
            <p>
              If the rule computes, transforms, or observes a value, it belongs
              in the appropriate Behavior or state-facing API.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Start with the
            <a href="/docs/pipeline/controllers/policy">Policy Layer</a>
            overview, then read
            <a href="/docs/pipeline/controllers/what-is-a-controller"
              >What is a Controller?</a
            >
            for the registration contract. From there, choose the dedicated
            documentation for the policy you need:
            <a href="/docs/pipeline/controllers/with-delay-controller">Delay</a
            >,
            <a href="/docs/pipeline/controllers/with-throttle-controller"
              >Throttle</a
            >,
            <a href="/docs/pipeline/controllers/with-max-failures-controller"
              >Max Failures</a
            >,
            <a
              href="/docs/pipeline/controllers/with-replay-global-error-controller"
              >Replay Global Error</a
            >,
            <a href="/docs/pipeline/controllers/with-stepwise-controller"
              >Stepwise</a
            >, or
            <a href="/docs/pipeline/controllers/with-tab-sync-controller"
              >Tab Sync</a
            >.
          </p>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video
            videoId="6W5YYH6SW3E"
            [tooltip]="'Conductor Definition'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogStateUpdatesNeedPolicyNotMoreMiddlewareComponent {}
