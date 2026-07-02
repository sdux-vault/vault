/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/is-http-resource-ref">isHttpResourceRef</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-is-http-resource-ref',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>isHttpResourceRef</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Type guard that determines whether a value is an
        HttpResourceRef&amp;lt;T&amp;gt;. An HttpResourceRef is a structured
        object produced by Angular’s HttpClient resource APIs. It contains a
        standardized shape used by Vault to detect and normalize resource-backed
        state transitions. This utility checks only for the presence of the
        canonical HttpResourceRef fields (value, isLoading, error, hasValue) and
        does not validate the internal content of those properties.<br /><br />
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
                    ><a href="/docs/references/functions/is-http-resource-ref"
                      >isHttpResourceRef</a
                    >(obj)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>obj: any</li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>
                    <a href="/docs/references/shapes/http-resource-ref-shape"
                      >HttpResourceRefShape</a
                    >&lt;T&gt;
                  </li>
                </ul>
              </td>
              <td>
                Type guard that determines whether a value is an
                HttpResourceRef&amp;lt;T&amp;gt;. An HttpResourceRef is a
                structured object produced by Angular’s HttpClient resource
                APIs. It contains a standardized shape used by Vault to detect
                and normalize resource-backed state transitions. This utility
                checks only for the presence of the canonical HttpResourceRef
                fields (value, isLoading, error, hasValue) and does not validate
                the internal content of those properties.<br /><br />
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
export class isHttpResourceRefComponent {}
