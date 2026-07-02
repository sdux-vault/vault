/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/event-shape">EventShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-event-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>EventShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Describes the shape of a pipeline event emitted during
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        execution. This interface defines the core event contract used for
        diagnostics, Devtools inspection, and lifecycle tracking.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/shared</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
                <strong>behaviorKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                The behavior key that produced the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>boundary</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/event-boundary-type"
                    >EventBoundaryType</a
                  >
                </p>
              </td>
              <td class="column-auto">The event boundary type.<br /><br /></td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>candidate?</strong>

                <p class="type">type: T | undefined</p>
              </td>
              <td class="column-auto">
                Optional in-flight pipeline candidate value captured after a
                stage completes. Used exclusively by the State Diff View in
                DevTools.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>cell</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Identifier of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                associated with the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>error?</strong>

                <p class="type">type: any</p>
              </td>
              <td class="column-auto">
                Optional error information associated with a failure event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>id</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for the emitted event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>monotonicTimestamp?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                High-resolution monotonic timestamp captured via
                performance.now(). Used for precise trace timing in DevTools and
                Chrome Trace Export.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>name</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                The event name describing the lifecycle transition or action.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>payload?</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional payload associated with the event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>source?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Optional source identifier provided by the event origin.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state?</strong>

                <p class="type">type: Partial&gt;</p>
              </td>
              <td class="column-auto">
                Optional partial snapshot of
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state at the time of emission.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>timestamp</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Timestamp indicating when the event occurred.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>traceId?</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Trace identifier used for Devtools debugging and correlation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/event-type">EventType</a>
                </p>
              </td>
              <td class="column-auto">
                Classification of the event within the pipeline lifecycle.<br /><br />
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventShapeComponent {}
