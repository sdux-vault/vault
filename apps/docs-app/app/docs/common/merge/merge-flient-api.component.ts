import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-merge-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <div class="table-title">Merge Invocation APIs</div>
    <table>
      <thead>
        <tr>
          <th class="column-300">API</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <p><strong>mergeState(incoming, options?)</strong></p>
            <p>input:</p>
            <ul>
              <li>
                incoming:
                <a href="/docs/references/types/state-input-type"
                  >StateInputType</a
                >&lt;T&gt;
              </li>
              <li>
                options?:
                <a href="/docs/references/config/merge-config">MergeConfig</a>
              </li>
            </ul>
            <p>returns:</p>
            <ul>
              <li>Promise&lt;void&gt;</li>
            </ul>
          </td>

          <td>
            <p>
              Initiates a merge-style pipeline execution using the active Merge
              behavior. The supplied
              <em>incoming</em> value is resolved and then combined with the
              current
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              state during the Merge stage.
            </p>

            <p>
              Optional merge configuration is evaluated by the active merge
              behavior and may influence how
              <em>undefined</em> values are handled. This method does not bypass
              resolution, operators, or downstream pipeline stages.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultMergeFluentApiCommonComponent {}
