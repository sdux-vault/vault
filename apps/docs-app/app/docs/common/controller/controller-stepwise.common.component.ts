import { Component, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-stepwise-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->

    <div class="table-title">Stepwise Controller</div>
    <table>
      <thead>
        <tr>
          <th class="column-250">Controller</th>
          <th class="column-auto">Description</th>
          <th class="column-150">Package</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <p>
              <strong>
                <a href="/docs/pipeline/controllers/with-stepwise-controller">
                  withStepwiseController
                </a>
              </strong>
            </p>
            <p>stage: Controller</p>
            <p>type: external policy coordination</p>
          </td>

          <td>
            <p>
              Coordinates Stepwise policy evaluation by mediating decision
              requests and responses between Stepwise behaviors and external
              decision sources. The controller suspends pipeline execution while
              awaiting a decision and resumes execution only after a valid
              response is received.
            </p>

            <ul>
              <li>Does not observe or modify state values</li>
              <li>Does not derive or emit candidate values</li>
              <li>Serializes Stepwise decision requests using a FIFO queue</li>
              <li>
                Pauses pipeline execution until an explicit decision is provided
              </li>
              <li>
                Translates external responses into authoritative pipeline
                control signals
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
export class VaultControllerStepwiseCommonComponent {}
