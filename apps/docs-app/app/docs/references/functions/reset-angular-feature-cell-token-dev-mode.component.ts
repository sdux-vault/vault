/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/reset-angular-feature-cell-token-dev-mode">resetAngularFeatureCellTokenDevMode</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-reset-angular-feature-cell-token-dev-mode',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>resetAngularFeatureCellTokenDevMode</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Resets all
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> token
        state for development or test isolation. This function clears internal
        token registries and is only active when development mode is enabled.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'angular'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'angular'" /></code></pre>
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
                    ><a
                      href="/docs/references/functions/reset-angular-feature-cell-token-dev-mode"
                      >resetAngularFeatureCellTokenDevMode</a
                    >()</strong
                  >
                </p>

                <p>returns:</p>
                <ul>
                  <li>void</li>
                </ul>
              </td>
              <td>
                Resets all
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                token state for development or test isolation. This function
                clears internal token registries and is only active when
                development mode is enabled.<br /><br />
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
export class resetAngularFeatureCellTokenDevModeComponent {}
