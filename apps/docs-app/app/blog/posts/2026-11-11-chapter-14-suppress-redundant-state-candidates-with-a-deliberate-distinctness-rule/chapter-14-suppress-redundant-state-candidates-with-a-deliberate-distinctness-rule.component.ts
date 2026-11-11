import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-14-suppress-redundant-state-candidates-with-a-deliberate-distinctness-rule',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  template: `
    <sdux-blog-layout
      id="chapter-14-suppress-redundant-state-candidates-with-a-deliberate-distinctness-rule"
      title="Chapter 14 — Suppress Redundant State Candidates with a Deliberate Distinctness Rule"
      date="2026-11-11"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          Repeated inputs are normal. The difficult question is not whether a
          candidate looks similar to the last one, but what your domain means by
          “unchanged.” Chapter 14 uses the Operator stage and
          <span class="code"
            ><a
              href="/docs/pipeline/addons/operators/with-distinct-until-changed"
              >withDistinctUntilChanged</a
            ></span
          >
          to suppress candidates whose character IDs are already present before
          downstream filters and reducers run.
        </p>
        <p>
          The example keeps the comparison function in the service-owned
          <sdux-feature-cell [tm]="true" /> pipeline. The component exposes
          buttons and observes the result; it does not decide whether a
          candidate is distinct. That division makes the behavior easy to
          demonstrate and its production limitation impossible to miss.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Core idea:</strong> distinctness is a business rule with a
            specific scope. A comparator that only checks identity can be useful
            for one input path, but it is unsafe as a blanket rule for creates,
            edits, removals, or ordered collections.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Repeated Inputs Need a Meaning of “Unchanged”
        </div>
        <div class="section-body">
          <p>
            Applications receive repeated candidates for many ordinary reasons:
            a user clicks submit twice, a refresh returns an already-known
            record, or an upstream source replays its latest value. Treating
            every repeated candidate as meaningful can send unnecessary work
            through the rest of the pipeline. But “unnecessary” depends on what
            the feature is trying to protect.
          </p>
          <p>
            For the Chapter 14 exercise, the narrow question is whether the
            incoming character collection contains at least one identity that
            was not already present. That is different from asking whether two
            arrays are deeply equal. It is also different from asking whether
            every field, array position, or deletion has the same meaning to the
            application.
          </p>
          <table aria-label="Distinctness questions for repeated candidates">
            <thead>
              <tr>
                <th scope="col" class="column-250">Question</th>
                <th scope="col" class="column-auto">Why the answer matters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Is this identity new?</td>
                <td>
                  A new record may need to continue through merge and downstream
                  behavior.
                </td>
              </tr>
              <tr>
                <td>Did an existing record change?</td>
                <td>
                  Field edits can be valid work even when the identity is
                  familiar.
                </td>
              </tr>
              <tr>
                <td>Was an identity removed?</td>
                <td>
                  A removal-only candidate may be meaningful without introducing
                  a new ID.
                </td>
              </tr>
              <tr>
                <td>Does order carry meaning?</td>
                <td>
                  An identity set can hide a reorder when position is part of
                  the feature.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Register Distinct Until Changed at the Operator Stage
        </div>
        <div class="section-body">
          <p>
            The Operator stage runs after Resolve and Merge, then before Filters
            and Reducers. That placement matters: the distinctness decision can
            stop a redundant candidate before later transformation work runs.
            The service owns this configuration alongside its other pipeline
            behaviors, so every caller gets the same rule.
          </p>
          <p>
            The source service registers the operator with an array, just like
            its filters and reducers. The callback receives the incoming value
            and the previous value, then compares character identities.
          </p>
          <sdux-multi-framework-example
            description="Register an Operator-Stage Distinctness Rule">
            <ng-template #angular>
              <pre
                class="code"><code class="language-ts">import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; withDistinctUntilChanged &#125; from '&#64;sdux-vault/addons';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;readonly StarWarsCharacter[]&gt;('star-wars-character')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class ExampleService &#123;
  readonly #vault = injectVault&lt;readonly StarWarsCharacter[]&gt;(ExampleService);

  constructor() &#123;
    this.#vault.operators([
      withDistinctUntilChanged&lt;readonly StarWarsCharacter[]&gt;(
        (incoming, previous) =&gt;
          incoming.every((&#123; id &#125;) =&gt;
            previous.some((character) =&gt; character.id === id)
          )
      )
    ]);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code"><code class="language-ts">import &#123; withDistinctUntilChanged &#125; from '&#64;sdux-vault/addons';
import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';
import type &#123; StarWarsCharacter &#125; from './star-wars-character.shape';

export const characterCell = FeatureCell&lt;readonly StarWarsCharacter[]&gt;(&#123;
  key: 'star-wars-character',
  initialState: []
&#125;);

characterCell
  .operators([
    withDistinctUntilChanged&lt;readonly StarWarsCharacter[]&gt;(
      (incoming, previous) =&gt;
        incoming.every((&#123; id &#125;) =&gt;
          previous.some((character) =&gt; character.id === id)
        )
    )
  ])
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-warning">
            <p>
              <strong>Scope the rule deliberately:</strong> the callback above
              is an identity-set comparison. It is not a general deep-equality
              comparator and should not be copied into every CRUD pipeline
              without checking what edits, removals, and ordering mean.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          How the Identity-Set Comparator Suppresses Candidates
        </div>
        <div class="section-body">
          <p>
            Read the callback as a set-membership test. For every incoming
            character, it looks for a previous character with the same ID. If
            all incoming IDs are already represented, the candidate is treated
            as unchanged by this rule. If the incoming collection contains a new
            ID, the comparison returns a different result and the candidate
            remains eligible for the later pipeline stages.
          </p>
          <p>
            The tutorial makes the result observable with two service methods.
            <span class="code">submitSameState()</span> submits the same
            character identity, while
            <span class="code">submitChangedState()</span> advances to a
            candidate that changes the identity set. The component delegates
            both actions to the service and keeps its role focused on controls
            and observation.
          </p>
          <sdux-multi-framework-example
            description="Submit Same and Changed Candidates">
            <ng-template #angular>
              <pre
                class="code"><code class="language-ts">submitSameState(): void &#123;
  this.#vault.mergeState([&#123; ...DISTINCT_SAME_STATE_CHARACTER &#125;]);
&#125;

submitChangedState(): void &#123;
  const &#123; character, nextIndex &#125; = getDistinctChangedStateCharacter(
    this.#distinctChangedStateIndex
  );

  this.#distinctChangedStateIndex = nextIndex;

  this.#vault.mergeState([character]);
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';
import type &#123; StarWarsCharacter &#125; from './star-wars-character.shape';

export const characterCell = FeatureCell&lt;readonly StarWarsCharacter[]&gt;(&#123;
  key: 'star-wars-character',
  initialState: []
&#125;);

const DISTINCT_SAME_STATE_CHARACTER: StarWarsCharacter = &#123;
  id: 501,
  name: 'Rey',
  lastName: 'Skywalker',
  faction: 'Jedi Order',
  isForceSensitive: true
&#125;;

let distinctChangedStateIndex = 0;

export function submitSameState(): void &#123;
  characterCell.mergeState([&#123; ...DISTINCT_SAME_STATE_CHARACTER &#125;]);
&#125;

export function submitChangedState(): void &#123;
  const character: StarWarsCharacter = &#123;
    id: 502 + distinctChangedStateIndex,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Jedi Order',
    isForceSensitive: true
  &#125;;

  distinctChangedStateIndex += 1;
  characterCell.mergeState([character]);
&#125;

characterCell.initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            In the demo, a repeated candidate leaves the observed value
            unchanged. A changed candidate can continue to the rest of the
            pipeline. The distinction is visible without making the component
            aware of comparison internals.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Why a Narrow Comparator Is Unsafe for General CRUD
        </div>
        <div class="section-body">
          <p>
            The same comparator can silently hide valid work. If a user edits
            Leia’s faction but keeps her ID, every incoming ID may still be
            present in the previous value. The identity-set rule can therefore
            suppress an edit. A removal-only candidate has the same problem: it
            introduces no new ID, even though the collection should lose a
            record. Reordering also disappears if the feature treats array
            position as meaningful.
          </p>
          <table aria-label="Risks of an identity-only comparator">
            <thead>
              <tr>
                <th scope="col" class="column-250">Candidate change</th>
                <th scope="col" class="column-auto">
                  What the narrow rule can do
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Edit an existing record</td>
                <td>Suppress it because the edited ID already exists.</td>
              </tr>
              <tr>
                <td>Remove a record</td>
                <td>Suppress it because no new ID appears.</td>
              </tr>
              <tr>
                <td>Reorder records</td>
                <td>Ignore the change because membership is unchanged.</td>
              </tr>
              <tr>
                <td>Add a new record</td>
                <td>
                  Allow it because an incoming ID is not in the previous set.
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong>Production check:</strong> choose a comparator from the
              feature’s semantics. If updates, deletes, ordering, or derived
              values matter, compare those dimensions or avoid this narrow
              identity-only rule for that input path.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Observe Reset and Suppressed-Request Behavior
        </div>
        <div class="section-body">
          <p>
            The cleanest way to study distinctness is to observe the resulting
            State rather than adding control logic to the component. Press the
            same-state control, wait for the pipeline to settle, and confirm
            that the observed collection remains unchanged. Then submit a
            changed candidate and confirm that the expected value appears.
          </p>
          <p>
            The chapter’s tests use the same sequence: act, await
            <span class="code">vaultSettled(key)</span>, then assert. That
            ordering keeps the test focused on the public outcome. Add cases for
            edits, removals, and ordering before adopting the rule in a feature
            with broader CRUD semantics.
          </p>
          <p>
            Reset behavior is an equally useful boundary check. A reset is a
            deliberate lifecycle operation, not proof that every ordinary
            candidate is distinct. Verify that your feature’s reset contract is
            tested separately from the identity comparison, especially when a
            previously known collection can be intentionally replaced.
          </p>
          <!-- StackBlitz: chapter-14-distinct-until-changed -->
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Work through the
            <a href="/docs/tutorial/angular/chapters/14-distinct-until-changed">
              Chapter 14 distinct-until-changed tutorial
            </a>
            and compare the same-state and changed-state controls in the
            <sdux-feature-cell [tm]="true" /> service. Then review the
            comparator against your own domain rules before using it for CRUD.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter14SuppressRedundantStateCandidatesWithADeliberateDistinctnessRuleComponent {}
