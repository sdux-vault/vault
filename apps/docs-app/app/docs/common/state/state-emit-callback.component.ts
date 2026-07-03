import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-emit-callback-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-25 -->
    <div class="table-title">
      <a href="/docs/references/types/core-emit-state-callback"
        >CoreEmitStateCallback</a
      >&lt;T&gt;
    </div>

    <table>
      <thead>
        <tr>
          <th class="column-250">Signature</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <strong>
              <a href="/docs/references/types/core-emit-state-callback"
                >CoreEmitStateCallback</a
              >&lt;T&gt;
            </strong>

            <p>inputs:</p>
            <ul>
              <li>
                snapshot:
                <a href="/docs/references/shapes/state-snapshot-shape"
                  >StateSnapshotShape</a
                >&lt;T&gt;
              </li>
            </ul>

            <p>returns: void</p>
          </td>

          <td>
            An observational callback that receives the finalized, committed
            state snapshot after pipeline execution has completed. The callback
            is invoked only after state has been committed and exposed through
            <strong>.state</strong> and <strong>.state$</strong>.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateEmitCallbackCommonComponent {}
