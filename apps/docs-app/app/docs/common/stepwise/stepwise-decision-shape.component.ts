import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-stepwise-decision-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    <div class="table-title">
      <a href="/docs/references/shapes/stepwise-behavior-decision-shape"
        >StepwiseBehaviorDecisionShape</a
      >
    </div>
    <table>
      <thead>
        <tr>
          <th class="column-250">Decision</th>
          <th class="column-auto">Pipeline Effect</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>continue()</code>
            <p>type: () =&gt; void</p>
          </td>
          <td>
            Allows pipeline execution to proceed normally. The candidate value
            resumes processing at the appropriate pipeline stage.
          </td>
        </tr>

        <tr>
          <td>
            <code>block()</code>
            <p>type: () =&gt; void</p>
          </td>
          <td>
            Suppresses the current update (<code>VAULT_NOOP</code>). No state
            changes occur, but the pipeline remains active for future updates.
          </td>
        </tr>

        <tr>
          <td>
            <code>clear()</code>
            <p>type: () =&gt; void</p>
          </td>
          <td>
            Clears the current state (<code>VAULT_CLEAR_STATE</code>) and
            terminates processing for the current update. Subsequent updates may
            proceed normally.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultStepwiseDecisionShapeCommonComponent {}
