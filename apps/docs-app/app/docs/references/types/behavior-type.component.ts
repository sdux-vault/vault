/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/types/behavior-type">BehaviorType</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-type',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>BehaviorType</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Union of all valid behavior type strings. This type is derived from
        <a href="/docs/references/const/behavior-types">BehaviorTypes</a> using
        literal inference, ensuring strong typing while preserving full runtime
        compatibility. This type should not be manually extended—add new values
        to
        <a href="/docs/references/const/behavior-types">BehaviorTypes</a>
        instead.<br /><br />
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
        <p>
          <strong
            ><a href="/docs/references/types/behavior-type"
              >BehaviorType</a
            ></strong
          >
          is a derived type alias.
        </p>
        <p>
          Its definition is inferred from another symbol at compile time and
          cannot be expanded into a concrete union at runtime.
        </p>
        <p>
          See the description above for details on how this type is constructed.
        </p>
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
export class BehaviorTypeComponent {}
