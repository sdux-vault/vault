import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-error-handling-order-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Error Handling Order</div>

      <div class="section-body">
        <p>
          The Error Stage processes failures in a fixed, deterministic sequence:
        </p>

        <ul>
          <li>
            <strong>Core Error Normalization</strong> — converts any thrown or
            rejected value into a canonical
            <a href="/docs/references/shapes/vault-error-shape"
              >VaultErrorShape</a
            >.
          </li>

          <li>
            <strong>Error Transform Behaviors</strong> — optionally replace or
            enrich the normalized error before it is finalized.
          </li>

          <li>
            <strong>Core State Behavior</strong> — commits the transformed
            <a href="/docs/references/shapes/vault-error-shape"
              >VaultErrorShape</a
            >
            to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>’s
            <code>error</code>
            field, producing the authoritative error state snapshot.
          </li>

          <li>
            <strong>.state.error</strong> — exposes the committed error
            synchronously. In Angular, this surface is represented as a
            <em>signal</em>, ensuring immediate, synchronous visibility of the
            finalized error state.
          </li>

          <li>
            <strong>.state$</strong> — emits the committed error snapshot
            through the reactive observable interface for subscription-based
            consumption.
          </li>

          <li>
            <strong>Global Error Service</strong> — publishes the committed
            error through a singleton observable interface for opt-in,
            application-level coordination across FeatureCells.
          </li>

          <li>
            <strong>Error Callback Behaviors</strong> — observe the finalized
            error for logging, diagnostics, or compatibility handling.
          </li>
        </ul>

        <p>
          This ordering guarantees that all errors are normalized before
          transformation, transformed before commitment, committed exactly once,
          synchronously observable via <strong>.state.error</strong>, reactively
          emitted via <strong>.state$</strong>, optionally propagated through
          the Global Error Service, and only then observed by non-authoritative
          callback behaviors.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorHandlingOrderCommonComponent {}
