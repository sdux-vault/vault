/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/provide-feature-cell">provideFeatureCell</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-provide-feature-cell',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>provideFeatureCell</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Angular provider factory that registers and exposes a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        instance. This function creates the dependency injection providers
        required to construct a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>, adapt
        it for Angular-specific consumption, and register it for global access
        using the provided configuration.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/angular</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/angular</code></pre>
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
                    ><a href="/docs/references/functions/provide-feature-cell"
                      >provideFeatureCell</a
                    >(service, descriptor, behaviors, controllers)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>service: Type</li>
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
                  <li>Provider[]</li>
                </ul>
              </td>
              <td>
                Angular provider factory that registers and exposes a
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                instance. This function creates the dependency injection
                providers required to construct a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >, adapt it for Angular-specific consumption, and register it
                for global access using the provided configuration.<br /><br />
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
export class provideFeatureCellComponent {}
