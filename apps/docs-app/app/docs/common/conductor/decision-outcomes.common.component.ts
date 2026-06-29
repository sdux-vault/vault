import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-decision-outcomes-common',
  standalone: true,
  template: `
    <section class="section" id="outcomes">
      <div class="section-title">Decision Outcomes</div>

      <div class="section-body">
        <p>
          The Decision Engine produces one of three possible outcomes for each
          attempt:
        </p>

        <table aria-label="Decision Outcomes">
          <thead>
            <tr>
              <th scope="col" class="column-125">Outcome</th>
              <th scope="col" class="column-auto">Conductor Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Abstain</td>
              <td>
                No controller objected. The attempt proceeds to the Orchestrator
                for Pipeline execution.
              </td>
            </tr>
            <tr>
              <td>Abort</td>
              <td>
                The attempt is permanently rejected. It is removed from the
                queue and no Pipeline execution occurs. The state snapshot
                reflects the abort.
              </td>
            </tr>
            <tr>
              <td>Deny</td>
              <td>
                The attempt is blocked but remains at the head of the queue. It
                may be re-evaluated when conditions change (e.g., after a
                controller revote signal).
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          After a successful Pipeline execution, the Conductor receives a
          completion signal that finalizes the attempt and advances the queue.
          After a Pipeline failure, the error is dispatched through the error
          handling path and the attempt is finalized.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DecisionOutcomesCommonComponent {}
