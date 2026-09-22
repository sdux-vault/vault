import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-route-destructive-delete-through-the-service-owned-boundary',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    MultiFrameworkExampleComponent
  ],
  template: `
    <sdux-blog-layout
      id="route-destructive-delete-through-the-service-owned-boundary"
      title="Chapter 5 — Route Destructive Delete Through the Same Service-Owned Boundary"
      date="2026-09-22"
      pillar="SP"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          Delete is the mutation most likely to tempt a developer into a one-off
          array splice inside a component.
          <a href="/tutorial" target="new">Chapter 5</a> shows that a
          destructive write does not need a different architecture than create
          or update: switch the Merge stage to identifier-based semantics,
          submit the target identity through the same service-owned
          <sdux-brand-name [tm]="true" />
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          method, and keep confirmation state local to the view.
        </p>
        <p>
          A remove button is easy to wire up badly. It is one click away from
          filtering an array in the component and calling it done. That approach
          quietly moves collection mutation policy into the UI layer, exactly
          the coupling the create and update chapters worked to avoid. Chapter 5
          keeps the same boundary in place for the operation that removes data
          instead of adding it.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Deletion is still a merge. Register
            identifier-based merge semantics once, then submit the target
            identity through the service's existing write path with a delete
            flag. The component never touches the committed collection.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Delete Tempts Developers to Bypass the Pipeline
        </div>
        <div class="section-body">
          <p>
            Create and update both produce a record the pipeline can merge back
            into the collection. Delete produces nothing — its whole purpose is
            to make a record disappear. That asymmetry is exactly why delete is
            the operation most often implemented as a manual
            <span class="code">.filter()</span> against local component state:
            there is no obvious "new value" to hand to a write API, so the
            shortcut of rebuilding the array by hand feels natural.
          </p>
          <p>
            The shortcut has a cost. A component that filters its own copy of a
            collection is now responsible for knowing the identity field,
            keeping that copy in sync with every other write path, and
            re-implementing removal semantics that the Merge stage already
            provides. Chapter 5 avoids all of that by treating delete as a merge
            request with a flag, not a different kind of state management.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Warning:</strong> A component-level
              <span class="code">.filter()</span> against a local array copy is
              not synchronized with the FeatureCell's committed collection. Any
              other consumer of that Feature State will not see the removal, and
              the next unrelated write can silently reintroduce the deleted
              record.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Switching to Identifier-Based Merge Semantics
        </div>
        <div class="section-body">
          <p>
            Before a service can update or remove a specific record, the
            registered
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            needs to compare incoming records by identifier rather than simply
            appending them. Chapter 5 registers
            <span class="code">withArrayByIdMergeBehavior</span> for the Merge
            stage — the same stage used by the create and update paths from
            earlier chapters, now configured to also honor a delete flag.
          </p>
          <sdux-multi-framework-example
            description="Register identifier-based array merge">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">provideFeatureCell(
  ExampleService,
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [
    // Registers identifier-based array merging for this FeatureCell. During
    // the Merge stage, matching character identifiers are updated, new
    // identifiers are appended, and merge requests configured for deletion
    // remove the matching records from the committed collection.
    withArrayByIdMergeBehavior
  ]
)</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">export const characterCell = FeatureCell&lt;StarWarsCharacter[]&gt;(
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [withArrayByIdMergeBehavior]
);

characterCell
  .withArrayMergeId(&#123; idKey: 'id' &#125;)
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            With this behavior active, the Merge stage applies one consistent
            rule for every write: a matching identifier is updated, an unseen
            identifier is appended, and a merge request marked for deletion
            removes the matching record instead. The service does not need a
            separate removal algorithm — it needs a differently configured
            request to the same write path.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Adding a Service-Owned removeCharacter Method
        </div>
        <div class="section-body">
          <p>
            The delete method looks almost identical to create and update: it
            still calls <span class="code">mergeState</span> on the
            service-owned FeatureCell. The difference is the shape of the input
            and a second argument that marks the request as destructive.
          </p>
          <sdux-multi-framework-example
            description="Remove a character by identity">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">removeCharacter(id: number): void &#123;
  this.#vault.mergeState(
    &#123;
      value: [&#123; id &#125; as StarWarsCharacter]
    &#125;,
    &#123; isDelete: true &#125;
  );
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">function removeCharacter(id: number): void &#123;
  characterCell.mergeState(
    &#123;
      value: [&#123; id &#125; as StarWarsCharacter]
    &#125;,
    &#123; isDelete: true &#125;
  );
&#125;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The incoming value only needs to carry the identifier the merge
            behavior matches on — it does not need the rest of the record. The
            second argument,
            <span class="code">&#123; isDelete: true &#125;</span>, tells the
            active Array By ID Merge behavior to remove the matching record from
            the collection rather than update or append it.
          </p>
          <table aria-label="Merge request shape by operation">
            <thead>
              <tr>
                <th scope="col" class="column-150">Operation</th>
                <th scope="col" class="column-250">mergeState value</th>
                <th scope="col" class="column-auto">Merge behavior result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Create</td>
                <td>New record, unseen identifier</td>
                <td>Appended to the collection</td>
              </tr>
              <tr>
                <td>Update</td>
                <td>Full record, known identifier</td>
                <td>Matching record replaced</td>
              </tr>
              <tr>
                <td>Delete</td>
                <td>
                  Identifier only, plus <span class="code">isDelete: true</span>
                </td>
                <td>Matching record removed</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-info">
            <p>
              <strong>Design rule:</strong> Every write — create, update, or
              delete — is still a <span class="code">mergeState</span> call on
              the service-owned FeatureCell. The service never needs a parallel,
              hand-built removal algorithm.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Staging a Cancelable Delete Confirmation Locally
        </div>
        <div class="section-body">
          <p>
            Removing a record is harder to undo than editing one, so Chapter 5
            adds a confirmation step before the service is called at all. That
            confirmation state — which record is pending removal, whether the
            user has confirmed it — belongs to the component, not the shared
            collection. Nothing about "is this delete currently being confirmed"
            is meaningful to any other consumer of the Feature State.
          </p>
          <sdux-multi-framework-example
            description="Track a pending delete candidate">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">protected readonly deleteCandidate = signal&lt;StarWarsCharacter | null&gt;(null);

protected requestDelete(): void &#123;
  const character = this.selectedCharacter();

  if (character) &#123;
    this.deleteCandidate.set(character);
    this.feedback.set(null);
  &#125;
&#125;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            A cancel handler clears
            <span class="code">deleteCandidate</span> without calling the
            service at all — cancellation is purely a local state reset, the
            same principle the create and update chapters established for
            aborted edits. Only a confirm action calls
            <span class="code">removeCharacter</span>, and only after the user
            has explicitly acknowledged the pending record.
          </p>
          <div class="concept-box">
            <p>
              <strong>Ownership test:</strong> If canceling the action should
              leave the committed collection untouched, the state describing
              that in-progress action belongs in the component. Only a
              confirmed, committed intent should reach the FeatureCell.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Handling Unknown or Stale IDs Safely</div>
        <div class="section-body">
          <p>
            A confirmation panel reduces accidental deletes, but it does not
            guarantee the identity is still valid by the time the user confirms
            — another write could have already removed or replaced that record.
            Array By ID Merge handles this without extra service logic: when the
            submitted identifier has no match, the merge behavior leaves the
            visible collection state equivalent, rather than throwing or
            silently corrupting unrelated records.
          </p>
          <table aria-label="Removal outcomes by identifier match">
            <thead>
              <tr>
                <th scope="col" class="column-250">Current collection</th>
                <th scope="col" class="column-150">Submitted identity</th>
                <th scope="col" class="column-auto">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span class="code"
                    >[&#123; id: 1 &#125;, &#123; id: 2 &#125;]</span
                  >
                </td>
                <td><span class="code">&#123; id: 1 &#125;</span></td>
                <td>Record 1 removed; record 2 preserved</td>
              </tr>
              <tr>
                <td>
                  <span class="code"
                    >[&#123; id: 1 &#125;, &#123; id: 2 &#125;]</span
                  >
                </td>
                <td><span class="code">&#123; id: 99 &#125;</span></td>
                <td>No match — collection remains unchanged</td>
              </tr>
            </tbody>
          </table>
          <p>
            Because the removal rule is identity-based, one matching record is
            removed while every other record in the collection is preserved
            exactly as committed. The service does not need to special-case a
            missing identity — the configured merge behavior already defines
            what happens.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Verifying Delete Without Breaking the Boundary
        </div>
        <div class="section-body">
          <p>
            A short set of questions confirms the boundary held. Does the
            service still own the only call that mutates committed Feature
            State? Is the pending-delete confirmation local to the component?
            Does canceling leave the collection untouched? Does confirming
            submit an identity through the same
            <span class="code">mergeState</span>
            path used by create and update, just with
            <span class="code">isDelete: true</span>?
          </p>
          <p>
            Tests can confirm the service behavior directly by acting on the
            FeatureCell, settling the pipeline, and asserting on the resulting
            State — the same act, settle, assert pattern used throughout the
            tutorial series.
          </p>
          <div class="code-inline">
            <pre><code class="language-ts">it('should remove the matching character from the current collection', async () =&gt; &#123;
  const service = await configureService();

  service.removeCharacter(10);

  await vaultSettled(key);

  expect(service.state.value()).toEqual([initialCharacters[1]!]);
&#125;);

it('should safely remove against an empty collection when no value exists', async () =&gt; &#123;
  const service = await configureService(null);

  service.removeCharacter(10);

  await vaultSettled(key);

  expect(service.state.value()).toBeUndefined();
&#125;);</code></pre>
          </div>
          <!-- StackBlitz: route-destructive-delete-through-the-service-owned-boundary -->
          <div class="callout callout-info">
            <p>
              <strong>Review the boundary:</strong> If a component needs to know
              how identifiers are matched, which records survive a removal, or
              how a stale identity is handled, that knowledge belongs in the
              feature service and its configured merge behavior — not in the
              delete button's click handler.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Continue with the
            <a href="/tutorial">Chapter 5 delete tutorial</a>, then compare it
            with the
            <a href="/blog/add-edit-records-without-mixing-editor-state"
              >Chapter 4 add and edit boundary</a
            >. Together they show that create, update, and delete are the same
            service-owned write path, configured with different merge semantics
            rather than three separate architectures.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogRouteDestructiveDeleteThroughTheServiceOwnedBoundaryComponent {}
