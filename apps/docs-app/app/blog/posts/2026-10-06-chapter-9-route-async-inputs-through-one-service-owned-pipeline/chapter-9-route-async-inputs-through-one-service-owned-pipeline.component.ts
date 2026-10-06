import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-9-route-async-inputs-through-one-service-owned-pipeline',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  template: `
    <sdux-blog-layout
      id="chapter-9-route-async-inputs-through-one-service-owned-pipeline"
      title="Chapter 9 — Route Async Inputs Through One Service-Owned Pipeline"
      date="2026-10-06"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          What changes when the same feature receives its data four different
          ways: during hydration, from a Promise, through an Observable, and
          from an Angular HTTP Resource? The source contracts look different
          enough to invite separate loading, error, and state-management paths.
          This chapter follows each one to the same service-owned
          <sdux-feature-cell [tm]="true" />
          boundary, where the more important question is revealed: who still
          owns the result when the source succeeds, stalls, or fails?
        </p>
        <p>
          The component supplies teaching controls and presentation state. The
          service registers the source and chooses the appropriate state API.
          The pipeline resolves the input, applies the existing filters and
          reducers, tracks loading and errors, and commits the resulting State.
          The source changes; the ownership boundary does not.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Begin with the completed
            Chapter 7 project. Chapter 9 extends the same Chapter 7 character
            workflow and service-owned pipeline rather than replacing it with a
            new asynchronous architecture.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Continue the Chapter 7 Pipeline Through an Async Lab
        </div>
        <div class="section-body">
          <p>
            Chapter 7 established the successful data path: a candidate enters
            the service-owned pipeline, the pure filter removes the teaching
            record whose last name is <span class="code">unknown</span>, and
            ordered reducers derive display fields and sort the retained
            collection. Chapter 8 kept that path intact while making failure
            observable through a controlled filter error.
          </p>
          <p>
            Chapter 9 keeps both lessons and changes the input timing. The
            completed Chapter 8 project becomes the starting point for a lab
            with four source contracts. Hydration controls initialization.
            Promise and Observable examples submit later updates through
            <span class="code">mergeState()</span>. HTTP Resource submits a
            validated replacement through
            <span class="code">replaceState()</span>.
          </p>
          <table aria-label="Chapter 9 asynchronous input contracts">
            <thead>
              <tr>
                <th scope="col" class="column-150">Input</th>
                <th scope="col" class="column-150">Boundary</th>
                <th scope="col" class="column-auto">Lab result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hydration Promise</td>
                <td><span class="code">initialize()</span></td>
                <td>
                  Supplies the authoritative initial collection before the first
                  committed State.
                </td>
              </tr>
              <tr>
                <td>Promise</td>
                <td><span class="code">mergeState()</span></td>
                <td>
                  Resolves once, removes Grogu through the existing filter, and
                  appends Ahsoka and Din.
                </td>
              </tr>
              <tr>
                <td>Observable</td>
                <td><span class="code">mergeState()</span></td>
                <td>
                  Uses the first emitted collection, removes R2-D2, and appends
                  Ezra and Hera.
                </td>
              </tr>
              <tr>
                <td>HTTP Resource<br />Angular Only</td>
                <td><span class="code">replaceState()</span></td>
                <td>
                  Parses the selected remote characters, removes Yoda, and
                  replaces the prior collection with Lando and Han.
                </td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-warning">
            <p>
              <strong>One pending teaching source at a time:</strong> The
              controlled Promise and Observable helpers expose a pending
              interval so you can see loading and failure. Settle the current
              source before starting another; do not infer a general policy for
              cancellation, repeated emissions, or overlapping requests from
              this lab.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Hydrate Authoritative Initial State</div>
        <div class="section-body">
          <p>
            Hydration is different from a later fetch because it controls the
            first initialization request. The service registers a deferred
            <span class="code">hydrate()</span> factory before it calls
            <span class="code">initialize()</span>. The factory does not run
            when it is registered; initialization waits for it to resolve or
            reject.
          </p>
          <p>
            Resolve the teaching Promise and the hydrated collection continues
            through the same Resolve, Filter, Reducer, and Emit stages already
            used by the feature. Reject it and initialization enters Error
            State. The configured <span class="code">initialState</span> is not
            silently used as a fallback, and persistence does not replace the
            authoritative hydration result.
          </p>
          <p>
            This is why the lab keeps the Resolve and Reject buttons separate
            from the service. The component decides when to settle the teaching
            helper, but the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            owns initialization, loading, error handling, and the eventual State
            snapshot.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>What to observe:</strong> Reload the example and leave
              hydration pending. The loading indicator remains active until you
              choose Resolve or Reject. That interval belongs to the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              lifecycle, not to a second loading flag invented by the component.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Resolve Promise and Observable Inputs Through mergeState()
        </div>
        <div class="section-body">
          <p>
            After initialization, a Promise and an Observable represent two
            different ways to deliver a later candidate. Both can be submitted
            through <span class="code">mergeState()</span>, but the source
            contracts are different: a Promise resolves once, while the
            Observable Resolve behavior subscribes and extracts a single emitted
            value for downstream processing. The component starts the request
            and exposes the teaching control; it does not await the Promise or
            subscribe to the Observable.
          </p>
          <h3 class="fake-h4">Promise: await one deferred result</h3>
          <p>
            The Promise helper holds one pending Promise. When you click
            Resolve, Ahsoka, Din, and Grogu become the resolved collection. The
            existing filter removes Grogu, the reducers derive the display
            fields, and array-append merge keeps the existing collection while
            adding the retained characters. When you click Reject, the
            previously committed collection remains visible and the error
            lifecycle completes.
          </p>
          <sdux-multi-framework-example description="Promise request boundary">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">const deferredPromise = examplePromise.getPromise();

