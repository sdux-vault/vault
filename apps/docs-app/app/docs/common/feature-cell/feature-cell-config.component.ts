import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-feature-cell-config-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">
      <a href="/docs/references/config/feature-cell-config"
        >FeatureCellConfig</a
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
          <td class="column-250">key: string</td>
          <td class="column-auto">
            Unique identifier assigned to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            instance. This key is used for diagnostics, devtools visualization,
            and internal pipeline correlation.
          </td>
        </tr>

        <tr>
          <td class="column-250">initialState: T</td>
          <td class="column-auto">
            Initial state value that seeds the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            This value is used as the baseline Snapshot before any pipeline
            resolution or state updates occur.
          </td>
        </tr>

        <tr>
          <td class="column-250">
            insights?:
            <a href="/docs/references/config/insight-config">InsightConfig</a>
          </td>
          <td class="column-auto">
            Optional insight configuration that enables devtools integration,
            diagnostics, and additional pipeline observation hooks. When
            omitted, the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            runs without insight instrumentation.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureCellConfigCommonComponent {}
