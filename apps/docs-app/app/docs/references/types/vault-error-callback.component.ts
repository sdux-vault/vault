/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/vault-error-callback">VaultErrorCallback</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-error-callback',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>VaultErrorCallback</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Callback function signature used for observing errors emitted during
the <a href="/docs/references/functions/feature-cell">FeatureCell</a> error-handling pipeline.
An ErrorCallback receives the normalized &#123;&#64;link <a href="/docs/references/shapes/vault-error-shape">VaultErrorShape</a>&#125; produced by
the pipeline and a read-only &#123;&#64;link <a href="/docs/references/shapes/state-snapshot-shape">StateSnapshotShape</a>&#125; representing the
<a href="/docs/references/functions/feature-cell">FeatureCell</a>’s state at the time the error occurred.
This callback type performs no transformation of the pipeline value;
implementations are expected to execute side effects only, such as logging
or reporting. Returning a value has no effect on pipeline behavior.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
      </div>
    </section>
<section class="section">
        <div class="section-title">Type Definition</div>
        <div class="section-body">
          <pre class="code-inline"><code class="language-ts">
type VaultErrorCallback = function;
          </code></pre>
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
export class VaultErrorCallbackComponent {}
