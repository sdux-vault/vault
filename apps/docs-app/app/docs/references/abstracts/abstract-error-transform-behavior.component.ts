/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/abstracts/abstract-error-transform-behavior">AbstractErrorTransformBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-abstract-error-transform-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>AbstractErrorTransformBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Abstract base behavior for transforming errors during pipeline execution.
This class defines the contract and lifecycle hooks required for error transformation behaviors.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
        <li>key: string</li><li>behaviorCtx: <a href="/docs/references/contexts/behavior-class-context">BehaviorClassContext</a></li>
        </ul>
                  
                  <p>implements:</p>
        <ul>
          <li><a href="/docs/references/contracts/error-transform-behavior-contract">ErrorTransformBehaviorContract</a></li>
        </ul>
                </td>
                <td>
                  Creates a new abstract error transform behavior instance.<br/><br/>
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
            <strong>destroy</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Lifecycle hook invoked when the behavior instance is destroyed.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Lifecycle hook invoked when the behavior instance is reset.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>transformError</strong>
            
            <p>inputs:</p>
          <ul>
           <li>error: unknown</li><li>current: <a href="/docs/references/shapes/vault-error-shape">VaultErrorShape</a></li><li>previousStateSnapshot: <a href="/docs/references/shapes/state-snapshot-shape">StateSnapshotShape</a></li>
          </ul>
            <p>returns: Promise&lt;unknown | unknown&gt;</p>
          </td>
          <td>
            Transforms an error produced during pipeline execution.<br/><br/>
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
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates that this error transform behavior is critical and always executed.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique identifier for this behavior instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/references/const/behavior-types">BehaviorTypes</a>.ErrorTransform</p>
          </td>
          <td class="column-auto">
            Behavior type identifier used for orchestrator registration.<br/><br/>
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
export class AbstractErrorTransformBehaviorComponent {}
