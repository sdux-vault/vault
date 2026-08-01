import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-throttle-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->

    <div class="table-title">Throttle Controller</div>
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
            <strong>withThrottle</strong>
            <p>
              input:
              <a
                href="/docs/references/options/with-throttle-controller-options"
                >WithThrottleControllerOptions</a
              >
            </p>
            <p>type: controller</p>
            <p>stage: Policy</p>
            <p>implementation:</p>
            <ul>
              <li>Structural controller (definition-time)</li>
              <li>Execution frequency gating</li>
              <li>Abort within throttle window</li>
            </ul>
          </td>

          <td>
            Enforces a fixed execution window that limits how frequently
            pipeline execution may proceed. When an update attempt enters the
            pipeline, the Throttle Controller either allows execution
            immediately or aborts the attempt if it occurs within the active
            throttle window. Suppressed updates are not delayed, queued, or
            resumed.
          </td>

          <td><sdux-package-name [package]="'addons'" /></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultControllerThrottleCommonComponent {}
