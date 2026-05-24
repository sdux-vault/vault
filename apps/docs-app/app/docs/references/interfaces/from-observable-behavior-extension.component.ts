/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/interfaces/from-observable-behavior-extension">FromObservableBehaviorExtension</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-from-observable-behavior-extension',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>FromObservableBehaviorExtension</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Extension contract for observable-based <a href="/docs/references/functions/feature-cell">FeatureCell</a> integration.<br/><br/>
This interface defines the shape of the dynamically injected
fromObservable API that allows a <a href="/docs/references/functions/feature-cell">FeatureCell</a> to accept observable
sources and expose them as normalized vault state references.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/core</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/core</code></pre>
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
            <strong>fromObservable</strong>
            
            <p class="type">type: <a href="/docs/references/types/behavior-ext-function">BehaviorExtFunction</a></p>
            
          </td>
          <td class="column-auto">
            Behavior extension function that installs the fromObservable API.<br/><br/>
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
export class FromObservableBehaviorExtensionComponent {}
