import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">Vault Error Shape</div>
    <table class="documentation-table">
      <thead>
        <tr>
          <th class="column-250">Property</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="column-250">message: string</td>
          <td class="column-auto">
            Human-readable error message describing the failure.
          </td>
        </tr>
        <tr>
          <td class="column-250">featureCellKey: string</td>
          <td class="column-auto">
            Identifier of the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            associated with the error.
          </td>
        </tr>
        <tr>
          <td class="column-250">timestamp: number</td>
          <td class="column-auto">
            Epoch timestamp (milliseconds) indicating when the error occurred.
          </td>
        </tr>
        <tr>
          <td class="column-250">raw: unknown</td>
          <td class="column-auto">
            Original thrown value captured prior to normalization.
          </td>
        </tr>
        <tr>
          <td class="column-250">status?: number</td>
          <td class="column-auto">
            Optional numeric status code associated with the error.
          </td>
        </tr>
        <tr>
          <td class="column-250">statusText?: string</td>
          <td class="column-auto">
            Optional textual status description associated with the error.
          </td>
        </tr>
        <tr>
          <td class="column-250">details?: unknown</td>
          <td class="column-auto">
            Optional additional diagnostic or domain-specific information.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultErrorShapeCommonComponent {}
