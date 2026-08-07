/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/options/state-cache-behavior-options">StateCacheBehaviorOptions</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-cache-behavior-options',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/options/state-cache-behavior-options"
          >StateCacheBehaviorOptions</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines configuration options that control state cache behavior.<br /><br />
        These options specify cache lifetime, entity identification, and how
        cache misses are resolved through the state pipeline.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'addons'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'addons'" /></code></pre>
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
                <strong>fetch</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Function invoked to resolve an entity when a cache miss
                occurs.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>fetchType</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/resolve-type">ResolveType</a>
                </p>
              </td>
              <td class="column-auto">
                Resolution strategy used to execute cache miss fetch
                operations.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>idKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Property name used to extract a unique identifier from
                entities.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ttl</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/cache-ttl-type"
                    >CacheTTLType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Time-to-live value that determines how long cached entries
                remain valid.<br /><br />
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
export class StateCacheBehaviorOptionsComponent {}
