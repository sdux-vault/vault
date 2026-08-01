/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/debug-widget-event-source-types">DebugWidgetEventSourceTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-event-source-types',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetEventSourceTypes</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Available event source classifications for debug widget events.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'dev-tools'" /></strong>
          project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'dev-tools'" /></code></pre>
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
                <strong>UI</strong>
              </td>
              <td class="column-auto">
                <code>ui</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Stream</strong>
              </td>
              <td class="column-auto">
                <code>stream</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Timer</strong>
              </td>
              <td class="column-auto">
                <code>timer</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Internal</strong>
              </td>
              <td class="column-auto">
                <code>internal</code>
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
export class DebugWidgetEventSourceTypesComponent {}
