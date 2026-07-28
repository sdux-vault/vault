import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-state-management-without-framework-lock-in',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    BrandNameComponent,
    CatchPhraseComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent
  ],
  template: `
    <sdux-blog-layout
      title="Plain TypeScript, Zero Magic: State Management Without Framework Lock-In"
      date="2026-07-28"
      pillar="TA"
      readingTime="7">
      <header class="docs-header">
        <p class="lead">
          Most state libraries are really framework libraries with a state API
          attached. <sdux-brand-name [tm]="true" /> flips that model. Its core
          is <sdux-catch-phrase [tm]="true" />, and the framework layers are
          thin adapters. That means your state architecture is not trapped
          inside Angular, React, Vue, or Svelte. It stays portable as teams,
          products, and runtimes change.
        </p>
      </header>

      <section class="section">
        <div class="section-title">
          Most State Libraries Are Secretly Framework Libraries
        </div>
        <div class="section-body">
          <p>
            State management is supposed to protect business rules from churn,
            but most libraries tie those rules to a rendering story. NgRx is an
            Angular story. Pinia is a Vue story. Redux is more portable in
            theory, but many teams still end up adopting it through
            framework-specific providers, hooks, selector conventions, effect
            patterns, and store bootstrapping. The result is the same: change
            the framework, and your state layer becomes migration work.
          </p>
          <p>
            That coupling is expensive because state logic usually outlives UI
            trends. Product teams replatform screens, split applications,
            introduce server-side orchestration, or move shared logic into tools
            and background jobs. If the state engine only makes sense inside one
            framework, the rewrite cost shows up every time the platform moves.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> Framework lock-in rarely starts in
              your components. It starts when your state model depends on a
              framework lifecycle, a framework container, or a framework-only
              runtime assumption.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          What Plain TypeScript, Zero Magic Actually Buys You
        </div>
        <div class="section-body">
          <p>
            <sdux-catch-phrase /> is not branding language. It is an
            architectural constraint. <sdux-brand-name /> does not depend on
            reflection, runtime patching, framework lifecycles, or hidden side
            effects. Its core concepts, including <sdux-feature-cell />s,
            pipelines, reducers, filters, interceptors, lifecycle signals, and
            immutable state snapshots, are language-level primitives composed in
            TypeScript.
          </p>
          <p>
            Because the runtime is explicit, the guarantees stay stable
            everywhere the code runs. A cell is still registered explicitly.
            Initialization is still explicit. The pipeline still executes in a
            deterministic order. State is still committed as immutable
            snapshots. Framework adapters improve ergonomics, but they do not
            rewrite the underlying rules.
          </p>
          <ul>
            <li>Identical state semantics across platforms</li>
            <li>Explicit lifecycle control everywhere</li>
            <li>No framework lock-in</li>
            <li>Predictable behavior in any runtime</li>
            <li>Frameworks add ergonomics, not rules</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          One State Engine Across Angular, React, Vue, and Svelte
        </div>
        <div class="section-body">
          <p>
            The reason portability is real instead of aspirational is simple:
            the core contract stays the same. Angular uses dependency injection
            and Signals-friendly helpers. React, Vue, and Svelte consume the
            same committed snapshots through their own reactive surfaces. The
            state owner does not change, the pipeline does not change, and the
            lifecycle rules do not change.
          </p>

          <sdux-multi-framework-example
            description="The same FeatureCell with framework-specific wiring only">
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
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre class="code-inline"><code class="language-ts">// main.ts
import &#123; FeatureCell, Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123; logLevel: 'off' &#125;);

// employee.cell.ts
export const employeeCell = FeatureCell(&#123;
  key: 'employees',
  initialState: []
&#125;);

employeeCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            The Angular version adds DI-friendly registration. The plain core
            version is what powers React, Vue, Svelte, Node.js, Bun, and Vanilla
            JavaScript integrations. Different wiring, same state semantics.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Redux Knowledge Still Transfers</div>
        <div class="section-body">
          <p>
            This is not an argument that everything you learned in Redux was
            wrong. Pure reducers, immutable state evolution, selectors, and
            deterministic thinking all transfer directly. The change is where
            the architecture lives. Redux usually centers the application on a
            global store and dispatch flow. <sdux-brand-name /> centers it on
            the owning <sdux-feature-cell /> and a deterministic pipeline.
          </p>

          <table
            aria-label="Redux compared to SDuX Vault framework lock-in tradeoffs">
            <thead>
              <tr>
                <th scope="col" class="column-175">Concern</th>
                <th scope="col" class="column-auto">Redux</th>
                <th scope="col" class="column-auto"><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primary architecture</td>
                <td>Global store and dispatch-centric integration</td>
                <td>Scoped FeatureCell ownership and direct state intent</td>
              </tr>
              <tr>
                <td>Framework relationship</td>
                <td>Usually adopted through framework-specific bindings</td>
                <td>Thin adapters that do not change runtime rules</td>
              </tr>
              <tr>
                <td>Migration path</td>
                <td>Concepts transfer, but store wiring often stays central</td>
                <td>
                  Can run beside Redux while features migrate cell by cell
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why Runtime-Agnostic State Matters for Teams
        </div>
        <div class="section-body">
          <p>
            Teams rarely live in a single runtime forever. An Angular product
            team adds a React microsite. A frontend flow needs shared logic in a
            Node.js worker. A proof of concept becomes a long-lived internal
            tool. Runtime-agnostic state means the architectural investment can
            move with those decisions instead of being thrown away by them.
          </p>
          <p>
            That matters operationally too. Shared state rules become easier to
            document, review, and test when they are not hidden behind four
            different framework-specific abstractions. You can teach one mental
            model, keep one set of guarantees, and let each framework focus on
            rendering rather than owning correctness.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> The win is not just portability. It
              is organizational consistency. One runtime-level state model is
              easier to migrate, easier to review, and easier to share across
              teams than four separate framework-native patterns.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Framework Ergonomics Without Framework Lock-In
        </div>
        <div class="section-body">
          <p>
            Thin adapters are the right compromise. Angular can use DI and
            Signals-friendly consumption. React can use hooks. Vue can use the
            Composition API. Svelte can bind reactive values naturally. None of
            those conveniences require the core runtime to become framework
            property.
          </p>

          <table
            aria-label="Framework adapter ergonomics compared to stable SDuX Vault behavior">
            <thead>
              <tr>
                <th scope="col" class="column-150">Platform</th>
                <th scope="col" class="column-auto">Adapter Ergonomics</th>
                <th scope="col" class="column-auto">What Stays Fixed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Angular</td>
                <td>
                  DI registration, decorators, injectVault, Signals support
                </td>
                <td>
                  Explicit init, deterministic pipeline, immutable snapshots
                </td>
              </tr>
              <tr>
                <td>React</td>
                <td>Hook-based consumption of committed state</td>
                <td>
                  FeatureCell ownership, lifecycle rules, pipeline semantics
                </td>
              </tr>
              <tr>
                <td>Vue</td>
                <td>Composition-friendly consumption and reactive bindings</td>
                <td>Identical state semantics and explicit control</td>
              </tr>
              <tr>
                <td>Svelte</td>
                <td>Natural fit with fine-grained reactivity</td>
                <td>Same runtime guarantees and state correctness model</td>
              </tr>
              <tr>
                <td>Node.js and Deno</td>
                <td>No UI adapter required</td>
                <td>The same core runtime used in browser applications</td>
              </tr>
            </tbody>
          </table>

          <p>
            That is the practical meaning of <sdux-catch-phrase />. The library
            stays small enough to travel, explicit enough to trust, and stable
            enough to survive framework churn.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Explore the full
            <a [routerLink]="['/docs/top-tier/supported-languages']"
              >Supported Languages</a
            >
            page, compare the same feature side by side in the
            <a [routerLink]="['/splash-page/dev']">framework comparison demos</a
            >, and review the
            <a [routerLink]="['/docs/migration']">migration guide</a>
            to see how Redux concepts transfer directly. If you want runnable
            examples, the official StackBlitz demos cover Angular, React, Vue,
            Svelte, Node.js, Bun, and Vanilla JavaScript through the same core
            runtime.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogStateManagementWithoutFrameworkLockInComponent {}
