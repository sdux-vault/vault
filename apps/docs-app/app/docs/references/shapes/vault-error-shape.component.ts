/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/vault-error-shape">VaultErrorShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-error-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultErrorShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Canonical error representation emitted by the Vault pipeline.<br /><br />
        <a href="/docs/references/classes/vault-error">VaultError</a> normalizes
        thrown values from any pipeline stage into a consistent shape that addon
        error behaviors can transform and that consumers can observe from the
        global VaultErrorPublicService signal.<br /><br />
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
                <strong>details?</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Additional diagnostic or domain-specific details.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>featureCellKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Optional
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                key.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>message</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Human-readable error message.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>raw</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Raw thrown value captured before any normalization. Useful for
                debugging, logging, and devtools visualization.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>status?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Optional numeric status (HTTP or domain).<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>statusText?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Optional textual status text (e.g., HTTP status text).<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>timestamp</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Timestamp (epoch ms) when the error occurred. Enables reactive
                timelines and differentiating repeated errors.<br /><br />
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
export class VaultErrorShapeComponent {}
