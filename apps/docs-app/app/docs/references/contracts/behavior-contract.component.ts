/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/behavior-contract">BehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>BehaviorContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Base interface implemented by all behavior types in the Vault
        pipeline.<br /><br />
        Behaviors participate in specific pipeline stages based on their
        declared
        <a href="/docs/references/types/behavior-type">BehaviorType</a>, and may
        optionally expose additional
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> APIs
        through the extendCellAPI hook.<br /><br />
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
                <strong>destroy</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx?:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Teardown hook invoked when the behavior instance is
                destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>extendCellAPI</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a
                      href="/docs/references/contexts/feature-cell-extension-context"
                      >FeatureCellExtensionContext</a
                    >
                  </li>
                </ul>
                <p>returns: E | void</p>
              </td>
              <td>
                Extends the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                with additional APIs backed by this behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx?:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>Resets the behavior to its initial state.<br /><br /></td>
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
                <strong>allowOverride?</strong>

                <p class="type">type: string[]</p>
              </td>
              <td class="column-auto">
                Extension function names this behavior is permitted to
                override.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this behavior is critical for pipeline error
                handling.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>installFluentApi?</strong>

                <p class="type">type: function</p>
              </td>
              <td class="column-auto">
                Installs fluent configuration APIs onto a
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier assigned to this behavior instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/behavior-type"
                    >BehaviorType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Pipeline classification for this behavior used to determine
                execution order.<br /><br />
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
export class BehaviorContractComponent {}
