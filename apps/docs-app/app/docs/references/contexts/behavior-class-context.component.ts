/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/behavior-class-context">BehaviorClassContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-class-context',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contexts/behavior-class-context"
          >BehaviorClassContext</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Context provided to behavior class constructors during instantiation.<br /><br />
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
                <strong>behaviorConfig?</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional consumer-supplied configuration for this behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>conductorId</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for the conductor instance that owns this
                pipeline.<br /><br />
                Generated once per page load and shared across all behaviors and
                controllers within the same conductor.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>featureCellKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Key of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                this behavior instance operates within.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licensePayload?</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional license payload for behaviors requiring license
                validation.<br /><br />
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
export class BehaviorClassContextComponent {}
