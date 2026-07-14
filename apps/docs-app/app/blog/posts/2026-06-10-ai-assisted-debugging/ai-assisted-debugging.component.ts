import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { StackBlitzTryItLiveComponent } from '../../../docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-ai-assisted-debugging',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    BrandNameComponent,
    StackBlitzTryItLiveComponent
  ],
  template: `
    <sdux-blog-layout
      title="AI-Assisted Debugging Reports"
      date="2026-06-10"
      pillar="SP"
      [tryItNow]="false"
      readingTime="4">
      <header class="docs-header">
        <p class="lead">
          Most frontend debugging is manual: console.log, reproduce, guess,
          repeat. <sdux-brand-name /> includes a built-in runtime debugger that
          captures deterministic execution traces of your state pipeline — and
          an AI Assist feature that turns those traces into structured
          diagnostic reports.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem: Debugging Is Still Manual</div>
        <div class="section-body">
          <p>
            State management bugs are among the hardest to diagnose. They
            involve timing, ordering, and the interaction of multiple subsystems
            — controllers, behaviors, lifecycle transitions — all executing
            within a pipeline you cannot pause or step through with a
            traditional debugger.
          </p>
          <p>
            The typical workflow is tedious: scatter console.log statements
            across your codebase, reproduce the issue, read through hundreds of
            log lines, form a hypothesis, and repeat. The process is slow,
            error-prone, and scales poorly as pipeline complexity grows.
          </p>
          <p>
            <sdux-brand-name /> takes a different approach. Instead of asking
            you to instrument your code manually, it records everything the
            pipeline does — automatically, passively, and without altering
            runtime behavior.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What the Debugger Captures</div>
        <div class="section-body">
          <p>
            When enabled, the built-in debugger attaches to the Vault runtime as
            a passive observer. It records pipeline activity for individual
            <a href="/docs/references/functions/feature-cell">FeatureCell</a
            >&#8482; instances, capturing:
          </p>
          <ul>
            <li>Pipeline stage timings for every execution trace</li>
            <li>Controller decisions — admissions, denials, and aborts</li>
            <li>Lifecycle transitions across the pipeline</li>
            <li>Error events and failure signals</li>
            <li>State snapshots at commit boundaries</li>
          </ul>
          <p>
            The debugger does not alter pipeline behavior. It operates as a
            passive listener that records runtime signals emitted by the
            execution engine. Your application runs identically whether the
            debugger is attached or not.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The debugger reconstructs execution
            traces by listening to Insight events emitted by
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            instances during Vault pipeline execution. Each recorded event
            represents a lifecycle transition, controller action, or runtime
            signal occurring within the pipeline.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Five-Step Workflow</div>
        <div class="section-body">
          <p>The debugging workflow is designed to be simple and repeatable:</p>
          <ol>
            <li>
              Enable the debugger using <strong>devMode: true</strong> in your
              Vault configuration.
            </li>
            <li>
              Run your application and open it in a browser. The debugger
              appears as a lightweight floating panel.
            </li>
            <li>
              Click <strong>Record</strong> in the debugger panel to start
              capturing pipeline activity.
            </li>
            <li>Trigger the application behavior you want to inspect.</li>
            <li>
              Click <strong>AI Assist</strong> to generate a diagnostic bundle,
              or <strong>Download Logs</strong> to export the raw debug dump.
            </li>
          </ol>
        </div>
      </section>

      <section class="section">
        <div class="section-title">AI Assist: Let the AI Write the Report</div>
        <div class="section-body">
          <p>
            AI Assist exports a diagnostic bundle designed for automated
            analysis by large language models. The bundle contains the recorded
            debug dump together with a structured analysis prompt that instructs
            an AI system how to interpret the captured runtime data.
          </p>
          <p>The workflow is straightforward:</p>
          <ol>
            <li>
              Click the <strong>AI Assist</strong> button in the debugger panel.
            </li>
            <li>Download the generated debug JSON file and analysis prompt.</li>
            <li>
              Upload the debug JSON file directly to an AI model (do not paste
              the JSON contents).
            </li>
            <li>Submit the provided prompt together with the uploaded file.</li>
            <li>
              Review the generated diagnostic report with your engineering team.
            </li>
          </ol>
          <p>
            The debugger does not perform the analysis itself. It prepares a
            diagnostic bundle that allows external AI systems to evaluate the
            recorded execution trace and produce a structured engineering
            report.
          </p>
          <p>AI Assist works with modern large language models including:</p>
          <ul>
            <li><strong>OpenAI</strong> — GPT-4.1, GPT-4o, GPT-5</li>
            <li>
              <strong>Anthropic</strong> — Claude 3.5 Sonnet, Claude 3.7 Sonnet
            </li>
            <li><strong>Google</strong> — Gemini 1.5 Pro, Gemini 2.0</li>
            <li><strong>Meta</strong> — Llama 3.1 (large context variants)</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What the Report Covers</div>
        <div class="section-body">
          <p>
            The AI-generated diagnostic report evaluates your recorded execution
            session across multiple dimensions:
          </p>
          <table>
            <thead>
              <tr>
                <th class="column-200">Diagnostic Area</th>
                <th class="column-auto">What It Reveals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Executive Summary</td>
                <td>
                  The most significant runtime signal — dominant stages,
                  abnormal traces, latency signals, or structural anomalies
                </td>
              </tr>
              <tr>
                <td>Stage Latency</td>
                <td>
                  Average duration, P95 latency, and maximum execution time for
                  each pipeline stage
                </td>
              </tr>
              <tr>
                <td>State Churn</td>
                <td>
                  Rate of state mutations per second — detects redundant
                  pipeline triggers
                </td>
              </tr>
              <tr>
                <td>Bottleneck Detection</td>
                <td>
                  Identifies the most likely runtime bottleneck across all
                  diagnostic signals
                </td>
              </tr>
              <tr>
                <td>Determinism Checks</td>
                <td>
                  Verifies execution determinism — out-of-order events,
                  duplicate traces, nondeterministic signals
                </td>
              </tr>
              <tr>
                <td>System Health Score</td>
                <td>
                  Overall pipeline health grade based on aggregated diagnostics
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-info">
            <strong>No custom tooling required.</strong> The debugger prepares
            the data. The AI writes the report. You focus on fixing the issue.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Pro License Required</div>
        <div class="section-body">
          <p>
            AI Assist is a Pro-tier feature. A valid
            <a routerLink="/sdux/vault" fragment="pro">Pro License</a>
            is required to generate AI-assisted diagnostic reports. The built-in
            debugger itself — including recording, log export, and Chrome Trace
            export — is available in all editions.
          </p>
          <div class="callout callout-warning">
            <strong>Ready to upgrade?</strong> Unlock encrypted persistence,
            advanced DevTools, telemetry, and the full plugin system — one
            payment, lifetime access.
            <a routerLink="/dashboard">Purchase Pro License</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/dev-tools/built-in-debugger"
              >Built-in Debugger documentation</a
            >
            for configuration details, architecture overview, and the complete
            list of AI Assist diagnostic metrics.
          </p>
        </div>
      </section>
      <sdux-stack-blitz-try-it-live
        [id]="'debugger'"></sdux-stack-blitz-try-it-live>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogAiAssistedDebuggingComponent {}
