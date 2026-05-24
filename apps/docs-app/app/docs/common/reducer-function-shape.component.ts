import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-reducer-function-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/types/reducer-function">ReducerFunction</a
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
          <td><code>(current: T) =&gt; T</code></td>
          <td>
            A pure function that receives the current immutable state snapshot
            and returns the next state value of the same structural type.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultReducerFunctionShapeCommonComponent {}
