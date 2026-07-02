/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/abstracts/licensing-abstract">LicensingAbstract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-licensing-abstract',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>LicensingAbstract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Abstract base class providing license lifecycle management for behaviors
        and controllers. Subclasses automatically request a license token during
        construction when the static needsLicense flag is set.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/engine</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/engine</code></pre>
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
                  <li>ctx: literal type</li>
                </ul>
              </td>
              <td>
                Creates a new licensing-aware instance and requests a license if
                required.<br /><br />
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
                <strong>#requestLicense</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Requests a license token from the licensing service.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>validateLicense</strong>

                <p>inputs:</p>
                <ul>
                  <li>valid: boolean</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Validates the previously requested license token.<br /><br />
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
                <strong>#featureCellKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Key of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                this instance belongs to.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#key</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Key identifying this behavior or controller.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#licenseService</strong>

                <p class="type">type: LicensingServiceContract</p>
              </td>
              <td class="column-auto">
                Licensing service used to request and validate licenses.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#licenseToken</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                License token received from the licensing service.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Static key assigned by the
                <a href="/docs/references/decorators/vault-behavior"
                  >VaultBehavior</a
                >
                or
                <a href="/docs/references/decorators/vault-controller"
                  >VaultController</a
                >
                decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>needsLicense</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this class requires a valid license to operate.<br /><br />
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class LicensingAbstractComponent {}
