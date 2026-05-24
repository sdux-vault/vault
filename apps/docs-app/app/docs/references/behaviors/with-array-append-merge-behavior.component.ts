/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-array-append-merge-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>withArrayAppendMergeBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Core merge behavior that performs array append semantics.<br/><br/>
This behavior is used during the merge stage of the ngSDuX pipeline.
When both the current and incoming values are arrays, it returns a
new array containing the concatenation of both values ([...curr, ...next]).<br/><br/>
If either value is not an array, the incoming value is returned as-is.<br/><br/>
Merge behavior is pure, meaning it never mutates the input arrays.
It also supports a clearUndefined option, which converts an explicit
undefined incoming value into a <a href="/docs/references/const/vault_noop">VAULT_NOOP</a> signal if configured.<br/><br/></div>
        
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
          <li><a href="/docs/references/contracts/merge-behavior-contract">MergeBehaviorContract</a></li>
        </ul>
                </td>
                <td>
                  Creates a new Array Append Merge behavior instance.<br/><br/>
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
            <strong>computeMerge</strong>
            
            <p>inputs:</p>
          <ul>
           <li>currentValue: <a href="/docs/references/types/pipeline-upstream-value">PipelineUpstreamValue</a></li><li>nextValue: <a href="/docs/references/types/pipeline-upstream-value">PipelineUpstreamValue</a></li><li>options?: <a href="/docs/references/config/merge-config">MergeConfig</a></li>
          </ul>
            <p>returns: <a href="/docs/references/types/pipeline-upstream-value">PipelineUpstreamValue</a>&lt;T&gt;</p>
          </td>
          <td>
            Computes the merged output between currentValue and nextValue
using append semantics when both are arrays.<br/><br/>
- If both values are arrays → returns a new array containing both.
- If the incoming value is undefined and clearUndefined is enabled,
  the behavior returns <a href="/docs/references/const/vault_noop">VAULT_NOOP</a> to signal an intentional clear.
- If only one value is an array → returns the incoming value as-is.<br/><br/>
This method is executed during the merge stage of the pipeline and
must remain pure and side-effect free.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>destroy</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Lifecycle hook invoked when the behavior instance is destroyed.
This behavior maintains no internal resources and requires no cleanup.<br/><br/>
          </td>
        </tr><tr>
          <td>
            <strong>reset</strong>
            
            
            <p>returns: void</p>
          </td>
          <td>
            Resets the merge behavior to its initial state.<br/><br/>
Array append merge is a stateless, pure behavior and does not maintain
any internal data, timers, or cached values. Resetting this behavior
simply records the reset event for diagnostics and DevTools inspection.<br/><br/>
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
            <p class="type">type: unknown</p>
            <p class="default">default: false</p>
          </td>
          <td class="column-auto">
            Indicates that append merge is a critical pipeline behavior.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>.critical</p>
          </td>
          <td class="column-auto">
            Indicates that this instance of the merge behavior is critical.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            The static key<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique behavior identifier for diagnostics and devtools.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">static, readonly</p>
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Static metadata assigned by the <a href="/docs/references/decorators/vault-behavior">VaultBehavior</a> decorator.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            <p class="modifiers">readonly</p>
            <p class="type">type: unknown</p>
            <p class="default">default: <a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>.type</p>
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
export class withArrayAppendMergeBehaviorComponent {}
