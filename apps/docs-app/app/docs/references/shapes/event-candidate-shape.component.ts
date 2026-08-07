/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/event-candidate-shape">EventCandidateShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-event-candidate-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/shapes/event-candidate-shape"
          >EventCandidateShape</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Describes the shape of an in-flight pipeline candidate value captured
        after a pipeline stage completes. Used exclusively by the State Diff
        View in DevTools to compare state transformations across stages.<br /><br />
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
                <strong>hasValue</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether the candidate carries a defined value.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stage</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/pipeline-stage"
                    >PipelineStage</a
                  >
                </p>
              </td>
              <td class="column-auto">
                The pipeline stage that produced this candidate.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>value</strong>

                <p class="type">type: T | undefined</p>
              </td>
              <td class="column-auto">
                The in-flight pipeline value after the stage completed.<br /><br />
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
export class EventCandidateShapeComponent {}
