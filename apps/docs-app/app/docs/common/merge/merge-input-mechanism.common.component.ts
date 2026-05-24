import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureCellBrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-merge-input-mechanism-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <p>
      The table below compares available merge behaviors and their structural
      intent.
    </p>

    <div class="table-title">Merge Behavior Comparison</div>

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th class="column-250">Merge Behavior</th>
            <th class="column-250">Structural Strategy</th>
            <th class="column-250">Best For</th>
            <th class="column-250">Avoid When</th>
          </tr>
        </thead>

        <tbody>
          <!-- Array Replace (Default) -->
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/merge/with-array-merge-behavior"
                  >withArrayMergeBehavior</a
                ></strong
              ><br />
              <span class="table-header-secondary">default</span>
            </td>
            <td>Replace entire array</td>
            <td>
              Authoritative list refreshes, server snapshots, pagination resets.
            </td>
            <td>Incremental append-style updates are required.</td>
          </tr>

          <!-- Array Append -->
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/addons/merge/with-array-append-merge-behavior"
                  >withArrayAppendMergeBehavior</a
                ></strong
              >
            </td>
            <td>Concatenate incoming array</td>
            <td>Feed-style updates, batched inserts, log aggregation.</td>
            <td>Single-item atomic pushes are required.</td>
          </tr>

          <!-- Array Push -->
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/addons/merge/with-array-push-merge-behavior"
                  >withArrayPushMergeBehavior</a
                ></strong
              >
            </td>
            <td>Push single atomic element</td>
            <td>Event logs, single-entry additions, command-style inserts.</td>
            <td>Replacing or concatenating entire arrays.</td>
          </tr>

          <!-- Object Shallow -->
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/merge/with-object-shallow-merge-behavior"
                  >withObjectShallowMergeBehavior</a
                ></strong
              >
            </td>
            <td>One-level property merge</td>
            <td>
              Flat configuration objects, patch-style updates with shallow
              structure.
            </td>
            <td>Nested object graphs require recursive merging.</td>
          </tr>

          <!-- Object Deep -->
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior"
                  >withObjectDeepMergeBehavior</a
                ></strong
              >
            </td>
            <td>Recursive plain-object merge</td>
            <td>Hierarchical state, deeply nested patch-style updates.</td>
            <td>
              Arrays require element-level reconciliation (which merge behaviors
              do not perform).
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>Selection Guidance</h4>

    <ul>
      <li>
        Use <strong>array replacement</strong> when arrays represent
        authoritative snapshots.
      </li>
      <li>Use <strong>append</strong> when arrays grow in batches.</li>
      <li>Use <strong>push</strong> when adding single atomic entries.</li>
      <li>Use <strong>shallow object merge</strong> for flat structures.</li>
      <li>Use <strong>deep object merge</strong> for evolving nested state.</li>
    </ul>

    <p>
      Merge behaviors must remain predictable and mechanical. If merge logic
      begins encoding intent or business rules, that logic belongs in a
      <strong>Reducer</strong>, not in the Merge stage.
    </p>

    <p>
      Exactly one merge behavior may be active per
      <sdux-feature-cell />. If multiple behaviors are provided, initialization
      fails to prevent ambiguous state semantics.
    </p>
  `,
  imports: [FeatureCellBrandNameComponent, RouterModule],
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MergeInputMechanismCommonComponent {}
