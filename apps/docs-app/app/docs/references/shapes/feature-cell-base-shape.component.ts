/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/feature-cell-base-shape">FeatureCellBaseShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell-base-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/shapes/feature-cell-base-shape"
          >FeatureCellBaseShape</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the public base contract for a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        instance.<br /><br />
        <a href="/docs/references/shapes/feature-cell-base-shape"
          >FeatureCellBaseShape</a
        >
        describes the builder, lifecycle, and state update surface required to
        configure, initialize, and interact with a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
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
                <strong>afterTaps</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    afterTaps:
                    <a href="/docs/references/types/tap-callback">TapCallback</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers tap functions executed during the &quot;after
                tap&quot; stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>beforeTaps</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    beforeTaps:
                    <a href="/docs/references/types/tap-callback">TapCallback</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers tap functions executed during the &quot;before
                tap&quot; stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Performs cleanup and teardown of the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >. Called automatically when the cell&#39;s hosting provider is
                destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>emitStates</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    emitStates:
                    <a href="/docs/references/types/core-emit-state-callback"
                      >CoreEmitStateCallback</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers emitState functions executed during the emitState
                stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>errors</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    errors:
                    <a href="/docs/references/types/vault-error-callback"
                      >VaultErrorCallback</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers error functions to run during the error stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>filters</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    filters:
                    <a href="/docs/references/types/filter-function"
                      >FilterFunction</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers filter functions to run during the filter stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>hydrate</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    incoming:
                    <a href="/docs/references/types/deferred-type"
                      >DeferredType</a
                    >
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers a deferred hydration source for the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>initialize</strong>

                <p>returns: unknown | void</p>
              </td>
              <td>
                Finalizes builder configuration and activates the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>interceptors</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    interceptors:
                    <a
                      href="/docs/references/contracts/interceptor-behavior-class-contract"
                      >InterceptorBehaviorClassContract</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers interceptor behaviors executed prior to resolve.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>mergeState</strong>

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
                Performs a merge-style state update using the configured merge
                behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>operators</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    operators:
                    <a
                      href="/docs/references/contracts/operators-behavior-class-contract"
                      >OperatorsBehaviorClassContract</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers operator behaviors executed before filters.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reducers</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    reducers:
                    <a href="/docs/references/types/reducer-function"
                      >ReducerFunction</a
                    >[]
                  </li>
                </ul>
                <p>returns: unknown</p>
              </td>
              <td>
                Registers reducer functions executed during the reducer
                stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>replaceState</strong>

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
                Performs a replace-style state update that fully replaces the
                current state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                to its initial state.<br /><br />
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
                <strong>destroyed$?</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Observable that emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                has been destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier assigned to the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>reset$?</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Observable that emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                has been reset.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state$</strong>

                <p class="type">type: Observable&gt;</p>
              </td>
              <td class="column-auto">
                Observable that emits state snapshots whenever the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state changes.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>vaultSettled?</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Dev-mode testing hook that resolves once all pending pipeline
                activity has settled.<br /><br />
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
export class FeatureCellBaseShapeComponent {}
