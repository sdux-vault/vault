import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-interceptor-fluent-api-common',
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
          The Interceptor stage exposes a fluent configuration API that allows
          engineers to register interceptor behaviors during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization.
        </p>

        <p>
          This API does not execute interceptors directly. It records an ordered
          set of interceptor behaviors that are later applied by the Interceptor
          stage during pipeline execution.
        </p>

        <div class="table-title">Fluent Interceptor Configuration</div>
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
                <p><strong>.interceptors(interceptors)</strong></p>
                <p>input:</p>
                <ul>
                  <li>
                    interceptors:
                    <a
                      href="/docs/references/contracts/interceptor-behavior-class-contract"
                      >InterceptorBehaviorClassContract</a
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
                  Registers interceptor behaviors for a
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. The supplied behaviors define how incoming pipeline
                  executions are admitted, delayed, throttled, or otherwise
                  gated before reaching the resolve stage.
                </p>

                <p>
                  Interceptors are executed in the
                  <em>Pre-Processing Layer</em> in the exact order they are
                  registered. This method must be called before
                  <code>initialize()</code>. Multiple calls overwrite prior
                  interceptor configuration.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultInterceptorFluentApiCommonComponent {}
