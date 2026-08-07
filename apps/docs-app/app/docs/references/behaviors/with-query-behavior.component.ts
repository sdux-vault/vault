/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/entity-access/with-query-behavior">withQueryBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-query-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/addons/entity-access/with-query-behavior"
          >withQueryBehavior</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        extension behavior that provides entity query capabilities.<br /><br />
        This behavior maintains a local cache of entities observed through state
        emissions and exposes query APIs for resolving entities by
        identifier.<br /><br />
        Unlike lookup behavior, query behavior never triggers fetches or submits
        pipeline work. It only reflects entities that have already entered
        state.<br /><br />
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
              <td>Creates a new query behavior instance.<br /><br /></td>
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
                <strong>#normalizeEntities</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>value: TState</li>
                </ul>
                <p>returns: TEntity[]</p>
              </td>
              <td>
                Normalizes a state value into an array of entities for cache
                indexing.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Clears the query cache and unsubscribes from state emissions.<br /><br />
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
                <p>returns: &#123; query: (id: string) =&gt; TEntity; &#125;</p>
              </td>
              <td>
                Extends the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                with the query subscription and lookup API.<br /><br />
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
                Registers the fluent withQuery configuration method on the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the query cache to its initial empty state.<br /><br />
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
                <p class="default">default: new Map()</p>
              </td>
              <td class="column-auto">
                Cache of resolved entities indexed by identifier.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#options</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/options/query-behavior-options"
                    >QueryBehaviorOptions</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Resolved query configuration options for this behavior
                instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#stateSubcribe?</strong>

                <p class="type">type: Subscription</p>
              </td>
              <td class="column-auto">
                Subscription tracking state emission observation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>configKey</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Configuration key used to locate query options in the config
                registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior is required by the pipeline.<br /><br />
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
                    href="/docs/pipeline/addons/entity-access/with-query-behavior"
                    >withQueryBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Whether this behavior is critical to pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extension</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendQueryFunction</p>
              </td>
              <td class="column-auto">
                Extension function that registers the query API on the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique behavior key used for diagnostics and devtools.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this behavior instance.<br /><br />
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
                Static behavior type used for orchestrator classification.<br /><br />
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
                    href="/docs/pipeline/addons/entity-access/with-query-behavior"
                    >withQueryBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                The behavior type identifier for this instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this behavior requires consumer-supplied
                configuration.<br /><br />
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
export class withQueryBehaviorComponent {}
