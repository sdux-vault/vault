import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-one-runtime-every-framework-zero-dependencies',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    SDuXVideoComponent,
    PackageNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="One Runtime, Every Framework, Zero Dependencies"
      date="2026-06-18"
      pillar="SP"
      [tryItNow]="false"
      readingTime="5">
      <header class="docs-header">
        <p class="lead">
          <sdux-brand-name /> 1.0 is here. A pure TypeScript state engine with
          first-class bindings for Angular, React, Vue, and Node &mdash; not
          because cross-framework is trendy, but because state logic should
          never be coupled to your rendering layer. This is what "Plain
          TypeScript, Zero Magic" looks like after shipping 1.0.
        </p>
      </header>

      <section class="section">
        <div class="section-title">
          Why Framework-Agnostic Was Non-Negotiable
        </div>
        <div class="section-body">
          <p>
            State management libraries typically live inside a single ecosystem.
            Angular has NgRx. React has Redux Toolkit and Zustand. Vue has
            Pinia. Each solves the same fundamental problem &mdash; coordinating
            application state &mdash; but they solve it in framework-specific
            ways that lock you in.
          </p>
          <p>
            That coupling creates real costs. Teams migrating from Angular to
            React rewrite their state layer from scratch. Organizations running
            multiple frameworks maintain parallel implementations of the same
            business logic. Knowledge doesn't transfer across teams because the
            APIs are completely different.
          </p>
          <p>
            <sdux-brand-name /> started from a different premise: state
            transitions are pure logic. They don't need a component tree, a
            virtual DOM, or a dependency injection container. They need a typed
            pipeline that runs the same way everywhere.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Pure TypeScript Core</div>
        <div class="section-body">
          <p>
            The engine is written in TypeScript with zero runtime dependencies.
            No RxJS. No framework imports. No polyfills. The core package
            &mdash; npm install <sdux-package-name [package]="'core'" /> &mdash;
            contains the complete pipeline runtime: controllers, interceptors,
            resolvers, filters, reducers, taps, and extensions.
          </p>
          <div class="callout callout-info">
            <strong>Zero dependencies</strong> means your bundle size stays
            predictable. <sdux-brand-name /> adds only the pipeline runtime
            &mdash; no transitive dependency tree to audit or update.
          </div>
          <p>
            Because the core is plain TypeScript, it runs anywhere the language
            runs: browsers, Node.js servers, Deno, edge workers, test runners.
            The pipeline doesn't know or care what renders your UI.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">First-Class Bindings, Not Afterthoughts</div>
        <div class="section-body">
          <p>
            Framework support in <sdux-brand-name /> is delivered through thin
            binding packages that adapt the core engine to each framework's
            idioms:
          </p>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Binding Package</th>
                <th>Integration Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Angular</td>
                <td>npm install <sdux-package-name [package]="'angular'" /></td>
                <td>Injectable services</td>
              </tr>
              <tr>
                <td>React</td>
                <td>npm install <sdux-package-name [package]="'react'" /></td>
                <td>Hooks + context</td>
              </tr>
              <tr>
                <td>Vue</td>
                <td>npm install <sdux-package-name [package]="'vue'" /></td>
                <td>Composition API</td>
              </tr>
              <tr>
                <td>Node.js</td>
                <td>npm install <sdux-package-name [package]="'core'" /></td>
                <td>Direct instantiation</td>
              </tr>
            </tbody>
          </table>
          <p>
            Each binding is a thin adapter &mdash; not a reimplementation. The
            pipeline logic, execution guarantees, and behavior composition are
            identical across all frameworks. Write your pipeline once, bind it
            to whichever rendering layer your team uses.
          </p>
          <div class="callout callout-info">
            <strong>Thin adapters</strong> mean framework upgrades don't break
            your state logic. The binding layer changes; the pipeline stays
            stable.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Pipeline Builder &mdash; From Curiosity to Production
        </div>
        <div class="section-body">
          <p>
            Getting started with a pipeline-based state engine could feel
            intimidating. That's why 1.0 ships with the
            <a routerLink="/pipeline-builder">Pipeline Builder</a> &mdash; an
            interactive tool that generates production-ready pipeline
            configurations in minutes.
          </p>
          <p>
            Define your state shape, choose your framework, configure pipeline
            stages, and the Builder outputs copy-paste-ready TypeScript. No
            boilerplate to memorize. No configuration guessing.
          </p>
          <sdux-multi-framework-example description="Pipeline Configuration">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      CartService,
      &#123;
        key: 'cart',
        initialState: &#123; items: [], total: 0, status: 'idle' &#125;
      &#125;
    )
  ]
&#125;;

// cart.service.ts
import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';
import &#123; CartState &#125; from './cart.shape';

&#64;FeatureCell&lt;CartState&gt;('cart')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class CartService &#123;
  readonly vault = injectVault&lt;CartState&gt;(CartService);

  constructor() &#123;
    this.vault.initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre class="code-inline"><code class="language-ts">// main.ts
import &#123; Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123;
  logLevel: 'off'
&#125;);

// cart.cell.ts
import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

export const cartCell = FeatureCell(&#123;
  key: 'cart',
  initialState: &#123; items: [], total: 0, status: 'idle' &#125;
&#125;);

// Explicit activation
cartCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The Builder doesn't generate scaffolding you'll throw away. It
            generates the same configuration a production app uses &mdash;
            because there's only one way to configure a pipeline in
            <sdux-brand-name />.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Every framework binding has a live

            <a routerLink="/docs/stackblitz">StackBlitz</a>, demo you can run in
            your browser. No local setup, no npm install, no configuration. Open
            the link, see the pipeline execute, modify it, and watch the state
            flow in real time.
          </p>
          <!-- StackBlitz: one-runtime-every-framework -->
          <p>
            Ready to install locally? The npm install
            <sdux-package-name [package]="'core'" />
            package is available on
            <a
              href="https://www.npmjs.com/package/@sdux-vault/core"
              target="_blank"
              rel="noopener noreferrer"
              >npm</a
            >. Pick the binding package for your framework and you're running in
            under a minute.
          </p>
          <p>
            Explore the
            <a routerLink="/docs/start-here">architecture docs</a>, launch the
            <a routerLink="/pipeline-builder">Pipeline Builder</a>, or dive into
            the
            <a routerLink="/docs/pipeline">pipeline reference</a>
            to see the full execution model.
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
export class BlogOneRuntimeEveryFrameworkZeroDependenciesComponent {}
