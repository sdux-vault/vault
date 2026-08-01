/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/tap/with-core-after-tap-behavior">withCoreAfterTapBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-after-tap-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withCoreAfterTapBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Core tap behavior executed after reducer completion.<br /><br />
        This behavior allows consumers to observe the finalized pipeline value
        after all reducer logic has executed. It delegates tap execution to the
        shared tap abstraction and does not modify pipeline state.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'core'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'core'" /></code></pre>
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
                <strong>applyAfterTap</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    current:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                  <li>
                    tap:
                    <a href="/docs/references/types/tap-callback"
                      >TapCallback</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Executes the provided tap callback after reducer completion.<br /><br />
                The tap is invoked for observational or side-effect purposes
                only and does not influence pipeline control flow or state
                resolution.<br /><br />
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
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/references/const/behavior-types"
                    >BehaviorTypes</a
                  >.CoreAfterTap
                </p>
              </td>
              <td class="column-auto">
                Pipeline behavior type indicating execution occurs after
                reducers.<br /><br />
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
export class withCoreAfterTapBehaviorComponent {}
