/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/behavior-types">BehaviorTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-types',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>BehaviorTypes</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Runtime-safe registry of all behavior types.<br /><br />
        This object acts as an enum substitute without introducing JavaScript
        enum overhead. Values are string literals preserved at runtime and
        suitable for switch statements, comparisons, and pipeline
        classification. Each key maps 1:1 to its string literal value. The
        structure is fully tree-shakable and safely inferable by TypeScript.<br /><br />
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
                <strong>CoreAfterTap</strong>
              </td>
              <td class="column-auto">
                <code>coreAfterTap</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreBeforeTap</strong>
              </td>
              <td class="column-auto">
                <code>coreBeforeTap</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreError</strong>
              </td>
              <td class="column-auto">
                <code>coreError</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreErrorCallback</strong>
              </td>
              <td class="column-auto">
                <code>coreErrorCallback</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreState</strong>
              </td>
              <td class="column-auto">
                <code>coreState</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Encrypt</strong>
              </td>
              <td class="column-auto">
                <code>encrypt</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreEmitState</strong>
              </td>
              <td class="column-auto">
                <code>coreEmitState</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>CoreLicense</strong>
              </td>
              <td class="column-auto">
                <code>coreLicense</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ErrorTransform</strong>
              </td>
              <td class="column-auto">
                <code>errorTransform</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Extension</strong>
              </td>
              <td class="column-auto">
                <code>extension</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Filter</strong>
              </td>
              <td class="column-auto">
                <code>filter</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FromObservable</strong>
              </td>
              <td class="column-auto">
                <code>fromObservable</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FromPromise</strong>
              </td>
              <td class="column-auto">
                <code>fromPromise</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FromStream</strong>
              </td>
              <td class="column-auto">
                <code>fromStream</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Interceptor</strong>
              </td>
              <td class="column-auto">
                <code>interceptor</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Merge</strong>
              </td>
              <td class="column-auto">
                <code>merge</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Operator</strong>
              </td>
              <td class="column-auto">
                <code>operator</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Persist</strong>
              </td>
              <td class="column-auto">
                <code>persist</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Reduce</strong>
              </td>
              <td class="column-auto">
                <code>reduce</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Resolve</strong>
              </td>
              <td class="column-auto">
                <code>resolve</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>StepwiseFilter</strong>
              </td>
              <td class="column-auto">
                <code>stepwiseFilter</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>StepwiseReducer</strong>
              </td>
              <td class="column-auto">
                <code>stepwiseReducer</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>StepwiseResolve</strong>
              </td>
              <td class="column-auto">
                <code>stepwiseResolve</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>TabSyncState</strong>
              </td>
              <td class="column-auto">
                <code>tabSyncState</code>
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class BehaviorTypesComponent {}
