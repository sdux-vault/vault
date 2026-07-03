/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/shapes/debug-widget-event-stat-shape">DebugWidgetEventStatShape</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-debug-widget-event-stat-shape',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>DebugWidgetEventStatShape</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Shape representing aggregate statistics computed from debug widget
        events.<br /><br />
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
                <strong>burstAnalysis</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Analysis of event burst density per animation frame.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>computeVsIdle?</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Compute time versus idle time ratio.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>deadlockByTrace</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Deadlock detection flags indexed by trace ID.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>diagnosticSummary?</strong>

                <p class="type">type: (literal type | null)[]</p>
              </td>
              <td class="column-auto">
                Ranked diagnostic findings from event analysis.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>errorEvents</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Number of events classified as errors.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>eventLoopPhaseDistribution?</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Event count grouped by detected event loop phase.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>eventTypes</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Event count grouped by event type name.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>firstEventTimestamp</strong>

                <p class="type">type: number | null</p>
              </td>
              <td class="column-auto">
                Monotonic timestamp of the first event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>lastEventTimestamp</strong>

                <p class="type">type: number | null</p>
              </td>
              <td class="column-auto">
                Monotonic timestamp of the last event.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>longestTraceDurationMs?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Duration of the longest running pipeline in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>longestTraceId?</strong>

                <p class="type">type: string | null</p>
              </td>
              <td class="column-auto">
                Trace ID of the longest running pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>longTaskStats</strong>

                <p class="type">type: literal type | undefined</p>
              </td>
              <td class="column-auto">
                Long task count and maximum duration from performance
                entries.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>maxIdleGapMs?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Largest idle gap between consecutive events in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>pipelineFlamegraph?</strong>

                <p class="type">type: literal type[]</p>
              </td>
              <td class="column-auto">
                Per-trace flamegraph data with ordered stage durations.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>pipelineRecursion</strong>

                <p class="type">type: literal type | null</p>
              </td>
              <td class="column-auto">
                Detected pipeline recursion pattern, or null if none found.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>schedulerDistribution</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Event count grouped by detected scheduler type.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stageAggregates?</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Per-stage timing aggregates including percentiles.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stageBottleneck?</strong>

                <p class="type">type: string | null</p>
              </td>
              <td class="column-auto">
                Name of the slowest pipeline stage across all traces.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stageBottleneckTimeMs?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Total time consumed by the bottleneck stage in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>stateAnalytics</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                State size, serialization, and churn analytics.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>structuralIntegrity</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Counts of structural anomalies in event ordering.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>suppressionStats</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Counts of suppressed, passed, and abstained vote events.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>timingIntegrity</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                Timestamp and monotonic collision rates across traces.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>totalDurationMs</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Total duration spanned by all events in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>totalEvents</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Total number of events analyzed.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>traceFanOut?</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Event fan-out count per trace ID.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>traces</strong>

                <p class="type">type: Record</p>
              </td>
              <td class="column-auto">
                Per-trace event statistics and stage breakdowns.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>userLatencyDistribution</strong>

                <p class="type">type: literal type</p>
              </td>
              <td class="column-auto">
                User-facing latency distribution statistics.<br /><br />
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
export class DebugWidgetEventStatShapeComponent {}
