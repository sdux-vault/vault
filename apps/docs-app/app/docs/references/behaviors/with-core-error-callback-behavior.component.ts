/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior">withCoreErrorCallbackBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-error-callback-behavior',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreErrorCallbackBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core error callback behavior for invoking legacy error handlers.<br /><br />
        This behavior executes an optional consumer-supplied error callback when
        a pipeline error occurs, forwarding the normalized error and an
        immutable snapshot of the
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> state
        without altering error flow.<br /><br />
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
              </td>
              <td>
                Creates a new core error callback behavior instance.<br /><br />
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
                <p class="modifiers">async</p>
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
                Invokes a legacy error callback with the normalized error and
                state snapshot.<br /><br />
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
                Indicates that this behavior is critical within the pipeline.<br /><br />
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
                    href="/docs/pipeline/behaviors/error/with-core-error-callback-behavior"
                    >withCoreErrorCallbackBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates that this error callback behavior is always
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
                Static behavior key used for diagnostics and tooling.<br /><br />
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
                Static behavior type identifier used for orchestrator
                classification.<br /><br />
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
export class withCoreErrorCallbackBehaviorComponent {}
