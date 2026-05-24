import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-object-merge-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isDeep()) {
      <div class="table-title">Deep Object Merge</div>
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
                <a href="/docs/pipeline/addons/with-object-deep-merge-behavior"
                  >withObjectDeepMergeBehavior</a
                >
              </p>
              <p>stage: Merge</p>
              <p>strategy: deep object merge</p>
              <p>package: <sdux-package-name />/addons</p>
            </td>
            <td>
              <p>
                Recursively merges nested plain objects to produce a deeply
                combined result. Only plain object values participate in
                recursive merging.
              </p>

              <p>
                Arrays, primitives, <code>null</code>, and non-plain objects are
                replaced directly. Optional configuration supports intentional
                clearing of <em>undefined</em> values and removal of
                <code>null</code> fields after merging.
              </p>

              <p>
                This behavior is suitable for hierarchical or patch-style state
                updates where nested structures evolve incrementally over time.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isShallow()) {
      <div class="table-title">Shallow Object Merge</div>
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
                <a
                  href="/docs/pipeline/addons/with-object-shallow-merge-behavior"
                  >withObjectShallowMergeBehavior</a
                >
              </p>
              <p>stage: Merge</p>
              <p>strategy: shallow object merge</p>
              <p>package: <sdux-package-name />/core</p>
            </td>
            <td>
              <p>
                Performs a one-level merge between two plain objects. The
                incoming object is spread over the existing object, replacing
                properties at the first level only.
              </p>

              <p>
                Arrays, <code>null</code>, primitives, and non-object values
                bypass merging and are returned directly. Optional clearing
                semantics allow an <em>undefined</em> incoming value to
                intentionally clear state.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultObjectMergeCommonComponent {
  type = input<string>('all');

  isDeep = computed(() => {
    return this.type() === 'all' || this.type() === 'deep';
  });

  isShallow = computed(() => {
    return this.type() === 'all' || this.type() === 'shallow';
  });
}
