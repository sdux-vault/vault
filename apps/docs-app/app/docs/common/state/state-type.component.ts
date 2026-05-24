import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-type-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/types/state-type">StateType</a>
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
          <td class="column-250">loading?: boolean</td>
          <td class="column-auto">
            Indicates whether the feature is currently in a loading phase.
          </td>
        </tr>
        <tr>
          <td class="column-250">value?: T | undefined | null</td>
          <td class="column-auto">
            The state value to apply as part of the update. This may be a raw
            feature value or a resolved upstream value; undefined preserves the
            current state, while null clears it.
          </td>
        </tr>
        <tr>
          <td class="column-250">error?: unknown</td>
          <td class="column-auto">
            Optional error information associated with the state update.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateTypeCommonComponent {}
