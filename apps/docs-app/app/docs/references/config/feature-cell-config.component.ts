/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/config/feature-cell-config">FeatureCellConfig</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell-config',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FeatureCellConfig</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Declarative configuration for constructing a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
        This interface defines the minimum information required to identify,
        initialize, and optionally observe a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        instance within the Vault system.<br /><br />
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
                <strong>initialState</strong>

                <p class="type">type: T</p>
              </td>
              <td class="column-auto">
                Initial state value that seeds the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>insights?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/config/insight-config"
                    >InsightConfig</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Optional insight configuration used for enabling diagnostics or
                devtools-related observations.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier assigned to the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                instance.<br /><br />
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
export class FeatureCellConfigComponent {}
