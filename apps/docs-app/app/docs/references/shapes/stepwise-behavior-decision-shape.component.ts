/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/stepwise-behavior-decision-shape">StepwiseBehaviorDecisionShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-stepwise-behavior-decision-shape',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>StepwiseBehaviorDecisionShape</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Defines the control actions available to a stepwise decision callback.<br/><br/>
This shape provides imperative decision functions that determine how
the pipeline proceeds at a given stepwise stage.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/addons</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/addons</code></pre>
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
            <strong>block</strong>
            
            <p class="type">type: function</p>
            
          </td>
          <td class="column-auto">
            Signals that the pipeline should be blocked at the current stage.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>clear</strong>
            
            <p class="type">type: function</p>
            
          </td>
          <td class="column-auto">
            Signals that the pipeline state should be cleared at the current stage.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>continue</strong>
            
            <p class="type">type: function</p>
            
          </td>
          <td class="column-auto">
            Signals that the pipeline should continue to the next stage.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>stage</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Identifier for the stepwise stage where the decision is being applied.<br/><br/>
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
            This reference API documentation is generated from @jsdoc-annotated source code using
            @compodoc, with AI-assisted comments reviewed by a human prior to publication.
          </p>
        </div>
      </section>
    </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class StepwiseBehaviorDecisionShapeComponent {}
