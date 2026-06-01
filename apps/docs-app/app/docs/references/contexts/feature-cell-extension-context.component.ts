/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/feature-cell-extension-context">FeatureCellExtensionContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-feature-cell-extension-context',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>FeatureCellExtensionContext</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Runtime context provided to behavior extensions for interacting with a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
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
                <strong>mergeState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    incoming:
                    <a href="/docs/references/types/state-input-type"
                      >StateInputType</a
                    >
                  </li>
                  <li>options?: unknown</li>
                </ul>
                <p>returns: Promise&lt;void&gt;</p>
              </td>
              <td>
                Merges incoming state into the current
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>replaceState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    input:
                    <a href="/docs/references/types/state-input-type"
                      >StateInputType</a
                    >
                  </li>
                  <li>options?: unknown</li>
                </ul>
                <p>returns: Promise&lt;void&gt;</p>
              </td>
              <td>
                Replaces the current
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state with the provided input.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
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
                <strong>destroyed$</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Observable that emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>featureCellKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>options?</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional configuration options for the extension context.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>reset$</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Observable that emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is reset.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state$</strong>

                <p class="type">type: Observable&gt;</p>
              </td>
              <td class="column-auto">
                Observable stream of state-emit snapshots from the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>vaultMonitor</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/contracts/vault-monitor-contract"
                    >VaultMonitorContract</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Reference to the Vault monitor for diagnostics and tracing.<br /><br />
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
export class FeatureCellExtensionContextComponent {}
