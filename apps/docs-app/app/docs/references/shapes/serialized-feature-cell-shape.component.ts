/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/serialized-feature-cell-shape">SerializedFeatureCellShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-serialized-feature-cell-shape',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>SerializedFeatureCellShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing a serialized
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> entry
        in the debug registry.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/dev-tools</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/dev-tools</code></pre>
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
                <strong>behaviors</strong>

                <p class="type">type: any[]</p>
              </td>
              <td class="column-auto">
                Serialized behavior instances attached to this cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>behaviorsRegistered</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether behaviors have been registered for this cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>controllers</strong>

                <p class="type">type: any[]</p>
              </td>
              <td class="column-auto">
                Serialized controller instances attached to this cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>controllersRegistered</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether controllers have been registered for this cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>fluentApis</strong>

                <p class="type">type: any | null</p>
              </td>
              <td class="column-auto">
                Serialized fluent API extensions, or null if none exist.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
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
export class SerializedFeatureCellShapeComponent {}
