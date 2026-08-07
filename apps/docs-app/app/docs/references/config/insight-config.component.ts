/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/config/insight-config">InsightConfig</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-insight-config',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/config/insight-config">InsightConfig</a>
      </h2>
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
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
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
                <strong>wantsCandidates?</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether pipeline candidate snapshots should be included in
                emitted insight events. Candidates capture the state value at
                each pipeline stage boundary, enabling before/after diff
                comparison across stages.<br /><br />
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
export class InsightConfigComponent {}
