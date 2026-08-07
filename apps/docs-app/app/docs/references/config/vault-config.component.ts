/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/config/vault-config">VaultConfig</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-config',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2><a href="/docs/references/config/vault-config">VaultConfig</a></h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Configuration options supplied to Vault at initialization.<br /><br />
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
                <strong>bypassLicensing?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Skips license enforcement during development.<br /><br />
                Only honored when devMode is true. When both devMode and
                bypassLicensing are true, Vault allows unlicensed extensions to
                initialize without a valid license token. Defaults to true when
                devMode is enabled.<br /><br />
                Set to false with devMode: true to exercise license validation
                against the development public key in integration tests.<br /><br />
                Ignored entirely when devMode is false (production) — licensing
                is always enforced with the production key regardless of this
                flag.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>devMode?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Enables development-mode diagnostics and additional internal
                checks. When true, Vault emits more verbose warnings and
                validation errors.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenses?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/vault-licensing-shape"
                    >VaultLicensingShape</a
                  >[]
                </p>
              </td>
              <td class="column-auto">
                Optional array of pre-registered license payloads.<br /><br />
                Vault stores these payloads in memory at startup and makes them
                retrievable via getLicensePayload(licenseId). Vault does not
                validate or interpret the payload — vendors are responsible for
                validation logic.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseTimeoutMs?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Maximum time (in milliseconds) Vault will wait for a required
                license to be validated before marking it as timed out.<br /><br />
                If validation does not occur within this window, the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is denied. Defaults to 15,000 ms. Set to 0 to disable
                timeout.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>logLevel?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/log-level-type"
                    >LogLevelType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Controls the verbosity of internal logging. Common levels:
                &#39;debug&#39; | &#39;info&#39; | &#39;warn&#39; |
                &#39;error&#39; | &#39;off&#39;.<br /><br />
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
export class VaultConfigComponent {}
