import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-max-failures-common',
  standalone: true,
  template: `
    <!-- Updated 2026-02-21 -->

    <div class="table-title">Max Failures Controller</div>
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
            <strong>withMaxFailures</strong>
            <p>
              input:
              <a
                href="/docs/references/options/with-max-failure-controller-options">
                WithMaxFailureControllerOptions
              </a>
            </p>
            <p>type: controller</p>
            <p>stage: Controller</p>
            <p>implementation:</p>
            <ul>
              <li>Structural controller (definition-time)</li>
              <li>Failure threshold enforcement</li>
            </ul>
          </td>

          <td>
            Enforces a deterministic failure ceiling for each execution trace.
            The Max Failures Controller tracks failure events per trace and
            issues an abort decision once the configured maximum number of
            failures has been reached. It does not retry, delay, suppress, or
            modify values, and it does not intervene in successful executions.
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
export class VaultControllerMaxFailuresCommonComponent {}
