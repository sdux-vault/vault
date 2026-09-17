import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-add-edit-records-without-mixing-editor-state',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    BrandNameComponent,
    MultiFrameworkExampleComponent
  ],
  template: `
    <sdux-blog-layout
      id="add-edit-records-without-mixing-editor-state"
      title="Chapter 4 — Add and Edit Records Without Mixing Editor State with Shared Feature State"
      date="2026-09-17"
      pillar="SP"
      readingTime="9">
      <header class="docs-header">
        <p class="lead">
          Create and update forms may share one editor, but they make different
          promises to a collection. Create preserves existing records and
          appends one new identity. Update replaces one known identity without
          disturbing the rest.
          <a href="/tutorial" target="new"> Chapter 4</a> shows how to keep
          those promises in a service-owned <sdux-brand-name [tm]="true" />
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          while the component owns only temporary editor state.
        </p>
        <p>
          This boundary is easy to lose when a form starts small. A component
          can read a collection, hold a draft, validate fields, decide whether
          it is adding or editing, and then be tempted to rebuild the entire
          array in an event handler. That approach makes the UI responsible for
          committed data and mutation policy at the same time. A predictable
          write path gives each concern a smaller job.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Key takeaway:</strong> Let the feature service commit
            collection changes through its
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            Let the editor manage drafts, mode, validation, cancellation, and
            feedback until a valid user action crosses the commit boundary.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Create and Update Need Different Collection Promises
        </div>
        <div class="section-body">
          <p>
            Both actions begin with a form and end with a record, but they do
            not mean the same thing. A create operation receives a draft that
            has no committed identity yet. Its job is to construct that identity
            and add it to the existing collection. An update operation starts
            with an identity that already exists. Its job is to produce a
            replacement for that record while retaining every unrelated record.
          </p>
          <table aria-label="Create and update collection promises">
            <thead>
              <tr>
                <th scope="col" class="column-100">Operation</th>
                <th scope="col" class="column-200">Input promise</th>
                <th scope="col" class="column-200">Collection result</th>
                <th scope="col" class="column-auto">Boundary owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Create</td>
                <td>Draft without a committed identity</td>
                <td>Append one new record</td>
                <td>Feature service and its configured merge behavior</td>
              </tr>
              <tr>
                <td>Update</td>
                <td>Known identity plus valid changes</td>
                <td>Replace only the matching record</td>
                <td>Feature service replacement logic</td>
              </tr>
              <tr>
                <td>Cancel</td>
                <td>Uncommitted local draft</td>
                <td>Leave the collection unchanged</td>
                <td>Editor state</td>
              </tr>
            </tbody>
          </table>
          <p>
            Thinking in promises clarifies why one generic “save” callback can
            still need two distinct service methods. The editor may choose the
            method based on its local mode, but it should not implement either
            collection operation itself.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Shared Feature State vs Temporary Editor State
        </div>
        <div class="section-body">
          <p>
            The character collection is committed Feature State. It can be
            displayed by a list, selected by a detail view, and used by other
            consumers of the feature. Its ownership belongs in the service that
            owns the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
            The editor draft has a different lifetime: it exists while someone
            is typing, can be rejected by validation, and can disappear when the
            user cancels. That makes it local editor state, not another copy of
            the collection.
          </p>
          <div class="concept-box">
            <p>
              <strong>Ownership test:</strong> Ask whether the value is already
              committed and meaningful to more than one consumer. If it is, keep
              it behind the feature service. If it describes an in-progress
              interaction in one editor, keep it local until the user confirms
              the write.
            </p>
          </div>
          <p>
            Chapter 4’s editor therefore owns the current mode, the draft
            fields, validation messages, and feedback such as “saved” or “edit
            cancelled.” It may also keep the identity being edited so it can
            select the correct service method. None of those values need to be
            written into the shared collection while the user is still typing.
          </p>
          <p>
            This separation also makes cancellation safe. Resetting a draft
            removes temporary input, not a record from the collection. A failed
            validation leaves committed Feature State untouched. The service
            sees a request only after the editor has enough information to make
            a valid create or update promise.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Append New Records Through Merge Semantics
        </div>
        <div class="section-body">
          <p>
            The create path gets a new identity from the current collection,
            builds a complete character, and passes a one-item array to
            <span class="code">mergeState</span>. The registered
            <span class="code"
              ><a
                href="/docs/pipeline/addons/merge/with-array-append-merge-behavior"
                >withArrayAppendMergeBehavior</a
              ></span
            >
            gives that input append semantics. Existing records remain in the
            collection; the incoming character becomes the new record.
          </p>
          <sdux-multi-framework-example description="Create a character">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter &#123;
  const nextCharacterId = getNextCharacterId(this.#vault.state.value() ?? []);
  const character = createCharacterState(nextCharacterId, draft);

  this.#vault.mergeState(&#123;
    value: [character]
  &#125;);

  return character;
&#125;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The important detail is not the form event that called this method.
            It is the input shape and the configured policy at the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            boundary. A one-record incoming array communicates an append request
            clearly. The editor does not need to copy the existing collection,
            push into it, or know how unrelated records should be retained.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Design rule:</strong> For create, send the new identity as
              an incoming record and let the append-configured merge path retain
              what is already committed.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Replace Known Records Without Rebuilding the Collection
        </div>
        <div class="section-body">
          <p>
            Update has a narrower promise. The identity is known, so the service
            constructs the updated record with that same identity and maps over
            the current collection. Only the matching item is replaced. Every
            other item is returned unchanged by the mapping decision.
          </p>
          <sdux-multi-framework-example description="Update a character">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">updateCharacter(
  id: number,
  changes: StarWarsCharacterDraft
): StarWarsCharacter &#123;
  const updatedCharacter = createCharacterState(id, changes);

  this.#vault.replaceState(&#123;
    value: () =&gt;
      this.#vault.state
        .value()
        ?.map((character) =&gt;
          character.id === id ? updatedCharacter : character
        ) ?? []
  &#125;);

  return updatedCharacter;
&#125;</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The replacement path makes the identity check visible without asking
            the component to know the collection’s shape beyond the editor
            contract. It also avoids a common accidental create bug: treating an
            edit as an append and producing a second record with the same
            conceptual identity.
          </p>
          <table aria-label="Create and update write boundaries">
            <thead>
              <tr>
                <th scope="col" class="column-300">Question</th>
                <th scope="col" class="column-auto">Create</th>
                <th scope="col" class="column-auto">Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Does the record have an identity?</td>
                <td>Generate the next identity</td>
                <td>Require the known identity</td>
              </tr>
              <tr>
                <td>What must remain unchanged?</td>
                <td>Every existing record</td>
                <td>Every non-matching record</td>
              </tr>
              <tr>
                <td>What operation expresses the promise?</td>
                <td><span class="code">mergeState</span></td>
                <td><span class="code">replaceState</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Handling Invalid or Unknown Edits</div>
        <div class="section-body">
          <p>
            A form should not turn every button press into a write attempt.
            Validation belongs to the editor boundary because it concerns the
            completeness of the temporary draft. The editor can keep the user in
            place, show field feedback, and preserve the draft until the input
            is valid. That keeps an invalid draft out of shared Feature State.
          </p>
          <p>
            Update also needs an identity check. If the selected record no
            longer exists, the editor should report that the edit cannot be
            committed and refresh or cancel its local mode. It should not append
            an unknown edit as a new record, silently overwrite a different
            record, or manufacture a placeholder identity. Unknown edits are a
            boundary condition to handle explicitly.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Warning:</strong> Cancellation is not a collection
              mutation. Clear the local draft and mode, then leave the
              service-owned Feature State exactly as it was before editing
              began.
            </p>
          </div>
          <p>
            After a successful commit, feedback can confirm the operation and
            the editor can close or reset itself. That sequence gives the UI a
            clear confirmation point: local state describes an attempt before
            commit, while the service-owned collection describes the result
            after commit.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Verifying the Write Boundary</div>
        <div class="section-body">
          <p>
            You can review this pattern with a short set of questions. Is the
            committed collection created and exposed by the feature service? Is
            the editor draft separate from that collection? Does create send a
            one-record incoming value to append? Does update preserve the known
            identity and replace only its matching record? Do validation and
            cancellation leave committed State alone?
          </p>
          <p>
            The <a href="/tutorial" target="new">Chapter 4</a> example makes
            those answers observable through its add and edit flows. The view
            supplies temporary intent. The service owns the mutation policy. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            receives the operation through the documented write APIs, and the
            resulting collection can continue serving every consumer that
            depends on it.
          </p>
          <!-- StackBlitz: add-edit-records-without-mixing-editor-state -->
          <div class="callout callout-info">
            <p>
              <strong>Review the boundary:</strong> If a component needs to
              understand how to append, replace, preserve unrelated records, or
              assign committed identity, that knowledge probably belongs in the
              feature service rather than in the editor template.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Continue with the
            <a href="/tutorial">Chapter 4 add and edit tutorial</a>, then
            compare it with the
            <a href="/blog/keep-selection-local-with-shared-feature-state"
              >Chapter 3 selection boundary</a
            >. Together they show the progression from shared committed reads,
            to local presentation state, to non-destructive writes.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogAddEditRecordsWithoutMixingEditorStateComponent {}
