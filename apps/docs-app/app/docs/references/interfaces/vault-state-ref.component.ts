/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/vault-state-ref">VaultStateRef</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-state-ref',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>VaultStateRef</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Stub interface representing a read-only reference to Vault state.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/engine</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/engine</code></pre>
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
            <strong>error</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/vault-error-shape">VaultErrorShape</a> | null</p>
            
          </td>
          <td class="column-auto">
            The current error, or null if no error exists.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>hasValue</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether the state holds a resolved value.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>isLoading</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether the state is currently loading.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>value</strong>
            
            <p class="type">type: <a href="/docs/references/types/pipeline-value">PipelineValue</a></p>
            
          </td>
          <td class="column-auto">
            The current pipeline value.<br/><br/>
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
export class VaultStateRefComponent {}
