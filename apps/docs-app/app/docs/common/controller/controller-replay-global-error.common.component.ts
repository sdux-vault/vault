import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-replay-global-error-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->

    <div class="table-title">Replay Global Error Controller</div>
    <table>
      <thead>
        <tr>
          <th class="column-250">Controller</th>
          <th class="column-auto">Description</th>
          <th class="column-50">Package</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <p>
              <strong
                ><a
                  href="/docs/pipeline/controllers/with-replay-global-error-controller"
                  >withReplayGlobalErrorController</a
                ></strong
              >
            </p>
            <p>stage: Controller</p>
            <p>type: arbitration / replay coordination</p>
          </td>
          <td>
            <p>
              Participates in pipeline arbitration by evaluating execution
              attempts when a global Vault error is present. While an error is
              active, the controller denies attempts associated with the current
              trace. When the error condition is cleared, the controller may
              request a revote to allow previously denied executions to proceed.
            </p>

            <ul>
              <li>Does not observe or modify state values</li>
              <li>Does not gate pipeline admission</li>
              <li>Issues controller votes during execution attempts</li>
              <li>
                Coordinates retry and replay behavior after error recovery
              </li>
            </ul>
          </td>
          <td><sdux-package-name />/addons</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultControllerReplayGlobalErrorCommonComponent {}
