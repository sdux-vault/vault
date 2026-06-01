/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/resolve-types">ResolveTypes</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-resolve-types',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>ResolveTypes</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Enumerates the available resolve strategy identifiers used by resolve
        behaviors. These identifiers indicate how a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        obtains its initial and subsequent state values during the resolve stage
        of the pipeline.<br /><br />
        - Value — Resolve from a synchronous, in-memory value. - HttpResource —
        Resolve using an HTTP-driven resource behavior. - Observable — Resolve
        from an observable stream source. - Promise — Resolve from a promise
        source.<br /><br />
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
                <strong>HttpResource</strong>
              </td>
              <td class="column-auto">
                <code>http-resource</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Observable</strong>
              </td>
              <td class="column-auto">
                <code>observable</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Promise</strong>
              </td>
              <td class="column-auto">
                <code>promise</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>Value</strong>
              </td>
              <td class="column-auto">
                <code>value</code>
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
export class ResolveTypesComponent {}
