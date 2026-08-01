/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/options/with-delay-controller-options">WithDelayControllerOptions</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-delay-controller-options',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>WithDelayControllerOptions</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Configuration options for the withDelay controller.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'addons'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'addons'" /></code></pre>
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
                <strong>millisecondDelay</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Delay in milliseconds before allowing a pipeline trace to
                proceed.<br /><br />
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
export class WithDelayControllerOptionsComponent {}
