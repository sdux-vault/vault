/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/http-resource-ref-shape">HttpResourceRefShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-http-resource-ref-shape',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>HttpResourceRefShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Structural interface representing a reactive, asynchronously resolved
        resource.<br /><br />
        This interface intentionally mirrors the *shape* of Angular’s
        HttpResourceRef without introducing any framework dependency. It is used
        by core Vault logic to interact with resource-backed values in a fully
        framework-agnostic way.<br /><br />
        Implementations may be backed by: - Angular HttpResourceRef - Signals -
        Observables - Promises - Custom adapters or test doubles<br /><br />
        Consumers should treat all methods as side-effect free accessors.<br /><br />
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
                <strong>error</strong>

                <p>returns: unknown</p>
              </td>
              <td>
                Returns the most recent error produced by the resource, if
                any.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>hasValue</strong>

                <p>returns: boolean</p>
              </td>
              <td>
                Indicates whether the resource currently holds a resolved
                value.<br /><br />
                This is semantically equivalent to checking value() !==
                undefined, but is provided explicitly to support resource
                implementations that track resolution state independently.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>isLoading</strong>

                <p>returns: boolean</p>
              </td>
              <td>
                Indicates whether the resource is currently loading.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>value</strong>

                <p>returns: T | undefined</p>
              </td>
              <td>
                Returns the current resolved value of the resource.<br /><br />
                - Returns undefined if the resource has not yet resolved -
                Returns a value of type T once available<br /><br />
                This method must be safe to call multiple times.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
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
export class HttpResourceRefShapeComponent {}
