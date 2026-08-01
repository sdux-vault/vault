/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/vault-sync-external-store-ref">VaultSyncExternalStoreRef</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-sync-external-store-ref',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultSyncExternalStoreRef</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        React render-time subscription surface exposed by a wrapped
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
        This interface defines the explicit hook-based API used by React
        components to subscribe to
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        snapshots during render without weakening the core runtime&#39;s
        snapshot immutability guarantees.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'react'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'react'" /></code></pre>
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
                <strong>useSyncExternalStore</strong>

                <p>
                  returns:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Subscribes the current React render to
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                updates and returns the latest committed snapshot.<br /><br />
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
export class VaultSyncExternalStoreRefComponent {}
