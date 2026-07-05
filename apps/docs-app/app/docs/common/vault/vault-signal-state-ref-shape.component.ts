import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-signal-state-ref-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-25 -->
    <div class="table-title">
      <a href="/docs/references/interfaces/vault-signal-state-ref"
        >VaultSignalStateRef</a
      >&lt;T&gt;
    </div>
    <table>
      <thead>
        <tr>
          <th class="column-250">Property</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="column-250">isLoading: Signal&lt;boolean&gt;</td>
          <td class="column-auto">
            Reactive signal indicating whether the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            currently processing a pipeline operation.
          </td>
        </tr>
        <tr>
          <td class="column-250">value: Signal&lt;T | undefined&gt;</td>
          <td class="column-auto">
            Reactive signal holding the resolved state value. May emit a valid
            value of type <code>T</code> or <code>undefined</code> when no state
            is present.
          </td>
        </tr>
        <tr>
          <td class="column-250">
            error: Signal&lt;<a href="/docs/references/shapes/vault-error-shape"
              >VaultErrorShape</a
            >
            | null&gt;
          </td>
          <td class="column-auto">
            Reactive signal containing the most recent Vault error, or
            <code>null</code> when no error exists.
          </td>
        </tr>
        <tr>
          <td class="column-250">hasValue: Signal&lt;boolean&gt;</td>
          <td class="column-auto">
            Reactive signal that indicates whether the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            currently holds a non-undefined resolved value.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultSignalStateRefCommonComponent {}
