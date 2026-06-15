/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-event-shape">DebugWidgetEventShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-debug-widget-event-shape',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetEventShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing an enriched pipeline event captured by the debug
        widget.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/dev-tools</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/dev-tools</code></pre>
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
                <strong>error?</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Error payload if the event represents a failure.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>eventLoopPhase?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Detected event loop phase at capture time.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>latencyCategory</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/types/debug-widget-latency-category-type"
                    >DebugWidgetLatencyCategoryType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Latency category assigned during enrichment.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>scheduler?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Detected scheduler classification for the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>sequenceNumber?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Monotonically increasing sequence number for event ordering.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>source?</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/types/debug-widget-event-source-type"
                    >DebugWidgetEventSourceType</a
                  >
                  | string
                </p>
              </td>
              <td class="column-auto">
                Source classification for the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stackHash?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Hash of the call stack at capture time.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stageDurationMs?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Duration of the current pipeline stage in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>traceId?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Trace identifier linking related pipeline events.<br /><br />
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
          This reference API documentation is generated from @jsdoc-annotated
          source code using @compodoc, with AI-assisted comments reviewed by a
          human prior to publication.
        </p>
      </div>
    </section>
  </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class DebugWidgetEventShapeComponent {}
