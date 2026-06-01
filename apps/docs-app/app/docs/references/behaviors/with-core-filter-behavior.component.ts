/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/filter/with-core-filter-behavior">withCoreFilterBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-core-filter-behavior',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreFilterBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core filter behavior for Vault.<br /><br />
        This behavior participates in the filter stage of the pipeline. A filter
        function receives the current state and may return: - the same state - a
        transformed state of the same structural type - undefined to indicate
        that the state update should be aborted<br /><br />
        This behavior enforces type alignment between the incoming value and the
        filtered result, ensuring that filters cannot mutate or reshape the
        state into an incompatible type. When a mismatch is detected, a
        controlled Vault error is thrown.<br /><br />
        Filters MUST be pure and must not mutate the incoming value.<br /><br />
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
                      href="/docs/references/contracts/filter-behavior-contract"
                      >FilterBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>Creates a new filter behavior instance.<br /><br /></td>
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
                <strong>#handleArrayLogic</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>current: T</li>
                  <li>next: T</li>
                </ul>
                <p>returns: boolean</p>
              </td>
              <td>
                Performs type validation when filtering array state values.<br /><br />
                Ensures the filtered output remains an array when the input was
                an array.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#handleObjectLogic</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>current: T</li>
                  <li>next: T</li>
                </ul>
                <p>returns: boolean</p>
              </td>
              <td>
                Performs type validation when filtering object-based state
                values.<br /><br />
                Ensures the filter returns a valid non-null object of compatible
                structure.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#handlePrimitiveLogic</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>current: T</li>
                  <li>next: T</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Performs type validation for primitive state values.<br /><br />
                Ensures the filter output matches the primitive type of the
                input.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#typeAlignmentDebug</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>current: T</li>
                  <li>next: T</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits detailed debug output when filter output does not align
                with the input type.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>applyFilter</strong>

                <p>inputs:</p>
                <ul>
                  <li>current: T</li>
                  <li>
                    filter:
                    <a href="/docs/references/types/filter-function"
                      >FilterFunction</a
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
                Applies the provided filter function to the current state.<br /><br />
                If the filter returns undefined, the state update is aborted.
                Filter output must preserve the shape of: - arrays - plain
                objects - primitives<br /><br />
                Structural mismatches result in a thrown Vault error. Filters
                must not mutate the incoming value and should remain pure.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Invoked during behavior teardown. This behavior maintains no
                internal resources and requires no cleanup.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the filter behavior.<br /><br />
                Since core filters do not maintain internal state, this reset
                operation performs no functional work. It exists to support the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                reset lifecycle and provides a diagnostic hook for DevTools and
                monitoring.<br /><br />
                After reset, the behavior continues operating identically to
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
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates that filter behavior is required in the pipeline.<br /><br />
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
                Indicates that this behavior must always run as part of
                filtering.<br /><br />
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
                Unique identifier for this filter behavior instance.<br /><br />
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
                  >.Filter
                </p>
              </td>
              <td class="column-auto">
                Instance-level criticality flag.<br /><br />
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
export class withCoreFilterBehaviorComponent {}
