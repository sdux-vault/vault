import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-angular-display-character-without-component-state-logic',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      id="angular-display-character-without-component-state-logic">
      <header class="docs-header">
        <p class="lead">
          The second chapter of the
          <a href="/tutorial/angular" target="new">SDuX Angular tutorial</a>
          turns a blank application into a focused character detail view. You
          define typed Feature State, place the
          <sdux-feature-cell [tm]="true" /> behind an Angular service, and let
          the component render a reactive value without owning the
          state-management setup.
        </p>
        <p>
          That boundary is the real lesson. A detail screen may begin with one
          value, but it will often grow to include selection, editing, loading,
          validation, and recovery. Chapter 2 gives those future requirements a
          clear home before they become component responsibilities by accident.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Angular owns the application and
            dependency-injection structure; the feature service owns committed
            Feature State access; and the component stays focused on deriving
            and displaying the value its template needs.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">What the SDuX Angular Tutorial Builds</div>
        <div class="section-body">
          <p>
            The tutorial follows one feature as it grows instead of presenting
            isolated API samples. It starts with a standalone Angular project,
            establishes the application runtime, defines a character contract,
            registers the feature, connects it to a service, and finishes the
            first read path in the UI.
          </p>
          <p>
            Chapter 2 is the first complete checkpoint in that progression. The
            example uses a Star Wars character collection, but the architecture
            applies equally well to a profile, product, selected record, or
            other detail view. The domain changes; the ownership boundary does
            not.
          </p>
          <table aria-label="Chapter 2 feature path">
            <thead>
              <tr>
                <th scope="col" class="column-200">Part</th>
                <th scope="col" class="column-auto">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State contract</td>
                <td>Defines the typed fields a character feature owns.</td>
              </tr>
              <tr>
                <td>Application setup</td>
                <td>
                  Creates the Angular application and registers the runtime.
                </td>
              </tr>
              <tr>
                <td>Feature registration</td>
                <td>Associates the service, key, and initial collection.</td>
              </tr>
              <tr>
                <td>Service boundary</td>
                <td>
                  Exposes reactive State without exposing setup mechanics to the
                  view.
                </td>
              </tr>
              <tr>
                <td>Component and template</td>
                <td>Derives one character and renders display-ready values.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Each part is small enough to understand on its own, but the useful
            result comes from seeing how they connect. The tutorial teaches a
            repeatable feature shape rather than a screen-specific trick.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Chapter 2's First Read Path</div>
        <div class="section-body">
          <p>
            The chapter begins by defining the character data as a TypeScript
            contract. The raw shape includes an identifier, first name, last
            name, faction, and Force-sensitive status. The completed
            <span class="code">StarWarsCharacter</span> type can also include
            display fields such as a full name and a translated Force-sensitive
            label.
          </p>
          <p>
            This distinction matters: an interface defines the expected State
            shape, but it does not create or load a State value. The contract
            gives the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            and its consumers the same vocabulary, while the application
            configuration supplies the initial character collection.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Define the character State contract'">
              <pre
                class="code-inline"><code class="language-ts">// Defines the raw pre-reducer State contract for a Star Wars character.
export interface RawStarWarsCharacter &#123;
  /** Unique identifier for the character. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** Faction associated with the character. */
  faction: string;

  /** Indicates whether the character is force-sensitive. */
  isForceSensitive: boolean;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Once the contract exists, the rest of the chapter can refer to a
            known feature shape. TypeScript can identify missing properties and
            incompatible values during development, before the UI has to
            discover the problem at runtime.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why the Angular Service Owns the FeatureCell
        </div>
        <div class="section-body">
          <p>
            Chapter 2 creates the Angular service before connecting it to
            <sdux-brand-name />. That ordering makes the feature boundary
            explicit: the service is the home for the character use case, and
            the integration details are added to that boundary instead of
            scattered through the component.
          </p>
          <p>
            Angular's <span class="code">@Injectable</span> continues to do its
            normal job. The tutorial does not replace Angular service injection.
            It adds a
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            association, typed access through
            <span class="code"
              ><a href="/docs/references/functions/inject-vault"
                >injectVault</a
              ></span
            >, and initialization in the service constructor. The component
            injects the service, not the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            configuration.
          </p>
          <div class="concept-box">
            <p>
              <strong>Ownership rule:</strong> Keep committed Feature State and
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              calls in the service. Keep selection, form controls, confirmation
              prompts, and display-only feedback in the component unless a later
              requirement makes that data shared Feature State.
            </p>
          </div>
          <div class="callout callout-warning">
            <p>
              <strong>Common mistake:</strong> Do not move the feature's
              collection into the component simply because the component is
              where the collection is displayed. Display location and State
              ownership are different responsibilities.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          How Angular Dependency Injection and Signals Keep the Component
          Focused
        </div>
        <div class="section-body">
          <p>
            The Angular advantage in this chapter is not a special replacement
            for Angular. It is the way the existing Angular application model
            gives each responsibility a natural location. Application providers
            configure the runtime, dependency injection supplies the service,
            and the component receives a small reactive surface to render.
          </p>
          <p>
            The service exposes the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>'s
            Signal-based State access. The component then uses a computed Signal
            to project the first character from the service-owned collection.
            The template reads that computed value declaratively through Angular
            bindings; it does not configure the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> or
            initialize the runtime.
          </p>
          <table aria-label="Angular responsibility boundaries">
            <thead>
              <tr>
                <th scope="col" class="column-200">Angular location</th>
                <th scope="col" class="column-auto">
                  Chapter 2 responsibility
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Application configuration</td>
                <td>
                  Provides the application-scoped runtime and registers the
                  feature.
                </td>
              </tr>
              <tr>
                <td>Feature service</td>
                <td>
                  Owns
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  access, initialization, and the State surface.
                </td>
              </tr>
              <tr>
                <td>Component</td>
                <td>
                  Injects the service and derives the character needed by the
                  view.
                </td>
              </tr>
              <tr>
                <td>Template</td>
                <td>
                  Renders character fields without calling
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  APIs directly.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            This is why the pattern scales beyond the first screen. When the
            feature later gains editing or selection, the component can own the
            local interaction while the service remains the boundary for shared
            domain State.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          From Registered State to a Displayed Character
        </div>
        <div class="section-body">
          <p>
            By the end of Chapter 2, the application has a typed character
            collection, an application-registered
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            an initialized Angular service, and a component that can display one
            character. The template renders the full name, first name, last
            name, identifier, faction, and Force-sensitive value from the
            service's reactive State.
          </p>
          <p>
            The result is intentionally modest: there are no selection or edit
            controls yet. That restraint is useful. You can see the first read
            path clearly before later chapters add local selection, collection
            updates, lifecycle behavior, transformations, and optional labs.
          </p>
          <!-- StackBlitz: display-character -->
          <div class="callout callout-info">
            <p>
              <strong>Try the checkpoint:</strong> Open the Chapter 2 StackBlitz
              project, compare the service and component boundaries, and confirm
              that the template reads display-ready character data without
              configuring the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              itself.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Continue with the
            <a href="/tutorial/angular/chapter-2" target="new"
              >Chapter 2 tutorial</a
            >
            and use the completed source as a checkpoint for your own Angular
            feature. Then follow the remaining tutorial chapters as your
            requirements grow. The goal is not to add every capability at once;
            it is to keep each responsibility in a boundary you can explain.
          </p>
          <p>
            <sdux-brand-name /> gives the feature a typed, service-owned State
            source while Angular keeps doing what Angular does well: dependency
            injection, standalone application composition, Signal-based
            reactivity, and declarative templates.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogAngularDisplayCharacterWithoutComponentStateLogicComponent {}
