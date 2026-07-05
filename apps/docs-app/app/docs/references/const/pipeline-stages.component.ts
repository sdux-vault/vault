/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/pipeline-stages">PipelineStages</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-pipeline-stages',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>PipelineStages</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Enumeration of pipeline stages that produce state-transforming snapshots
        for DevTools diffing.<br /><br />
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
                <strong>PipelineStart</strong>
              </td>
              <td class="column-auto">
                <code>pipeline-start</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Resolve</strong>
              </td>
              <td class="column-auto">
                <code>resolve</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ComputeMerge</strong>
              </td>
              <td class="column-auto">
                <code>compute-merge</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Operator</strong>
              </td>
              <td class="column-auto">
                <code>operator</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Filter</strong>
              </td>
              <td class="column-auto">
                <code>filter</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Reducer</strong>
              </td>
              <td class="column-auto">
                <code>reducer</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreState</strong>
              </td>
              <td class="column-auto">
                <code>core-state</code>
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
export class PipelineStagesComponent {}
