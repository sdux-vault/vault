/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/interceptor-behavior-contract">InterceptorBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-interceptor-behavior-contract',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>InterceptorBehaviorContract</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Contract for interceptor behaviors that preprocess incoming state before resolve.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
      </div>
    </section>
<section class="section">
        <div class="section-title">Methods</div>
        <div class="section-body">
          <table aria-label="Methods">
            <thead>
              <tr>
                <th scope="col" class="column-300">Method</th>
                <th scope="col" class="column-auto">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
          <td>
            <strong>applyInterceptor</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li>
          </ul>
            <p>returns: Promise&lt;<a href="/docs/references/types/interceptor-state-type">InterceptorStateType</a>&lt;T&gt;&gt;</p>
          </td>
          <td>
            Applies the interceptor logic for the incoming state packet.<br/><br/>
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
export class InterceptorBehaviorContractComponent {}
