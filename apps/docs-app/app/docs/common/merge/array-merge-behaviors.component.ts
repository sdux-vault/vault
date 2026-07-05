import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-array-merge-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isArrayAppend()) {
      <div class="table-title">Array Append Merge</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p>
                <a href="/docs/pipeline/addons/with-array-append-merge-behavior"
                  >withArrayAppendMergeBehavior</a
                >
              </p>
              <p>stage: Merge</p>
              <p>strategy: append</p>
              <p>package: <sdux-package-name />/addons</p>
            </td>
            <td>
              <p>
                Appends the incoming array to the existing array and returns a
                new combined array. This behavior is intended for list growth
                scenarios such as feeds, logs, or batched updates.
              </p>

              <p>
                When either value is not an array, the incoming value replaces
                the current state. Optional clearing semantics are supported for
                intentional state removal.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isDefault()) {
      <div class="table-title">Array Merge (Default)</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <strong
                  ><a
                    href="/docs/pipeline/behaviors/merge/with-array-merge-behavior"
                    >withArrayMergeBehavior</a
                  ></strong
                >
              </p>
              <p>stage: Merge</p>
              <p>strategy: replace</p>
              <p>package: <sdux-package-name />/add-core</p>
              <p>default</p>
            </td>
            <td>
              <p>
                Replaces the current array with the incoming array. Arrays are
                treated as atomic values and are never merged
                element-by-element.
              </p>

              <p>
                When the incoming value is <em>undefined</em> and clearing is
                disabled, the existing state is preserved. When clearing is
                enabled, the state is intentionally cleared. When both values
                are arrays, a shallow clone of the incoming array is returned to
                preserve immutability.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
    @if (isArrayPush()) {
      <div class="table-title">Array Push Merge</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <a href="/docs/pipeline/addons/with-array-push-merge-behavior"
                  >withArrayPushMergeBehavior</a
                >
              </p>
              <p>stage: Merge</p>
              <p>strategy: push</p>
              <p>package: <sdux-package-name />/addons</p>
            </td>
            <td>
              <p>
                Pushes a single incoming value onto the existing array and
                returns a new array containing the additional element. The
                incoming value is treated as a single atomic entry and is never
                spread or flattened.
              </p>

              <p>
                When the current value is an array, the result is a shallow
                clone with the incoming value appended. When the current value
                is not an array, the incoming value replaces the state directly.
              </p>

              <p>
                This behavior supports intentional state clearing when the
                incoming value is
                <em>undefined</em>. All other values are treated as valid
                payloads without interpretation.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultArrayMergeCommonComponent {
  type = input<string>('all');

  isArrayAppend = computed(() => {
    return this.type() === 'all' || this.type() === 'append';
  });

  isArrayPush = computed(() => {
    return this.type() === 'all' || this.type() === 'push';
  });

  isDefault = computed(() => {
    return this.type() === 'all' || this.type() === 'default';
  });
}
