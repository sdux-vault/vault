/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/pipeline-persist-value">PipelinePersistValue</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-pipeline-persist-value',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>PipelinePersistValue</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Represents the value passed into persistence behaviors. A
        <a href="/docs/references/types/pipeline-persist-value"
          >PipelinePersistValue</a
        >&amp;lt;T&amp;gt; may be:<br /><br />
        T — the final, post-encryption state ready to be persisted undefined —
        indicating that no value should be written to storage<br /><br />
        Unlike upstream pipeline values, persistence values never include
        <a href="/docs/references/const/vault_noop">VAULT_NOOP</a>, because
        no-op handling is completed before the persistence stage begins.<br /><br />
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
type PipelinePersistValue = T | undefined;
          </code></pre>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class PipelinePersistValueComponent {}
