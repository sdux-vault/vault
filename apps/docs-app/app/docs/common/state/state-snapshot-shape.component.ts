import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-snapshot-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/shapes/state-snapshot-shape"
        >StateSnapshotShape</a
      >
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
          <td class="column-250">isLoading: boolean</td>
          <td class="column-auto">
            Indicates whether the state is currently in a loading phase.
          </td>
        </tr>
        <tr>
          <td class="column-250">value: T | undefined</td>
          <td class="column-auto">
            The resolved value for this snapshot, or undefined when no value
            exists.
          </td>
        </tr>
        <tr>
          <td class="column-250">
            error:
            <a href="/docs/references/shapes/vault-error-shape"
              >VaultErrorShape</a
            >
            | null
          </td>
          <td class="column-auto">
            Error associated with the state at this moment, or null if no error
            is present.
          </td>
        </tr>
        <tr>
          <td class="column-250">hasValue: boolean</td>
          <td class="column-auto">
            Indicates whether the snapshot contains a non-undefined value.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateSnapshotShapeCommonComponent {}
