/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior">withCoreFromObservableBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-core-from-observable-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a
          href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior"
          >withCoreFromObservableBehavior</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Extension behavior that enables FeatureCells to resolve state from
        observable sources.<br /><br />
        This behavior augments the
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> API
        with a fromObservable method that converts a single observable emission
        into a normalized state envelope and binds subscription lifetime to the
        cell lifecycle.<br /><br />
        This API exists as a migration bridge for observable-based workflows.
        Prefer using replaceState or mergeState to resolve observables directly
        within the pipeline.<br /><br />
      </div>
      <div class="class-meta">
        <span class="meta-badge meta-deprecated"> Deprecated </span>
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'core'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'core'" /></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">⚠️ Deprecated</div>
      <div class="section-body">
        This API exists as a migration bridge for observable-based workflows.
        Prefer using replaceState or mergeState to resolve observables directly
        within the pipeline.<br /><br />
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
                Creates a new observable extension behavior instance.<br /><br />
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
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Invoked when the behavior instance is destroyed.<br /><br />
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
                  returns:
                  <a
                    href="/docs/references/interfaces/from-observable-behavior-extension"
                    >FromObservableBehaviorExtension</a
                  >
                </p>
              </td>
              <td>
                Extends the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                API with observable-based resolution support.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>Resets the observable extension behavior.<br /><br /></td>
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
                    href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior"
                    >withCoreFromObservableBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates that this behavior is optional within the pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extension</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendFromObservable</p>
              </td>
              <td class="column-auto">
                Extension function used to attach observable APIs to the
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
                Static behavior key used for diagnostics and introspection.<br /><br />
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
                Static behavior type used for pipeline classification.<br /><br />
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
                    href="/docs/pipeline/behaviors/observable/with-core-from-observable-behavior"
                    >withCoreFromObservableBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level behavior type identifier.<br /><br />
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
export class withCoreFromObservableBehaviorComponent {}
