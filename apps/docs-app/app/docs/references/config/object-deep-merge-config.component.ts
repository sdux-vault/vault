/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/config/object-deep-merge-config">ObjectDeepMergeConfig</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-object-deep-merge-config',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>ObjectDeepMergeConfig</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Configuration options for deep object merge behaviors.<br/><br/>
<a href="/docs/references/config/object-deep-merge-config">ObjectDeepMergeConfig</a> influences how nested object structures are merged
during a deep-merge operation. These settings are applied recursively by the
merge behavior and determine how undefined and null-valued fields are handled.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
            <strong>clearUndefined?</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            When enabled, incoming undefined values will clear matching properties
on the current state during the merge. When disabled, undefined values
leave existing fields unchanged.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>stripNulls?</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            When enabled, properties whose incoming value is null are removed from the
merged output. When disabled, incoming null values are preserved during the
merge operation.<br/><br/>
          </td>
        </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="section">
        <div class="section-title">Documentation Generation Notes</div>
        <div class="section-body">
          <p>
            This reference API documentation is generated from @jsdoc-annotated source code using
            @compodoc, with AI-assisted comments reviewed by a human prior to publication.
          </p>
        </div>
      </section>
    </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class ObjectDeepMergeConfigComponent {}
