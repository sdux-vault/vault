import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-feature-cell-insights-config-common',
  standalone: true,
  template: `
    <div class="table-title">
      <a href="/docs/references/config/insight-config">InsightConfig</a>
    </div>
    <table>
      <thead>
        <tr>
          <th class="column-275">Property</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            id?: string
            <p>optional</p>
          </td>
          <td>
            Unique identifier for the insight definition, typically used to
            distinguish monitoring consumers.
          </td>
        </tr>

        <tr>
          <td>
            wantsState?: boolean
            <p>optional</p>
          </td>
          <td>
            Indicates whether emitted insight events include the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>’s
            current state value.
          </td>
        </tr>

        <tr>
          <td>
            wantsPayload?: boolean
            <p>optional</p>
          </td>
          <td>
            Indicates whether operation payloads are included in emitted insight
            events.
          </td>
        </tr>

        <tr>
          <td>
            wantsErrors?: boolean
            <p>optional</p>
          </td>
          <td>
            Indicates whether error information is included in insight events.
          </td>
        </tr>

        <tr>
          <td>
            wantsCandidates?: boolean
            <p>optional</p>
          </td>
          <td>
            Indicates whether pipeline candidate snapshots are included in
            insight events. Candidates capture the state value at each pipeline
            stage boundary, enabling before/after diff comparison across stages.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatureCellInsightsConfigCommonComponent {}
