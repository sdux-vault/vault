/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/vault-signal-state-ref">VaultSignalStateRef</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-signal-state-ref',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>VaultSignalStateRef</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Reactive signal-based view of a <a href="/docs/references/functions/feature-cell">FeatureCell</a>’s current state.<br/><br/>
This interface defines the set of Angular signals exposed for observing
loading status, resolved value, error state, and value presence for a
<a href="/docs/references/functions/feature-cell">FeatureCell</a>.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/angular</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/angular</code></pre>
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
            
            <p class="type">type: Signal</p>
            
          </td>
          <td class="column-auto">
            Holds the most recent error emitted by the pipeline or null when no error exists.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>hasValue</strong>
            
            <p class="type">type: Signal</p>
            
          </td>
          <td class="column-auto">
            Indicates whether the <a href="/docs/references/functions/feature-cell">FeatureCell</a> currently holds a non-null resolved value.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>isLoading</strong>
            
            <p class="type">type: Signal</p>
            
          </td>
          <td class="column-auto">
            Indicates whether the <a href="/docs/references/functions/feature-cell">FeatureCell</a> is currently processing a pipeline operation.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>value</strong>
            
            <p class="type">type: Signal&gt;</p>
            
          </td>
          <td class="column-auto">
            Holds the resolved pipeline value or undefined when no value is present.<br/><br/>
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
export class VaultSignalStateRefComponent {}
