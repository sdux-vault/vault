import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-fluent-api-predictable-state-interaction',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="The Fluent API That Makes State Interaction Predictable by Design"
      date="2026-07-20"
      pillar="TA"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          Most state libraries hand you a grab-bag of loosely related functions
          and trust you to wire them together correctly.
          <sdux-brand-name [tm]="true" /> takes the opposite approach. A
          registered <sdux-feature-cell [tm]="true" /> exposes one stable, typed
          runtime surface &mdash; the
          <span class="code"
            ><a href="/docs/references/shapes/feature-cell-shape"
              >FeatureCellShape</a
            >&lt;T&gt;</span
          >
          contract &mdash; where every method is a known interaction point with
          deterministic behavior. This is what turns state work from "hope it
          works" into "know it works."
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem With Loose State APIs</div>
        <div class="section-body">
          <p>
            Reach into a typical state layer and the surface area is scattered.
            You dispatch through one function, read through a selector helper,
            subscribe through a component binding, and coordinate side effects
            through middleware that lives somewhere else entirely. None of these
            pieces share a single contract. Nothing tells you, up front, exactly
            what you can call, what it returns, or when it is safe to call it.
          </p>
          <p>
            The cost is not just ergonomic. When the interaction surface is a
            loose collection of helpers, correctness becomes a matter of
            convention.
          </p>
          <ul>
            <li>Did you subscribe before the store was ready?</li>
            <li>Did you read a slice that a reducer had not produced yet?</li>
            <li>
              Did a side effect fire mid-update and observe a half-applied
              change?
            </li>
          </ul>
          <p>
            These questions exist precisely because there is no single, typed
            surface that defines what interaction is legal and what it
            guarantees.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Predictability starts with a
            contract. If the set of legal interactions is not written down as a
            type, every call site is an opportunity to guess wrong.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          What a Fluent Contract Actually Guarantees
        </div>
        <div class="section-body">
          <p>
            A <sdux-feature-cell /> does not expose a pile of standalone
            functions. It returns a single object that satisfies the
            <span class="code"
              ><a href="/docs/references/shapes/feature-cell-shape"
                >FeatureCellShape</a
              >&lt;T&gt;</span
            >
            contract &mdash; the complete public runtime API of that cell, typed
            to the cell's own state shape
            <span class="code">T</span>. Every method you can call, every
            property you can read, and every stream you can observe is declared
            in one place.
          </p>
          <p>
            Because the surface is typed to <span class="code">T</span>, the
            compiler participates in your correctness. A
            <span class="code">mergeState()</span> call is checked against the
            cell's state shape. A <span class="code">state</span> read returns
            that shape, not <span class="code">unknown</span>. The interaction
            surface is not documentation you hope stays accurate &mdash; it is a
            contract the type system enforces on every call.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The
            <span class="code"
              ><a href="/docs/references/shapes/feature-cell-shape"
                >FeatureCellShape</a
              >&lt;T&gt;</span
            >
            describes only the externally visible interaction surface. It does
            not leak pipeline internals or execution mechanics &mdash; you
            interact with a stable façade, and the runtime handles the rest.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          FeatureCellShape&lt;T&gt; &mdash; One Surface, Every Interaction
        </div>
        <div class="section-body">
          <p>The contract groups into four intentions:</p>
          <ul>
            <li>configure behaviors during initialization</li>
            <li>observe state</li>
            <li>lifecycle, and issue state updates</li>
            <li>framework integration</li>
          </ul>
          <p>A representative slice of the surface:</p>
          <table
            aria-label="Representative FeatureCellShape members grouped by intention">
            <thead>
              <tr>
                <th scope="col" class="column-100">Intention</th>
                <th scope="col" class="column-200">Members</th>
                <th scope="col" class="column-auto">What you get</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Configure</td>
                <td>
                  <ul>
                    <li>afterTaps()</li>
                    <li>beforeTaps()</li>
                    <li>errors()</li>
                    <li>filters()</li>
                    <li>interceptors()</li>
                    <li>operators()</li>
                    <li>reducers()</li>
                  </ul>
                </td>
                <td>
                  Register the behaviors that run during the pipeline, declared
                  before the cell is initialized.
                </td>
              </tr>
              <tr>
                <td>Observe</td>
                <td>
                  <ul>
                    <li>destroyed$</li>
                    <li>emitStates()</li>
                    <li>reset$</li>
                    <li>state</li>
                    <li>state$</li>
                  </ul>
                </td>
                <td>
                  Read the current committed snapshot synchronously or subscribe
                  to committed emissions and lifecycle signals.
                </td>
              </tr>
              <tr>
                <td>Update</td>
                <td>
                  <ul>
                    <li>destroy()</li>
                    <li>initialize()</li>
                    <li>hydrate()</li>
                    <li>mergeState()</li>
                    <li>replaceState()</li>
                    <li>reset()</li>
                  </ul>
                </td>
                <td>
                  Issue state changes and control the cell's lifecycle through
                  named, typed entry points.
                </td>
              </tr>
              <tr>
                <td>Integrate</td>
                <td>
                  <ul>
                    <li>useReactiveState()</li>
                    <li>useSyncExternalStore()</li>
                    <li>key</li>
                  </ul>
                </td>
                <td>
                  Bind the cell to a framework's reactivity, or read the cell's
                  unique identifier.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Every one of these is part of the same object. There is no separate
            dispatcher, no external selector registry, no middleware layer you
            have to reason about separately.
          </p>
          <p>
            The cell <strong><em>is</em></strong> the surface.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Predictability Through Registration Boundaries
        </div>
        <div class="section-body">
          <p>
            The contract becomes active only after a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            registered and initialized. That boundary is what makes the surface
            predictable: configuration methods register behaviors before the
            pipeline runs, and once you call
            <span class="code">initialize()</span>, the interaction surface is
            fixed and ready. You are never interacting with a half-configured
            store.
          </p>
          <p>
            Here is the same cell created in Angular and in the
            framework-neutral core. The contract you interact with afterward is
            identical &mdash; only the wiring differs.
          </p>

          <sdux-multi-framework-example
            description="Registering a FeatureCell exposes the FeatureCellShape surface">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService,
      &#123;
        key: 'employees',
        initialState: []
      &#125;
    )
  ]
