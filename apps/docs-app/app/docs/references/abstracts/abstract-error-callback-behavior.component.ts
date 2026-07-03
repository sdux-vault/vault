/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/abstracts/abstract-error-callback-behavior">AbstractErrorCallbackBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-abstract-error-callback-behavior',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>AbstractErrorCallbackBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Abstract base class for error callback behaviors that execute
        consumer-supplied error handlers during the error stage of the Vault
        pipeline.<br /><br />
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
                      href="/docs/references/contracts/error-callback-behavior-contract"
                      >ErrorCallbackBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new abstract error behavior instance.<br /><br />
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
                <strong>callbackError</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    current:
                    <a href="/docs/references/shapes/vault-error-shape"
                      >VaultErrorShape</a
                    >
                  </li>
                  <li>
                    state:
                    <a href="/docs/references/shapes/state-snapshot-shape"
                      >StateSnapshotShape</a
                    >
                  </li>
                  <li>
                    oldschoolCallback:
                    <a href="/docs/references/types/vault-error-callback"
                      >VaultErrorCallback</a
                    >
                  </li>
                </ul>
                <p>returns: Promise&lt;void&gt;</p>
              </td>
              <td>
                Executes the consumer-supplied error callback against the
                current error and state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Teardown hook invoked when the behavior instance is
                destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the error behavior to its initial state.<br /><br />
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
                <p class="modifiers">readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates that this error behavior is critical and always
                executed.<br /><br />
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
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/references/const/behavior-types"
                    >BehaviorTypes</a
                  >.CoreErrorCallback
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
export class AbstractErrorCallbackBehaviorComponent {}
