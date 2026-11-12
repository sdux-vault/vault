import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-initialize-vault-before-featurecell-registration',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent
  ],
  template: `
    <sdux-blog-layout id="initialize-vault-before-featurecell-registration">
      <header class="docs-header">
        <p class="lead">
          Most state-management bootstraps mix together three different jobs:
          preparing the runtime, defining a feature, and executing state
          updates. <sdux-brand-name [tm]="true" /> keeps those jobs separate.
          Initialize the Vault once at application startup, then register
          <sdux-feature-cell [tm]="true" /> instances against the prepared
          runtime.
        </p>
        <p>
          That boundary is easy to miss because Vault initialization is small:
          one function call and an optional configuration object. Its
          responsibility is still important. Vault establishes the global
          execution environment for every
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
          while FeatureCells define state ownership and pipeline capabilities.
          The first prepares the context; the second declares the feature.
        </p>
        <div class="callout callout-info">
          <strong>Key takeaway:</strong> Vault initialization changes execution
          context, not state meaning. It must happen before
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          registration, and it should happen once.
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Runtime Setup Must Be Separate from State Definition
        </div>
        <div class="section-body">
          <p>
            A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            owns a domain concern: its key, initial state, behaviors,
            controllers, and public interaction surface. Vault owns the
            application-scoped services that make those FeatureCells executable.
            Treating them as separate responsibilities gives you a clearer
            startup contract.
          </p>
          <p>
            Vault initialization does not compute a value, transform a
            candidate, or emit state. It prepares shared execution services for
            the FeatureCells that will run afterward. That means changing a
            diagnostic or logging option does not redefine the state contract of
            an individual feature.
          </p>
          <table aria-label="Vault and FeatureCell responsibilities">
            <thead>
              <tr>
                <th scope="col" class="column-150">Boundary</th>
                <th scope="col" class="column-auto">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vault</td>
                <td>
                  Prepares the global execution context and runtime
                  configuration.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
                <td>
                  Declares state ownership, behaviors, controllers, and feature
                  identity.
                </td>
              </tr>
              <tr>
                <td>Pipeline execution</td>
                <td>
                  Processes input and determines the state outcome after the
                  runtime is ready.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Vault Initialization Actually Owns</div>
        <div class="section-body">
          <p>
            The Vault API establishes a global runtime for the application. Its
            configuration applies across all FeatureCells rather than attaching
            to one feature key. The documented responsibilities include
            scheduling, diagnostics, and logging policy.
          </p>
          <p>
            Every option is optional and has a defined default. Start with the
            smallest configuration that makes the application’s intent clear.
            When you need diagnostic visibility, enable the documented
            development mode and logging level at the same application boundary
            where you initialize the runtime.
          </p>
          <sdux-multi-framework-example
            description="Vault Initialization"
            [displayCopyPaste]="false">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; ApplicationConfig &#125; from '&#64;angular/core';
import &#123; provideVault &#125; from '&#64;sdux-vault/angular';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123;
      devMode: true,
      logLevel: 'debug'
    &#125;)
  ]
&#125;;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; Vault &#125; from '&#64;sdux-vault/core';

Vault(&#123;
  devMode: true,
  logLevel: 'debug'
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Ordering Contract Before FeatureCell Registration
        </div>
        <div class="section-body">
          <p>
            Vault initialization must precede
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            registration. A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            declared against the global runtime, so registering it before Vault
            is initialized is invalid and results in a runtime error. This is a
            startup ordering rule, not a suggestion for how to organize files.
          </p>
          <p>
            The safe sequence is straightforward: initialize the Vault during
            application bootstrap, register the FeatureCells that the
            application needs, and initialize those FeatureCells according to
            their own documented contracts. Keeping the sequence explicit makes
            failures easier to locate because a missing runtime is distinct from
            a bad feature configuration.
          </p>
          <div class="callout callout-warning">
            <strong
              >Do not infer readiness from a
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              alone.</strong
            >
            Vault readiness is an application-level prerequisite. A
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            cannot supply the runtime that must exist before its registration.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Configure Diagnostics Without Changing State Semantics
        </div>
        <div class="section-body">
          <p>
            Runtime configuration is valuable precisely because it stays out of
            state computation. You can change how the application reports or
            schedules execution without adding diagnostic fields to every state
            shape or placing logging branches inside every behavior.
          </p>
          <p>
            This separation also keeps a production decision visible. The
            application decides its Vault configuration once, while each
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            remains responsible for its own state and behavior contract. A
            feature can therefore be reused under a different diagnostic policy
            without rewriting its state logic.
          </p>
          <p>
            Use the Vault configuration for runtime concerns. Use
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            configuration and pipeline APIs for feature concerns. That simple
            distinction prevents observability settings from becoming hidden
            state dependencies.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Bootstrap Once Across Your Application</div>
        <div class="section-body">
          <p>
            Repeated Vault calls do not create additional Vault instances or
            reconfigure existing runtime state. That behavior reinforces the
            intended ownership model: initialize at the application boundary,
            not opportunistically inside a component or feature method.
          </p>
          <p>
            If your team is debugging a startup problem, ask three questions:
          </p>

          <ul>
            <li>Was Vault initialized?</li>
            <li>
              Was it initialized before
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              registration?
            </li>
            <li>
              Are the runtime options being set at the application boundary
              rather than hidden inside a feature?
            </li>
          </ul>
          <p>
            Those questions turn an ambiguous bootstrap failure into a concrete
            ordering check.
          </p>
          <!-- StackBlitz: Vault Initialization -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the
            <a href="/docs/pipeline/api/vault"
              >Vault Initialization API documentation</a
            >
            for the complete configuration reference and examples. Then compare
            it with the
            <a href="/docs/pipeline/api/feature-cell"
              >FeatureCell Registration documentation</a
            >
            to see how the application runtime and feature ownership contracts
            fit together.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogInitializeVaultBeforeFeatureCellRegistrationComponent {}
