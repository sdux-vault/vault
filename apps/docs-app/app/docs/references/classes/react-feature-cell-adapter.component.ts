/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/classes/react-feature-cell-adapter">ReactFeatureCellAdapter</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-react-feature-cell-adapter',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>ReactFeatureCellAdapter</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        React adapter that augments a core
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> with
        an explicit useSyncExternalStore() render-time subscription method.<br /><br />
        This class preserves the core fluent API and snapshot access patterns
        while exposing a React-native bridge for subscribing to state changes
        during render.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/react</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/react</code></pre>
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
                  <li>core: ReactFeatureCellContext</li>
                </ul>
              </td>
              <td>
                Creates a new
                <a href="/docs/references/classes/react-feature-cell-adapter"
                  >ReactFeatureCellAdapter</a
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
                <strong>#getSnapshot</strong>
                <p class="modifiers">#private</p>

                <p>
                  returns:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Returns a stable snapshot reference for React while preserving
                the core cell&#39;s immutable public snapshot semantics.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#subscribe</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>onStoreChange: function</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Bridges
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state emissions into React&#39;s external store contract.<br /><br />
              </td>
            </tr>
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
                Builds and returns the React-augmented
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
                <strong>#cachedSnapshot</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Cached snapshot reference returned to React when the underlying
                state has not materially changed.<br /><br />
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
export class ReactFeatureCellAdapterComponent {}
