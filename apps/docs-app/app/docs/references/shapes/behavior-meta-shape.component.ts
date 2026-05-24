/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/behavior-meta-shape">BehaviorMetaShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-behavior-meta-shape',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>BehaviorMetaShape</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Metadata shape describing a registered behavior&#39;s static configuration.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
            <strong>configKey?</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Configuration key used to locate behavior options in the config registry.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>critical</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether this behavior is critical to pipeline execution.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>key</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            Unique identifier for this behavior.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>licenseId?</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            License identifier used for license validation.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>needsLicense?</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether this behavior requires a valid license to operate.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>resolveType?</strong>
            
            <p class="type">type: <a href="/docs/references/types/resolve-type">ResolveType</a></p>
            
          </td>
          <td class="column-auto">
            Optional resolve strategy associated with this behavior.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>type</strong>
            
            <p class="type">type: <a href="/docs/references/types/behavior-type">BehaviorType</a></p>
            
          </td>
          <td class="column-auto">
            Pipeline stage in which this behavior participates.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>wantsConfig?</strong>
            
            <p class="type">type: boolean</p>
            
          </td>
          <td class="column-auto">
            Whether this behavior requires consumer-supplied configuration.<br/><br/>
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
export class BehaviorMetaShapeComponent {}
