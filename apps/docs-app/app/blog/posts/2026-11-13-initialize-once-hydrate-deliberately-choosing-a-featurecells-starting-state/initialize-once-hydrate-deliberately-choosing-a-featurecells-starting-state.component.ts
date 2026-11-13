import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-initialize-once-hydrate-deliberately-choosing-a-featurecells-starting-state',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  template: `
    <sdux-blog-layout
      id="initialize-once-hydrate-deliberately-choosing-a-featurecells-starting-state"
      title="Initialize Once, Hydrate Deliberately: Choosing a FeatureCell's Starting State"
      date="2026-11-13"
      pillar="ED"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          A <sdux-feature-cell [tm]="true" /> does not start with "whatever was
          in the constructor." Calling <strong>initialize()</strong> activates
          the runtime pipeline, and the value it begins with depends on a
          resolved decision between a declared default, a previously persisted
          value, and a deliberate <strong>hydrate()</strong> factory. Knowing
          which source wins — and why — is what separates an accidental starting
          value from an intentional one.
        </p>
        <p>
          This post walks through what
          <strong>initialize()</strong> actually activates, when
          <strong>hydrate()</strong> overrides everything else, and how to
          choose between a static default, Persist behaviors, and an explicit
          factory when your FeatureCell comes online.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>The core idea:</strong> initialization is not a direct
            mutation. Whatever value is selected — hydrated, persisted, or
            declared — is enqueued as a
            <span class="code">replaceState</span> operation and processed
            through the same pipeline as any other update.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">Initialization Is a Runtime Boundary</div>
        <div class="section-body">
          <p>
            A <sdux-feature-cell /> is not operational the moment it is
            declared. It becomes a runtime participant only after
            <strong>initialize()</strong> is called — once, and exactly once.
            Reading state, issuing updates, or interacting with a
            <sdux-feature-cell /> before initialization results in a runtime
            error, and calling <strong>initialize()</strong> a second time does
            the same.
          </p>
          <p>
            That boundary matters because initialization is where configuration
            becomes behavior. Filters, reducers, taps, error handlers, and emit
            configuration all have to be declared on the fluent builder before
            <strong>initialize()</strong> runs. Once initialization completes,
            the pipeline is fixed for the lifetime of that
            <sdux-feature-cell />.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What initialize() Actually Activates</div>
        <div class="section-body">
          <p>
            Calling <strong>initialize()</strong> transitions a
            <sdux-feature-cell /> from a configured definition into an active
            runtime participant. In order, it validates the declared
            configuration and behaviors, registers the
            <sdux-feature-cell /> with the Vault runtime, activates the
            Conductor execution surface, evaluates whichever initialization
            source was declared, and — if that source produced a value —
            enqueues it as the first
            <span class="code">replaceState</span> operation.
          </p>
          <p>
            If no initialization mechanism is declared at all, the
            <sdux-feature-cell /> still becomes active, but with
            <span class="code">value: undefined</span>, waiting for an explicit
            <span class="code">replaceState()</span> call. Declaring a default
            is optional; becoming active is not.
          </p>
          <sdux-multi-framework-example description="Basic Initialization">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService
      &#123;  
        key: 'employees',
        // Initial state is declared directly in the descriptor
        initialState: [
          &#123; id: 1, name: 'Alice' &#125;,
          &#123; id: 2, name: 'Bob' &#125;
        ]
      &#125;
    )
  ]
&#125;;

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  private readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    // Initial state is declared directly in the descriptor
    initialState: [
      &#123; id: 1, name: 'Alice' &#125;,
      &#123; id: 2, name: 'Bob' &#125;
    ]
  &#125;,
);

employeeCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            Here, <span class="code">descriptor.initialState</span> is the only
            declared source, so that array becomes the first candidate through
            Resolve, Filters, Reducers, and Emit — the same pipeline any later
            update travels through.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">When hydrate() Wins</div>
        <div class="section-body">
          <p>
            During initialization, Vault evaluates exactly one initialization
            source, in strict precedence order:
          </p>
          <ol>
            <li><strong>hydrate()</strong> — highest precedence</li>
            <li><strong>Persist behaviors</strong></li>
            <li><strong>descriptor.initialState</strong></li>
            <li><strong>No source declared</strong> — manual initialization</li>
          </ol>
          <p>
            These are not fallback layers. Vault does not try
            <strong>hydrate()</strong>, fail, and then fall back to Persist or
            the descriptor. Only the single highest-precedence declared source
            is evaluated at all.
          </p>
          <p>
            <strong>hydrate(factory)</strong> registers a deferred factory that
            does not run when it is called — it runs only when
            <strong>initialize()</strong> runs. The factory may return a value
            synchronously, return a Promise, resolve to
            <span class="code">undefined</span>, or throw. When declared, it
            overrides both Persist behaviors and
            <span class="code">descriptor.initialState</span> outright, because
            declaring <strong>hydrate()</strong> is an explicit statement that
            persisted or static data should not be treated as authoritative for
            this initialization cycle.
          </p>
          <sdux-multi-framework-example
            description="hydrate() overrides descriptor.initialState">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  private readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault
      .hydrate(() =&gt; Promise.resolve(...))
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    // ignored
    initialState: []
  &#125;
);

