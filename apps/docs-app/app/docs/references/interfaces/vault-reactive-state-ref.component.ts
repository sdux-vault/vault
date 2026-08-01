/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/vault-reactive-state-ref">VaultReactiveStateRef</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-reactive-state-ref',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>VaultReactiveStateRef</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Vue reactive State surface exposed by a wrapped
        <a href="/docs/references/functions/feature-cell">FeatureCell</a
        >.<br /><br />
        This interface defines the composable API used by Vue components to
        consume
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        snapshots reactively without weakening the core runtime&#39;s snapshot
        immutability guarantees.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'vue'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'vue'" /></code></pre>
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
                <strong>useReactiveState</strong>

                <p>
                  returns: Readonly&lt;<a
                    href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >&lt;T&gt;&gt;
                </p>
              </td>
              <td>
                Subscribes the active Vue effect scope to
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                updates and returns the latest committed snapshot as a readonly
                reactive object.<br /><br />
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
export class VaultReactiveStateRefComponent {}
