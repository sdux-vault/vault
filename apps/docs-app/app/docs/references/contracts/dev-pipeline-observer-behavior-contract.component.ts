/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/dev-pipeline-observer-behavior-contract">DevPipelineObserverBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-dev-pipeline-observer-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>DevPipelineObserverBehaviorContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Behavior contract for observing pipeline execution events in development
        mode.<br /><br />
        This interface defines the lifecycle hooks and notification methods used
        by a dev-only pipeline observer behavior to track execution boundaries
        and propagate success or error signals associated with a
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        run.<br /><br />
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
                <strong>beginRun</strong>

                <p>returns: void</p>
              </td>
              <td>
                Signals the start of a pipeline execution cycle.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>emitError</strong>

                <p>inputs:</p>
                <ul>
                  <li>cellKey: string</li>
                  <li>
                    error:
                    <a href="/docs/references/shapes/vault-error-shape"
                      >VaultErrorShape</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits a pipeline error event for a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>emitSuccess</strong>

                <p>inputs:</p>
                <ul>
                  <li>cellKey: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits a successful pipeline completion event for a
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class DevPipelineObserverBehaviorContractComponent {}
