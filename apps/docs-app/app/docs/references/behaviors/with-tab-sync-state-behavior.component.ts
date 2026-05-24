/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/vault/with-tab-sync-state-behavior">withTabSyncStateBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-tab-sync-state-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withTabSyncStateBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Cross-tab state synchronization behavior that extends core state management.<br/><br/>
This behavior broadcasts finalized state snapshots to other browser tabs
via BroadcastChannel and applies incoming snapshots from other tabs directly
to the local state without triggering the pipeline. It requires a valid
license and is opt-in per <a href="/docs/references/functions/feature-cell">FeatureCell</a>.<br/><br/></div>
        
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
                  
                  
                </td>
                <td>
                  Creates a new tab sync state behavior instance.<br/><br/>
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
            <strong>#closeChannel</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: void</p>
          </td>
          <td>
            Closes the BroadcastChannel and stops listening for cross-tab messages.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#onMessage</strong>
            <p class="modifiers">#private</p>
            <p>inputs:</p>
          <ul>
           <li>message: TabSyncMessageShape</li><li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Handles an incoming cross-tab message and commits or caches the snapshot.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#openChannel</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: void</p>
          </td>
          <td>
            Opens the BroadcastChannel and begins listening for cross-tab messages.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#resolveTabId</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: string</p>
          </td>
          <td>
            Returns a stable tab identifier persisted in sessionStorage.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>#subscribeToBusCommands</strong>
            <p class="modifiers">#private</p>
            
            <p>returns: void</p>
          </td>
          <td>
            Subscribes to commands from the tab sync controller via the bus.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>commitState</strong>
            <p class="modifiers">protected</p>
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li><li>changes: Partial&gt; | null</li><li>type: <a href="/docs/references/types/state-emit-type">StateEmitType</a></li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Extends commitState to broadcast finalized snapshots to other tabs.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>destroy</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Emits a terminal destroy state snapshot and closes the channel.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Emits a terminal reset state snapshot while keeping the channel open.<br/><br/>
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
            <strong>#broadcastReady</strong>
            
            <p class="type">type: unknown</p>
            <p class="default">default: false</p>
          </td>
          <td class="column-auto">
            Whether the behavior is ready to broadcast state changes.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#bus</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: TabSyncBusService()</p>
          </td>
          <td class="column-auto">
            Shared bus service for controller-to-behavior communication.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#busSubscription</strong>
            
            <p class="type">type: Subscription | null</p>
            <p class="default">default: null</p>
          </td>
          <td class="column-auto">
            Subscription to bus command events.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#cachedSnapshot</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/state-snapshot-shape">StateSnapshotShape</a> | null</p>
            <p class="default">default: null</p>
          </td>
          <td class="column-auto">
            Cached peer snapshot received during the negotiation phase.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#channel</strong>
            
            <p class="type">type: BroadcastChannel | null</p>
            <p class="default">default: null</p>
          </td>
          <td class="column-auto">
            BroadcastChannel used for cross-tab state synchronization.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#ctx</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></p>
            
          </td>
          <td class="column-auto">
            Behavior context used for committing remote snapshots.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#featureCellKey</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Feature cell key scoping this behavior instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#negotiationComplete</strong>
            
            <p class="type">type: unknown</p>
            <p class="default">default: false</p>
          </td>
          <td class="column-auto">
            Whether controller negotiation has completed.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates that this behavior is required for pipeline execution.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/vault/with-tab-sync-state-behavior">withTabSyncStateBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Indicates that this behavior must always execute.<br/><br/>
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
            <strong>licenseId</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            License identifier required by this behavior.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>tabId</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique identifier for the current browser tab.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Static behavior type used for pipeline classification.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/behaviors/vault/with-tab-sync-state-behavior">withTabSyncStateBehavior</a>.type</p>
          </td>
          <td class="column-auto">
            Instance-level pipeline behavior type identifier.<br/><br/>
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
export class withTabSyncStateBehaviorComponent {}
