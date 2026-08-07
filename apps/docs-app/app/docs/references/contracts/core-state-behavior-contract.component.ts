/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/core-state-behavior-contract">CoreStateBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-core-state-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contracts/core-state-behavior-contract"
          >CoreStateBehaviorContract</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for the core behavior responsible for committing pipeline
        state.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
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
                <strong>finalizeControllerAbort</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes a controller abort condition without applying
                state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizeControllerDeny</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes a controller deny condition without applying state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineError</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    error:
                    <a href="/docs/references/shapes/vault-error-shape"
                      >VaultErrorShape</a
                    >
                    | null
                  </li>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes an error state for the current pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    value:
                    <a href="/docs/references/types/final-state">FinalState</a>
                  </li>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Finalizes a resolved pipeline value.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>finalizePipelineVaultStop</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Finalizes a pipeline stop condition without applying state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>preparePipelineIncoming</strong>

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
                  returns:
                  <a href="/docs/references/types/state-input-type"
                    >StateInputType</a
                  >
                  | unknown | unknown
                </p>
              </td>
              <td>
                Prepares an incoming value for pipeline processing.<br /><br />
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
export class CoreStateBehaviorContractComponent {}
