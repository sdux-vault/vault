/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/classes/svelte-feature-cell-adapter">SvelteFeatureCellAdapter</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-svelte-feature-cell-adapter',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/classes/svelte-feature-cell-adapter"
          >SvelteFeatureCellAdapter</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Svelte adapter that augments the existing
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> State
        getter with Svelte reactive effect tracking.<br /><br />
        The adapted getter preserves synchronous Snapshot access while allowing
        Svelte templates, derived values, and effects to react to State
        changes.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'svelte'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'svelte'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Constructor</div>
      <div class="section-body">
        <table aria-label="Constructor">
          <thead>
            <tr>
              <th scope="col" class="column-300">Signature</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>constructor</strong>
                <p>inputs:</p>
                <ul>
                  <li>
                    core:
                    <a href="/docs/references/shapes/feature-cell-shape"
                      >FeatureCellShape</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a
                <a href="/docs/references/classes/svelte-feature-cell-adapter"
                  >SvelteFeatureCellAdapter</a
                >
                for the provided core
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
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
                <strong>build</strong>

                <p>
                  returns:
                  <a href="/docs/references/shapes/feature-cell-shape"
                    >FeatureCellShape</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Builds and returns the Svelte-augmented
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                instance.<br /><br />
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
                <strong>#readState</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Reads the original core
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                State getter.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#stateTracker</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: SvelteStateTracker</p>
              </td>
              <td class="column-auto">
                Connects reactive State reads to the Svelte effect lifecycle.<br /><br />
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
export class SvelteFeatureCellAdapterComponent {}
