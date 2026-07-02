/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/state-snapshot-shape">StateSnapshotShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-state-snapshot-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>StateSnapshotShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the immutable snapshot shape representing
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> state
        at a specific moment. This interface exposes loading, value, and error
        indicators used by consumers to reason about current state.<br /><br />
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
                <strong>error</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/vault-error-shape"
                    >VaultErrorShape</a
                  >
                  | null
                </p>
              </td>
              <td class="column-auto">
                Error associated with the state at this moment, or null if no
                error is present.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>hasValue</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether the snapshot contains a non-undefined value.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>isLoading</strong>

                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates whether the state is currently in a loading phase.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>value</strong>

                <p class="type">type: T | undefined</p>
              </td>
              <td class="column-auto">
                The resolved value for this snapshot, or undefined when no value
                exists.<br /><br />
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
export class StateSnapshotShapeComponent {}
