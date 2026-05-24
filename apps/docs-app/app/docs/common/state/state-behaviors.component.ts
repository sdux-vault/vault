import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-state-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isCore()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/state/with-core-state-behavior"
          >withCoreStateBehavior</a
        >
      </div>
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
                    href="/docs/pipeline/behaviors/state/with-core-state-behavior"
                    >withCoreStateBehavior</a
                  ></strong
                >
              </p>
              <p>type: core state</p>
              <p>responsibility:</p>
              <ul>
                <li>Commit finalized pipeline outcomes to state</li>
                <li>Update value, loading, and error fields atomically</li>
                <li>Produce the authoritative state snapshot</li>
              </ul>
            </td>
            <td>
              <p>
                Core state behavior that commits the finalized pipeline result
                into the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >’s state snapshot. This behavior executes for all successful
                completions, pipeline stops, clears, and error finalization.
              </p>

              <p>
                The core state behavior is authoritative. It is responsible for
                producing the single, committed snapshot that backs all state
                observation surfaces, including synchronous access and reactive
                emission.
              </p>

              <p>
                This behavior cannot be omitted and does not perform callbacks,
                logging, or external notification.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isEmit()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior"
          >withCoreEmitStateBehavior</a
        >
      </div>
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
                    href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior"
                    >withCoreEmitStateBehavior</a
                  ></strong
                >
              </p>

              <p>type: core emit-state</p>

              <p>function:</p>
              <ul>
                <li>emitState</li>
              </ul>
            </td>

            <td>
              <p>
                Core emit-state behavior that invokes optional, callback-based
                observers after a state snapshot has been fully committed and
                exposed.
              </p>

              <p>
                Emit-state callbacks are strictly observational. They do not
                influence pipeline execution, do not modify state, and do not
                affect snapshot commitment or ordering.
              </p>

              <p>
                This behavior exists primarily for backward compatibility with
                imperative or callback-oriented codebases. The preferred
                mechanism for observing state changes is the synchronous
                <strong>.state</strong> surface or the reactive
                <strong>.state$</strong> observable.
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
export class VaultStateBehaviorCommonComponent {
  type = input<string>('all');

  isCore = computed(() => {
    return this.type() === 'all' || this.type() === 'core';
  });

  isEmit = computed(() => {
    return this.type() === 'all' || this.type() === 'emit';
  });
}
