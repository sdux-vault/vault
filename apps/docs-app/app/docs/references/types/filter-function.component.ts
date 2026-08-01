/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/filter-function">FilterFunction</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-filter-function',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>FilterFunction</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        A pure function used by the Filter behavior stage. A filter receives the
        current state value and must return either the same value or a
        transformed version of it. Implementations must be pure: they must not
        mutate the input value, trigger side effects, or access external mutable
        state. Filters execute before reducers and tap behaviors.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Type Definition</div>
      <div class="section-body">
        <pre class="code-inline"><code class="language-ts">
type FilterFunction = function;
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
export class FilterFunctionComponent {}
