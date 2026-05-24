/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior">withCoreFromPromiseBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-core-from-promise-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withCoreFromPromiseBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Extension behavior that enables promise-based state resolution for FeatureCells.<br/><br/>
This behavior augments a <a href="/docs/references/functions/feature-cell">FeatureCell</a> with APIs that accept deferred factories
and resolve their produced values into normalized state inputs. It supports
both promise and deferred invocation semantics while preserving pipeline
loading and error metadata.<br/><br/>
This API exists as a migration bridge for deferred- and promise-based workflows.
Prefer using replaceState or mergeState to resolve promises
directly within the pipeline.<br/><br/></div>
        <div class="class-meta">
      <span class="meta-badge meta-deprecated">
          Deprecated
        </span>
    </div>
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/core</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/core</code></pre>
      </div>
    </section>
<section class="section">
        <div class="section-title">⚠️ Deprecated</div>
        <div class="section-body">
          This API exists as a migration bridge for deferred- and promise-based workflows.
Prefer using replaceState or mergeState to resolve promises
directly within the pipeline.<br/><br/>
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
                  Creates a new instance of the promise resolution behavior.<br/><br/>
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
            Invoked during behavior teardown.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>extendCellAPI</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/feature-cell-extension-context">FeatureCellExtensionContext</a></li>
          </ul>
            <p>returns: <a href="/docs/references/interfaces/from-promise-behavior-extension">FromPromiseBehaviorExtension</a></p>
          </td>
          <td>
            Extends the <a href="/docs/references/functions/feature-cell">FeatureCell</a> API with promise-based resolution functions.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the behavior state.<br/><br/>
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
            <p class="default">default: <a href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior">withCoreFromPromiseBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Indicates that this behavior is optional within the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>extension</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: extendFromPromise</p>
          </td>
          <td class="column-auto">
            Static behavior function used to extend the <a href="/docs/references/functions/feature-cell">FeatureCell</a> API.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Static behavior key used for diagnostics and tooling.<br/><br/>
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
            Resolve type identifier for promise-based resolution.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>resolveType</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior">withCoreFromPromiseBehavior</a>.resolveType</p>
          </td>
          <td class="column-auto">
            Resolve type identifier for this behavior instance.<br/><br/>
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
            <p class="default">default: <a href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior">withCoreFromPromiseBehavior</a>.type</p>
          </td>
          <td class="column-auto">
            Instance-level behavior type identifier.<br/><br/>
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
export class withCoreFromPromiseBehaviorComponent {}
