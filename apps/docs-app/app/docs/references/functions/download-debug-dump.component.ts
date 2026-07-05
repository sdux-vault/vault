/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/functions/download-debug-dump">downloadDebugDump</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-download-debug-dump',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>downloadDebugDump</h3>
    </div>
    <header class="docs-header">
      <div class="lead">Downloads a debug dump as a JSON file.<br /><br /></div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/dev-tools</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/dev-tools</code></pre>
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
                    ><a href="/docs/references/functions/download-debug-dump"
                      >downloadDebugDump</a
                    >(dump)</strong
                  >
                </p>
                <p>inputs:</p>
                <ul>
                  <li>
                    dump:
                    <a href="/docs/references/shapes/debug-widget-dump-shape"
                      >DebugWidgetDumpShape</a
                    >
                  </li>
                </ul>
                <p>returns:</p>
                <ul>
                  <li>void</li>
                </ul>
              </td>
              <td>Downloads a debug dump as a JSON file.<br /><br /></td>
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
export class downloadDebugDumpComponent {}
