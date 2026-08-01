/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/classes/feature-cell-class">FeatureCellClass</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell-class',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FeatureCellClass</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Concrete
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        factory that extends the builder to produce a fully configured
        <a href="/docs/references/shapes/feature-cell-shape"
          >FeatureCellShape</a
        >
        instance. The class wires fluent API extensions from behaviors and
        controllers onto the resulting cell and attaches non-enumerable context
        and key properties.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'engine'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'engine'" /></code></pre>
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
                  <li>
                    descriptor:
                    <a href="/docs/references/config/feature-cell-config"
                      >FeatureCellConfig</a
                    >
                  </li>
                  <li>
                    defaultBehaviors:
                    <a href="/docs/references/contracts/behavior-class-contract"
                      >BehaviorClassContract</a
                    >[]
                  </li>
                  <li>
                    behaviors:
                    <a href="/docs/references/contracts/behavior-class-contract"
                      >BehaviorClassContract</a
                    >[]
                  </li>
                  <li>
                    controllers:
                    <a
                      href="/docs/references/contracts/controller-class-contract"
                      >ControllerClassContract</a
                    >[]
                  </li>
                </ul>
                <p>extends:</p>
                <ul>
                  <li>FeatureCellBuilder</li>
                </ul>
              </td>
              <td>
                Creates a new
                <a href="/docs/references/classes/feature-cell-class"
                  >FeatureCellClass</a
                >
                with the provided descriptor and behavior/controller lists.<br /><br />
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
                <strong>build</strong>

                <p>
                  returns:
                  <a href="/docs/references/shapes/feature-cell-shape"
                    >FeatureCellShape</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Assembles and returns a fully configured
                <a href="/docs/references/shapes/feature-cell-shape"
                  >FeatureCellShape</a
                >
                with fluent API extensions.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#buildCtx</strong>
                <p class="modifiers">#private</p>

                <p>
                  returns:
                  <a href="/docs/references/contexts/behavior-context"
                    >BehaviorContext</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Builds the initial behavior context with locked snapshot
                reference.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#ensureInitialized</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Throws if the cell is corrupt or has not been initialized.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#handleCorruptionError</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>message: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Marks the cell as corrupt, logs a runtime error, and throws.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#initialize</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>ctx: FeatureCellInitializeConfig</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Creates the conductor, validates the cell, and starts the
                initialization lifecycle.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>
                <p class="modifiers">protected</p>

                <p>returns: void</p>
              </td>
              <td>
                Destroys the conductor, completes all subjects, and emits
                destruction signals.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>mergeState</strong>
                <p class="modifiers">protected</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    incoming:
                    <a href="/docs/references/types/state-input-type"
                      >StateInputType</a
                    >
                  </li>
                  <li>options?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Dispatches a merge operation through the conductor pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>replaceState</strong>
                <p class="modifiers">protected</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    incoming:
                    <a href="/docs/references/types/state-input-type"
                      >StateInputType</a
                    >
                  </li>
                  <li>options?: unknown</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Dispatches a replace operation through the conductor
                pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>
                <p class="modifiers">protected</p>

                <p>returns: void</p>
              </td>
              <td>
                Resets the conductor and emits a reset signal.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>setup</strong>
                <p class="modifiers">protected</p>

                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Constructs the fluent
                <a href="/docs/references/contracts/cell-builder-contract"
                  >CellBuilderContract</a
                >
                with pre-initialization guards.<br /><br />
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
                <strong>#cellCorrupt</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Whether the cell encountered a critical failure and is
                permanently unusable.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#conductor</strong>

                <p class="type">type: Conductor</p>
              </td>
              <td class="column-auto">
                Conductor instance managing pipeline execution for this cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#initialized</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Whether the cell has been initialized via the builder.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#vaultMonitor</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: VaultMonitor()</p>
              </td>
              <td class="column-auto">
                Vault monitor instance for tracing lifecycle events.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>cell</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/feature-cell-base-shape"
                    >FeatureCellBaseShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Reference to the constructed
                <a href="/docs/references/shapes/feature-cell-base-shape"
                  >FeatureCellBaseShape</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>cellKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying this
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ctx</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/contexts/behavior-context"
                    >BehaviorContext</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Shared behavior context for pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>destroyed$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Subject()</p>
              </td>
              <td class="column-auto">
                Subject signaling cell destruction.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>reset$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Subject()</p>
              </td>
              <td class="column-auto">
                Subject signaling cell reset.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Subject&gt;()</p>
              </td>
              <td class="column-auto">
                Subject emitting state snapshots to subscribers.<br /><br />
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
export class FeatureCellClassComponent {}
