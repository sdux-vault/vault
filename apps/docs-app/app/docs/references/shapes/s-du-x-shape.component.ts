/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/s-du-x-shape">SDuXShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-s-du-x-shape',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>SDuXShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape of the global SDuX runtime namespace attached to the window
        object.<br /><br />
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
                <strong>debugWidget?</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Optional debug widget configuration for devtools integration.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>getRegistry?</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Returns a read-only snapshot of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>license?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/vault-license-payload-shape"
                    >VaultLicensePayloadShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Verified license payload, populated after successful token
                verification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>replay?</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                DevTools replay API for accessing live
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                instances.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>vaultEventBus?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/contracts/event-bus-contract"
                    >EventBusContract</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Global Vault event bus instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>vaultMonitorInstance?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/contracts/vault-monitor-contract"
                    >VaultMonitorContract</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Global Vault monitor instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>versions?</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Registered package versions keyed by npm package name.<br /><br />
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
export class SDuXShapeComponent {}
