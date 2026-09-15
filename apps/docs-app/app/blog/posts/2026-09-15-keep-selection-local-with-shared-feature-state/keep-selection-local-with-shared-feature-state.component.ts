import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-keep-selection-local-with-shared-feature-state',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    MultiFrameworkExampleComponent,
    MatExpansionModule,
    BrandNameComponent
  ],
  template: `
    <sdux-blog-layout id="keep-selection-local-with-shared-feature-state">
      <header class="docs-header">
        <p class="lead">
          A master-detail view needs a current selection, but that does not mean
          the selection belongs in shared State. Chapter 3 of the
          <a href="/tutorial" target="new"><sdux-brand-name /> tutorial</a>
          adds an interactive read path while keeping the committed character
          collection behind its service boundary.
        </p>
        <p>
          This is a small distinction with a wide reach. A picker, record
          browser, settings panel, or search result view can all need temporary
          navigation state. The collection is useful to more than one consumer;
          the item currently being inspected is usually meaningful only to the
          view doing the inspecting.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Keep committed Feature State in the
            feature service. Keep the current selection local to the view, then
            derive the selected record from both values.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          From a Fixed Read View to a User-Selected Read Path
        </div>
        <div class="section-body">
          <p>
            The previous chapter establishes a complete read path: a typed
            character collection is registered as Feature State, a service
            exposes access to it, and the component renders a character. That
            first screen can use a fixed record because its purpose is to make
            the ownership boundary visible.
          </p>
          <p>
            Chapter 3 changes the presentation path, not the ownership model.
            The view receives the same managed collection and adds a selection
            control. Selecting an item does not copy the collection into the
            component, create a second store, or ask the feature service to
            remember which row a particular reader opened. It records only the
            local choice and derives the detail record from the collection that
            already exists.
          </p>
          <table aria-label="Chapter 3 responsibilities">
            <thead>
              <tr>
                <th scope="col" class="column-150">Concern</th>
                <th scope="col" class="column-auto">Owner</th>
                <th scope="col" class="column-auto">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Character collection</td>
                <td>Feature service</td>
                <td>
                  It is committed feature data that other consumers may read.
                </td>
              </tr>
              <tr>
                <td>Selected character ID</td>
                <td>Displaying view</td>
                <td>
                  It describes temporary navigation in one presentation context.
                </td>
              </tr>
              <tr>
                <td>Selected character</td>
                <td>Derived read path</td>
                <td>
                  It can be recalculated whenever the collection or selection
                  changes.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The result is interaction without duplication. The view becomes more
            useful, while the State contract remains understandable to every
            other consumer of the feature.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Shared Collection State vs Local Selection State
        </div>
        <div class="section-body">
          <p>
            The most important question is not whether a value changes. Both a
            collection and a selection can change. The question is whether the
            value is part of the feature's committed domain State or is merely a
            temporary decision made by one view.
          </p>
          <p>
            A character collection may be read by a list, a detail panel, a
            search result, and a separate summary. It belongs behind the feature
            service because it is the shared source of truth. A selected ID in
            one master-detail screen does not automatically have meaning for
            those other consumers. Storing it centrally would couple them to a
            navigation choice they did not make.
          </p>
          <div class="concept-box">
            <p>
              <strong>Ownership test:</strong> If two independent consumers need
              the same committed value, it is a candidate for shared Feature
              State. If the value only tells one view what it is currently
              displaying, keep it local until a real shared requirement appears.
            </p>
          </div>
          <p>
            This does not make local state less important. It gives it a precise
            job. The local selection is the input to the read path; it is not a
            replacement for the managed collection. That separation also makes
            later changes safer: a second detail panel can choose its own item
            without overwriting the first panel's choice.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deriving the Selected Record Reactively</div>
        <div class="section-body">
          <p>
            Chapter 3 exposes the collection as a reactive value and keeps a
            nullable selected ID in the component. The selected record is a
            projection: find the record whose identifier matches the local
            choice, or return no record when there is no match.
          </p>

          <sdux-multi-framework-example
            description="Derive the selected record">
            <ng-template #beforeAngular>
              <p>
                Angular Signals provide the mechanics; the ownership rule is not
                Angular-specific.
              </p>
              <p>
                The following is the exact Angular implementation from the
                chapter. It is shown as an implementation example, not as a
                claim that every framework should use Signals. A React, Vue, or
                Svelte version would use that framework's reactive primitive
                while preserving the same inputs and the same derived result.
              </p>
            </ng-template>
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">protected readonly selectedCharacterId = signal&lt;number | null&gt;(null);

protected readonly selectedCharacter = computed(() =&gt; &#123;
  const selectedId = this.selectedCharacterId();
  return this.characters().find((&#123; id &#125;) =&gt; id === selectedId) ?? null;
&#125;);</code></pre>
            </ng-template>
            <ng-template #afterAngular>
              <p>
                Notice what the computed value does not do. It does not fetch a
                second copy of the character, mutate the shared collection, or
                write the selected record back into Feature State. It joins a
                local presentation input with shared committed data and produces
                the value required by the detail panel.
              </p>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            That read path is also resilient to updates. If the service-owned
            collection changes, the lookup runs again. If the local selection
            changes, it runs again. The detail panel always reflects the latest
            valid combination rather than a stale object copied during an event
            handler.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Handling Empty and Unknown Selections</div>
        <div class="section-body">
          <p>
            An interactive view has more states than “the record is visible.”
            The collection may still be empty while the feature initializes. A
            user may not have selected anything yet. A stale link, a malformed
            control value, or a collection refresh may refer to an identifier
            that is no longer present.
          </p>
          <p>
            Chapter 3 treats those cases as normal read-path outcomes. The
            selected record is nullable, and the template displays an empty
            state when the lookup returns no match. The selection handler also
            ignores an unknown value instead of placing invalid data into local
            state. That gives the user a clear next action and keeps the detail
            panel from rendering a partially valid object.
          </p>
          <table aria-label="Selection outcomes">
            <thead>
              <tr>
                <th scope="col" class="column-150">Condition</th>
                <th scope="col" class="column-200">Derived result</th>
                <th scope="col" class="column-auto">View response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No records loaded</td>
                <td>No selected record</td>
                <td>
                  Disable or leave the picker empty and explain the next step.
                </td>
              </tr>
              <tr>
                <td>No selection yet</td>
                <td><span class="code">null</span></td>
                <td>
                  Show “No character selected” rather than inventing a default.
                </td>
              </tr>
              <tr>
                <td>Unknown identifier</td>
                <td>No selected record</td>
                <td>
                  Ignore the invalid choice and preserve a safe empty state.
                </td>
              </tr>
              <tr>
                <td>Valid identifier</td>
                <td>Matching committed record</td>
                <td>Render the detail fields from the derived value.</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong
                >Do not use a default record to hide an invalid state.</strong
              >
              A default can be a deliberate product decision, but silently
              displaying the first record makes an empty or stale selection look
              valid and makes the interaction harder to reason about.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Testing Interaction Without Moving State Ownership
        </div>
        <div class="section-body">
          <p>
            The ownership boundary gives the tests a straightforward shape. The
            feature service test verifies that the managed collection is
            available through its committed State path. The view test verifies
            that selection changes the derived detail record, that the empty
            state appears before a valid choice, and that an unknown identifier
            does not produce a fabricated detail view.
          </p>
          <p>
            These are separate assertions because they protect separate
            responsibilities. A test should not need to inspect the internals of
            the feature service to prove that a dropdown selected the right row.
            Likewise, a service test should not need to render a detail panel to
            prove that the collection exists.
          </p>
          <table aria-label="Tests for the master-detail read path">
            <thead>
              <tr>
                <th scope="col" class="column-150">Test focus</th>
                <th scope="col" class="column-auto">Useful assertion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Initial view</td>
                <td>
                  The detail panel shows the empty state and the picker is safe
                  to use.
                </td>
              </tr>
              <tr>
                <td>Valid selection</td>
                <td>
                  The detail fields match the selected record in the shared
                  collection.
                </td>
              </tr>
              <tr>
                <td>Unknown selection</td>
                <td>
                  No invalid record is rendered and the view remains
                  predictable.
                </td>
              </tr>
              <tr>
                <td>Collection refresh</td>
                <td>
                  The derived value reflects the newest collection for the local
                  ID.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The same tests apply when the screen is implemented in any UI
            framework. The syntax for subscribing, memoizing, or rendering may
            change, but the behavior contract stays the same: shared data
            remains shared, temporary navigation remains local, and the detail
            view is derived from a valid pair of inputs.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          A Boundary That Scales Beyond the Tutorial
        </div>
        <div class="section-body">
          <p>
            Chapter 3 is about more than a character dropdown. It demonstrates
            how to add interaction without broadening State ownership. The
            service keeps the feature's committed collection available to every
            consumer, while each view can decide what it is currently reading.
          </p>
          <p>
            <strong>If a later requirement</strong> says that multiple screens
            must share the same selection, that is a new domain decision. Move
            it deliberately into shared Feature State only when the requirement
            is real and the selection has meaning beyond one view. Until then,
            local state is the smaller and clearer boundary.
          </p>
          <p>
            Read the complete tutorial to see the interactive read path in
            context. The behavior, regardless of the framework, the separation
            between committed Feature State and local presentation state remains
            constant.
          </p>
          <ul>
            <li>
              Angular
              <ul>
                <li>
                  <a href="/tutorial/angular" target="new">Angular tutorial</a>
                </li>
                <li>
                  <a href="/examples/angular/display-characters" target="new"
                    >Chapter 3 StackBlitz example</a
                  >
                </li>
              </ul>
            </li>
          </ul>

          <div class="callout callout-info">
            <p>
              <strong>Remember:</strong> Share the collection because it is
              feature data. Keep the selection local because it is a view
              decision. Derive the detail record instead of duplicating it.
            </p>
          </div>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogKeepSelectionLocalWithSharedFeatureStateComponent {}
