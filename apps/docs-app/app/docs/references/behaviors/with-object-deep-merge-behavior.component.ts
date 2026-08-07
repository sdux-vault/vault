/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior">withObjectDeepMergeBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-object-deep-merge-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior"
          >withObjectDeepMergeBehavior</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Deep merge behavior used to combine nested state objects in the Vault
        pipeline.<br /><br />
        This behavior performs a recursive deep merge across plain-object
        structures, replacing primitive values, arrays, nulls, and non-plain
        objects while descending into nested plain objects. It supports advanced
        merge options such as conditional clearing of undefined values and
        optional removal of null fields.<br /><br />
        Deep merge is useful for complex feature states that evolve through
        patch-style updates across multiple nested levels.<br /><br />
        This behavior is marked critical, ensuring that a merge strategy is
        always present during pipeline execution.<br /><br />
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
              <td>Creates a new deep-merge behavior instance.<br /><br /></td>
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
                <strong>#deepMerge</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>target: any</li>
                  <li>incoming: any</li>
                </ul>
                <p>returns: any</p>
              </td>
              <td>
                Recursively merges two plain objects, descending into nested
                structures and replacing non-plain-object values. Arrays, nulls,
                primitives, and class instances are treated as replaceable
                values and are not traversed.<br /><br />
                The method constructs a new output object and does not mutate
                either input.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#isPlainObject</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>value: any</li>
                </ul>
                <p>returns: boolean</p>
              </td>
              <td>
                Determines whether the provided value is a plain object suitable
                for recursive deep merging. Only objects whose prototype is
                Object.prototype qualify as plain objects; arrays, dates, class
                instances, and other structured objects are excluded.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#stripNullsFromObject</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>obj: any</li>
                </ul>
                <p>returns: any</p>
              </td>
              <td>
                Removes all properties with null values from a deep merge
                result. Nested objects are processed recursively, with empty
                objects removed entirely if all nested values evaluate to
                null.<br /><br />
                This method does not modify the input and returns a new cleaned
                structure.<br /><br />
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
                    <a href="/docs/references/config/object-deep-merge-config"
                      >ObjectDeepMergeConfig</a
                    >
                  </li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >
                  | undefined
                </p>
              </td>
              <td>
                Computes a deep merge between the current and next pipeline
                values.<br /><br />
                Non-object values—including primitives, arrays, nulls, or
                non-plain objects— are replaced directly. When both inputs are
                plain objects, a recursive merge is performed. Optional
                configuration allows undefined inputs to clear the current value
                and enables removal of null fields from merged output.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Called when the behavior instance is destroyed. This behavior
                maintains no internal resources and performs no cleanup.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the deep-merge behavior to its initial state.<br /><br />
                This merge behavior is completely stateless and retains no
                internal references, buffers, or cached structures. A reset
                therefore performs no operational work and exists only for
                lifecycle completeness and diagnostic visibility within
                DevTools.<br /><br />
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
                Marks this behavior as required for operation.<br /><br />
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
                    href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior"
                    >withObjectDeepMergeBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates this behavior is required to run within the merge
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
                Global behavior identifier assigned by the decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key assigned during construction.<br /><br />
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
                Static metadata used by the orchestrator to classify this
                behavior.<br /><br />
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
                    href="/docs/pipeline/addons/merge/with-object-deep-merge-behavior"
                    >withObjectDeepMergeBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level merge type classification.<br /><br />
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
export class withObjectDeepMergeBehaviorComponent {}
