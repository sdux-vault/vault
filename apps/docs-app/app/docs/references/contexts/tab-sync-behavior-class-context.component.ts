/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/tab-sync-behavior-class-context">TabSyncBehaviorClassContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-tab-sync-behavior-class-context',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>TabSyncBehaviorClassContext</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Extended behavior class context providing direct state access for
        tab-sync behaviors.<br /><br />
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
                <strong>lastSnapshot</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Live reference to the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >&#39;s mutable state snapshot.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state$</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: Subject&gt;</p>
              </td>
              <td class="column-auto">
                Subject used to emit state snapshots to the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
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
export class TabSyncBehaviorClassContextComponent {}
