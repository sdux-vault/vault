import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-controller-max-failures-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-02-21 -->
    <section class="section">
      <div class="section-title">
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        Initialization
      </div>

      <div class="section-body">
        <p>
          The <strong>Max Failures Controller</strong> exposes a fluent
          configuration API that allows engineers to register a deterministic
          failure threshold during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization.
        </p>

        <p>
          This fluent API does <em>not</em> execute failure logic directly.
          Instead, it records controller configuration that is later consumed by
          the Max Failures Controller when evaluating failure events within the
          Policy stage.
        </p>

        <div class="table-title">
          Fluent Max Failures Controller Configuration
        </div>
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
                <p><strong>.withMaxFailures(options)</strong></p>

                <p>input:</p>
                <ul>
                  <li>
                    options:
                    <a
                      href="/docs/references/contracts/with-max-failure-controller-options">
                      WithMaxFailureControllerOptions
                    </a>
                  </li>
                </ul>

                <p>
                  returns:
                  <a href="/docs/references/shapes/feature-cell-base-shape">
                    FeatureCellBaseShape
                  </a>
                  (chainable)
                </p>
              </td>

              <td>
                <p>
                  Registers the maximum number of failures permitted for each
                  execution trace. The supplied options define a positive
                  integer threshold that the Max Failures Controller evaluates
                  whenever a failure event is reported.
                </p>

                <p>
                  Once the configured limit is reached, the controller issues an
                  abort decision and permanently terminates that trace within
                  the pipeline.
                </p>

                <p>
                  This method must be called before <code>initialize()</code>.
                  Multiple calls overwrite prior configuration.
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Because failure enforcement is implemented as a controller, it
          operates independently of value derivation and does not participate in
          resolve, reducer, filter, or timing stages. Its sole responsibility is
          to enforce a strict failure ceiling for each execution trace.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultControllerMaxFailuresFluentApiCommonComponent {}
