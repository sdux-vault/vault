/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/event-boundary-types">EventBoundaryTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-event-boundary-types',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/const/event-boundary-types"
          >EventBoundaryTypes</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Enumeration of event boundary positions within a lifecycle span.<br /><br />
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
                <strong>Candidate</strong>
              </td>
              <td class="column-auto">
                <code>candidate</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>End</strong>
              </td>
              <td class="column-auto">
                <code>end</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Notification</strong>
              </td>
              <td class="column-auto">
                <code>notification</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Start</strong>
              </td>
              <td class="column-auto">
                <code>start</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Unknown</strong>
              </td>
              <td class="column-auto">
                <code>unknown</code>
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
export class EventBoundaryTypesComponent {}
