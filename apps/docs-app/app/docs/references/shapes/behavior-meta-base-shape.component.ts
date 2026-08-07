/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/behavior-meta-base-shape">BehaviorMetaBaseShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-meta-base-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/shapes/behavior-meta-base-shape"
          >BehaviorMetaBaseShape</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Metadata shared by every registered behavior.<br /><br />
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
                <strong>configKey?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Configuration key used to locate behavior options in the config
                registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this behavior is critical to pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseId?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                License identifier used for license validation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>needsLicense?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this behavior requires a valid license to operate.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this behavior requires consumer-supplied
                configuration.<br /><br />
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
export class BehaviorMetaBaseShapeComponent {}
