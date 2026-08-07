/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/error-callback-behavior-contract">ErrorCallbackBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-error-callback-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contracts/error-callback-behavior-contract"
          >ErrorCallbackBehaviorContract</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for behaviors that invoke consumer error callbacks on pipeline
        errors.<br /><br />
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
                Invokes the consumer error callback with the current error and
                state.<br /><br />
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
                <strong>type</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Identifies this behavior as a core error callback behavior.<br /><br />
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
export class ErrorCallbackBehaviorContractComponent {}
