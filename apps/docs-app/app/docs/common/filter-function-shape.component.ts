import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-filter-function-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/types/filter-function">FilterFunction</a
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
          <td class="column-250">(current: T) =&gt; T</td>
          <td class="column-auto">
            A pure function that receives the current candidate state value and
            returns a value of the same structural type. Returning
            <em>undefined</em> suppresses the update and prevents snapshot
            emission.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultFilterFunctionShapeCommonComponent {}
