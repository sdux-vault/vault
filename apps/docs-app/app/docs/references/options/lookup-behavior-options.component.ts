/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/options/lookup-behavior-options">LookupBehaviorOptions</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-lookup-behavior-options',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>LookupBehaviorOptions</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines configuration options for lookup behavior execution.<br /><br />
        This interface specifies how entities are identified, how missing
        entities are fetched, and which resolve strategy is used when submitting
        the fetch result into the pipeline.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/addons</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/addons</code></pre>
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
                <strong>fetch</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Function invoked to retrieve an entity when it is not present in
                cache.<br /><br />
                The returned value is submitted directly into the pipeline for
                resolution according to the configured resolve type.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>fetchType</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/resolve-type">ResolveType</a>
                </p>
              </td>
              <td class="column-auto">
                Resolve strategy used when processing the fetch result.<br /><br />
                This value determines how the pipeline interprets the value
                returned from the fetch function.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>idKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Property name on the entity used as the lookup identifier.<br /><br />
                The value resolved from this property is used to match and
                retrieve entities during lookup operations.<br /><br />
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
export class LookupBehaviorOptionsComponent {}
