/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/error/with-core-error-behavior">withCoreErrorBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-error-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreErrorBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core error behavior used internally by the Vault orchestrator.<br /><br />
        This behavior represents the first step in the error-handling pipeline.
        It is intentionally minimal and exists solely to normalize any thrown
        value— regardless of type—into a canonical ResourceStateError using
        resourceError.<br /><br />
        ## Responsibilities - Convert unknown errors into a well-structured
        ResourceStateError - Provide a deterministic starting point for all
        addon error behaviors - Guarantee error normalization before
        transformations occur<br /><br />
        All richer behaviors (mapping, retries, notifications, old-school
        callbacks) are implemented as addon error behaviors layered after this
        one.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'core'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'core'" /></code></pre>
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
                      href="/docs/references/contracts/core-error-behavior-contract"
                      >CoreErrorBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new Core Error Behavior instance.<br /><br />
                future extensibility hooks.<br /><br />
                This constructor performs no allocation of runtime resources. It
                simply stores metadata required by the orchestrator and
                devtools.<br /><br />
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
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Lifecycle hook invoked when the behavior instance is
                destroyed.<br /><br />
                Core behaviors maintain no internal resources and therefore
                perform no cleanup. This method logs a devtools-friendly
                &quot;noop&quot; warning to help with behavior lifecycle
                introspection.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>handleError</strong>

                <p>inputs:</p>
                <ul>
                  <li>error: unknown</li>
                  <li>featureCellKey: string</li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                </p>
              </td>
              <td>
                Normalizes an unknown error into a &#123;&#64;link
                <a href="/docs/references/shapes/vault-error-shape"
                  >VaultErrorShape</a
                >&#125;.<br /><br />
                This is the *only* operation performed by the core error
                behavior. Additional behaviors further down the pipeline may
                inspect or transform the returned structure.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the behavior instance.<br /><br />
                This behavior maintains no internal mutable state. The reset
                hook exists strictly for lifecycle symmetry across all behavior
                types and to support devtools state introspection.<br /><br />
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
                Indicates this behavior participates critically in the
                pipeline.<br /><br />
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
                Indicates that this error behavior is critical and always
                executed.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key assigned by the decorator.<br /><br />
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
                Behavior type metadata assigned by the decorator.<br /><br />
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
                  >.CoreError
                </p>
              </td>
              <td class="column-auto">
                Behavior type for orchestrator registration.<br /><br />
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
export class withCoreErrorBehaviorComponent {}
