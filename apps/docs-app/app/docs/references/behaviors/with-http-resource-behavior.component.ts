/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/resolve/with-http-resource-behavior">withHttpResourceBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-http-resource-behavior',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withHttpResourceBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Resolve behavior that extracts state values from an Angular HTTP
        resource reference.<br /><br />
        This behavior participates in the resolve stage when the incoming state
        input is classified as an HTTP resource and produces a resolved pipeline
        value once the resource emits a concrete value or error.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/angular</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/angular</code></pre>
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
                Creates a new HTTP resource resolve behavior instance.<br /><br />
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
                Resolves a pipeline value from an HTTP resource reference when
                supported.<br /><br />
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
                Resets the behavior without modifying internal state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>setInjector</strong>
                <p class="modifiers">static</p>
                <p>inputs:</p>
                <ul>
                  <li>value: Injector</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Sets the Angular injector used by all instances during
                resolve.<br /><br />
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
                Indicates that this resolve behavior is required for pipeline
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
                    href="/docs/pipeline/behaviors/resolve/with-http-resource-behavior"
                    >withHttpResourceBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates that this behavior is critical in the resolve
                stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Static behavior key assigned by the decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key for this instance.<br /><br />
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
                Resolve type identifier associated with HTTP resource inputs.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>resolveType</strong>

                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/behaviors/resolve/with-http-resource-behavior"
                    >withHttpResourceBehavior</a
                  >.resolveType
                </p>
              </td>
              <td class="column-auto">
                Resolve type handled by this behavior instance.<br /><br />
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
                Static behavior type metadata used for pipeline
                classification.<br /><br />
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
                    href="/docs/pipeline/behaviors/resolve/with-http-resource-behavior"
                    >withHttpResourceBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level behavior type identifier.<br /><br />
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class withHttpResourceBehaviorComponent {}
