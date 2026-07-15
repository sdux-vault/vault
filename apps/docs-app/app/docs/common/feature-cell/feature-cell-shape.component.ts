import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-feature-cell-shape-common',
  standalone: true,
  template: `
    <!-- Updated 2026-07-15 -->
    <div class="table-title">
      <a href="/docs/references/shapes/feature-cell-shape">FeatureCellShape</a
      >&lt;T&gt;
    </div>
    <table>
      <thead>
        <tr>
          <th class="column-350">Member</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- afterTaps -->
        <tr>
          <td>
            <strong>afterTaps&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                afterTaps:
                <a href="/docs/references/types/tap-callback">TapCallback</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers tap callbacks executed during the after-tap stage of the
            pipeline.
          </td>
        </tr>

        <!-- beforeTaps -->
        <tr>
          <td>
            <strong>beforeTaps&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                beforeTaps:
                <a href="/docs/references/types/tap-callback">TapCallback</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers tap callbacks executed during the before-tap stage of the
            pipeline.
          </td>
        </tr>

        <!-- destroy -->
        <tr>
          <td><strong>destroy()</strong></td>
          <td>
            Performs cleanup and teardown of the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            Called automatically when the hosting provider is destroyed.
          </td>
        </tr>

        <!-- destroyed$ -->
        <tr>
          <td><strong>destroyed$?: Observable&lt;void&gt;</strong></td>
          <td>
            Observable that emits when the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            has been destroyed.
          </td>
        </tr>

        <!-- emitStates -->
        <tr>
          <td>
            <strong>emitStates&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                emitStates:
                <a href="/docs/references/types/core-emit-state-callback"
                  >CoreEmitStateCallback</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers emit-state callbacks executed during state emission.
          </td>
        </tr>

        <!-- errors -->
        <tr>
          <td>
            <strong>errors&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                errors:
                <a href="/docs/references/types/vault-error-callback"
                  >VaultErrorCallback</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>Registers error callbacks executed during the error stage.</td>
        </tr>

        <!-- filters -->
        <tr>
          <td>
            <strong>filters&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                filters:
                <a href="/docs/references/types/filter-function"
                  >FilterFunction</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>Registers filter functions executed during the filter stage.</td>
        </tr>

        <!-- fromStream -->
        <tr>
          <td>
            <strong>fromStream&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>source$: Observable&lt;T&gt;</li>
              <li>
                options?:
                <a href="/docs/references/config/from-stream-options"
                  >FromStreamOptions</a
                >
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>void</li>
            </ul>
          </td>
          <td>
            Subscribes to an Observable source and forwards each emitted value
            through <strong>mergeState()</strong> as a discrete state update.
          </td>
        </tr>

        <!-- hydrate -->
        <tr>
          <td>
            <strong>hydrate&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                factory:
                <a href="/docs/references/types/deferred-type">DeferredType</a
                >&lt;T&gt;
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers a deferred factory as the authoritative initialization
            source. Executed during
            <code>initialize()</code> with highest precedence over Persist
            behaviors and <code>descriptor.initialState</code>.
          </td>
        </tr>

        <!-- initialize -->
        <tr>
          <td>
            <strong>initialize()</strong>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt; | Promise&lt;void&gt;
              </li>
            </ul>
          </td>
          <td>
            Finalizes builder configuration and activates the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </td>
        </tr>

        <!-- interceptors -->
        <tr>
          <td>
            <strong>interceptors&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                interceptors:
                <a
                  href="/docs/references/contracts/interceptor-behavior-class-contract"
                  >InterceptorBehaviorClassContract</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers interceptor behaviors executed prior to the resolve stage.
          </td>
        </tr>

        <!-- key -->
        <tr>
          <td><strong>key: string</strong></td>
          <td>
            Unique identifier assigned to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> at
            registration time.
          </td>
        </tr>

        <!-- mergeState -->
        <tr>
          <td>
            <strong>mergeState&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                incoming:
                <a href="/docs/references/types/state-input-type"
                  >StateInputType</a
                >&lt;T&gt;
              </li>
              <li>options?: unknown</li>
            </ul>
            <p>return:</p>
            <ul>
              <li>Promise&lt;void&gt;</li>
            </ul>
          </td>
          <td>
            Performs a merge-style state update using the configured merge
            behavior.
          </td>
        </tr>

        <!-- operators -->
        <tr>
          <td>
            <strong>operators&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                operators:
                <a
                  href="/docs/references/contracts/operators-behavior-class-contract"
                  >OperatorsBehaviorClassContract</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>Registers operator behaviors executed before filters.</td>
        </tr>

        <!-- reducers -->
        <tr>
          <td>
            <strong>reducers&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                reducers:
                <a href="/docs/references/types/reducer-function"
                  >ReducerFunction</a
                >&lt;T&gt;[]
              </li>
            </ul>
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            Registers reducer functions executed during the reducer stage.
          </td>
        </tr>

        <!-- replaceState -->
        <tr>
          <td>
            <strong>replaceState&lt;T&gt;</strong>
            <p>inputs:</p>
            <ul>
              <li>
                incoming:
                <a href="/docs/references/types/state-input-type"
                  >StateInputType</a
                >&lt;T&gt;
              </li>
              <li>options?: unknown</li>
            </ul>
            <p>return:</p>
            <ul>
              <li>Promise&lt;void&gt;</li>
            </ul>
          </td>
          <td>
            Performs a replace-style state update that fully replaces the
            current state.
          </td>
        </tr>

        <!-- reset -->
        <tr>
          <td><strong>reset()</strong></td>
          <td>
            Resets the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> to
            its initial state value.
          </td>
        </tr>

        <!-- reset$ -->
        <tr>
          <td><strong>reset$?: Observable&lt;void&gt;</strong></td>
          <td>
            Observable that emits when the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            has been reset.
          </td>
        </tr>

        <!-- state -->
        <tr>
          <td>
            <strong
              >state:
              <a href="/docs/references/interfaces/vault-state-ref"
                >VaultStateRef</a
              >&lt;T&gt;</strong
            >
          </td>
          <td>
            Reactive reference to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>’s
            resolved state.
          </td>
        </tr>

        <!-- state$ -->
        <tr>
          <td>
            <strong
              >state$: Observable&lt;<a
                href="/docs/references/shapes/state-emit-snapshot-shape"
                >StateEmitSnapshotShape</a
              >&lt;T&gt;&gt;</strong
            >
          </td>
          <td>
            Observable that emits state snapshots when the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            commits new state.
          </td>
        </tr>

        <!-- useReactiveState -->
        <tr>
          <td>
            <strong>useReactiveState&lt;T&gt;</strong>
            &nbsp;
            <img src="assets/brand/vue/vue-icon.svg" height="12" alt="Vue" />
            <p>return:</p>
            <ul>
              <li>
                Readonly&lt;<a
                  href="/docs/references/shapes/state-snapshot-shape"
                  >StateSnapshotShape</a
                >&lt;T&gt;&gt;
              </li>
            </ul>
          </td>
          <td>
            <strong>Vue</strong> extension that subscribes the active effect
            scope to
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            state updates and returns the latest committed snapshot as a
            readonly reactive object.
          </td>
        </tr>

        <!-- useSyncExternalStore -->
        <tr>
          <td>
            <strong>useSyncExternalStore&lt;T&gt;</strong>
            &nbsp;
            <img
              src="assets/brand/react/react-icon.svg"
              height="15"
              alt="React" />
            <p>return:</p>
            <ul>
              <li>
                <a href="/docs/references/shapes/state-snapshot-shape"
                  >StateSnapshotShape</a
                >&lt;T&gt;
              </li>
            </ul>
          </td>
          <td>
            <strong>React</strong> extension that subscribes the current render
            to
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            state updates and returns the latest committed snapshot.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultFeatureCellShapeCommonComponent {}
