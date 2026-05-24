/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior">withCoreFromStreamBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-core-from-stream-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withCoreFromStreamBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Observable-based resolve behavior that subscribes to a consumer-supplied stream
and merges emitted values into the <a href="/docs/references/functions/feature-cell">FeatureCell</a> state pipeline.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/core</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/core</code></pre>
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
          <li><a href="/docs/references/contracts/behavior-contract">BehaviorContract</a></li>
        </ul>
                </td>
                <td>
                  Creates a new fromStream behavior instance.<br/><br/>
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
            Teardown hook invoked when the behavior instance is destroyed.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>extendCellAPI</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/feature-cell-extension-context">FeatureCellExtensionContext</a></li>
          </ul>
            <p>returns: <a href="/docs/references/interfaces/from-stream-behavior-extension">FromStreamBehaviorExtension</a></p>
          </td>
          <td>
            Extends the <a href="/docs/references/functions/feature-cell">FeatureCell</a> with the fromStream subscription API.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the behavior to its initial state.<br/><br/>
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
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates whether this behavior is required by the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior">withCoreFromStreamBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Indicates that this behavior is optional within the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>extension</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: extendFromStream</p>
          </td>
          <td class="column-auto">
            Extension function used to register the fromStream API on the <a href="/docs/references/functions/feature-cell">FeatureCell</a>.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique behavior key used for diagnostics and devtools.<br/><br/>
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
            <strong>resolveType</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/resolve-type">ResolveType</a></p>
            
          </td>
          <td class="column-auto">
            Static resolve type assigned by the behavior system.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>resolveType</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior">withCoreFromStreamBehavior</a>.resolveType</p>
          </td>
          <td class="column-auto">
            Instance-level resolve type identifier.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Static behavior type used for orchestrator classification.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior">withCoreFromStreamBehavior</a>.type</p>
          </td>
          <td class="column-auto">
            The extension behavior type identifier.<br/><br/>
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
export class withCoreFromStreamBehaviorComponent {}
