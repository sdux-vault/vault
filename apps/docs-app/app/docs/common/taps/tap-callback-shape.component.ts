import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-tap-callback-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/types/tap-callback">TapCallback</a>&lt;T&gt;
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
          <td><code>(value: T) =&gt; void</code></td>
          <td>
            A side-effecting callback that receives an immutable pipeline value.
            The function must not return a value or mutate the input.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTapCallbackShapeCommonComponent {}
