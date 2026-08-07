/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/log-level-types">LogLevelTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-log-level-types',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/const/log-level-types">LogLevelTypes</a>
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the allowable verbosity levels for Vault logging.<br /><br />
        A LogLevel controls the amount of diagnostic output emitted by the
        vault’s internal debug, warning, or error channels. Higher levels
        produce more detailed logs, while lower levels suppress output.<br /><br />
        - &#39;off&#39; — no logs are emitted - &#39;error&#39; — only errors
        are logged - &#39;warn&#39; — warnings and errors are logged -
        &#39;log&#39; — standard log events, warnings, and errors are logged -
        &#39;debug&#39; — all debug-level information is emitted<br /><br />
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
                <strong>Off</strong>
              </td>
              <td class="column-auto">
                <code>off</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Error</strong>
              </td>
              <td class="column-auto">
                <code>error</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Warn</strong>
              </td>
              <td class="column-auto">
                <code>warn</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Log</strong>
              </td>
              <td class="column-auto">
                <code>log</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Debug</strong>
              </td>
              <td class="column-auto">
                <code>debug</code>
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
export class LogLevelTypesComponent {}
