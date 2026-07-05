/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-trace-event-shape">DebugWidgetTraceEventShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-trace-event-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetTraceEventShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing a single Chrome trace format event for timeline
        export.<br /><br />
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
                <strong>args?</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/shapes/debug-widget-trace-event-args-shape"
                    >DebugWidgetTraceEventArgsShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Optional arguments attached to the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>cat?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Category grouping for the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>dur?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Duration in microseconds for complete events.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>name</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Span name describing the trace event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ph</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/types/debug-widget-event-trace-phase-type"
                    >DebugWidgetEventTracePhaseType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Chrome trace phase marker.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>pid</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Process identifier, always 1 for the debugger.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>s?</strong>

                <p class="type">
                  type:
                  <a
                    href="/docs/references/types/debug-widget-event-instant-scope-type"
                    >DebugWidgetEventInstantScopeType</a
                  >
                </p>
              </td>
              <td class="column-auto">Scope for instant events.<br /><br /></td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>tid?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Thread identifier mapped from the trace ID.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ts?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Timestamp in microseconds.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class DebugWidgetTraceEventShapeComponent {}
