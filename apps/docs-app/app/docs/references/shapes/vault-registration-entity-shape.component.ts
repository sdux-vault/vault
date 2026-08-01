/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/vault-registration-entity-shape">VaultRegistrationEntityShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-registration-entity-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultRegistrationEntityShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape describing a registered behavior or controller entity within a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
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
                <strong>critical?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this entity is critical to pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this entity.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseId?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                License identifier associated with this entity.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>needsLicense?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this entity requires a valid license.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Entity type classification string.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>validLicense?</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/types/vault-registration-license-status-type"
                    >VaultRegistrationLicenseStatusType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Current license validation status for this entity.<br /><br />
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
export class VaultRegistrationEntityShapeComponent {}
