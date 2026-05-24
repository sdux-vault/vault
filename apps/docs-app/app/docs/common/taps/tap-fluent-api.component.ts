import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-tap-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isAfterTap()) {
      <div class="table-title">Fluent AfterTap Configuration</div>
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
              <p><strong>.afterTaps(afterTaps)</strong></p>
              <p>input:</p>
              <ul>
                <li>
                  afterTaps:
                  <a href="/docs/references/types/tap-callback">TapCallback</a
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
                Registers after-tap callback functions for a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >. The supplied callbacks are invoked after the reducer stage
                completes and a state snapshot has been finalized.
              </p>

              <p>
                After-taps are executed in the <em>Processing Layer</em> in the
                exact order they are registered. This method must be called
                before <code>initialize()</code>. Multiple calls overwrite prior
                after-tap configuration.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isBeforeTap()) {
      <div class="table-title">Fluent BeforeTap Configuration</div>
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
              <p><strong>.beforeTaps(beforeTaps)</strong></p>
              <p>input:</p>
              <ul>
                <li>
                  beforeTaps:
                  <a href="/docs/references/types/tap-callback">TapCallback</a
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
                Registers before-tap callback functions for a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >. The supplied callbacks are invoked before the reducer stage
                completes and a state snapshot has been finalized.
              </p>

              <p>
                Before-taps are executed in the <em>Processing Layer</em> in the
                exact order they are registered. This method must be called
                before <code>initialize()</code>. Multiple calls overwrite prior
                before-tap configuration.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTapFluentApiCommonComponent {
  type = input<string>('all');

  isAfterTap = computed(() => {
    return this.type() === 'all' || this.type() === 'afterTap';
  });

  isBeforeTap = computed(() => {
    return this.type() === 'all' || this.type() === 'beforeTap';
  });
}
