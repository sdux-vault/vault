/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/state/with-core-state-behavior">withCoreStateBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-state-behavior',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreStateBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core behavior responsible for committing resolved pipeline outcomes into
        state.<br /><br />
        This behavior translates pipeline execution results into immutable state
        snapshots and emits authoritative state lifecycle events. It coordinates
        loading, value, and error transitions and ensures state emission remains
        atomic and ordered.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/core</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/core</code></pre>
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
                      href="/docs/references/contracts/core-state-behavior-contract"
                      >CoreStateBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>Creates a new core state behavior instance.<br /><br /></td>
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
                <strong>commitState</strong>
                <p class="modifiers">protected</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                  <li>changes: Partial&gt; | null</li>
                  <li>
                    type:
                    <a href="/docs/references/types/state-emit-type"
                      >StateEmitType</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Commits partial state changes and emits a single state snapshot
                event.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Emits a terminal destroy state snapshot.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>finalizeControllerAbort</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes state when a controller abort occurs.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizeControllerDeny</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes state when a controller deny occurs.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineError</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    err:
                    <a href="/docs/references/shapes/vault-error-shape"
                      >VaultErrorShape</a
                    >
                    | null
                  </li>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Finalizes state when a pipeline error occurs.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    value:
                    <a href="/docs/references/types/final-state">FinalState</a>
                  </li>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes state after pipeline resolution completes.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineVaultStop</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes state when pipeline execution is stopped.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>preparePipelineIncoming</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/types/state-input-type"
                    >StateInputType</a
                  >
                  | unknown | unknown
                </p>
              </td>
              <td>
                Prepares incoming pipeline input and emits an initial incoming
                state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Emits a terminal reset state snapshot.<br /><br /></td>
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
                Indicates that this behavior is required for pipeline
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/behaviors/state/with-core-state-behavior"
                    >withCoreStateBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates that this behavior must always execute.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this behavior instance.<br /><br />
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
                  <a
                    href="/docs/pipeline/behaviors/state/with-core-state-behavior"
                    >withCoreStateBehavior</a
                  >.type
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
export class withCoreStateBehaviorComponent {}
