import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-emission-order-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">State Emission Order</div>

      <div class="section-body">
        <p>
          The State Stage emits state updates in a fixed, deterministic
          sequence:
        </p>

        <ul>
          <li>
            <strong>Core State Behavior</strong> — commits the finalized state
            snapshot to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            producing the authoritative state value, loading flags, and error
            fields.
          </li>

          <li>
            <strong>.state</strong> — exposes the committed snapshot
            synchronously. In Angular, this surface is represented as a
            <em>signal</em>, ensuring immediate, synchronous visibility of the
            committed state.
          </li>

          <li>
            <strong>.state$</strong> — emits the committed snapshot through the
            reactive observable interface for subscription-based consumption.
          </li>

          <li>
            <strong>Emit-State Callbacks</strong> — invoke optional,
            observational emit-state callbacks for legacy, diagnostic, or
            compatibility handling.
          </li>
        </ul>

        <p>
          This ordering guarantees that state is committed exactly once,
          synchronously exposed through
          <strong>.state</strong> (or Angular signals), then emitted reactively
          via <strong>.state$</strong>, and only afterward observed by optional
          emit-state callbacks. Emit-state callbacks never influence state
          commitment or pipeline execution.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateEmissionOrderCommonComponent {}
