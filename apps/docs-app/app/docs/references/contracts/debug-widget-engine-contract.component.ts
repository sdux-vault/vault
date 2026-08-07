/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/debug-widget-engine-contract">DebugWidgetEngineContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-engine-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contracts/debug-widget-engine-contract"
          >DebugWidgetEngineContract</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract defining the capabilities of the debug widget engine.<br /><br />
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
                <strong>buildEventStats</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    events:
                    <a href="/docs/references/shapes/debug-widget-event-shape"
                      >DebugWidgetEventShape</a
                    >[]
                  </li>
                  <li>longTasks?: literal type[]</li>
                </ul>
                <p>
                  returns:
                  <a
                    href="/docs/references/shapes/debug-widget-event-stat-shape"
                    >DebugWidgetEventStatShape</a
                  >
                </p>
              </td>
              <td>
                Builds aggregate statistics from a collection of debug
                events.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>getEnvironmentInfo</strong>

                <p>returns: unknown</p>
              </td>
              <td>
                Collects browser and runtime environment information.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>serializeRegistry</strong>

                <p>returns: unknown | undefined</p>
              </td>
              <td>
                Serializes the global
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                registry into a dump-ready structure.<br /><br />
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
export class DebugWidgetEngineContractComponent {}
