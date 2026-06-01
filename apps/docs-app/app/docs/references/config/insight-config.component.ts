/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/config/insight-config">InsightConfig</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-insight-config',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>InsightConfig</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines configuration options that control which data is included in
        emitted insight events. This interface allows consumers to specify the
        level of state, payload, error, and queue detail captured during
        monitoring.<br /><br />
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
                <strong>id?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for the insight definition. Commonly used to
                distinguish different monitoring consumers.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsErrors?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether error information should be included in emitted insight
                events.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsPayload?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether emitted events should contain the operation payload such
                as reducer results, merge patches, or replacement values.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsState?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether lifecycle events should include a snapshot of the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >’s current state value.<br /><br />
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
export class InsightConfigComponent {}
