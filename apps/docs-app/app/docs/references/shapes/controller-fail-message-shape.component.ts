/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/controller-fail-message-shape">ControllerFailMessageShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-fail-message-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>ControllerFailMessageShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Message shape dispatched to controllers when a pipeline operation
        fails.<br /><br />
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
                <strong>ctx</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/contexts/controller-context"
                    >ControllerContext</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Controller context for the current pipeline operation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>error</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                  | unknown
                </p>
              </td>
              <td class="column-auto">
                Error that caused the pipeline failure.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Discriminant identifying this as a failure message.<br /><br />
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
export class ControllerFailMessageShapeComponent {}
