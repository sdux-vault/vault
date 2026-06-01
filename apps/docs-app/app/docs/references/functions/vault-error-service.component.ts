/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/vault-error-service">VaultErrorService</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-service',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultErrorService</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Angular-facing service that exposes the current global Vault error as a
        signal.<br /><br />
        This service bridges the internal VaultPrivateErrorService into
        Angular’s signal system, allowing UI layers to observe global error
        state reactively and clear it when appropriate.<br /><br />
      </div>
      <div class="class-meta">
        <span class="meta-badge meta-injectable"> Injectable </span>
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
              </td>
              <td>
                Creates a new
                <a href="/docs/references/functions/vault-error-service"
                  >VaultErrorService</a
                >
                instance and subscribes to global error updates.<br /><br />
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
              <td>Clears the currently stored global error.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>ngOnDestroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Cleans up internal subscriptions when the service is
                destroyed.<br /><br />
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
                <strong>#error</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: WritableSignal</p>
                <p class="default">default: signal(null)</p>
              </td>
              <td class="column-auto">
                Writable signal holding the current global error or null.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#errorSubscription</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: Subscription</p>
              </td>
              <td class="column-auto">
                Subscription to the internal error observable.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#privateVaultErrorService</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a
                    href="/docs/references/contracts/vault-private-error-service-contract"
                    >VaultPrivateErrorServiceContract</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Internal Vault error service used as the authoritative error
                source.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>error</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: Signal</p>
                <p class="default">default: this.#error.asReadonly()</p>
              </td>
              <td class="column-auto">
                Read-only signal exposing the current global error state.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">API</div>
      <div class="section-body">
        <table aria-label="API">
          <thead>
            <tr>
              <th scope="col" class="column-300">API</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>
                  <strong
                    ><a href="/docs/references/functions/vault-error-service"
                      >VaultErrorService</a
                    >()</strong
                  >
                </p>

                <p>returns:</p>
                <ul>
                  <li>void</li>
                </ul>
              </td>
              <td>
                Angular-facing service that exposes the current global Vault
                error as a signal.<br /><br />
                This service bridges the internal VaultPrivateErrorService into
                Angular’s signal system, allowing UI layers to observe global
                error state reactively and clear it when appropriate.<br /><br />
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
export class VaultErrorServiceComponent {}
