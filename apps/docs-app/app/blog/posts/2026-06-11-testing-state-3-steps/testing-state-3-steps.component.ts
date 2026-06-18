import { Component, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-testing-state-3-steps',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    MatTab,
    MatTabGroup,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    VaultBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Testing State Is 3 Steps. That's It."
      date="2026-06-11"
      pillar="TA"
      readingTime="4">
      <header class="docs-header">
        <p class="lead">
          How many lines of test setup does your state management need?
          <sdux-vault-brand-name [tm]="true" /> reduces the entire testing
          pattern to three steps: mutate, await, assert. It works identically
          across Karma, Jest, Vitest, and Angular TestBed — no mocks, no
          ceremony, no framework-specific test harnesses.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem: Testing Ceremony</div>
        <div class="section-body">
          <p>
            Most state management libraries demand significant ceremony before
            you can write a single assertion. Mock stores. Fake dispatchers.
            Framework-specific test harnesses. Provider overrides. Reducer
            factories. Middleware stubs.
          </p>
          <p>
            The setup code often dwarfs the test itself. You spend more time
            configuring the testing environment than verifying behavior. And
            when the library changes its internal wiring, your test setup breaks
            — even when the feature under test hasn't changed.
          </p>
          <p>
            This friction discourages testing. Teams write fewer state tests,
            cover fewer edge cases, and rely more on integration tests that are
            slow and brittle. The root cause is architectural: if your state
            management isn't designed for deterministic testing, every test
            becomes a fight against the framework.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Pattern: Mutate, Await, Assert</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name [tm]="true" /> is engineered for
            deterministic execution. The pipeline enforces strict serialization,
            non-re-entrancy, and explicit settlement boundaries. That
            architecture produces a testing model that is exactly three steps:
          </p>
          <ol>
            <li>
              <strong>Mutate</strong> — Call replaceState or mergeState to
              trigger a state change. This enqueues an attempt through the full
              pipeline.
            </li>
            <li>
              <strong>Await</strong> — Call await vaultSettled(key) to wait for
              the conductor's microtask finalize boundary. This guarantees the
              queue has fully drained and settlement has completed.
            </li>
            <li>
              <strong>Assert</strong> — Read the committed state and verify it
              matches your expectation. The pipeline has fully settled — the
              value is stable and final.
            </li>
          </ol>

          <blockquote class="sdux-quote">
            <p>
              <strong>
                Rule: If a
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is registered, always await vaultSettled(key) after a state
                mutation.
              </strong>
            </p>
          </blockquote>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The three-step pattern works because
            <sdux-vault-brand-name />'s execution model is deterministic. The
            serialized conductor queue and explicit microtask finalization
            boundary mean every state transition settles predictably — no timing
            hacks, no repeated tick() calls, no guesswork.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Code Examples</div>
        <div class="section-body">
          <p>
            The same three-step pattern applies across every supported
            framework. Angular uses TestBed and dependency injection. React,
            Vue, and Svelte call the framework-agnostic API directly. The
            testing logic is identical — only the initialization differs.
          </p>

          <div class="sdux-tab-container">
            <mat-tab-group
              animationDuration="200ms"
              mat-stretch-tabs="false"
              class="sdux-tabs"
              [selectedIndex]="0">
              <mat-tab label="Angular">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab [label]="'Minimal Test Pattern'">
                        <pre
                          class="code-inline"><code class="language-ts">// Example Angular Test Structure
describe('Employee FeatureCell', () =&gt; &#123;
  let testService: ExampleService;

  beforeEach(async () =&gt; &#123;
    await TestBed.configureTestingModule(&#123;
      providers: [
        // Initialize the Vault runtime in deterministic test mode.
        // This enables DevMode, resets prior global state, and
        // registers settlement hooks.
        provideVaultTesting(),
        // Declare the production FeatureCell exactly as it would
        // exist in the application.
        provideFeatureCell(ExampleService, &#123;
          key: 'employees',
          initialState: null,
          insights: &#123;&#125; as any
        &#125;)

        // Any other provider declarations
        provideZonelessChangeDetection(),
      ]
    &#125;);

    // Explicitly inject and initialize the FeatureCell runtime.
    testService = TestBed.inject(ExampleService);
    testService.initialize();
  &#125;);

  it('replaces state deterministically', async () =&gt; &#123;
    // initialize() always commits the initial state.
    // That commit runs through the full pipeline and
    // settles via the microtask finalize boundary.
    await vaultSettled('employees');

    // Trigger a state mutation.
    // This runs synchronously through the pipeline,
    // but finalization occurs in a microtask.
    testService.vault.replaceState([&#123; name: 'Alice' &#125;]);

    // Await the conductor's microtask finalize boundary.
    // This guarantees the queue has fully drained and
    // settlement has completed.
    await vaultSettled('employees');

    // Now it is safe to assert.
    expect(testService.vault.state.value).toEqual([&#123; name: 'Alice' &#125;]);
  &#125;);
&#125;);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>
              <mat-tab label="Angular with Effects">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab
                        [label]="'Minimal Test Pattern for effects'">
                        <pre
                          class="code-inline"><code class="language-ts">// Example Angular with Effect Test Structure
describe('Employee FeatureCell', () =&gt; &#123;
  let testService: ExampleService;

  beforeEach(async () =&gt; &#123;
  await TestBed.configureTestingModule(&#123;
    providers: [
      // Initialize the Vault runtime in deterministic test mode.
      // Enables DevMode, resets global state, and registers settlement hooks.
      provideVaultTesting(),

      // Declare the production FeatureCell exactly as it exists in the application.
      provideFeatureCell(ExampleService, &#123;
        key: 'employees',
        initialState: null,
        insights: &#123;&#125; as any
      &#125;),

      provideZonelessChangeDetection(),
    ]
  &#125;);

  // Inject and initialize the FeatureCell runtime.
  testService = TestBed.inject(ExampleService);
  testService.initialize();

  // STEP 1 — Stabilize the initial commit.
  // initialize() always enqueues an attempt that runs through the
  // full pipeline and settles via the microtask finalize boundary.
  await vaultSettled('employees');

  // STEP 2 — Flush Angular's scheduler layer.
  // If an Angular effect() reacts to the committed state,
  // it will execute during this tick().
  TestBed.tick();

  // STEP 3 — Stabilize any mutation triggered by an effect.
  // This second await is REQUIRED only if an effect enqueued
  // a new merge/replaceState call.
  //
  // If the effect was read-only (no mutation),
  // no second pipeline run occurred and this await resolves immediately.
  await vaultSettled('employees');
&#125;);

  it('replaces state deterministically', async () =&gt; &#123;

    // Trigger a state mutation.
    // This runs synchronously through the pipeline,
    // but finalization occurs in a microtask.
    testService.vault.replaceState([&#123; name: 'Alice' &#125;]);

    // Await the conductor's microtask finalize boundary.
    // This guarantees the queue has fully drained and
    // settlement has completed.
    await vaultSettled('employees');

    // Now it is safe to assert.
    expect(testService.vault.state.value).toEqual([&#123; name: 'Alice' &#125;]);
  &#125;);
&#125;);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>
              <mat-tab label="React">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab [label]="'Minimal Test Pattern'">
                        <pre
                          class="code-inline"><code class="language-ts">// Example Test Structure
describe('Employee FeatureCell', () =&gt; &#123;
  let employeeCell;

  beforeEach(() =&gt; &#123;
    // Initialize the Vault runtime in deterministic test mode.
    // This enables DevMode, resets prior global state, and
    // registers settlement hooks.
    VaultTesting();

    // Declare the production FeatureCell exactly as it would
    // exist in the application.
    employeeCell = FeatureCell(&#123;
      key: 'employees',
      initialState: []
    &#125;);

    // Explicitly initialize the FeatureCell runtime.
    // (In Angular this happens automatically via DI.)
    employeeCell.initialize();
  &#125;);

  it('replaces state deterministically', async () =&gt; &#123;
    // initialize() always commits the initial state.
    // That commit runs through the full pipeline and
    // settles via the microtask finalize boundary.
    await vaultSettled('employees');

    // Trigger a state mutation.
    // This runs synchronously through the pipeline,
    // but finalization occurs in a microtask.
    employeeCell.replaceState([&#123; name: 'Alice' &#125;]);

    // Await the conductor's microtask finalize boundary.
    // This guarantees the queue has fully drained and
    // settlement has completed.
    await vaultSettled('employees');

    // Now it is safe to assert.
    expect(employeeCell.state.value).toEqual([&#123; name: 'Alice' &#125;]);
  &#125;);
&#125;);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>
              <mat-tab label="Vue">
                <div class="tab-panel">
                  <ng-content select="[retrieve]">
                    <sdux-example-viewer-source [displayTabs]="false">
                      <sdux-example-viewer-tab [label]="'Minimal Test Pattern'">
                        <pre
                          class="code-inline"><code class="language-ts">// Example Test Structure
describe('Employee FeatureCell', () =&gt; &#123;
  let employeeCell;

  beforeEach(() =&gt; &#123;
    // Initialize the Vault runtime in deterministic test mode.
    // This enables DevMode, resets prior global state, and
    // registers settlement hooks.
    VaultTesting();

    // Declare the production FeatureCell exactly as it would
    // exist in the application.
    employeeCell = FeatureCell(&#123;
      key: 'employees',
      initialState: []
    &#125;);

    // Explicitly initialize the FeatureCell runtime.
    // (In Angular this happens automatically via DI.)
    employeeCell.initialize();
  &#125;);

  it('replaces state deterministically', async () =&gt; &#123;
    // initialize() always commits the initial state.
    // That commit runs through the full pipeline and
    // settles via the microtask finalize boundary.
    await vaultSettled('employees');

    // Trigger a state mutation.
    // This runs synchronously through the pipeline,
    // but finalization occurs in a microtask.
    employeeCell.replaceState([&#123; name: 'Alice' &#125;]);

    // Await the conductor's microtask finalize boundary.
    // This guarantees the queue has fully drained and
    // settlement has completed.
    await vaultSettled('employees');

    // Now it is safe to assert.
    expect(employeeCell.state.value).toEqual([&#123; name: 'Alice' &#125;]);
  &#125;);
&#125;);</code></pre>
                      </sdux-example-viewer-tab>
                    </sdux-example-viewer-source>
                  </ng-content>
                </div>
              </mat-tab>
            </mat-tab-group>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why It Works</div>
        <div class="section-body">
          <p>
            The three-step pattern is not a shortcut or a convenience wrapper.
            It works because <sdux-vault-brand-name />'s execution model is
            architecturally deterministic:
          </p>
          <ul>
            <li>
              <strong>Serialized conductor queue</strong> — Every state mutation
              is enqueued and executed in strict order. No interleaving, no
              reentrancy, no race conditions.
            </li>
            <li>
              <strong>Microtask finalize boundary</strong> — Settlement occurs
              at a well-defined point in the event loop. vaultSettled(key)
              resolves when that boundary is reached.
            </li>
            <li>
              <strong>Framework-agnostic core</strong> — The pipeline does not
              depend on Angular, React, Vue, or any specific runtime. The same
              settlement guarantee applies regardless of which test runner or
              framework adapter you use.
            </li>
          </ul>

          <div class="callout callout-warning">
            <strong>Angular with Effects:</strong> When your
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            uses Angular effect() to react to committed state, an additional
            scheduler layer enters the picture. After awaiting vaultSettled,
            call TestBed.tick() to flush Angular's effect scheduler, then await
            vaultSettled again if the effect triggered a new mutation. The
            "Angular with Effects" tab above shows this pattern.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a href="/docs/welcome/testing">testing documentation</a> for
            stabilization rules, timer testing patterns, and advanced
            integration scenarios. The three-step pattern covers the standard
            case — the docs cover everything else.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTestingState3StepsComponent {}