&#125;;

// employee.service.ts
// The provideFeatureCell key must match the &#64;FeatureCell key input
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

// employee.shape.ts
export interface Employee &#123;
  name: string;
&#125;

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;

  // injectVault returns the FeatureCellShape&lt;Employee[]&gt; surface
  readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    // Required to activate the FeatureCell
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// main.ts (or index.ts, app.ts)
import &#123; Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123;
  logLevel: 'off'
&#125;);

// employee.cell.ts
import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

// employeeCell satisfies FeatureCellShape&lt;Employee[]&gt;
export const employeeCell = FeatureCell(&#123;
  key: 'employees',
  initialState: []
&#125;);

// Explicit activation
employeeCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <div class="callout callout-warning">
            <strong>Warning:</strong> The Vault runtime must be initialized
            before a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            registered, and each cell key may be registered exactly once.
            Interacting with the
            <span class="code"
              ><a href="/docs/references/shapes/feature-cell-shape"
                >FeatureCellShape</a
              >&lt;T&gt;</span
            >
            surface is only valid after
            <span class="code">initialize()</span> has activated the cell.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Reading and Updating State Deterministically
        </div>
        <div class="section-body">
          <p>
            Once the surface is active, reads and updates are named, typed
            operations on the same object. You read the current committed
            snapshot with the <span class="code">state</span> property,
            subscribe to committed emissions with
            <span class="code">state$</span>, and issue changes with
            <span class="code">mergeState()</span> or
            <span class="code">replaceState()</span>. Because the cell owns its
            own scoped state, an update targets that cell directly &mdash; there
            is no global broadcast to reason about.
          </p>
          <sdux-multi-framework-example
            description="Interacting with a FeatureCell through its typed surface">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Inside EmployeeService (this.vault is FeatureCellShape&lt;Employee[]&gt;)

// Read the current committed snapshot
const current = this.vault.state;

// Merge a partial change into the owning cell
this.vault.mergeState([...current, &#123; name: 'Ada' &#125;]);

// Replace the state outright
this.vault.replaceState([]);

// Observe committed emissions
this.vault.state$.subscribe((employees) =&gt; &#123;
  // employees is typed as Employee[]
&#125;);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// employeeCell satisfies FeatureCellShape&lt;Employee[]&gt;

// Read the current committed snapshot
const current = employeeCell.state;

// Merge a partial change into the owning cell
employeeCell.mergeState([...current, &#123; name: 'Ada' &#125;]);

// Replace the state outright
employeeCell.replaceState([]);

// Observe committed emissions
employeeCell.state$.subscribe((employees) =&gt; &#123;
  // employees is typed as Employee[]
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            Each call is a declared member of the contract, typed to the cell's
            state. There is no ambiguity about what a call does or what it
            returns &mdash; the surface tells you, and the compiler holds you to
            it.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How This Differs From Redux</div>
        <div class="section-body">
          <p>
            In a Redux application, interacting with state means touching
            several unrelated APIs: <span class="code">dispatch</span> to
            trigger a change, <span class="code">connect</span> or
            <span class="code">useSelector</span> to read, and middleware to
            coordinate side effects. None of these share a single typed contract
            scoped to one slice of state, so correctness depends on convention
            spread across many files.
          </p>
          <table
            aria-label="Redux state interaction compared to the FeatureCellShape contract">
            <thead>
              <tr>
                <th scope="col" class="column-150">Concern</th>
                <th scope="col" class="column-auto">Redux</th>
                <th scope="col" class="column-auto"><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reading state</td>
                <td>Selectors project from a global tree</td>
                <td>state property / state$ on the owning cell</td>
              </tr>
              <tr>
                <td>Updating state</td>
                <td>dispatch broadcasts an action to every reducer</td>
                <td>mergeState() / replaceState() target the cell directly</td>
              </tr>
              <tr>
                <td>Interaction surface</td>
                <td>
                  Spread across dispatch, connect, useSelector, middleware
                </td>
                <td>
                  One typed
                  <a href="/docs/references/shapes/feature-cell-shape"
                    >FeatureCellShape</a
                  >&lt;T&gt; contract
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Redux gives you a pattern assembled
            from separate pieces. <sdux-brand-name /> gives you a single typed
            surface where every interaction is a declared, deterministic member
            of one contract.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Test the Power</div>
        <div class="section-body">
          <p>
            <a href="/stackblitz#replace-state">Open a StackBlitz</a> and try it
            yourself. The cell will be registered and initialized. After
            experiment with its surface in the StackBlitz editor. Autocomplete
            lists the entire contract, every member typed to your state. That is
            the fluent API working for you: predictable, deterministic, and
            impossible to call the wrong way by accident.
          </p>
          <!-- StackBlitz: fluent-api-predictable-state-interaction -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Explore the full contract and every member's semantics in the
            <a href="/docs/references/shapes/feature-cell-shape"
              >FeatureCellShape reference</a
            >
            and the
            <a href="/docs/pipeline/apis/feature-cell-api/after-taps-method"
              >FeatureCell methods documentation</a
            >.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogFluentApiPredictableStateInteractionComponent {}
