import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-tap-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isAfterTap()) {
      <div class="table-title">Core After Tap Behavior</div>
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
                    href="/docs/references/behaviors/references-with-core-after-tap-behavior"
                    >withCoreAfterTapBehavior</a
                  ></strong
                >
              </p>
              <p>stage: After Tap</p>
              <p>type: observational / side-effect</p>
            </td>
            <td>
              <p>
                Executes engineer-supplied tap functions against the immutable
                upstream pipeline value immediately after reducer execution.
              </p>

              <ul>
                <li>Allows side effects</li>
                <li>Does not mutate state</li>
                <li>Does not influence pipeline flow</li>
                <li>Does not emit or suppress snapshots</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isBeforeTap()) {
      <div class="table-title">Core Before Tap Behavior</div>
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
                    href="/docs/pipeline/behaviors/tap/with-core-before-tap-behavior"
                    >withCoreBeforeTapBehavior</a
                  >
                </strong>
              </p>
              <p>stage: Before Tap</p>
              <p>type: observational / side-effect</p>
            </td>
            <td>
              <p>
                Executes engineer-supplied tap functions against the immutable
                upstream pipeline value immediately before reducer execution.
              </p>

              <ul>
                <li>Allows side effects</li>
                <li>Does not mutate state</li>
                <li>Does not influence pipeline flow</li>
                <li>Does not emit or suppress snapshots</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultTapBehaviorCommonComponent {
  type = input<string>('all');

  isAfterTap = computed(() => {
    return this.type() === 'all' || this.type() === 'afterTap';
  });

  isBeforeTap = computed(() => {
    return this.type() === 'all' || this.type() === 'beforeTap';
  });
}
