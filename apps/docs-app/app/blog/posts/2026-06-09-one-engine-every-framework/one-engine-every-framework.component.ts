import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CatchPhraseComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-one-engine-every-framework',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    CatchPhraseComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    VaultBrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="One State Engine. Every Framework."
      date="2026-06-09"
      pillar="TA"
      readingTime="3">
      <header class="docs-header">
        <p class="lead">
          Your state management shouldn't be married to your component
          framework. <sdux-vault-brand-name [tm]="true" /> runs the same
          pipeline logic in Angular, React, Vue, and Svelte. Framework adapters
          are thin wrappers &#8212; they add ergonomics, not rules.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Lock-In Problem</div>
        <div class="section-body">
          <p>
            Most state management libraries are framework-specific by design.
            NgRx is Angular-only. Zustand is React-only. Pinia is Vue-only. Each
            one encodes framework assumptions into its core: dependency
            injection, component lifecycles, render-triggered subscriptions.
          </p>
          <p>
            This means your state logic &#8212; the business rules, the data
            transformations, the coordination patterns &#8212; is locked to a
            single framework. Switch frameworks? Rewrite your state layer. Share
            logic between a React frontend and a Node.js backend? Build a second
            abstraction.
          </p>
          <p>
            The problem isn't that these libraries are bad. The problem is that
            state management and component rendering are fundamentally different
            concerns, and coupling them together creates unnecessary friction.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          How <sdux-vault-brand-name /> Stays Framework-Agnostic
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> is a <sdux-catch-phrase /> framework. It
            does not depend on reflection, runtime patching, framework
            lifecycles, or hidden side effects. Every concept &#8212;
            <sdux-feature-cell />s, pipelines, reducers, filters, interceptors,
            lifecycle signals, and immutable state snapshots &#8212; is
            implemented as a language-level primitive composed in TypeScript,
            not a framework abstraction.
          </p>
          <p>
            Any framework integration exists only as a thin adapter that
            improves ergonomics without changing behavior or rules. Angular adds
            dependency injection and Signals support. React, Vue, and Svelte
            consume state via hooks, stores, or reactive bindings. But the
            pipeline underneath is identical &#8212; same stages, same
            guarantees, same deterministic execution.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Frameworks change how you register,
            consume, and wire <sdux-feature-cell />s &#8212; but they never
            change ownership rules, deterministic execution, immutability
            guarantees, pipeline semantics, or lifecycle meaning.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Same
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
          Four Frameworks
        </div>
        <div class="section-body">
          <p>
            Here is the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            registered in Angular and in a component-driven UI framework like
            React, Vue, Svelte, Solid, or Qwik. Notice how the core contract is
            identical &#8212; only the wiring changes.
          </p>

          <sdux-multi-framework-example description="Creating a FeatureCell">
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
          
// bank-employee.service.ts
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

  // Use injectVault to get an instance of the FeatureCell
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

export const employeeCell = FeatureCell(&#123;
  key: 'employees',
  initialState: []
&#125;);

// Explicit activation
employeeCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            The Angular version uses the &#64;<a
              href="/docs/references/functions/feature-cell"
              >FeatureCell</a
            >
            decorator and
            <a href="/docs/references/functions/inject-vault">injectVault</a>
            for DI integration. The non-Angular version uses plain function
            calls. Both produce a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            with identical pipeline semantics, identical state guarantees, and
            identical lifecycle control.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> <sdux-feature-cell />s are not owned
            by components. They are registered at application startup and
            consumed by components as long-lived, shared state containers. This
            holds true regardless of which framework renders your UI.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Explore the full supported languages documentation to see
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            examples for Angular, React, Vue, Svelte, Node.js, Workers, and Edge
            Runtimes:
          </p>
          <p>
            <a href="/docs/top-tier/supported-languages"
              >Supported Languages Documentation</a
            >
          </p>
        </div>
      </section>
      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video videoId="m7ClyWSh754" [tooltip]="'Pipeline Overview'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogOneEngineEveryFrameworkComponent {}
