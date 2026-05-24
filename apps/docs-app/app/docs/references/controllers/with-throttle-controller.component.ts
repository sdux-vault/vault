/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/controllers/with-throttle-controller">withThrottleController</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-throttle-controller',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withThrottleController</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Policy controller that enforces a time-based throttle window on pipeline
attempts, aborting any attempt that occurs within the cooldown period.<br/><br/></div>
        
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
        <li>key: string</li><li>controllerCtx: <a href="/docs/references/contexts/controller-class-context">ControllerClassContext</a></li>
        </ul>
                  
                  <p>implements:</p>
        <ul>
          <li><a href="/docs/references/contracts/controller-contract">ControllerContract</a></li>
        </ul>
                </td>
                <td>
                  Creates a new throttle controller instance.<br/><br/>
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
            Tears down the controller and clears the throttle window.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>handleMessage</strong>
            
            <p>inputs:</p>
          <ul>
           <li>msg: <a href="/docs/references/types/controller-message-shape">ControllerMessageShape</a></li>
          </ul>
            <p>returns: Observable&lt;<a href="/docs/references/types/controller-vote">ControllerVote</a> | void&gt;</p>
          </td>
          <td>
            Evaluates an incoming controller message against the throttle window.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>installFluentApi</strong>
            <p class="modifiers">static</p>
            <p>inputs:</p>
          <ul>
           <li>cell: <a href="/docs/references/shapes/feature-cell-base-shape">FeatureCellBaseShape</a></li><li>controllerConfigs: Map</li>
          </ul>
            <p>returns: void</p>
          </td>
          <td>
            Installs the fluent withThrottle configuration method on the <a href="/docs/references/functions/feature-cell">FeatureCell</a>.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the throttle window to allow the next attempt immediately.<br/><br/>
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
            <strong>configKey</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Configuration key used to locate throttle options in the config registry.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether errors from this controller halt the pipeline.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/controllers/with-throttle-controller">withThrottleController</a>.critical</p>
          </td>
          <td class="column-auto">
            Whether this controller is critical to pipeline execution.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>extensionFluent</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: extendWithThrottleFluent</p>
          </td>
          <td class="column-auto">
            Fluent extension function for throttle configuration.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique controller key used for diagnostics and devtools.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique identifier for this controller instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>milliseconds</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: number</p>
            
          </td>
          <td class="column-auto">
            Throttle duration in milliseconds.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>throttledUntil</strong>
            
            <p class="type">type: number | null</p>
            <p class="default">default: null</p>
          </td>
          <td class="column-auto">
            Timestamp until which new attempts are throttled.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/controller-type">ControllerType</a></p>
            
          </td>
          <td class="column-auto">
            Static controller type used for orchestrator classification.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/controllers/with-throttle-controller">withThrottleController</a>.type</p>
          </td>
          <td class="column-auto">
            The controller type identifier for this instance.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>wantsConfig</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether this controller requires consumer-supplied configuration.<br/><br/>
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
export class withThrottleControllerComponent {}
