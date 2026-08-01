/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-trace-event-args-shape">DebugWidgetTraceEventArgsShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-trace-event-args-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetTraceEventArgsShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing optional arguments attached to a Chrome trace
        event.<br /><br />
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
                <strong>behavior?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Behavior key associated with the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>cell?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                key associated with the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>latency?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">Latency category label.<br /><br /></td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>scheduler?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Detected scheduler classification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>source?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Event source classification.<br /><br />
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
export class DebugWidgetTraceEventArgsShapeComponent {}
