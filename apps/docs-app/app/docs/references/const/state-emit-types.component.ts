/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/state-emit-types">StateEmitTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-emit-types',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/const/state-emit-types">StateEmitTypes</a>
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Enumeration of state emission event classifications.<br /><br />
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
                <strong>IncomingPipeline</strong>
              </td>
              <td class="column-auto">
                <code>Incoming Pipeline</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FinalizePipeline</strong>
              </td>
              <td class="column-auto">
                <code>Finalize Pipeline</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>PipelineError</strong>
              </td>
              <td class="column-auto">
                <code>Pipeline Error</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>PipelineDestroy</strong>
              </td>
              <td class="column-auto">
                <code>Pipeline Destroy</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>PipelineReset</strong>
              </td>
              <td class="column-auto">
                <code>Pipeline Reset</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>AbortController</strong>
              </td>
              <td class="column-auto">
                <code>Abort Controller</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>DenyController</strong>
              </td>
              <td class="column-auto">
                <code>Deny Controller</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>TabSync</strong>
              </td>
              <td class="column-auto">
                <code>Tab Sync</code>
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
export class StateEmitTypesComponent {}
