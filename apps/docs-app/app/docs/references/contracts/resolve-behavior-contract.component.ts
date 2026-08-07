/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/resolve-behavior-contract">ResolveBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-resolve-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contracts/resolve-behavior-contract"
          >ResolveBehaviorContract</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for resolve behaviors that derive initial state from an
        external source.<br /><br />
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
                <strong>computeResolve</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Promise |
                  <a href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >
                </p>
              </td>
              <td>
                Computes the resolved state value for the current pipeline
                operation.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
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
                <strong>resolveType</strong>

                <p class="type">
                  type: &quot;http-resource&quot; | &quot;observable&quot; |
                  &quot;promise&quot; | &quot;value&quot;
                </p>
              </td>
              <td class="column-auto">
                Resolve strategy used by this behavior (value, HTTP resource,
                observable, etc.).<br /><br />
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
export class ResolveBehaviorContractComponent {}
