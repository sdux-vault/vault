/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/controller-class-context">ControllerClassContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-controller-class-context',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>ControllerClassContext</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Runtime context supplied to controller class instances during pipeline
        execution.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/shared</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
                <strong>controllerConfig?</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional configuration object for this controller.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>featureCellKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                this controller is attached to.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseApproved?</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Signals that the license was approved for the given trace.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseDenied?</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Signals that the license was denied for the given trace.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licensePayload?</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional license payload associated with this controller.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>requestAbort</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Requests an abort for the pipeline identified by the trace
                ID.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>requestRevote</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Requests a revote for the pipeline identified by the trace
                ID.<br /><br />
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
export class ControllerClassContextComponent {}
