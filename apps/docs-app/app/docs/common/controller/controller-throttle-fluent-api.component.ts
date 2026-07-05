import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-controller-throttle-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->
    <section class="section">
      <div class="section-title">
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        Initialization
      </div>

      <div class="section-body">
        <p>
          The <strong>Throttle Controller</strong> exposes a fluent
          configuration API that allows engineers to register a fixed-rate
          execution policy during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization.
        </p>

        <p>
          This fluent API does <em>not</em> execute throttling logic directly.
          Instead, it records controller configuration that is later consumed by
          the Throttle Controller when coordinating pipeline execution.
        </p>

        <div class="table-title">Fluent Throttle Controller Configuration</div>
        <table>
          <thead>
            <tr>
              <th class="column-300">Fluent API</th>
              <th class="column-auto">Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p><strong>.withThrottle(options)</strong></p>

                <p>input:</p>
                <ul>
                  <li>
                    options:
                    <a
                      href="/docs/references/contracts/with-throttle-controller-options"
                      >WithThrottleControllerOptions</a
                    >
                  </li>
                </ul>

                <p>
                  returns:
                  <a href="/docs/references/shapes/feature-cell-base-shape"
                    >FeatureCellBaseShape</a
                  >
                  (chainable)
                </p>
              </td>

              <td>
                <p>
                  Registers throttle configuration for the
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. The supplied options define a fixed execution window that
                  limits how frequently pipeline execution may proceed.
                </p>

                <p>
                  Throttling is enforced by the Policy stage. When an update
                  attempt occurs within an active throttle window, execution is
                  aborted immediately rather than delayed or queued.
                </p>

                <p>
                  This method must be called before <code>initialize()</code>.
                  Multiple calls overwrite prior throttle configuration.
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Because throttling is implemented as a controller, it operates
          independently of value derivation and does not participate in reducer,
          filter, or resolve stages. Its sole responsibility is to regulate
          <em>how often</em>
          pipeline execution is permitted.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultControllerThrottleFluentApiCommonComponent {}
