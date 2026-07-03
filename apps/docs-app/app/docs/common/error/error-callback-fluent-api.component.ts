import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-callback-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        Initialization
      </div>

      <div class="section-body">
        <p>
          The Error stage exposes a fluent configuration API that allows
          engineers to register error callback functions during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization. Registered callbacks are invoked only through the core
          <a
            href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior"
            >withCoreErrorCallbackBehavior</a
          >.
        </p>

        <p>
          This API does not trigger error handling directly. It records an
          ordered set of error callbacks that are later invoked by the Error
          stage when a pipeline execution results in a Vault error.
        </p>

        <div class="table-title">Fluent Error Callback Configuration</div>
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
                <p><strong>.errors(errors)</strong></p>
                <p>input:</p>
                <ul>
                  <li>
                    errors:
                    <a href="/docs/references/types/vault-error-callback"
                      >VaultErrorCallback</a
                    >&lt;T&gt;[]
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
                  Registers error callback functions for a
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. The supplied callbacks are invoked during the Error stage
                  when a Vault error is produced during pipeline execution.
                </p>

                <p>
                  Error callbacks are executed in the
                  <em>Error Handling Layer</em> in the exact order they are
                  registered. This method must be called before
                  <code>initialize()</code>. Multiple calls overwrite prior
                  error callback configuration.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultErrorCallbackFluentApiCommonComponent {}
