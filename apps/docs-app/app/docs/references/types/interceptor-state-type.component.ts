/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/interceptor-state-type">InterceptorStateType</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-interceptor-state-type',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>InterceptorStateType</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Represents the full set of values an interceptor may return to the
orchestrator during the interceptor stage.
Interceptors may either:<br/><br/>
forward the original &#123;&#64;link <a href="/docs/references/types/state-input-type">StateInputType</a>&#125; value unchanged,
replace it with a transformed &#123;&#64;link <a href="/docs/references/types/state-input-type">StateInputType</a>&#125;, or
return the reserved &#123;&#64;link <a href="/docs/references/const/vault_stop">VAULT_STOP</a>&#125; symbol to indicate that
pipeline execution should halt for the current write operation.<br/><br/>
Returning <a href="/docs/references/const/vault_stop">VAULT_STOP</a> instructs the orchestrator to abort further
processing of the incoming state while maintaining deterministic
pipeline flow. This symbol is treated as an explicit control signal
and is not a user-provided state value.<br/><br/></div>
        
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
type InterceptorStateType = StateInputType | unknown;
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
export class InterceptorStateTypeComponent {}
