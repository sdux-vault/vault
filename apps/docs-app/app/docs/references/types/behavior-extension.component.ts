/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/behavior-extension">BehaviorExtension</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-behavior-extension',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>BehaviorExtension</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        A map of extension function names to their implementation functions.
        Behaviors may return these objects to expose additional APIs on the
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        instance. Keys correspond to method names added to the cell’s public API
        surface.<br /><br />
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
      <div class="section-title">Type Definition</div>
      <div class="section-body">
        <pre class="code-inline"><code class="language-ts">
type BehaviorExtension = Partial&gt;;
          </code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Documentation Generation Notes</div>
      <div class="section-body">
        <p>
          This reference API documentation is generated from @jsdoc-annotated
          source code using @compodoc, with AI-assisted comments reviewed by a
          human prior to publication.
        </p>
      </div>
    </section>
  </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class BehaviorExtensionComponent {}
