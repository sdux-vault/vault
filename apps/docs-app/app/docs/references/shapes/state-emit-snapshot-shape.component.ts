/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/state-emit-snapshot-shape">StateEmitSnapshotShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-emit-snapshot-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>StateEmitSnapshotShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape wrapping a state snapshot with its emission type and options.<br /><br />
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
                <strong>options</strong>

                <p class="type">type: unknown | undefined</p>
              </td>
              <td class="column-auto">
                Optional configuration passed with the emission.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>snapshot</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                The state snapshot at the time of emission.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/state-emit-type"
                    >StateEmitType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Classification of the state emission event.<br /><br />
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class StateEmitSnapshotShapeComponent {}
