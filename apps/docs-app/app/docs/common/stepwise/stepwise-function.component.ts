import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-stepwise-function-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    <div class="table-title">
      <a href="/docs/references/types/stepwise-function">StepwiseFunction</a
      >&lt;T&gt;
    </div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="column-auto">Signature</th>
            <th class="column-300">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong
                ><a href="/docs/references/types/stepwise-function"
                  >StepwiseFunction</a
                >&lt;T&gt;</strong
              >
              <p>inputs:</p>
              <ul>
                <li><code>current: T | undefined</code></li>
                <li><code>candidate: T</code></li>
                <li><code>decisions: StepwiseBehaviorDecisionShape</code></li>
              </ul>
              <p>returns: <code>void</code></p>
            </td>
            <td>
              A policy-only function that observes the current committed state
              (if any) and the newly produced candidate value. The function must
              imperatively emit exactly one control decision using the provided
              decision controller. It does not return a value.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultStepwiseFunctionCommonComponent {}
