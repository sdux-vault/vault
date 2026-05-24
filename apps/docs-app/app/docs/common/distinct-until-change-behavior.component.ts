import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-distinct-until-changed-behavior-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <table>
      <thead>
        <tr>
          <th class="column-250">Behavior</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>

      <tbody>
        <!-- withDistinctUntilChangedBehavior ------------------------------------->
        <tr>
          <td>
            <p>
              <a href="/docs/pipeline/addons/with-distinct-until-changed"
                >withDistinctUntilChanged</a
              >
            </p>
            <p>input: compare?</p>
            <p>type: distinct operator</p>
          </td>
          <td>
            <p>
              Suppresses emissions unless the incoming value is different from
              the previously emitted value. Comparison may use:
            </p>
            <ul>
              <li>A user-provided equality function, or</li>
              <li>The default structural JSON comparison</li>
            </ul>
            <p>
              Useful for preventing redundant UI refreshes or expensive
              downstream computations when values do not meaningfully change.
              First emissions always pass through; duplicates produce
              <em><a href="/docs/references/const/vault_noop">VAULT_NOOP</a></em
              >.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultDistinctUntilChangedBehaviorCommonComponent {}
