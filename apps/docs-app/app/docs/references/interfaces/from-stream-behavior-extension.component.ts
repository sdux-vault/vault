/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/from-stream-behavior-extension">FromStreamBehaviorExtension</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-from-stream-behavior-extension',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FromStreamBehaviorExtension</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Runtime extension contract for behaviors that expose a fromStream
        API.<br /><br />
        This interface defines the shape of the dynamically injected extension
        that enables streaming observable sources to participate in pipeline
        execution through a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        instance.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/core</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/core</code></pre>
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
                <strong>fromStream</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/behavior-ext-function"
                    >BehaviorExtFunction</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Function used to bridge an observable stream into the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                pipeline.<br /><br />
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
export class FromStreamBehaviorExtensionComponent {}
