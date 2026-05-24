import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-stepwise-fluent-api-common',
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
          Stepwise behaviors expose fluent configuration APIs that allow
          engineers to enable stepwise execution for specific pipeline stages
          during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization.
        </p>

        <p>
          These APIs do not execute pipeline logic directly. They record
          stepwise configuration options that are later consumed by the
          corresponding Stepwise stage during pipeline execution.
        </p>

        <div class="table-title">Fluent Stepwise Configuration</div>
        <table>
          <thead>
            <tr>
              <th class="column-300">Fluent API</th>
              <th class="column-auto">Description</th>
            </tr>
          </thead>

          <tbody>
            @if (isFilter()) {
              <tr>
                <td>
                  <p><strong>.withStepwiseFilter(options)</strong></p>
                  <p>input:</p>
                  <ul>
                    <li>
                      options:
                      <a
                        href="/docs/references/options/stepwise-behavior-options"
                        >StepwiseBehaviorOptions</a
                      >&lt;T&gt;
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
                    Enables stepwise execution for the Filter stage. Filter
                    evaluation proceeds in controlled, incremental steps as
                    defined by the supplied options.
                  </p>

                  <p>
                    Configuration must be provided before
                    <code>initialize()</code>. Multiple calls overwrite prior
                    filter stepwise configuration.
                  </p>
                </td>
              </tr>
            }

            @if (isReducer()) {
              <tr>
                <td>
                  <p><strong>.withStepwiseReducer(options)</strong></p>
                  <p>input:</p>
                  <ul>
                    <li>
                      options:
                      <a
                        href="/docs/references/options/stepwise-behavior-options"
                        >StepwiseBehaviorOptions</a
                      >&lt;T&gt;
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
                    Enables stepwise execution for the Reducer stage. State
                    reduction is performed incrementally according to the
                    configured stepwise policy.
                  </p>

                  <p>
                    Configuration must be provided before
                    <code>initialize()</code>. Multiple calls overwrite prior
                    reducer stepwise configuration.
                  </p>
                </td>
              </tr>
            }

            @if (isResolve()) {
              <tr>
                <td>
                  <p><strong>.withStepwiseResolve(options)</strong></p>
                  <p>input:</p>
                  <ul>
                    <li>
                      options:
                      <a
                        href="/docs/references/options/stepwise-behavior-options"
                        >StepwiseBehaviorOptions</a
                      >&lt;T&gt;
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
                    Enables stepwise execution for the Resolve stage. Resolution
                    is segmented into discrete, addressable steps according to
                    the supplied options.
                  </p>

                  <p>
                    Configuration must be provided before
                    <code>initialize()</code>. Multiple calls overwrite prior
                    resolve stepwise configuration.
                  </p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultStepwiseFluentApiCommonComponent {
  type = input<string>('all');
  isFilter = computed(() => {
    return this.type() === 'all' || this.type() === 'filter';
  });

  isReducer = computed(() => {
    return this.type() === 'all' || this.type() === 'reducer';
  });

  isResolve = computed(() => {
    return this.type() === 'all' || this.type() === 'resolve';
  });
}
