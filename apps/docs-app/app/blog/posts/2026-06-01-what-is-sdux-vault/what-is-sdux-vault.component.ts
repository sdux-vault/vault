import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-what-is-sdux-vault',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule, PackageNameComponent],
  template: `
    <!-- AUTO-GENERATED DOCUMENTATION LINKS -->
    <sdux-blog-layout
      title="What Is SDuX Vault? A Pipeline-Based State Engine for Every Framework"
      date="2026-06-01"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          State management in modern web applications is harder than it should
          be. Boilerplate, hidden side effects, race conditions, and framework
          lock-in turn what should be straightforward into a source of ongoing
          friction. SDuX Vault is a deterministic, reactive state engine built
          around a streaming pipeline — and it works the same way in Angular,
          React, Vue, and Svelte.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem With State Management Today</div>
        <div class="section-body">
          <p>
            If you've worked on a large frontend application, you've probably
            felt these pain points:
          </p>

          <ul>
            <li>
              <strong>Too much boilerplate.</strong> Actions, reducers,
              selectors, effects — you write pages of scaffolding before
              expressing a single line of business logic.
            </li>
            <li>
              <strong>Dispatch indirection.</strong> You dispatch an action,
              then trace through middleware, reducers, and effects to understand
              what actually happened. Intent gets buried under ceremony.
            </li>
            <li>
              <strong>Global store sprawl.</strong> One massive store makes
              everything coupled. Features can't own their state independently,
              and refactoring becomes risky.
            </li>
            <li>
              <strong>Framework lock-in.</strong> Your state management library
              only works with one framework. Switch frameworks, rewrite your
              state layer.
            </li>
          </ul>

          <p>
            These aren't edge cases — they're the daily reality for teams
            building production applications. SDuX Vault was created to
            eliminate them.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What SDuX Vault Actually Is</div>
        <div class="section-body">
          <p>
            SDuX Vault is a state management system built around a
            <strong>deterministic, reactive pipeline</strong>. Instead of
            dispatching actions into a reducer, you update state directly
            through explicit APIs — and that update flows through a structured
            pipeline of composable stages before being committed.
          </p>

          <p>
            Think of it as a production line for state changes. Every update
            enters the pipeline, passes through filtering, reduction,
            observation, and persistence stages, and exits as a committed,
            immutable snapshot. Each stage is opt-in, composable, and
            side-effect-scoped.
          </p>

          <div class="callout callout-info">
            <strong>No hidden side effects.</strong> Every behavior that
            participates in the pipeline is declared explicitly. There are no
            implicit execution paths or magic middleware chains.
          </div>

          <p>The core motivations behind SDuX Vault:</p>

          <ul>
            <li>
              <strong>Remove boilerplate</strong> — state logic lives where it's
              used, with minimal ceremony.
            </li>
            <li>
              <strong>Remove dispatch overhead</strong> — direct, explicit APIs
              (replaceState, mergeState) express intent without indirection.
            </li>
            <li>
              <strong>Centralize ownership, not data</strong> — each
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              owns exactly one slice of state with a clear lifecycle.
            </li>
            <li>
              <strong>Treat state as a stream</strong> — state changes flow
              through a deterministic pipeline, not isolated mutations.
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Four Core Concepts</div>
        <div class="section-body">
          <p>
            SDuX Vault is organized around four stable concepts. This is the
            entire vocabulary you need to get started:
          </p>

          <table aria-label="SDuX Vault Core Concepts">
            <thead>
              <tr>
                <th scope="col" class="column-250">Concept</th>
                <th scope="col" class="column-auto">What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Vault</strong></td>
                <td>
                  System-level configuration surface. Defines runtime defaults
                  used by all FeatureCells (queue behavior, logging, etc.).
                </td>
              </tr>
              <tr>
                <td>
                  <strong
                    ><a href="/docs/references/functions/feature-cell"
                      >FeatureCell</a
                    ></strong
                  >
                </td>
                <td>
                  A feature-scoped state container and the primary API surface.
                  Owns one slice of state with explicit initialization, access,
                  and update methods.
                </td>
              </tr>
              <tr>
                <td><strong>State</strong></td>
                <td>
                  Immutable, feature-owned data managed by a
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. Updates are deterministic, ordered transformations — not
                  ad-hoc mutation.
                </td>
              </tr>
              <tr>
                <td><strong>Snapshot</strong></td>
                <td>
                  An immutable representation of state at a moment in time. This
                  is what your components consume — always consistent, always
                  up-to-date.
                </td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-info">
            <strong>That's it.</strong> Four concepts define the entire public
            contract surface. Everything else — behaviors, controllers,
            extensions — builds on top of these without changing them.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">One Engine, Every Framework</div>
        <div class="section-body">
          <p>
            SDuX Vault is built with standard TypeScript primitives. There are
            no code generators, no runtime patching, no framework lifecycle
            dependencies, and no hidden side effects. What you write is what
            runs.
          </p>

          <p>
            This means SDuX Vault works consistently across
            <strong
              >any environment capable of running TypeScript or
              JavaScript</strong
            >:
          </p>

          <table aria-label="Framework Support">
            <thead>
              <tr>
                <th scope="col" class="column-250">Framework</th>
                <th scope="col" class="column-auto">Integration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Angular</td>
                <td>
                  Decorator + DI adapter via <sdux-package-name />/angular
                  including signal support
                </td>
              </tr>
              <tr>
                <td>Bun</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Deno</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Node.js</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>React</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Solid</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Svelte</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Vanilla JS</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Vue</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
              <tr>
                <td>Web Components</td>
                <td>Direct <sdux-package-name />/core — no adapter needed</td>
              </tr>
            </tbody>
          </table>

          <p>The guarantees are identical everywhere:</p>

          <ul>
            <li>Identical state semantics across all platforms</li>
            <li>Explicit lifecycle control everywhere</li>
            <li>No framework lock-in</li>
            <li>Predictable behavior in any runtime</li>
            <li>Frameworks add ergonomics, not rules</li>
          </ul>

          <div class="callout callout-info">
            <strong>Shared foundation.</strong> Rather than fragmenting
            solutions per framework, SDuX Vault provides a common core that
            frameworks build on together.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            The fastest way to see SDuX Vault in action is to open a live demo —
            no install, no setup. The same pipeline logic runs across all four
            frameworks:
          </p>

          <p>
            <a href="/docs/stackblitz">Open a StackBlitz demo →</a>
          </p>

          <!-- StackBlitz: what-is-sdux-vault -->

          <p>
            Ready to dig deeper? Start with the
            <a href="/docs/welcome/getting-started">Getting Started guide</a>,
            or explore the
            <a href="/docs/welcome/core-concepts">Core Concepts</a> page for a
            complete reference.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogWhatIsSduxVaultComponent {}
