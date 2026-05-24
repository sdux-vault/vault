/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/options/aes256behavior-options">AES256BehaviorOptions</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-aes256behavior-options',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>AES256BehaviorOptions</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Defines configuration options for the AES-256 encryption behavior.
This interface represents the consumer-supplied contract required to configure encryption and key derivation.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/addons</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/addons</code></pre>
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
            <strong>aes256Secret</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Secret value used as the basis for AES-256 encryption.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>iterations</strong>
            
            <p class="type">type: number</p>
            
          </td>
          <td class="column-auto">
            Number of iterations used during key derivation.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>salt</strong>
            
            <p class="type">type: Uint8Array</p>
            
          </td>
          <td class="column-auto">
            Salt value applied during key derivation.<br/><br/>
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
export class AES256BehaviorOptionsComponent {}
