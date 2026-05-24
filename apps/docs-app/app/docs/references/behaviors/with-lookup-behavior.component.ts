/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/entity-access/with-lookup-behavior">withLookupBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-lookup-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withLookupBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead"><a href="/docs/references/functions/feature-cell">FeatureCell</a> extension behavior that provides entity lookup capabilities.<br/><br/>
This behavior enables cached and on-demand lookup of entities by identifier,
coordinating cache state, pending requests, and pipeline fetch resolution
based on configured lookup options.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/addons</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/addons</code></pre>
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
                  Creates a new lookup behavior instance.<br/><br/>
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
            <strong>#cacheCleanup</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: void</p>
          </td>
          <td>
            Clears the lookup cache and resolves all pending lookups.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#deleteCacheEntry</strong>
            <p class="modifiers">#private</p>
            <p>inputs:</p>
          <ul>
           <li>id: string</li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Removes a cached entity and resolves any pending lookups for the identifier.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#mergeState</strong>
            <p class="modifiers">#private</p>
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/feature-cell-extension-context">FeatureCellExtensionContext</a></li><li>id: string</li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Submits a lookup fetch request into the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#normalizeEntities</strong>
            <p class="modifiers">#private</p>
            <p>inputs:</p>
          <ul>
           <li>value: TState</li>
          </ul>
            <p>returns: TEntity[]</p>
          </td>
          <td>
            Normalizes a resolved state value into an array of entities.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#recordEntity</strong>
            <p class="modifiers">#private</p>
            <p>inputs:</p>
          <ul>
           <li>id: string</li><li>entity: TEntity</li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Records an entity in the lookup cache.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#resolveAllPendingAsUndefined</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: void</p>
          </td>
          <td>
            Resolves all pending lookups with an undefined value.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>destroy</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Destroys the behavior and releases all internal resources.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>extendCellAPI</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/feature-cell-extension-context">FeatureCellExtensionContext</a></li>
          </ul>
            <p>returns: &#123; lookup: (id: string) =&gt; Promise&lt;TEntity&gt;; lookup$(id: string): Observable&lt;TEntity&gt;; &#125;</p>
          </td>
          <td>
            Extends the <a href="/docs/references/functions/feature-cell">FeatureCell</a> API with lookup functions.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>installFluentApi</strong>
            <p class="modifiers">static</p>
            <p>inputs:</p>
          <ul>
           <li>cell: <a href="/docs/references/shapes/feature-cell-base-shape">FeatureCellBaseShape</a></li><li>behaviorConfigs: Map</li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Installs the fluent lookup configuration API onto the <a href="/docs/references/functions/feature-cell">FeatureCell</a>.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the lookup cache and resolves all pending lookups.<br/><br/>
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
            <strong>#cache</strong>
            
            <p class="type">type: unknown</p>
            <p class="default">default: new Map()</p>
          </td>
          <td class="column-auto">
            Cache of resolved entities indexed by identifier.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#options</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: <a href="/docs/references/options/lookup-behavior-options">LookupBehaviorOptions</a></p>
            
          </td>
          <td class="column-auto">
            Lookup configuration options supplied by the consumer.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#optionsKey</strong>
            
            <p class="type">type: string</p>
            <p class="default">default: &#39;<a href="/docs/pipeline/addons/entity-access/with-lookup-behavior">withLookupBehavior</a>&#39;</p>
          </td>
          <td class="column-auto">
            Internal key used to associate lookup options with state emissions.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#pending</strong>
            
            <p class="type">type: unknown</p>
            <p class="default">default: new Map&gt;()</p>
          </td>
          <td class="column-auto">
            Registry of pending lookup requests awaiting resolution.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#stateSubcribe?</strong>
            
            <p class="type">type: Subscription</p>
            
          </td>
          <td class="column-auto">
            Subscription tracking state emission events.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>configKey</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Configuration key used to store behavior options.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates whether the behavior is critical in the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/entity-access/with-lookup-behavior">withLookupBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Indicates that this behavior is non-critical.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>extension</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: extendLookupFunction</p>
          </td>
          <td class="column-auto">
            Static extension function used to augment the <a href="/docs/references/functions/feature-cell">FeatureCell</a> API.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Static behavior key identifier.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique behavior key for this instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Static behavior type identifier.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/entity-access/with-lookup-behavior">withLookupBehavior</a>.type</p>
          </td>
          <td class="column-auto">
            Instance-level behavior type identifier.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>wantsConfig</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates that this behavior expects configuration input.<br/><br/>
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
export class withLookupBehaviorComponent {}
