/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/state-input-shape">StateInputShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-input-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>StateInputShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Structured shape used to represent a state update packet flowing into
        the pipeline. Each field is optional, allowing callers to specify only
        the components of state they intend to update. This snapshot is
        interpreted by upstream behaviors including resolve, merge, filters, and
        reducers.<br /><br />
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
                <strong>error?</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional error information associated with the state update.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>loading?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates whether the feature is currently loading.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>value?</strong>

                <p class="type">
                  type: T | undefined | null |
                  <a href="/docs/references/types/deferred-type"
                    >DeferredType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                The state value to apply. This may be the raw state value or the
                resolved upstream value type as defined by the pipeline.<br /><br />
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
export class StateInputShapeComponent {}
