import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-resolve-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isFromStream()) {
      <div class="table-title">
        <a
          href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior"
          >withCoreFromStreamBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/resolve/with-core-from-stream-behavior"
                  >withCoreFromStreamBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>source$: Observable&lt;T&gt;</li>
                <li>
                  options?:
                  <a href="/docs/references/options/from-stream-options"
                    >FromStreamOptions</a
                  >
                </li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>void</li>
              </ul>
            </td>

            <td>
              <p>
                Integrates observable-based data sources into the Resolve stage
                by subscribing to an observable stream and forwarding emitted
                values into the pipeline as state updates. Each emitted value is
                normalized and resolved before downstream processing occurs.
              </p>

              <p>
                This behavior establishes a controlled boundary for
                stream-driven state updates, allowing RxJS-based sources such as
                Angular HttpClient requests or application-owned observables to
                participate uniformly in pipeline execution.
              </p>

              <p>
                Stream-based resolution is optional and participates only when
                <code>fromStream</code>
                is invoked. Emitted values are forwarded through standard
                resolution, while stream errors are normalized and propagated as
                state updates.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isHttpResource()) {
      <div class="table-title">
        <a href="/docs/pipeline/addons/resolve/with-http-resource-behavior"
          >withHttpResourceBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/addons/resolve/with-http-resource-behavior"
                  >withHttpResourceBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>incoming: HttpResourceRef&lt;T&gt;</li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T>>
                </li>
              </ul>
            </td>

            <td>
              <p>
                Resolves Angular <strong>HttpResourceRef</strong> inputs into a
                concrete upstream value by observing the resource's reactive
                value signal and extracting the first available resolved value
                for pipeline processing.
              </p>

              <p>
                This behavior is provided
                <strong
                  >by default only in
                  <code><sdux-package-name />/angular</code></strong
                >
                and participates in the Resolve stage exclusively when an
                Angular
                <strong>HttpResourceRef</strong> input is supplied. It is not
                available in non-Angular integrations.
              </p>

              <p>
                HTTP resource resolution is gated behind an experimental feature
                flag. When enabled, loading and error signals emitted by the
                resource are synchronized with the pipeline, and resolution
                failures are normalized and propagated to downstream pipeline
                stages.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isObservable()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/resolve/with-core-observable-behavior"
          >withCoreObservableBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/resolve/with-core-observable-behavior"
                  >withCoreObservableBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>incoming: Observable&lt;T&gt;</li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T>>
                </li>
              </ul>
            </td>

            <td>
              <p>
                Resolves observable-based state inputs by subscribing to an
                observable source and extracting a single emitted value for
                pipeline processing. The resolved value is forwarded downstream
                once emission occurs.
              </p>

              <p>
                This behavior establishes a controlled boundary for
                observable-driven resolution, allowing RxJS-based data
                sources—such as Angular HttpClient request streams or other
                observable sequences—to integrate uniformly into the Resolve
                stage.
              </p>

              <p>
                Observable-based resolution is optional and participates only
                when an observable input is supplied. Emission errors are
                normalized and propagated to downstream pipeline stages.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isPromiseOption()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/resolve/with-core-promise-behavior"
          >withCorePromiseBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/resolve/with-core-promise-behavior"
                  >withCorePromiseBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>
                  incoming:
                  <a href="/docs/references/types/deferred-factory"
                    >DeferredFactory</a
                  >&lt;T&gt;
                </li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T>>
                </li>
              </ul>
            </td>

            <td>
              <p>
                Resolves deferred, promise-backed state inputs into a concrete
                upstream value. The deferred factory is invoked during pipeline
                execution, and the resolved value is forwarded downstream once
                fulfillment completes.
              </p>

              <p>
                This behavior establishes a controlled boundary for asynchronous
                resolution, allowing promise-producing operations such as
                network requests or deferred computation to integrate uniformly
                into the Resolve stage.
              </p>

              <p>
                Promise-based resolution is optional and participates only when
                a deferred factory input is supplied. Resolution failures are
                normalized and propagated to downstream pipeline stages.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isValue()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
          >withCoreValueBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
                  >withCoreValueBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>
                  incoming:
                  <a href="/docs/references/types/state-type">StateType</a
                  >&lt;T&gt;
                </li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Promise&lt;<a
                    href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >&lt;T>>
                </li>
              </ul>
            </td>
            <td>
              <p>
                Normalizes plain state values and structured state envelopes
                into a canonical upstream value. Extracts the
                <code>value</code> field, synchronizes loading and error
                signals, and produces a predictable upstream value shape for
                downstream pipeline stages.
              </p>

              <p>
                Object and array values are shallow-cloned to preserve
                immutability guarantees. A
                <code>value: null</code> input explicitly clears state, while an
                absent or undefined value suppresses downstream processing.
              </p>

              <p>
                This behavior is <strong>pipeline-critical</strong>, always
                installed, and forms the default resolution path for all
                non-observable, non-deferred, and non-resource inputs.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isFromObservable()) {
      <div class="table-title">
        <a href="/docs/pipeline/behaviors/resolve/with-core-value-behavior"
          >withCoreFromObservableBehavior</a
        >
      </div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior"
                  >withCoreFromObservableBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>source$: Observable&lt;T&gt;</li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Observable&lt;<a href="/docs/references/types/state-type"
                    >StateType</a
                  >&lt;T&gt;&gt;
                </li>
              </ul>
            </td>

            <td>
              <p>
                Provides a bridge for resolving a single value from an
                observable source and converting it into a normalized
                <code>StateType&lt;T&gt;</code> envelope.
              </p>

              <p>
                The observable is subscribed once, resolves a single emitted
                value, and emits a structured state envelope containing
                <code>value</code>, <code>loading</code>, and
                <code>error</code> fields. Resolution is tied to the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                lifecycle and is automatically cancelled on reset or
                destruction.
              </p>

              <p>
                This behavior operates outside of the pipeline and does not
                perform pipeline resolution itself. The resulting state envelope
                is intended to be injected into the pipeline using
                <strong>replaceState</strong> or <strong>mergeState</strong>.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isFromPromise()) {
      <div class="table-title">
        <a
          href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior"
          >withCoreFromPromiseBehavior</a
        >
      </div>

      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/behaviors/promise/with-core-from-promise-behavior"
                  >withCoreFromPromiseBehavior</a
                >&lt;T&gt;</strong
              >

              <p>inputs:</p>
              <ul>
                <li>
                  incoming:
                  <a href="/docs/references/types/deferred-factory"
                    >DeferredFactory</a
                  >&lt;T&gt;
                </li>
              </ul>

              <p>returns:</p>
              <ul>
                <li>
                  Promise&lt;<a href="/docs/references/types/state-type"
                    >StateType</a
                  >&lt;T&gt;&gt;
                </li>
              </ul>
            </td>

            <td>
              <p>
                Provides a bridge for resolving promise-backed state inputs by
                invoking a
                <a href="/docs/references/types/deferred-factory"
                  >DeferredFactory</a
                >&lt;T&gt; and converting its result into a normalized
                <code>StateType&lt;T&gt;</code> envelope.
              </p>

              <p>
                The deferred factory is invoked exactly once. Its returned value
                or promise is awaited, and the resolved result is wrapped into a
                structured state envelope containing <code>value</code>,
                <code>loading</code>, and <code>error</code> fields.
              </p>

              <p>
                This behavior operates outside of the pipeline and does not
                perform Resolve-stage normalization itself. The resulting state
                envelope is intended to be injected into the pipeline using
                <strong>replaceState</strong> or <strong>mergeState</strong>.
              </p>

              <p>
                Resolution is bound to the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                lifecycle. Deferred execution cannot resolve or reject after the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                has been reset or destroyed, preventing orphaned or out-of-band
                state updates.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultResolveBehaviorCommonComponent {
  type = input<string>('all');

  isFromObservable = computed(() => {
    return this.type() === 'all' || this.type() === 'fromObservable';
  });

  isFromPromise = computed(() => {
    return this.type() === 'all' || this.type() === 'fromPromise';
  });

  isFromStream = computed(() => {
    return this.type() === 'all' || this.type() === 'fromStream';
  });

  isHttpResource = computed(() => {
    return this.type() === 'all' || this.type() === 'httpResource';
  });

  isObservable = computed(() => {
    return this.type() === 'all' || this.type() === 'observable';
  });

  isPromiseOption = computed(() => {
    return this.type() === 'all' || this.type() === 'promise';
  });

  isValue = computed(() => {
    return this.type() === 'all' || this.type() === 'value';
  });
}
