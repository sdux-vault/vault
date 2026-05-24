/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/interceptors/with-global-error-pause-behavior">withGlobalErrorPauseBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-global-error-pause-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withGlobalErrorPauseBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Interceptor behavior that pauses state propagation when a global error signal is active.<br/><br/>
This behavior monitors the global error service and conditionally blocks incoming
state updates at the interceptor stage when an error is present. When no global
error exists, incoming state is passed through unchanged. The interceptor is
non-critical and does not modify state values directly.<br/><br/></div>
        
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
          <li><a href="/docs/references/contracts/interceptor-behavior-contract">InterceptorBehaviorContract</a></li>
        </ul>
                </td>
                <td>
                  Creates a new interceptor instance that observes the global error service.<br/><br/>
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
            <strong>applyInterceptor</strong>
            <p class="modifiers">async</p>
            <p>inputs:</p>
          <ul>
           <li>ctx: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a></li>
          </ul>
            <p>returns: Promise&lt;<a href="/docs/references/types/interceptor-state-type">InterceptorStateType</a>&lt;T&gt;&gt;</p>
          </td>
          <td>
            Conditionally blocks incoming state updates when a global error is active.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>destroy</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Releases resources associated with the interceptor instance.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the interceptor to its initial state.<br/><br/>
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
            <strong>#errorSubscription</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: new Subscription()</p>
          </td>
          <td class="column-auto">
            Subscription used to observe global error state changes.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>#globalError</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Tracks whether a global error signal is currently active.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Indicates that this behavior is non-critical within the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/interceptors/with-global-error-pause-behavior">withGlobalErrorPauseBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Instance-level criticality flag inherited from the static definition.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Static behavior key assigned by the decorator.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique behavior key for this interceptor instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Static type identifier used for pipeline classification.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/interceptors/with-global-error-pause-behavior">withGlobalErrorPauseBehavior</a>.type</p>
          </td>
          <td class="column-auto">
            Behavior type identifier used by the orchestrator.<br/><br/>
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
export class withGlobalErrorPauseBehaviorComponent {}
