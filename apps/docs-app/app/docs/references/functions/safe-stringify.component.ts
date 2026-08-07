/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/safe-stringify">safeStringify</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-safe-stringify',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/functions/safe-stringify">safeStringify</a>
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Safely converts an arbitrary value into a JSON string representation.
        This function wraps JSON.stringify with enhanced handling for
        non-serializable values, including:<br /><br />
        functions Error objects Map and Set instances circular references<br /><br />
        If serialization fails for any reason, a fallback string
        &amp;quot;[unserializable]&amp;quot; is returned. The replacer ensures
        stable and predictable stringification for use in logging and debugging
        utilities.<br /><br />
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
                    ><a href="/docs/references/functions/safe-stringify"
                      >safeStringify</a
                    >(value)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>value: unknown</li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>string</li>
                </ul>
              </td>
              <td>
                Safely converts an arbitrary value into a JSON string
                representation. This function wraps JSON.stringify with enhanced
                handling for non-serializable values, including:<br /><br />
                functions Error objects Map and Set instances circular
                references<br /><br />
                If serialization fails for any reason, a fallback string
                &amp;quot;[unserializable]&amp;quot; is returned. The replacer
                ensures stable and predictable stringification for use in
                logging and debugging utilities.<br /><br />
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
export class safeStringifyComponent {}
