/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/feature-cell">FeatureCell</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FeatureCell</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Creates and registers a Feature Cell using the provided configuration
        and optional behavior and controller contracts. This function produces a
        Feature Cell instance keyed by the descriptor and registers it for later
        resolution and usage.<br /><br />
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
                <p>
                  <strong
                    ><a href="/docs/references/functions/feature-cell"
                      >FeatureCell</a
                    >(descriptor, behaviors, controllers)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>
                    descriptor:
                    <a href="/docs/references/config/feature-cell-config"
                      >FeatureCellConfig</a
                    >
                  </li>
                  <li>behaviors: unknown</li>
                  <li>controllers: unknown</li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>
                    <a href="/docs/references/shapes/feature-cell-shape"
                      >FeatureCellShape</a
                    >&lt;T&gt;
                  </li>
                </ul>
              </td>
              <td>
                Creates and registers a Feature Cell using the provided
                configuration and optional behavior and controller contracts.
                This function produces a Feature Cell instance keyed by the
                descriptor and registers it for later resolution and usage.<br /><br />
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
export class FeatureCellComponent {}
