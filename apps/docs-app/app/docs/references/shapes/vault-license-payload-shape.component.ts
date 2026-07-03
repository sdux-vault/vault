/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/vault-license-payload-shape">VaultLicensePayloadShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-license-payload-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultLicensePayloadShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape describing a verified Vault license payload surfaced on the global
        SDuX namespace for devtools and runtime consumption.<br /><br />
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
                <strong>domain</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Domain the license is scoped to.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>expires</strong>

                <p class="type">type: number | &quot;forever&quot;</p>
              </td>
              <td class="column-auto">
                Unix-epoch millisecond timestamp when the license expires, or
                &#39;forever&#39; for perpetual licenses.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>issuedAt</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Unix-epoch millisecond timestamp when the license was issued.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseType</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/vault-license-payload-type"
                    >VaultLicensePayloadType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                License tier classification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>organization</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Organization name the license was issued to.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>verified</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether the license signature was successfully verified.<br /><br />
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
export class VaultLicensePayloadShapeComponent {}
