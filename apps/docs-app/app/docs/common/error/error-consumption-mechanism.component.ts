import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-error-consumption-mechanism-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Selecting an Error Observation Mechanism</div>

      <div class="section-body">
        <p>
          <sdux-brand-name /> exposes finalized error information through three
          distinct observation surfaces: <strong>.state.error</strong>,
          <strong>.state$</strong>, and <strong>errors()</strong>. Each surface
          serves a different purpose and is designed for a specific interaction
          model.
        </p>

        <p>
          The table below provides a quick comparison to help determine which
          surface is appropriate for a given use case. These mechanisms are
          complementary and may be used together, but they differ in timing,
          reactivity, and intended responsibility.
        </p>

        <div class="table-title">Error Observation Comparison</div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="column-75">Surface</th>
                <th class="column-200">Primary Purpose</th>
                <th class="column-200">Access Model</th>
                <th class="column-250">Typical Use Cases</th>
                <th class="column-200">Execution Timing</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>.state.error</strong>
                </td>
                <td>
                  Synchronous access to the most recently committed error
                  snapshot. In Angular, this surface is reactive via signals.
                </td>
                <td>
                  Pull-based<br />
                  (synchronous read)<br />
                  <span class="table-header-secondary"
                    >Angular: reactive signal</span
                  >
                </td>
                <td>
                  Template rendering, conditional UI states, synchronous guards,
                  immediate error visibility.
                </td>
                <td>Immediately after error state commitment.</td>
              </tr>

              <tr>
                <td>
                  <strong>.state$</strong>
                </td>
                <td>
                  Reactive subscription to error-bearing state emissions over
                  time.
                </td>
                <td>
                  Push-based<br />
                  (observable stream)
                </td>
                <td>
                  Reactive error pipelines, global listeners, async
                  coordination, derived error streams.
                </td>
                <td>
                  After error commitment, emitted asynchronously to subscribers.
                </td>
              </tr>

              <tr>
                <td>
                  <strong>errors()</strong>
                </td>
                <td>
                  Observational callbacks invoked after an error has been fully
                  finalized and committed.
                </td>
                <td>
                  Callback-based<br />
                  (sequential invocation)
                </td>
                <td>
                  Logging, diagnostics, metrics, alerting, legacy or
                  callback-oriented systems.
                </td>
                <td>
                  After error commitment and after
                  <strong>.state.error</strong> and
                  <strong>.state$</strong> exposure.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Selection Guidance</h4>
        <ul>
          <li>
            Use <strong>.state.error</strong> when synchronous access to the
            current error state is required.
          </li>
          <li>
            Use <strong>.state$</strong> when error conditions must be observed
            reactively over time.
          </li>
          <li>
            Use <strong>errors()</strong> only for observational side effects
            that must occur after error finalization.
          </li>
        </ul>

        <p>
          Error callbacks are not a replacement for reactive or synchronous
          error consumption. They exist solely as a post-commit observation
          surface and must not be used to transform errors, influence pipeline
          execution, or coordinate control flow.
        </p>
      </div>
    </section>
  `,
  imports: [BrandNameComponent],
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorConsumptionMechanismCommonComponent {}
