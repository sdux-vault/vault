/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior">withCoreEmitStateBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-emit-state-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior"
          >withCoreEmitStateBehavior</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core behavior responsible for invoking emitState callbacks.<br /><br />
        This behavior executes a consumer-provided callback with the current
        immutable state snapshot, allowing external observers to react to state
        emission events without mutating pipeline state.<br /><br />
        It is critical to pipeline execution and always runs during emitState
        processing when a callback is provided.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'core'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'core'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Constructor</div>
      <div class="section-body">
        <table aria-label="Constructor">
          <thead>
            <tr>
              <th scope="col" class="column-300">Signature</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>constructor</strong>
                <p>inputs:</p>
                <ul>
                  <li>key: string</li>
                  <li>
                    behaviorCtx:
                    <a href="/docs/references/contexts/behavior-class-context"
                      >BehaviorClassContext</a
                    >
                  </li>
                </ul>

                <p>implements:</p>
                <ul>
                  <li>
                    <a
                      href="/docs/references/contracts/core-emit-state-behavior-contract"
                      >CoreEmitStateBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new core emitState behavior instance.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Methods</div>
      <div class="section-body">
        <table aria-label="Methods">
          <thead>
            <tr>
              <th scope="col" class="column-300">Method</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Performs cleanup when the behavior instance is destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>emitState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    snapshot:
                    <a href="/docs/references/shapes/state-snapshot-shape"
                      >StateSnapshotShape</a
                    >
                  </li>
                  <li>
                    callback:
                    <a href="/docs/references/types/core-emit-state-callback"
                      >CoreEmitStateCallback</a
                    >
                  </li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/types/core-emit-state-result"
                    >CoreEmitStateResult</a
                  >
                </p>
              </td>
              <td>
                Executes a provided emitState callback with the current state
                snapshot.<br /><br />
                If the callback is not a function or throws during execution,
                the behavior logs the failure and returns
                <a href="/docs/references/const/vault_noop">VAULT_NOOP</a>
                without interrupting pipeline flow.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the emitState behavior.<br /><br />
                This behavior does not retain internal state and therefore
                requires no reset logic beyond lifecycle participation.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Properties</div>
      <div class="section-body">
        <table aria-label="Properties">
          <thead>
            <tr>
              <th scope="col" class="column-300">Property</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates that emitState behavior is required in the
                pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: true</p>
              </td>
              <td class="column-auto">
                Indicates that this behavior must always run during emitState
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key used for introspection and diagnostics.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this emitState behavior instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/behavior-type"
                    >BehaviorType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Static behavior type used for pipeline classification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/references/const/behavior-types"
                    >BehaviorTypes</a
                  >.CoreEmitState
                </p>
              </td>
              <td class="column-auto">
                Instance-level pipeline behavior type identifier.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class withCoreEmitStateBehaviorComponent {}
