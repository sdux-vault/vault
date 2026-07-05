import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-consumption-mechanism-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Selecting a State Consumption Mechanism</div>

      <div class="section-body">
        <p>
          <sdux-brand-name /> exposes finalized state snapshots through three
          distinct consumption surfaces: <strong>.state</strong>,
          <strong>.state$</strong>, and <strong>emitStates()</strong>. Each
          surface serves a different purpose and is designed for a specific
          interaction model.
        </p>

        <p>
          Once state has been committed by the State stage, it becomes available
          through the
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          consumption surfaces described below. State consumption is strictly
          post-commit and does not influence pipeline execution.
        </p>

        <p>
          The table below provides a quick comparison to help determine which
          surface is appropriate for a given use case. These mechanisms are
          complementary and may be used together, but they differ in timing,
          reactivity, and intended responsibility.
        </p>

        <div class="table-title">State Consumption Comparison</div>
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
                  <strong>.state</strong>
                </td>
                <td>
                  Synchronous access to the most recently committed state
                  snapshot. In Angular, this surface is reactive via signals.
                </td>
                <td>
                  Pull-based<br />
                  (synchronous read)<br />
                  <span class="table-header-secondary">
                    Angular: reactive signal
                  </span>
                </td>
                <td>
                  Rendering logic, template binding, synchronous reads, reactive
                  signal consumption.
                </td>
                <td>Immediately after state commitment.</td>
              </tr>

              <tr>
                <td>
                  <strong>.state$</strong>
                </td>
                <td>
                  Reactive subscription to state snapshot emissions over time.
                </td>
                <td>
                  Push-based<br />
                  (observable stream)
                </td>
                <td>
                  Reactive pipelines, derived streams, side-effect coordination,
                  async composition.
                </td>
                <td>
                  After state commitment, emitted asynchronously to subscribers.
                </td>
              </tr>

              <tr>
                <td>
                  <strong>emitStates()</strong>
                </td>
                <td>
                  Observational callbacks invoked after state has been finalized
                  and exposed.
                </td>
                <td>
                  Callback-based<br />
                  (sequential invocation)
                </td>
                <td>
                  Logging, diagnostics, integration hooks, legacy or
                  callback-oriented systems.
                </td>
                <td>
                  After state commitment and after <strong>.state</strong> and
                  <strong>.state$</strong> exposure.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Selection Guidance</h4>
        <ul>
          <li>
            Use <strong>.state</strong> when synchronous access to the current
            state is required.
          </li>
          <li>
            Use <strong>.state$</strong> when state changes must be observed
            reactively over time.
          </li>
          <li>
            Use <strong>emitStates()</strong> only for observational side
            effects that must occur after state finalization.
          </li>
        </ul>

        <p>
          Emit-state callbacks are not a replacement for reactive or synchronous
          state consumption. They exist solely as a post-commit observation
          surface and must not be used to derive state, influence execution, or
          coordinate control flow.
        </p>
      </div>
    </section>
  `,
  imports: [BrandNameComponent],
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateConsumptionMechanismCommonComponent {}
