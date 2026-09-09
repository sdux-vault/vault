import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-new-angular-tutorial-complete-feature',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout id="new-angular-tutorial-complete-feature">
      <header class="docs-header">
        <p class="lead">
          The new
          <a href="/tutorial/angular" target="new">Angular tutorial</a> for
          <sdux-brand-name [tm]="true" /> is built around a complete feature,
          not a pile of disconnected API samples. You start with an empty
          Angular project and finish with a typed
          <sdux-feature-cell [tm]="true" />, a service-owned feature boundary,
          and a character workflow that can read, create, update, delete,
          filter, sort, and derive display-ready State.
        </p>
        <p>
          That shape matters because state management becomes difficult at the
          boundaries between UI code, domain ownership, asynchronous inputs, and
          operational policy. The tutorial makes those boundaries visible while
          you build. Each chapter leaves you with a working checkpoint, a live
          StackBlitz project, and a clear reason to adopt—or skip—the next
          capability.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> The tutorial teaches a repeatable
            feature structure. Angular UI events call a feature service; the
            service owns its FeatureCell; the pipeline resolves and shapes a
            candidate; and the component reads the committed StateSnapshot.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">Why This Tutorial Was Released</div>
        <div class="section-body">
          <p>
            A typical quick-start example can show a successful state update in
            a few lines. It cannot show where the feature should live once the
            application needs selection, editing, validation, loading, error
            handling, persistence, or testing. Developers then fill in the
            missing architecture from memory, and the state boundary slowly
            moves into whichever component was edited last.
          </p>
          <p>
            <strong>This Angular tutorial takes the opposite route</strong>. It
            keeps one feature in view while the requirements grow. The
            application is a <span class="code">Star Wars</span> character
            registry, but the teaching target is the boundary: the service owns
            Feature State and FeatureCell access, while the component owns local
            presentation concerns and user interaction.
          </p>
          <p>
            You do not need previous <sdux-brand-name /> experience. The opening
            chapter explains the setup, the mental model, the expected
            environment, and the recommended path through the material. It also
            makes an important distinction early: the complete example
            demonstrates many capabilities, but a production feature should
            adopt the smallest set that matches its actual requirements.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">From Project Setup to a Working Feature</div>
        <div class="section-body">
          <p>
            The core path starts with the application boundary and ends with a
            useful read-and-write workflow. You define the Feature State,
            register the FeatureCell, connect it to an Angular service, and keep
            the component focused on rendering and interaction. The character
            workflow then grows in deliberate steps:
          </p>
          <table aria-label="Angular tutorial core path">
            <thead>
              <tr>
                <th scope="col" class="column-200">Chapter focus</th>
                <th scope="col" class="column-auto">What you learn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-2" target="new"
                    >Display a character</a
                  >
                </td>
                <td>
                  Establish a service-owned FeatureCell and expose committed
                  State to the UI.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-3" target="new"
                    >Display characters</a
                  >
                </td>
                <td>
                  Add selection without moving the collection or its ownership
                  into the component.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-4" target="new"
                    >Add/Edit characters</a
                  >
                </td>
                <td>
                  Use <span class="code">withArrayAppendMergeBehavior</span> to
                  append a new character or update an existing character while
                  keeping collection updates inside the service-owned boundary.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-5" target="new"
                    >Delete characters</a
                  >
                </td>
                <td>
                  Use <span class="code">withArrayByIdMergeBehavior</span> to
                  remove (add and edit) a character by identifier inside the
                  service-owned boundary.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-6" target="new"
                    >Lifecycle</a
                  >
                </td>
                <td>
                  Distinguish a persisted null value, a reusable reset, and
                  permanent FeatureCell destruction.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-7" target="new"
                    >Filters and reducers</a
                  >
                </td>
                <td>
                  Centralize filtering, sorting, labels, and display derivation
                  before the UI renders State.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The result is more useful than a finished screen. You can see why
            each responsibility belongs where it does, and you can carry that
            structure into a different feature instead of copying a component
            that happens to work for one demo.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          The Feature Service Is the Teaching Boundary
        </div>
        <div class="section-body">
          <p>
            The tutorial repeatedly returns to one rule: the component should
            not become the owner of Feature State just because it is the place
            where State is displayed. The service exposes the component-facing
            reactive State, while the service also owns the FeatureCell
            configuration and update methods.
          </p>
          <p>
            The welcome chapter summarizes the flow like this: Angular UI
            action, feature service method, FeatureCell request, FeatureCell
            pipeline execution, committed StateSnapshot, component Signal or
            Observable, and finally the template. That sequence gives every
            later chapter a stable place to add behavior without changing the
            basic ownership model.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Angular application setup'">
              <pre class="code-inline"><code class="language-ts">import &#123;
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
&#125; from '&#64;angular/core';
import &#123; provideVault &#125; from '&#64;sdux-vault/angular';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideVault()
  ]
&#125;;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            This is the tutorial's initial application configuration. Later
            checkpoints add the FeatureCell provider and the service-owned
            feature contract without changing the application runtime setup. The
            code is small; the important lesson is where the setup lives and how
            it prepares the application boundary for the feature.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Common mistake:</strong> Do not treat every value the UI
              needs as Feature State. The tutorial keeps selection, form mode,
              confirmation, and feedback local when they are presentation
              concerns. Shared domain State stays with the feature service.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Core Chapters First, Optional Labs Second
        </div>
        <div class="section-body">
          <p>
            Chapters 1–7 form the main read, write, lifecycle, transformation,
            and error-management path. Chapters 8–15 then act as focused labs
            for requirements that will not belong in every application. That
            organization helps you learn the complete feature without turning
            every available capability into a mandatory checklist.
          </p>
          <table aria-label="Angular tutorial optional labs">
            <thead>
              <tr>
                <th scope="col" class="column-200">Lab</th>
                <th scope="col" class="column-auto">Use it to explore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-8" target="new">Errors</a>
                </td>
                <td>
                  Failure observation and error handling at the feature
                  boundary.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-9" target="new"
                    >Async input</a
                  >
                </td>
                <td>
                  Promise, Observable, and Angular HTTP Resource inputs through
                  the same feature boundary.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-10" target="new">Delay</a>
                </td>
                <td>
                  Timing policy for delayed state transitions when that
                  requirement fits the application.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-11" target="new"
                    >Encrypt and Persist</a
                  >
                </td>
                <td>
                  Encrypted, tab-scoped session persistence when that
                  requirement fits the application.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-12" target="new"
                    >State introspection</a
                  >
                </td>
                <td>
                  Observation points for explaining a transition without giving
                  diagnostics authority over State.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-13" target="new"
                    >Tab Sync</a
                  >
                </td>
                <td>Same-origin coordination across browser tabs.</td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-14" target="new"
                    >Distinct Until Changed</a
                  >
                </td>
                <td>
                  Deliberate suppression of semantically redundant candidates.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorial/angular/chapter-15" target="new"
                    >Stepwise</a
                  >
                </td>
                <td>
                  Explicit human or policy decisions at a pipeline boundary,
                  treated as a comparison lab rather than a default.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Each lab explains its boundary and its trade-offs. For example, Tab
            Sync coordinates finalized Feature State across same-origin browser
            tabs; it does not turn every form interaction into shared
            collaboration. Encrypted persistence protects values at the
            persistence boundary, but the tutorial still asks you to consider
            whether the data and threat model justify storing it locally.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Checkpoints Make the Tutorial Recoverable
        </div>
        <div class="section-body">
          <p>
            Long tutorials fail when one missed import or one divergent file
            leaves the reader guessing what changed. This tutorial addresses
            that problem with chapter checkpoints. You can continue in one
            Angular project, or start a later chapter from the completed source
            of the preceding chapter.
          </p>
          <p>
            Each chapter also provides a live StackBlitz project and a
            downloadable archive. Use the complete-file tabs to compare your
            checkpoint, inspect the action list to see what is new, and run the
            finished example when your local project has drifted. The result is
            a practical feedback loop: build, compare, understand, and then
            continue.
          </p>
          <!-- StackBlitz: new-angular-tutorial-complete-feature -->
          <div class="callout callout-info">
            <p>
              <strong>Choose your route:</strong> Start at the beginning if you
              want the ownership model built from first principles. Start from a
              checkpoint when you already understand the core path and need to
              investigate one optional capability.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            <a href="/tutorial/angular">Open the Angular tutorial</a> to build
            the feature step by step. Use the chapter labs to test a specific
            requirement, but keep the central boundary in view: the component
            renders and interacts, the feature service owns State, and the
            FeatureCell pipeline keeps the transition path explicit.
          </p>
          <p>
            If you are evaluating <sdux-brand-name /> for an existing Angular
            application, the tutorial is also a useful architecture review.
            Compare its service boundary with your current feature, identify
            which concerns are mixed into the UI, and adopt only the chapters
            that address a real need.
          </p>
        </div>
      </section>
      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video videoId="m7ClyWSh754" [tooltip]="'Pipeline Overview'" />

          <sdux-video
            videoId="aFTiIvR0H4M"
            [tooltip]="'SDUX vs Redux O(n) Comparison'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogNewAngularTutorialCompleteFeatureComponent {}
