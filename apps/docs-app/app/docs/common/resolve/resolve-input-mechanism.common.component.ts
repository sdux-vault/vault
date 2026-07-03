import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-resolve-input-mechanism-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Selecting a Resolve Input Mechanism</div>

      <div class="section-body">
        <p>
          <sdux-brand-name /> accepts incoming state updates through multiple
          APIs that converge on the <strong>Resolve</strong> stage. Each
          mechanism represents a different input form but is normalized into a
          canonical upstream value before downstream pipeline processing begins.
        </p>

        <p>
          The table below compares the available Resolve input mechanisms to
          clarify when each should be used and how it participates in pipeline
          execution. These mechanisms differ in input shape, resolution timing,
          and interaction model, but all share the same normalization boundary.
        </p>

        <div class="table-title">Resolve Input Comparison</div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="column-175">Input Mechanism</th>
                <th class="column-250">Accepted Input Form</th>
                <th class="column-200">Resolution Model</th>
                <th class="column-250">Typical Use Cases</th>
                <th class="column-200">Resolve Timing</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>replaceState()</strong><br /><strong
                    >mergeState()</strong
                  >
                </td>
                <td>Plain values or structured state envelopes</td>
                <td>
                  Immediate<br />
                  (synchronous normalization)
                </td>
                <td>
                  Direct state updates, local mutations, UI-driven writes.
                </td>
                <td>During pipeline admission.</td>
              </tr>

              <tr>
                <td><strong>fromStream()</strong></td>
                <td>Observable streams</td>
                <td>
                  Reactive<br />
                  (stream-driven resolution)
                </td>
                <td>
                  WebSocket feeds, RxJS pipelines, continuous data sources.
                </td>
                <td>On stream emission.</td>
              </tr>

              <tr>
                <td>
                  <strong>HttpResourceRef</strong><br /><span
                    class="table-header-secondary"
                    >Angular only</span
                  >
                </td>
                <td>Angular HTTP resource reference</td>
                <td>
                  Reactive<br />
                  (resource-backed resolution)
                </td>
                <td>Angular HttpResource-based data fetching.</td>
                <td>When resource emits a resolved value.</td>
              </tr>

              <tr>
                <td><strong>undefined</strong></td>
                <td>Explicit absence of a value</td>
                <td>
                  Semantic<br />
                  (intent-driven)
                </td>
                <td>No-op writes, suppressed updates, intentional omission.</td>
                <td>During resolution.</td>
              </tr>

              <tr>
                <td><strong>null</strong></td>
                <td>Explicit state-clearing signal</td>
                <td>
                  Semantic<br />
                  (intent-driven)
                </td>
                <td>Clearing existing state value.</td>
                <td>During resolution.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Selection Guidance</h4>
        <ul>
          <li>
            Use <strong>replaceState</strong> or <strong>mergeState</strong> for
            immediate, synchronous or asynchronous updates.
          </li>
          <li>
            Use <strong>fromStream</strong> for continuous or event-driven value
            sources.
          </li>
          <li>
            Use <strong>HttpResourceRef</strong> only in Angular environments
            when leveraging resource-based HTTP resolution.
          </li>
        </ul>

        <p>
          All input mechanisms are normalized by the Resolve stage into a
          predictable upstream value. Downstream pipeline stages never observe
          the original input form and do not need to account for timing,
          transport, or source-specific concerns.
        </p>
      </div>
    </section>
  `,
  imports: [BrandNameComponent],
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResolveInputMechanismCommonComponent {}
