/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/stepwise-function">StepwiseFunction</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-stepwise-function',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>StepwiseFunction</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the callback signature invoked during a stepwise behavior
        evaluation. This function receives the current state snapshot, the
        candidate value under evaluation, and a decision control object that
        determines how the pipeline proceeds at the stepwise stage.<br /><br />
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
      <div class="section-title">Type Definition</div>
      <div class="section-body">
        <pre class="code-inline"><code class="language-ts">
type StepwiseFunction = function;
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
export class StepwiseFunctionComponent {}
