/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/merge/with-array-merge-behavior">withArrayMergeBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-array-merge-behavior',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>withArrayMergeBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Array merge behavior for Vault.<br /><br />
        This merge strategy replaces arrays rather than merging them, ensuring
        predictable and immutable updates for list-like state. All non-array
        values are returned directly without transformation.<br /><br />
        This behavior is marked as critical, ensuring it participates in every
        merge pipeline unless explicitly replaced by a custom merge behavior.<br /><br />
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
                    <a href="/docs/references/contracts/merge-behavior-contract"
                      >MergeBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>Creates a new array merge behavior instance.<br /><br /></td>
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
                <strong>computeMerge</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    currentValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                    | undefined
                  </li>
                  <li>
                    nextValue:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                    | undefined
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
                Computes the merged state value using array-replacement
                semantics.<br /><br />
                - If nextValue is undefined and clearUndefined is false, the
                current value is preserved. - If nextValue is undefined and
                clearUndefined is true, the merge resolves to undefined. - If
                both values are arrays, a shallow clone of nextValue is returned
                to maintain immutability. - All other values pass through
                as-is.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Performs teardown when the behavior instance is destroyed. This
                merge behavior maintains no resources and requires no
                cleanup.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the merge behavior.<br /><br />
                Array merge is a fully stateless behavior and maintains no
                internal resources, configuration mutations, or cached values.
                As a result, this reset operation performs no functional work
                and simply emits a diagnostic event for DevTools and
                monitoring.<br /><br />
                After reset, this behavior continues to operate identically to
                before.<br /><br />
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
                <p class="type">type: unknown</p>
                <p class="default">default: true</p>
              </td>
              <td class="column-auto">
                Indicates this behavior is required for merge processing.<br /><br />
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
                    href="/docs/pipeline/behaviors/merge/with-array-merge-behavior"
                    >withArrayMergeBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Flags this behavior instance as critical within the pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Static unique key assigned to this behavior.<br /><br />
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
                Static behavior type used by the orchestrator.<br /><br />
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
                    href="/docs/pipeline/behaviors/merge/with-array-merge-behavior"
                    >withArrayMergeBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level merge behavior type identifier.<br /><br />
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
export class withArrayMergeBehaviorComponent {}
