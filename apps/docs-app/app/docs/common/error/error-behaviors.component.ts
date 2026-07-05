import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isCore()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/error/with-core-error-behavior"
          >withCoreErrorBehavior</a
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
                    href="/docs/pipeline/behaviors/error/with-core-error-behavior"
                    >withCoreErrorBehavior</a
                  ></strong
                >
              </p>
              <p>function: handleError</p>

              <p>inputs:</p>
              <ul>
                <li>error: unknown</li>
                <li>featureCellKey: string</li>
              </ul>
              <p>type: core error</p>

              <p>return:</p>
              <ul>
                <li>
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                </li>
              </ul>
            </td>
            <td>
              <p>
                Core error behavior that executes first in the Error Stage. It
                converts any thrown or rejected value into a canonical
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >. This behavior performs no logging, callbacks, or recovery
                logic. Its sole responsibility is to guarantee a consistent
                error shape for all downstream error handling.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isCallback()) {
      <div class="table-title">
        <a
          href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior"
          >withCoreErrorCallbackBehavior</a
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
                    href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior"
                    >withCoreErrorCallbackBehavior</a
                  ></strong
                >
              </p>
              <p>function: callbackError</p>

              <p>inputs:</p>
              <ul>
                <li>
                  current:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                </li>
                <li>
                  state:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >&lt;T&gt;
                </li>
                <li>
                  oldSchoolCallback?:
                  <a href="/docs/references/types/vault-error-callback"
                    >VaultErrorCallback</a
                  >&lt;T&gt;
                </li>
              </ul>

              <p>type: core error callback</p>

              <p>return:</p>
              <ul>
                <li>Promise&lt;void></li>
              </ul>
            </td>

            <td>
              <p>
                Core error callback behavior that invokes legacy, callback-style
                error handlers after error state has been finalized. Callbacks
                receive the committed
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >
                and an immutable state snapshot. Callback failures are isolated
                and logged.
              </p>

              <p>
                This behavior is observational only. It never transforms the
                error, never suppresses error finalization, and always returns
                Promise&lt;void>. Callback handling exists solely for
                compatibility and convenience.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isTransform()) {
      <div class="table-title">withErrorTransformBehavior</div>
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
              <p><strong>withErrorTransformBehavior</strong></p>
              <p>function: transformError</p>
              <p>inputs:</p>
              <ul>
                <li>error: unknown</li>
                <li>
                  current:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                </li>
                <li>
                  previousStateSnapshot:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >&lt;T&gt;
                </li>
              </ul>
              <p>type: add-on error transform</p>
              <p>contract: abstract (must be implemented)</p>
              <p>return:</p>
              <ul>
                <li>
                  Promise&lt;unknown |
                  <a href="/docs/references/const/vault_noop">VAULT_NOOP</a>>
                </li>
              </ul>
            </td>
            <td>
              <p>
                Optional add-on error transform behaviors that may
                <em>transform</em> the current
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >
                before it is committed to state. Each transform receives the
                normalized error produced by the preceding behavior and may
                return a new
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >
                or <a href="/docs/references/const/vault_noop">VAULT_NOOP</a> as
                promise to pass the current error shape through unchanged.
              </p>

              <p>
                Error transform behaviors execute sequentially in the order they
                are attached during the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                Declaration and always operate on the most recently produced
                error value. They must not throw, must not mutate state, and
                must not interrupt error finalization.
              </p>

              <p>
                There are no built-in core or add-on implementations for error
                transform behaviors. This behavior exists solely as an
                <em>abstract extension point</em>. Any error transformation
                logic must be implemented explicitly by engineers by extending
                the error transform contract and registering the resulting
                behavior with the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >. This ensures that all error transformations are intentional,
                explicit, and domain-specific.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultErrorBehaviorCommonComponent {
  type = input<string>('all');

  isCore = computed(() => {
    return this.type() === 'all' || this.type() === 'core';
  });

  isCallback = computed(() => {
    return this.type() === 'all' || this.type() === 'callback';
  });

  isTransform = computed(() => {
    return this.type() === 'all' || this.type() === 'transform';
  });
}
