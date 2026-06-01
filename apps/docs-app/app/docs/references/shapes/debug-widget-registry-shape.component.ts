/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-registry-shape">DebugWidgetRegistryShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-debug-widget-registry-shape',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetRegistryShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing the serialized
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        registry in a debug dump.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/dev-tools</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/dev-tools</code></pre>
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
                <strong>featureCells</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/shapes/serialized-feature-cell-shape"
                    >SerializedFeatureCellShape</a
                  >[]
                </p>
              </td>
              <td class="column-auto">
                Array of serialized
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                entries.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseSummary?</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/shapes/debug-widget-license-summary-shape"
                    >DebugWidgetLicenseSummaryShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Optional summary of license states across all cells.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>totalFeatureCells</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Total number of registered FeatureCells.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Documentation Generation Notes</div>
      <div class="section-body">
        <p>
          This reference API documentation is generated from @jsdoc-annotated
          source code using @compodoc, with AI-assisted comments reviewed by a
          human prior to publication.
        </p>
      </div>
    </section>
  </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class DebugWidgetRegistryShapeComponent {}
