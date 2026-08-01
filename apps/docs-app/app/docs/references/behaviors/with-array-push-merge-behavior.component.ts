/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/merge/with-array-push-merge-behavior">withArrayPushMergeBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-array-push-merge-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withArrayPushMergeBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Merge behavior that appends a single incoming value to an existing array
        state.<br /><br />
        This behavior performs push-style merge semantics by returning a new
        array containing the current array elements followed by the incoming
        value, while supporting optional clearing of undefined values via merge
        configuration.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'addons'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'addons'" /></code></pre>
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
                    <a href="/docs/references/contracts/merge-behavior-contract"
                      >MergeBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new array push merge behavior instance.<br /><br />
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
                <strong>#warnNonArray</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    currentValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                  <li>
                    nextValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits a warning when non-array values are encountered during
                merge.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>computeMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    currentValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                  <li>
                    nextValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                  <li>
                    options?:
                    <a href="/docs/references/config/merge-config"
                      >MergeConfig</a
                    >
                  </li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Computes the merged result by appending the incoming value to
                the current array.<br /><br />
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
              <td>Resets the behavior to its initial state.<br /><br /></td>
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
                <strong>#isDevMode</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Indicates whether the runtime is operating in development
                mode.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#warned</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Tracks whether a non-array warning has already been emitted.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Indicates whether the behavior is critical at the static
                level.<br /><br />
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
                    href="/docs/pipeline/addons/merge/with-array-push-merge-behavior"
                    >withArrayPushMergeBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior instance is critical.<br /><br />
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
                Static behavior type identifier used for pipeline
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
                    href="/docs/pipeline/addons/merge/with-array-push-merge-behavior"
                    >withArrayPushMergeBehavior</a
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
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class withArrayPushMergeBehaviorComponent {}
