/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-license-summary-shape">DebugWidgetLicenseSummaryShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-license-summary-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/shapes/debug-widget-license-summary-shape"
          >DebugWidgetLicenseSummaryShape</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape summarizing license validation states across registered
        FeatureCells.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'dev-tools'" /></strong>
          project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'dev-tools'" /></code></pre>
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
                <strong>notRequired</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of FeatureCells that do not require a license.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>pending</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of FeatureCells with a pending license check.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>revoked</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of FeatureCells with a revoked license.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>timeout</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of FeatureCells that timed out during license
                verification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>valid</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of FeatureCells with a valid license.<br /><br />
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
export class DebugWidgetLicenseSummaryShapeComponent {}
