/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/core-error-behavior-contract">CoreErrorBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-core-error-behavior-contract',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>CoreErrorBehaviorContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for behaviors that normalize raw errors into structured vault
        errors.<br /><br />
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
                <strong>handleError</strong>

                <p>inputs:</p>
                <ul>
                  <li>error: unknown</li>
                  <li>featureCellKey: string</li>
                </ul>
                <p>
                  returns:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                </p>
              </td>
              <td>
                Converts an unknown error value into a normalized vault error
                shape.<br /><br />
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
export class CoreErrorBehaviorContractComponent {}
