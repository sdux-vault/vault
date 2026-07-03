/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/licensable-class-context">LicensableClassContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-licensable-class-context',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>LicensableClassContext</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Minimal context contract shared by any class that participates in Vault
        license validation (behaviors and controllers).<br /><br />
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
                <strong>featureCellKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Key identifying the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                subject to license validation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licensePayload?</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional license payload provided during
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                registration.<br /><br />
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
export class LicensableClassContextComponent {}
