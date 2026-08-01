/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/define-behavior-key">defineBehaviorKey</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-define-behavior-key',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>defineBehaviorKey</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Creates a normalized behavior key identifier used for behavior
        registration. A behavior key uniquely identifies a behavior within the
        Vault pipeline, following the canonical format:
        SDUX::&amp;lt;Domain&amp;gt;::&amp;lt;Name&amp;gt; Both domain and name
        are normalized by:<br /><br />
        capitalizing the first character removing all non-alphanumeric
        characters<br /><br />
        This ensures consistent and predictable behavior keys for orchestration,
        diagnostics, and tooling.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
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
                    ><a href="/docs/references/functions/define-behavior-key"
                      >defineBehaviorKey</a
                    >(domain, name)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>domain: string</li>
                  <li>name: string</li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>string</li>
                </ul>
              </td>
              <td>
                Creates a normalized behavior key identifier used for behavior
                registration. A behavior key uniquely identifies a behavior
                within the Vault pipeline, following the canonical format:
                SDUX::&amp;lt;Domain&amp;gt;::&amp;lt;Name&amp;gt; Both domain
                and name are normalized by:<br /><br />
                capitalizing the first character removing all non-alphanumeric
                characters<br /><br />
                This ensures consistent and predictable behavior keys for
                orchestration, diagnostics, and tooling.<br /><br />
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
export class defineBehaviorKeyComponent {}
