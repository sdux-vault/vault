/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/vault-monitor-contract">VaultMonitorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-monitor-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultMonitorContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for the VaultMonitor singleton exposing the full
        DevTools-visible monitoring API without implementation details.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Methods</div>
      <div class="section-body">
        <table aria-label="Methods">
          <thead>
            <tr>
              <th scope="col" class="column-300">Method</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>activateGlobalInsights</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    definition:
                    <a href="/docs/references/config/insight-config"
                      >InsightConfig</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Activates global insight tracking with the supplied
                configuration.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>conductorAbort</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that the conductor aborted a pipeline operation.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>conductorCrashed</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>error: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that the conductor crashed during execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>conductorLicenseApproved</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>featureCellKey: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that a license validation was approved.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>conductorLicenseAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>featureCellKey: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records a license validation attempt for a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>conductorLicenseDenied</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>featureCellKey: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Records that a license validation was denied.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>conductorRevote</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that the conductor triggered a revote.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>controllerFailure</strong>

                <p>inputs:</p>
                <ul>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>error: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Records a controller failure event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>controllerFinalize</strong>

                <p>inputs:</p>
                <ul>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Records a controller finalize event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>controllerSuccess</strong>

                <p>inputs:</p>
                <ul>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Records a controller success event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endAfterTap</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an after-tap lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endBeforeTap</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a before-tap lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endClearPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a clear-persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endComputeMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a compute-merge lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endConductorAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a conductor attempt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endConductorVote</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>
                    payload:
                    <a href="/docs/references/shapes/controller-decision-shape"
                      >ControllerDecisionShape</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of the conductor vote aggregation phase.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endControllerAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a controller attempt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endControllerVote</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>controllerKey: string</li>
                  <li>traceId: string</li>
                  <li>
                    vote:
                    <a href="/docs/references/types/controller-vote"
                      >ControllerVote</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an individual controller vote during attempt
                evaluation.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endCoreCallbackError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a core callback-error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endCoreEmitState</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a core emit-state lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endCoreError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a core error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endCoreState</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a core state lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endDecrypt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a decrypt lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endDestroy</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a destroy lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endEncrypt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an encrypt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endErrorTransform</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>
                    payload:
                    <a href="/docs/references/shapes/vault-error-shape"
                      >VaultErrorShape</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an error-transform lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endFilter</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a filter lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endGlobalError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a global error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endInitialized</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an initialized lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endInterceptor</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an interceptor lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endLoadPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a load-persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a merge lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endOperator</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of an operator lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a persist lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a persist lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endReducer</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a reducer lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endReplace</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a replace lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endReset</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a reset lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endResolve</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the end of a resolve lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>endSetInitialValue</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a set-initial-value lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>endStepwise</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the end of a stepwise lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>ingressCompleted</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>source: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Records that an ingress source has completed.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>ingressSubscribed</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>source: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that an ingress source has been subscribed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>notifyConductorDeny</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that the conductor denied a pipeline operation.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>pipelineCandidate</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>
                    stage:
                    <a href="/docs/references/types/pipeline-stage"
                      >PipelineStage</a
                    >
                  </li>
                  <li>value: T | undefined</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits a pipeline candidate capturing the in-flight state value
                after a pipeline stage completes. These events are used
                exclusively by the State Diff View in DevTools and are not
                displayed in the standard trace detail timeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>registerCell</strong>

                <p>inputs:</p>
                <ul>
                  <li>cellKey: string</li>
                  <li>
                    insight?:
                    <a href="/docs/references/config/insight-config"
                      >InsightConfig</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Registers a
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                for monitoring.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>restartConductorAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>payload: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records that a conductorattempt was restarted.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>runtimeError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>error: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records a runtime error encountered during pipeline
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startAfterTap</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an after-tap lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startBeforeTap</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a before-tap lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startClearPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a clear-persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startComputeMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a compute-merge lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startConductorAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a conductor attempt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startConductorVote</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of the conductor vote aggregation phase.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startControllerAttempt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a controller attempt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startControllerVote</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>controllerKey: string</li>
                  <li>traceId: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an individual controller vote during
                attempt evaluation.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startCoreCallbackError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a core callback-error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startCoreEmitState</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a core emit-state lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startCoreError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a core error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startCoreState</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a core state lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startDecrypt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a decrypt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startDestroy</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a destroy lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startEncrypt</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an encrypt lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startErrorTransform</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an error-transform lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startFilter</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a filter lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startGlobalError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a global error lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startInitialized</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an initialized lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startInterceptor</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an interceptor lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startLoadPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a load-persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the start of a merge lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>startOperator</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of an operator lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startPersist</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a persist lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startReducer</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a reducer lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startReplace</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a replace lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startReset</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Signals the start of a reset lifecycle event.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>startResolve</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a resolve lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startSetInitialValue</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a set-initial-value lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>startStepwise</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a stepwise lifecycle event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>warn</strong>

                <p>inputs:</p>
                <ul>
                  <li>cell: string</li>
                  <li>behaviorKey: string</li>
                  <li>ctx: Readonly&gt;</li>
                  <li>message: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records a warning message during pipeline execution.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class VaultMonitorContractComponent {}