employeeCell.hydrate(() =&gt; Promise.resolve(...)).initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-warning">
            <p>
              <strong>Watch the comment:</strong> that descriptor still declares
              <span class="code">initialState: []</span>, but once
              <strong>hydrate()</strong> is registered, it is never evaluated.
              Declaring both is not a layering strategy — only one source wins.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Choosing Between Defaults, Persistence, and Hydration
        </div>
        <div class="section-body">
          <p>
            The practical question at startup is simple: should this
            <sdux-feature-cell /> begin with a declared default, a persisted
            value, or an explicit factory? Each source answers a different need.
          </p>
          <table aria-label="Initialization source comparison">
            <thead>
              <tr>
                <th scope="col" class="column-200">Source</th>
                <th scope="col" class="column-250">Nature</th>
                <th scope="col" class="column-auto">Choose it when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>descriptor.initialState</td>
                <td>Static, declared at configuration time</td>
                <td>
                  The starting value is fixed and known in advance, with no
                  runtime dependency
                </td>
              </tr>
              <tr>
                <td>Persist behaviors</td>
                <td>Previously committed state, restored from storage</td>
                <td>
                  Continuity across reloads or sessions matters more than a
                  guaranteed-fresh value
                </td>
              </tr>
              <tr>
                <td>hydrate()</td>
                <td>Deferred factory, evaluated only during initialize()</td>
                <td>
                  Startup state must be computed or fetched, and stale persisted
                  data or a static default would be wrong
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Persisted storage can go stale the moment the underlying data
            changes elsewhere, and a static descriptor is static by definition.
            <strong>hydrate()</strong> exists for the case where neither of
            those should be treated as authoritative — if dynamic resolution is
            not actually needed, do not declare it, and Vault evaluates storage
            or the descriptor according to precedence instead.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Handling Missing Values and Failures</div>
        <div class="section-body">
          <p>
            A deferred factory does not always resolve the way you expect, and
            <strong>hydrate()</strong> treats "no value" very differently from
            "something went wrong."
          </p>
          <table aria-label="hydrate() resolution outcomes">
            <thead>
              <tr>
                <th scope="col" class="column-200">Factory result</th>
                <th scope="col" class="column-auto">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Returns a value</td>
                <td>
                  Enqueued as <span class="code">replaceState</span> and
                  processed through Resolve, Operators, Filters, Reducers, and
                  Emit
                </td>
              </tr>
              <tr>
                <td>Resolves to undefined</td>
                <td>
                  No write occurs; the
                  <sdux-feature-cell /> remains with
                  <span class="code">value: undefined</span> and
                  <span class="code">hasValue: false</span>
                </td>
              </tr>
              <tr>
                <td>Throws or rejects</td>
                <td>
                  Initialization fails; no fallback source is evaluated; the
                  error is emitted
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            An <span class="code">undefined</span> result is not treated as a
            failure — it just means nothing committed. A thrown error or
            rejected Promise is treated as a failure, because the declared
            authoritative source did not resolve the way the application
            promised it would.
          </p>
          <sdux-multi-framework-example
            description="Asynchronous hydrate() with a fetch that can fail">
            <ng-template #angular>
              <pre class="code-inline"><code class="language-ts">
&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  private readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault
      .hydrate(() =&gt;
        fetch('/api/employees')
          .then(res =&gt; res.json())
      )
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell(&#123;
  key: 'employees'
&#125;);

employeeCell
  .hydrate(() =&gt;
    fetch('/api/employees')
      .then(res =&gt; res.json())
  )
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            If that fetch rejects, initialization fails:
            <span class="code">hasValue</span> stays false,
            <span class="code">value</span> stays undefined, and
            <span class="code">error</span> is populated. The pipeline keeps
            running — it does not crash the application — but nothing committed
            as declared. Recovery, if you want it, has to be explicit, using
            <span class="code">reset()</span> and
            <span class="code">replaceState()</span> to put the
            <sdux-feature-cell /> into a known state on your own terms.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>No silent fallback:</strong> if
              <strong>hydrate()</strong> throws, Vault does not quietly drop
              down to Persist behaviors or
              <span class="code">descriptor.initialState</span>. The
              <sdux-feature-cell /> does not activate partially, and the failure
              is visible instead of masked.
            </p>
          </div>
          <!-- StackBlitz: hydrate-state -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the full method contracts for
            <a
              [routerLink]="[
                '/docs/pipeline/apis/feature-cell-api/initialize-method'
              ]"
              >initialize()</a
            >
            and
            <a
              [routerLink]="[
                '/docs/pipeline/apis/feature-cell-api/hydrate-method'
              ]"
              >hydrate()</a
            >
            in the FeatureCell API reference, including the full precedence
            rules, diagrams, and resolution outcome tables this post draws from.
            Try the live StackBlitz example above to see
            <strong>hydrate()</strong> override a descriptor default in a
            running pipeline.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogInitializeOnceHydrateDeliberatelyChoosingAFeatureCellsStartingStateComponent {}