this.#vault.mergeState(&#123;
  value: () =&gt; deferredPromise
&#125;);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">const deferredPromise = examplePromise.getPromise();

characterCell.mergeState(&#123;
  value: () =&gt; deferredPromise
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The request shape is intentionally small. The service passes the
            deferred source to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>;
            the pipeline owns waiting, transformation, error handling, and
            commitment. A rejected Promise does not erase the last committed
            collection.
          </p>
          <h3 class="fake-h4">Observable: resolve one emitted value</h3>
          <p>
            The Observable helper uses a controlled ReplaySubject. Click Add by
            Observable to start the request, then Emit or Error to settle it.
            The Observable Resolve behavior owns the subscription and extracts
            one emitted collection for downstream processing. This is a single
            state update, not a continuous stream subscription owned by the
            component.
          </p>
          <sdux-multi-framework-example
            description="Observable request boundary">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; of &#125; from 'rxjs';

const characters$ = of([
  &#123; id: 201 &#125;,
  &#123; id: 202 &#125;,
  &#123; id: 203 &#125;
]);

this.#vault.mergeState(characters$);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; of &#125; from 'rxjs';

const characters$ = of([
  &#123; id: 201 &#125;,
  &#123; id: 202 &#125;,
  &#123; id: 203 &#125;
]);

characterCell.mergeState(characters$);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The Observable source is submitted to the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            just like the Promise source, but Resolve handles the Observable
            subscription and forwards its single emitted value. The existing
            filter, reducers, and array-append merge then process that value. In
            the lab, Emit appends Ezra and Hera after R2-D2 is filtered out;
            Error preserves the previously committed collection while the
            pipeline error lifecycle completes.
          </p>
          <div class="callout callout-warning">
            <strong>Do not move the subscription into the component:</strong>
            Doing so would create a second lifecycle for loading, errors, and
            cleanup. Submit the Observable to the service-owned boundary and let
            the Resolve behavior handle the single emitted value.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Replace State from a Validated HTTP Resource (Angular Only)
        </div>
        <div class="section-body">
          <p>
            The HTTP Resource example uses a different write promise. The
            service creates a resource through the teaching adapter and passes
            it to <span class="code">replaceState()</span>. The component starts
            the request but never reads the resource directly.
          </p>
          <p>
            The adapter calls the public SWAPI people endpoint, selects the
            characters needed by the tutorial, derives numeric identities from
            canonical resource URLs, and rejects incomplete data before it
            reaches State. The response is untrusted at this boundary, so
            parsing and validation stay with the transport adapter.
          </p>
          <p>
            On success, the selected collection continues through the existing
            Filter and Reducer stages before it replaces the previous
            collection. Yoda is removed because its last name is
            <span class="code">unknown</span>, leaving Lando and Han in
            last-name order. On transport, parsing, validation, or HTTP failure,
            the previous collection remains committed and the normalized error
            is visible.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'An HTTP Resource Angular Only Example'">
              <pre
                class="code-inline"><code class="language-ts">this.#vault.replaceState(
  exampleHttpResource.getResource(this.#injector)
);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <div class="callout callout-warning">
            <p>
              <strong
                >External endpoint failures are valid lab outcomes:</strong
              >
              Connectivity, CORS policy, rate limits, and remote schema changes
              can make SWAPI unavailable. Treat a normalized failure with the
              old collection preserved as correct boundary behavior. Do not
              weaken response validation to force an external response to
              commit.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Compare Four Async Source Contracts</div>
        <div class="section-body">
          <p>
            The four examples differ in when the source begins and whether the
            request merges or replaces State. They do not require four copies of
            the application's loading, error, filtering, and reduction logic.
          </p>
          <table aria-label="Async source success and failure behavior">
            <thead>
              <tr>
                <th scope="col" class="column-150">Source</th>
                <th scope="col" class="column-250">Successful path</th>
                <th scope="col" class="column-auto">Failure path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hydration</td>
                <td>
                  Authoritative initial data is filtered and reduced before
                  initialization commits.
                </td>
                <td>
                  Initialization enters Error State instead of falling back to
                  configured initial State.
                </td>
              </tr>
              <tr>
                <td>Promise</td>
                <td>
                  One resolved collection is filtered, reduced, and appended.
                </td>
                <td>
                  The existing collection remains visible while the rejection
                  becomes Error State.
                </td>
              </tr>
              <tr>
                <td>Observable</td>
                <td>
                  The first emitted collection is resolved, filtered, reduced,
                  and appended.
                </td>
                <td>
                  The existing collection remains visible while the source error
                  is normalized.
                </td>
              </tr>
              <tr>
                <td>HTTP Resource<br />Angular Only</td>
                <td>
                  A parsed and validated collection is filtered, reduced, and
                  committed as a replacement.
                </td>
                <td>
                  Transport or validation failure preserves the prior
                  collection.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The execution guarantee is the same across these inputs: the
            pipeline computes the outcome before State commitment. Observers do
            not see a partially parsed response, an intermediate reducer result,
            or a collection that was changed before a later async failure was
            known. Each successful input produces one finalized snapshot, while
            a failed input leaves the previous committed collection intact when
            the request is a later merge or replacement.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>One boundary, four sources:</strong> Choose the state API
              that matches the source contract, then keep resolution,
              transformation, loading, errors, and commitment inside the same
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              pipeline.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Verify Loading, Errors, and Service-Owned Commitment
        </div>
        <div class="section-body">
          <p>
            Run the lab as a sequence of observable contracts. First reload and
            resolve hydration. Confirm that the hydrated collection commits only
            after the deferred source settles, that BB-8 is removed, and that
            reducers add display fields and sort the result. Repeat with Reject
            and confirm that initialization ends in Error State without silently
            using the configured initial collection.
          </p>
          <p>
            Next run the Promise and Observable paths. Watch
            <span class="code">state.isLoading()</span> while each source is
            pending. Resolve or Emit and confirm the retained characters are
            appended. Reject or Error and confirm the committed collection is
            preserved. The component's buttons make the timing visible, but the
            service remains the only owner of the source-to-State transition.
          </p>
          <p>
            Finally run the HTTP Resource path. Confirm that a valid response
            replaces the collection with Lando and Han after parsing,
            validation, filtering, and reduction. If the public endpoint fails,
            confirm that loading ends, the normalized error is visible, and the
            previous collection remains intact.
          </p>
          <p>
            This lab is complete when you can explain the difference between
            initialization-time hydration and later asynchronous updates, and
            when all four sources show the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            loading and error lifecycle without moving pipeline authority into
            the component.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Continue with the
            <a
              [routerLink]="['/tutorial/angular/chapters/09-async-input']"
              target="_blank"
              rel="noopener noreferrer"
              >complete Chapter 9 lab</a
            >, then review the
            <a
              [routerLink]="['/docs/pipeline/behaviors/resolve/http-resource']"
              target="_blank"
              rel="noopener noreferrer"
              >HTTP Resource Resolve behavior</a
            >,
            <a
              [routerLink]="['/docs/pipeline/behaviors/resolve/core-promise']"
              target="_blank"
              rel="noopener noreferrer"
              >Promise Resolve behavior</a
            >,
            <a
              [routerLink]="[
                '/docs/pipeline/behaviors/resolve/core-observable'
              ]"
              target="_blank"
              rel="noopener noreferrer"
              >Observable Resolve behavior</a
            >, and the
            <a
              [routerLink]="['/docs/pipeline/execution-guarantee']"
              target="_blank"
              rel="noopener noreferrer"
              >pipeline execution guarantees</a
            >.
          </p>
          <!-- StackBlitz: chapter-9-route-async-inputs-through-one-service-owned-pipeline -->
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogChapter9RouteAsyncInputsThroughOneServiceOwnedPipelineComponent {}
