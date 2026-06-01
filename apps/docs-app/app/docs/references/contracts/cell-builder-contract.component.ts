/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/cell-builder-contract">CellBuilderContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-cell-builder-contract',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>CellBuilderContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the builder contract used to configure and initialize a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>. This
        interface exposes the fluent configuration surface for registering
        behaviors, callbacks, and operators prior to activation.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/shared</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Registers functions executed during the &quot;after tap&quot;
                stage.<br /><br />
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Registers functions executed during the &quot;before tap&quot;
                stage.<br /><br />
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
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

                <p>returns: void</p>
              </td>
              <td>
                Finalizes the builder configuration and activates the
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Registers interceptor behaviors that preprocess incoming state
                before resolve.<br /><br />
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Registers operator behaviors executed prior to filtering.<br /><br />
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
                <p>
                  returns:
                  <a href="/docs/references/contracts/cell-builder-contract"
                    >CellBuilderContract</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Registers a sequence of reducer functions to run during the
                reducer stage.<br /><br />
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
                <strong>behaviorConfigs</strong>

                <p class="type">type: Map</p>
              </td>
              <td class="column-auto">
                Map of behavior configuration values keyed by behavior
                configuration identifiers.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Documentation Generation Notes</div>
      <div class="section-body">
        <p>
          This reference API documentation is generated from @jsdoc-annotated
          source code using @compodoc, with AI-assisted comments reviewed by a
          human prior to publication.
        </p>
      </div>
    </section>
  </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class CellBuilderContractComponent {}
