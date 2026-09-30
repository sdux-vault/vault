import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-chapter-7-filters-and-reducers',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    RouterModule
  ],
  template: `
    <sdux-blog-layout
      id="chapter-7-filters-and-reducers"
      title="Chapter 7 — Centralize Filtering and Display Derivation in the Pipeline"
      date="2026-09-29"
      pillar="SP"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          Filtering, sorting, and display labels often begin as small template
          decisions. In
          <a
            href="/tutorial/angular/chapters/07-filters-and-reducers"
            target="new"
            >Chapter 7</a
          >, <sdux-brand-name [tm]="true" /> moves those rules into a
          service-owned pipeline so every consumer receives the same eligible,
          sorted, display-ready collection.
        </p>
        <p>
          The component still owns presentation concerns such as selection and
          editor feedback. The service registers one pure filter and three
          ordered reducers, then exposes the committed
          <sdux-feature-cell /> State for the UI to render.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> If multiple views need the same data
            rule, apply it once in the pipeline instead of recreating it in each
            template.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Cross-View Data Rules Belong in the Pipeline
        </div>
        <div class="section-body">
          <p>
            A template is a convenient place to write a quick condition or
            concatenate two fields. It is a poor place to establish a rule that
            several screens must share. Once one view filters incomplete
            records, another sorts them, and a third translates a boolean into a
            label, the application no longer has one presentation of its data.
            It has several local interpretations that can drift.
          </p>
          <p>
            Chapter 7 draws a clean boundary. Resolve produces the incoming
            candidate collection. Merge combines the current committed State
            with the resolved candidate when the update requires it. Filters
            refine the candidate, and Reducers compute the finalized candidate
            State. Only the result of that pipeline becomes the value observed
            by the component.
          </p>
          <p>
            This ordering makes the intent legible. The filter decides which
            records are eligible for this feature view. The reducers decide how
            eligible records are ordered and which display-only fields should be
            available to every consumer. The template reads the result instead
            of becoming another data-transformation layer.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Refining Candidates with a Pure Filter</div>
        <div class="section-body">
          <p>
            The tutorial uses a deliberately small teaching predicate: remove a
            character whose last name is exactly
            <span class="code">unknown</span>. The point is not that every
            incomplete record should disappear in a production system. The point
            is that eligibility is explicit, named, and reusable.
          </p>
          <p>
            The filter receives a candidate collection and returns a new
            collection. It does not edit the input array, write storage, fetch
            data, or decide how the component should render the result. Those
            constraints make the rule easy to test and keep it safe to place in
            the Filters stage.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Pure candidate filter'">
              <pre
                class="code-inline"><code class="language-ts">// example.filter.ts
import &#123; FilterFunction &#125; from '@sdux-vault/shared';
import type &#123; StarWarsCharacter &#125; from './star-wars-character.shape';

/**
 * Removes characters whose last name is exactly &#96;"unknown"&#96; without mutating the candidate collection.
 * @param characters - Candidate character collection entering the Filter stage.
 * @returns A new collection containing every character with a known last name.
 */
export const removeUnknownLastNameFilter: FilterFunction&lt;
  readonly StarWarsCharacter[]
&gt; = (characters) =&gt; characters.filter((&#123; lastName &#125;) =&gt; lastName !== 'unknown');</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <div class="callout callout-warning">
            <p>
              <strong>Production caution:</strong> A teaching predicate is not
              automatically a domain policy. In a real feature, a filter might
              encode authorization, active status, or validated eligibility.
              Preserve the raw data elsewhere when the application must correct
              or audit incomplete records.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Composing Ordered Reducers Without Mutation
        </div>
        <div class="section-body">
          <p>
            After filtering, Chapter 7 applies three reducers in a deliberate
            order. The first derives a force-sensitive display label. The second
            clones and sorts the collection by last name. The third derives a
            reusable full name. Each reducer owns one rule, and each receives
            the result of the previous reducer.
          </p>
          <p>
            The order matters even though the operations are individually
            simple. A reducer should operate on the already refined candidate,
            not repeat filtering logic. The sorting reducer should return a
            reordered copy, not mutate the collection that entered the stage.
            The full-name reducer can then rely on the stable name fields and
            add the display value that every view needs.
          </p>
          <table aria-label="Chapter 7 pipeline transformations">
            <thead>
              <tr>
                <th scope="col" class="column-100">Stage</th>
                <th scope="col" class="column-250">Operation</th>
                <th scope="col" class="column-auto">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Filters</td>
                <td>Remove ineligible candidates</td>
                <td>Four retained characters</td>
              </tr>
              <tr>
                <td>Reducer 1</td>
                <td>Derive force-sensitive display</td>
                <td>Each record has a Yes or No label</td>
              </tr>
              <tr>
                <td>Reducer 2</td>
                <td>Clone and sort by last name</td>
                <td>Obi-Wan, Leia, Luke, Darth</td>
              </tr>
              <tr>
                <td>Reducer 3</td>
                <td>Derive the full name</td>
                <td>Every record is display-ready</td>
              </tr>
            </tbody>
          </table>
          <p>
            This composition also gives each transformation a narrow test
            surface. You can verify that a helper returns a new array, that
            sorting does not change its input, and that derived fields match the
            raw values without mounting the Angular component.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Deriving Display Fields Before Rendering
        </div>
        <div class="section-body">
          <p>
            The raw character shape contains <span class="code">name</span>,
            <span class="code">lastName</span>, and
            <span class="code">isForceSensitive</span>. The committed tutorial
            State also contains <span class="code">fullName</span> and
            <span class="code">forceSensitiveDisplay</span>, both derived by
            reducers. That distinction keeps domain data and display-ready
            values visible without forcing every consumer to repeat the same
            string composition or boolean translation.
          </p>
          <p>
            Trace the seed collection through the stages. Chewbacca enters with
            a last name of <span class="code">unknown</span> and is removed by
            the filter. Leia remains eligible, receives a force-sensitive
            display value, participates in the last-name sort, and receives
            <span class="code">Leia Organa</span> as her full name. The final
            four-record collection is the value committed for the component to
            display.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>What changed in the template?</strong> It now reads
              reducer-derived fields directly. It no longer decides whether a
              record is eligible, concatenates names, translates booleans, or
              sorts the collection during rendering.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Keeping the Component Focused on Presentation
        </div>
        <div class="section-body">
          <p>
            Moving transformation rules into the pipeline does not mean the
            component becomes passive. It still owns presentation state such as
            the selected identity, editor mode, form values, confirmation state,
            and feedback. Those values describe what the current view is doing,
            not what the shared feature collection means.
          </p>
          <p>
            The service remains the authority for pipeline registration and
            committed State. The component consumes the service's reactive State
            and renders it. That ownership boundary prevents a second copy of
            filtering or sorting logic from appearing in a different view, and
            it lets a future consumer use the same display-ready fields without
            knowing how they were derived.
          </p>
          <p>
            The same principle makes the next tutorial step easier to reason
            about. Chapter 8 can turn a filter into a controlled failure source
            while the component continues to observe the resulting State and
            error information. The pipeline rule remains explicit instead of
            being hidden inside a template expression.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Verifying the Committed Collection</div>
        <div class="section-body">
          <p>
            Run the completed example and verify the result at the boundary the
            user sees. Chewbacca should be absent. The remaining records should
            be sorted by last name. Every visible record should contain both
            derived display fields, while the source views make the filter and
            reducer functions inspectable.
          </p>
          <p>
            Then verify the transformation contract independently: filters and
            reducers return new collections, their inputs remain unchanged, and
            the registration order matches the intended data flow. Those checks
            are more valuable than a screenshot because they protect the rule
            when another view or future update reuses the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong
                >Do not infer pipeline behavior from an empty view.</strong
              >
              If a record is missing, inspect the candidate and the registered
              transformation that could have removed or changed it. Keep the
              eligibility rule and display derivation named and testable.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Work through the
            <a
              href="/tutorial/angular/chapters/07-filters-and-reducers"
              target="new"
              >Angular Chapter 7 tutorial</a
            >, then compare the
            <a href="/docs/pipeline/behaviors/filters">Filters</a> and
            <a href="/docs/pipeline/behaviors/reducers">Reducers</a>
            documentation. The
            <a href="/docs/pipeline/behaviors/complete-pipeline-spec"
              >complete pipeline specification</a
            >
            explains how these stages fit into the broader processing flow.
          </p>
        </div>
      </section>

      <!-- StackBlitz: chapter-7-filters-and-reducers -->
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogChapter7FiltersAndReducersComponent {}
