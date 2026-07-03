/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/feature-cell-shape">FeatureCellShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-feature-cell-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FeatureCellShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the public shape of a Feature Cell with an exposed resolved
        state reference. This interface extends the base Feature Cell contract
        by adding access to the reactive state produced by resolution.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/engine</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/engine</code></pre>
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
                <strong>state</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/interfaces/vault-state-ref"
                    >VaultStateRef</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Reactive reference to the Feature Cell resolved state.<br /><br />
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
export class FeatureCellShapeComponent {}
