import { Component, ViewEncapsulation } from '@angular/core';
import {
  DeprecatedComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-update-mechanism-common',
  standalone: true,
  template: `
    <div class="table-title">State Update Mechanisms</div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="column-200">API</th>
            <th class="column-250">Update Semantics</th>
            <th class="column-250">Execution Model</th>
            <th class="column-250">Typical Scenarios</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>replaceState()</strong></td>
            <td>
              Forwards the resolved incoming value as the replacement candidate
              for downstream pipeline execution.
            </td>

            <td>Single pipeline execution</td>
            <td>
              Resetting state, loading fresh data, authoritative replacement
              updates.
            </td>
          </tr>

          <tr>
            <td><strong>mergeState()*</strong></td>
            <td>
              Produces a merged candidate by combining the resolved incoming
              value with the current committed state using the active Merge
              behavior.
            </td>
            <td>Single pipeline execution</td>
            <td>
              Incremental updates, partial object updates, additive collection
              changes.
            </td>
          </tr>

          <tr>
            <td><strong>fromStream()*</strong></td>
            <td>
              Subscribes to an observable source and forwards each emitted value
              into the pipeline as a discrete state update.
            </td>
            <td>
              Long-lived subscription<br />
              Multiple pipeline executions
            </td>
            <td>
              Event streams, WebSocket feeds, diagnostics, telemetry,
              high-frequency updates.
            </td>
          </tr>
          <tr>
            <td>
              <strong>fromDeferred() †</strong>
              <p>
                <sdux-deprecated />
              </p>
            </td>
            <td>
              Invokes a
              <a href="/docs/references/types/deferred-factory"
                >DeferredFactory</a
              >
              and resolves its promise-backed value into a normalized StateType
              envelope for explicit submission to replaceState() or
              mergeState().
            </td>
            <td>
              Single promise resolution<br />
              No automatic pipeline injection
            </td>
            <td>
              Legacy promise workflows, Redux-style async migration, manual
              state envelope normalization.
            </td>
          </tr>

          <tr>
            <td>
              <strong>fromPromise() †</strong>
              <p>
                <sdux-deprecated />
              </p>
            </td>
            <td>
              Alias of fromDeferred(). Resolves a
              <a href="/docs/references/types/deferred-factory"
                >DeferredFactory</a
              >
              into a normalized StateType envelope for explicit submission to
              replaceState() or mergeState().
            </td>
            <td>
              Single promise resolution<br />
              No automatic pipeline injection
            </td>
            <td>
              Legacy promise-based async flows requiring manual normalization
              before submission.
            </td>
          </tr>

          <tr>
            <td>
              <strong>fromObservable() †</strong>
              <p>
                <sdux-deprecated />
              </p>
            </td>
            <td>
              Subscribes once to an Observable and emits a single normalized
              StateType envelope for explicit submission to replaceState() or
              mergeState().
            </td>
            <td>
              Single observable resolution<br />
              No automatic pipeline injection
            </td>
            <td>
              Redux-style observable migration, external observable
              normalization prior to submission.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>* mergeState()</strong> semantics are determined entirely by the
      active Merge behavior registered on the <sdux-feature-cell />.
    </p>

    <p>
      See <a href="/docs/pipeline/behaviors/merge">Merge Behaviors</a> for
      available merge strategies.
    </p>

    <p>
      <strong>† Bridge APIs.</strong> These methods normalize external async
      sources into StateType envelopes but do not inject values into the
      pipeline automatically. In most cases, supplying the async source directly
      to <strong>replaceState()</strong> or <strong>mergeState()</strong> is
      preferred.
    </p>
  `,
  imports: [DeprecatedComponent, FeatureCellBrandNameComponent],
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateUpdateMechanismCommonComponent {}
