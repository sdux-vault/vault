import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-controller-delay-fluent-api-common',
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
          The <strong>Delay Controller</strong> exposes a fluent configuration
          API that allows engineers to register a fixed-delay policy during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization.
        </p>

        <p>
          This fluent API does <em>not</em> execute delay logic directly.
          Instead, it records controller configuration that is later consumed by
          the Delay Controller when coordinating pipeline execution.
        </p>

        <div class="table-title">Fluent Delay Controller Configuration</div>
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
                <p><strong>.withDelay(options)</strong></p>

                <p>input:</p>
                <ul>
                  <li>
                    options:
                    <a
                      href="/docs/references/contracts/with-delay-controller-options"
                      >WithDelayControllerOptions</a
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
                  Registers delay configuration for the
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. The supplied options define a fixed delay interval that the
                  Delay Controller applies to each pipeline execution attempt.
                </p>

                <p>
                  The delay is enforced by the Policy stage, which may pause and
                  resume pipeline execution for a given update trace without
                  modifying, suppressing, or coalescing values.
                </p>

                <p>
                  This method must be called before <code>initialize()</code>.
                  Multiple calls overwrite prior delay configuration.
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Because delay is implemented as a controller, it operates
          independently of value derivation and does not participate in reducer,
          filter, or resolve stages. Its sole responsibility is to coordinate
          <em>when</em>
          pipeline execution proceeds.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultControllerDelayFluentApiCommonComponent {}
