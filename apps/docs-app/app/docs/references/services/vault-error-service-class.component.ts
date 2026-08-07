/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/services/vault-error-service-class">VaultErrorServiceClass</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-error-service-class',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/services/vault-error-service-class"
          >VaultErrorServiceClass</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Singleton service that aggregates and exposes the current Vault error
        state. Subscribes to the private error service and mirrors updates
        through a public observable stream for consumer consumption.<br /><br />
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

                <p>implements:</p>
                <ul>
                  <li>
                    <a
                      href="/docs/references/contracts/vault-error-service-contract"
                      >VaultErrorServiceContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Initializes the service and subscribes to the private error
                stream.<br /><br />
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
                <strong>clear</strong>

                <p>returns: void</p>
              </td>
              <td>
                Clears the current error state via the private error service.<br /><br />
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
                <strong>#error$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new BehaviorSubject(null)</p>
              </td>
              <td class="column-auto">
                Subject backing the public error observable.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#hasErrorState</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: false</p>
              </td>
              <td class="column-auto">
                Tracks whether an active error is currently held.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#privateVaultErrorService</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: VaultPrivateErrorService()</p>
              </td>
              <td class="column-auto">
                Internal delegate responsible for low-level error state
                management.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#subscription</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Subscription()</p>
              </td>
              <td class="column-auto">
                Aggregate subscription used for cleanup on teardown.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>error$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: this.#error$.asObservable()</p>
              </td>
              <td class="column-auto">
                Public observable stream of the current error state.<br /><br />
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
export class VaultErrorServiceClassComponent {}
