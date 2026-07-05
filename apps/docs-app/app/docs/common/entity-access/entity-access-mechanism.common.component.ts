import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-entity-access-behavior-selection-common',
  standalone: true,
  template: `
    <section class="section">
      <div class="section-title">Selecting an Entity Access Behavior</div>

      <div class="section-body">
        <p>
          <sdux-brand-name /> provides multiple entity access behaviors that
          expose identifier-based entity retrieval while preserving the
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          pipeline as the authoritative source of truth.
        </p>

        <p>
          Each behavior provides a different resolution model depending on
          whether entities already exist in finalized state, must be resolved on
          demand, or should be cached for reuse. The table below compares these
          behaviors to help determine which access model best fits a given use
          case.
        </p>

        <div class="table-title">Entity Access Behavior Comparison</div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="column-200">Behavior</th>
                <th class="column-200">Resolution Model</th>
                <th class="column-200">Pipeline Execution</th>
                <th class="column-250">Data Source</th>
                <th class="column-auto">Typical Use Cases</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><strong>Query Behavior</strong></td>
                <td>Immediate (synchronous)</td>
                <td>Never</td>
                <td>
                  Finalized
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  state
                </td>
                <td>Fast entity access when state is already populated.</td>
              </tr>

              <tr>
                <td><strong>Lookup Behavior</strong></td>
                <td>On-demand resolution</td>
                <td>Yes (on miss)</td>
                <td>Finalized state or pipeline fetch</td>
                <td>Lazy loading entities by identifier.</td>
              </tr>

              <tr>
                <td><strong>State Cache Behavior</strong></td>
                <td>TTL-based caching</td>
                <td>Yes (on miss or expiration)</td>
                <td>Cached entities derived from finalized state</td>
                <td>High-performance entity access with refresh control.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Selection Guidance</h4>

        <ul>
          <li>
            Use <strong>Query Behavior</strong> when entities already exist in
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            state and fast synchronous access is required.
          </li>

          <li>
            Use <strong>Lookup Behavior</strong> when entities may not yet exist
            in state and should be resolved through the pipeline on demand.
          </li>

          <li>
            Use <strong>State Cache Behavior</strong> when entity resolution is
            expensive and cached results should refresh automatically using
            TTL-based expiration.
          </li>
        </ul>

        <p>
          Each behavior integrates with the
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          lifecycle and preserves deterministic state management by ensuring
          that all entity resolution ultimately originates from finalized
          pipeline state.
        </p>
      </div>
    </section>
  `,
  imports: [BrandNameComponent],
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntityAccessBehaviorSelectionCommonComponent {}
