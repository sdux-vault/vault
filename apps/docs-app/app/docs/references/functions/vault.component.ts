/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: Vault
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>Vault</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Initializes the Vault runtime using the provided configuration and
        prepares the global feature cell registry. This function establishes the
        required Vault infrastructure and applies the supplied options for core
        initialization.<br /><br />
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
                <p><strong>Vault(options)</strong></p>
                <p>inputs:</p>
                <ul>
                  <li>
                    options:
                    <a href="/docs/references/config/vault-config"
                      >VaultConfig</a
                    >
                  </li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>void</li>
                </ul>
              </td>
              <td>
                Initializes the Vault runtime using the provided configuration
                and prepares the global feature cell registry. This function
                establishes the required Vault infrastructure and applies the
                supplied options for core initialization.<br /><br />
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
export class VaultComponent {}
