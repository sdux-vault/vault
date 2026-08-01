/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/stepwise-behavior-contract">StepwiseBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-stepwise-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>StepwiseBehaviorContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for stepwise behaviors that compare current and candidate
        state.<br /><br />
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
                <strong>evaluateStepwise</strong>

                <p>inputs:</p>
                <ul>
                  <li>current: T | undefined</li>
                  <li>
                    candidate:
                    <a href="/docs/references/types/pipeline-upstream-value"
                      >PipelineUpstreamValue</a
                    >
                  </li>
                  <li>pipelineId: string</li>
                </ul>
                <p>
                  returns: Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T&gt;&gt;
                </p>
              </td>
              <td>
                Evaluates whether the candidate value should replace the current
                state.<br /><br />
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
export class StepwiseBehaviorContractComponent {}
