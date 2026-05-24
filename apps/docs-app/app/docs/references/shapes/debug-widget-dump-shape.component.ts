/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-dump-shape">DebugWidgetDumpShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-debug-widget-dump-shape',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>DebugWidgetDumpShape</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Shape representing a complete debug dump exported from the debug widget.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/dev-tools</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/dev-tools</code></pre>
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
            <strong>environment?</strong>
            
            <p class="type">type: literal type</p>
            
          </td>
          <td class="column-auto">
            Browser and device environment details.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>events?</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/debug-widget-event-shape">DebugWidgetEventShape</a>[]</p>
            
          </td>
          <td class="column-auto">
            Recorded pipeline events included in the dump.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>highResolution?</strong>
            
            <p class="type">type: literal type</p>
            
          </td>
          <td class="column-auto">
            High-resolution timing data from the Performance API.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>isoTime?</strong>
            
            <p class="type">type: string</p>
            
          </td>
          <td class="column-auto">
            ISO 8601 formatted time when the dump was created.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>longTasks?</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/debug-widget-long-tasks-shape">DebugWidgetLongTasksShape</a>[]</p>
            
          </td>
          <td class="column-auto">
            Captured browser long task entries.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>navigation?</strong>
            
            <p class="type">type: DebugWidgetNavigationShape</p>
            
          </td>
          <td class="column-auto">
            Browser navigation timing metrics.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>registry?</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/debug-widget-registry-shape">DebugWidgetRegistryShape</a></p>
            
          </td>
          <td class="column-auto">
            Serialized <a href="/docs/references/functions/feature-cell">FeatureCell</a> registry snapshot.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>runtime?</strong>
            
            <p class="type">type: literal type</p>
            
          </td>
          <td class="column-auto">
            Runtime hardware and connectivity information.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>stats</strong>
            
            <p class="type">type: <a href="/docs/references/shapes/debug-widget-event-stat-shape">DebugWidgetEventStatShape</a></p>
            
          </td>
          <td class="column-auto">
            Aggregate event statistics for the dump.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>timestamp?</strong>
            
            <p class="type">type: number</p>
            
          </td>
          <td class="column-auto">
            Unix timestamp when the dump was created.<br/><br/>
          </td>
        </tr><tr>
          <td class="column-300">
            <strong>versions?</strong>
            
            <p class="type">type: Record</p>
            
          </td>
          <td class="column-auto">
            Registered SDuX package versions.<br/><br/>
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
export class DebugWidgetDumpShapeComponent {}
