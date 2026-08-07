/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/entity-access/with-state-cache-behavior">withStateCacheBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-state-cache-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
          >withStateCacheBehavior</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Adds TTL-based entity caching to a feature cell and coordinates
        cache-miss resolution through the state pipeline.<br /><br />
        This behavior provides cache lookup methods, tracks pending lookups for
        fan-out, and refreshes expired entries.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'addons'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'addons'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Constructor</div>
      <div class="section-body">
        <table aria-label="Constructor">
          <thead>
            <tr>
              <th scope="col" class="column-300">Signature</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>constructor</strong>
                <p>inputs:</p>
                <ul>
                  <li>key: string</li>
                  <li>
                    behaviorCtx:
                    <a href="/docs/references/contexts/behavior-class-context"
                      >BehaviorClassContext</a
                    >
                  </li>
                </ul>

                <p>implements:</p>
                <ul>
                  <li>
                    <a href="/docs/references/contracts/behavior-contract"
                      >BehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a caching behavior instance bound to the provided
                runtime key and behavior context.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Methods</div>
      <div class="section-body">
        <table aria-label="Methods">
          <thead>
            <tr>
              <th scope="col" class="column-300">Method</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>#cacheCleanup</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Clears cache state and pending fan-out state for a reset or
                global failure condition.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#clearRefreshingFlag</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>id: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Clears the refreshing flag for a single cache entry.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#clearRefreshingFlags</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Clears the refreshing flag on all cached entries.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#deleteCacheEntry</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>id: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Removes a cached entry and resolves any pending lookups for the
                same identifier as undefined.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#mergeState</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a
                      href="/docs/references/contexts/feature-cell-extension-context"
                      >FeatureCellExtensionContext</a
                    >
                  </li>
                  <li>id: string</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Initiates a state merge that triggers resolution for a cache
                miss or refresh request.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#normalizeEntities</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>value: TState | null | undefined</li>
                </ul>
                <p>returns: TEntity[]</p>
              </td>
              <td>
                Normalizes a resolved state value into an array of entities for
                cache recording.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#recordEntity</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>id: string</li>
                  <li>entity: TEntity</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Records an entity in the cache using the configured time-to-live
                for expiration.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#refreshEntity</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>id: string</li>
                  <li>entity: TEntity</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Refreshes an existing cache entry with a new entity value and
                resets the TTL.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#resolveAllPendingAsUndefined</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Resolves all pending lookups as undefined and clears the pending
                registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#startRefreshLoop</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a
                      href="/docs/references/contexts/feature-cell-extension-context"
                      >FeatureCellExtensionContext</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Starts a periodic refresh loop that triggers resolution for
                expired entries.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#updateEntity</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>id: string</li>
                  <li>entity: TEntity</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Updates the cached value for an existing entity entry.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Unsubscribes from state emissions and clears all cached and
                pending state.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>extendCellAPI</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a
                      href="/docs/references/contexts/feature-cell-extension-context"
                      >FeatureCellExtensionContext</a
                    >
                  </li>
                </ul>
                <p>
                  returns: &#123; cacheLookup: (id: string) =&gt;
                  Promise&lt;TEntity&gt;; cacheLookup$(id: string):
                  Observable&lt;TEntity&gt;; &#125;
                </p>
              </td>
              <td>
                Extends the feature cell with cache lookup APIs backed by this
                behavior instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>installFluentApi</strong>
                <p class="modifiers">static</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    cell:
                    <a href="/docs/references/shapes/feature-cell-base-shape"
                      >FeatureCellBaseShape</a
                    >
                  </li>
                  <li>behaviorConfigs: Map</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Installs the fluent configuration API used to register state
                cache options for a feature cell.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Clears all cached entries and resolves all pending lookups as
                undefined.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>stopRefreshLoop</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Stops the periodic refresh loop used to refresh expired cache
                entries.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Properties</div>
      <div class="section-body">
        <table aria-label="Properties">
          <thead>
            <tr>
              <th scope="col" class="column-300">Property</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="column-300">
                <strong>#cache</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: new Map&gt;()</p>
              </td>
              <td class="column-auto">
                Stores cached entities by identifier with expiration
                metadata.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#options</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a
                    href="/docs/references/options/state-cache-behavior-options"
                    >StateCacheBehaviorOptions</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Stores the resolved configuration options used by the caching
                behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#optionsKey</strong>

                <p class="type">type: string</p>
                <p class="default">
                  default: &#39;<a
                    href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
                    >withStateCacheBehavior</a
                  >&#39;
                </p>
              </td>
              <td class="column-auto">
                Defines the internal options key used to tag state merges with
                an identifier.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#pending</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: new Map&gt;()</p>
              </td>
              <td class="column-auto">
                Stores pending lookup fan-out state keyed by identifier.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#refreshTimer?</strong>

                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Holds the interval handle used to refresh expired cache
                entries.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#stateSubscribe?</strong>

                <p class="type">type: Subscription</p>
              </td>
              <td class="column-auto">
                Holds the subscription used to observe state emissions for cache
                synchronization.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>configKey</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Declares the configuration key used to locate behavior
                options.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Declares whether the behavior is treated as critical by the
                behavior system.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
                    >withStateCacheBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Exposes whether the behavior is treated as critical at
                runtime.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extensionCell</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendStateCacheFunction</p>
              </td>
              <td class="column-auto">
                Declares the feature cell extension function used to register
                cache APIs.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extensionFluent</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendWithStateCacheFluent</p>
              </td>
              <td class="column-auto">
                Declares the fluent extension function used to register cache
                configuration APIs.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Declares the stable behavior key assigned by the behavior
                system.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Holds the runtime behavior key provided by the behavior
                system.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/behavior-type"
                    >BehaviorType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Declares the behavior type assigned by the behavior system.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
                    >withStateCacheBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Exposes the behavior type for runtime identification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Declares whether configuration is required by the behavior
                system.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class withStateCacheBehaviorComponent {}
