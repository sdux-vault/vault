import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-delay-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->

    <div class="table-title">Delay Controller</div>
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
            <strong>withDelay</strong>
            <p>
              input:
              <a href="/docs/references/options/with-delay-controller-options"
                >WithDelayControllerOptions</a
              >
            </p>
            <p>type: controller</p>
            <p>stage: Controller</p>
            <p>implementation:</p>
            <ul>
              <li>Structural controller (definition-time)</li>
              <li>Execution pause / resume</li>
            </ul>
          </td>

          <td>
            Introduces a fixed, deterministic pause in pipeline execution for
            each state update attempt. The Delay Controller suspends execution
            when an update is encountered and resumes it after the configured
            interval elapses. Each update is delayed independently, without
            suppressing, coalescing, or modifying values.
          </td>

          <td><sdux-package-name />/addons</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultControllerDelayCommonComponent {}
