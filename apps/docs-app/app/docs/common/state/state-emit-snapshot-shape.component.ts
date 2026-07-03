import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-emit-snapshot-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-25 -->
    <div class="table-title">
      <a href="/docs/references/shapes/state-emit-snapshot-shape"
        >StateEmitSnapshotShape</a
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
          <td class="column-250">
            snapshot:
            <a href="/docs/references/shapes/state-snapshot-shape"
              >StateSnapshotShape</a
            >&lt;T&gt;
          </td>
          <td class="column-auto">
            The committed immutable state snapshot at the moment the emission
            occurred.
          </td>
        </tr>
        <tr>
          <td class="column-250">
            type:
            <a href="/docs/references/types/state-emit-type">StateEmitType</a>
          </td>
          <td class="column-auto">
            Identifies the pipeline stage or lifecycle event that originated the
            state change.
          </td>
        </tr>
        <tr>
          <td class="column-250">options: unknown | undefined</td>
          <td class="column-auto">
            Optional, opaque metadata forwarded from the initiating state update
            (merge, replace, or promise-based variants).
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateEmitSnapshotShapeCommonComponent {}
