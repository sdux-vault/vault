import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-callback-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/types/vault-error-callback"
        >VaultErrorCallback</a
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
            <strong
              ><a href="/docs/references/types/vault-error-callback"
                >VaultErrorCallback</a
              >&lt;T&gt;</strong
            >
            <p>inputs:</p>
            <ul>
              <li>
                error:
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >
              </li>
              <li>
                state:
                <a href="/docs/references/shapes/state-snapshot-shape"
                  >StateSnapshotShape</a
                >&lt;T&gt;
              </li>
            </ul>
            <p>returns: void</p>
          </td>
          <td>
            An observational callback that receives the finalized Vault error
            and the immutable state snapshot at the moment of failure. The
            callback does not transform the error, does not influence pipeline
            execution, and does not return a value.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultErrorCallbackShapeCommonComponent {}
