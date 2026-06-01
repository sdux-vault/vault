/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/resolve/with-core-value-behavior">withCoreValueBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-core-value-behavior',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreValueBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core resolve behavior that extracts a plain value from an incoming state
        envelope.<br /><br />
        This behavior participates in the resolve stage and handles direct
        value-based state inputs by safely normalizing the contained value.
        Objects and arrays are shallow-cloned to preserve immutability
        guarantees, while null and undefined values are handled explicitly
        according to pipeline semantics.<br /><br />
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
                      href="/docs/references/contracts/resolve-behavior-contract"
                      >ResolveBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new value resolve behavior instance.<br /><br />
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
                <strong>computeResolve</strong>
                <p class="modifiers">async</p>
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
                  returns: Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T&gt;&gt;
                </p>
              </td>
              <td>
                Resolves a state value from a plain state envelope.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Invoked when the behavior instance is destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the resolve behavior to its initial state.<br /><br />
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
                Static flag marking this behavior as pipeline-critical.<br /><br />
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
                    href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
                    >withCoreValueBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates this resolve behavior is required for pipeline
                operation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Static unique behavior identifier.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key for the instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>resolveType</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/resolve-type">ResolveType</a>
                </p>
              </td>
              <td class="column-auto">
                Resolve type classification for value-based resolution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>resolveType</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
                    >withCoreValueBehavior</a
                  >.resolveType
                </p>
              </td>
              <td class="column-auto">
                Resolve mode indicating plain value resolution.<br /><br />
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
                Static behavior type for orchestrator classification.<br /><br />
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
                    href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
                    >withCoreValueBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level pipeline type identifier.<br /><br />
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
export class withCoreValueBehaviorComponent {}
