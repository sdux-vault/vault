/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contexts/behavior-context">BehaviorContext</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-behavior-context',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>BehaviorContext</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the execution context supplied to behaviors during pipeline
        processing. This interface provides access to state snapshots, operation
        metadata, lifecycle signals, and configuration required for behavior
        execution.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/shared</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
                <strong>destroyed$?</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is destroyed. Behaviors may subscribe to this to perform cleanup
                work.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>featureCellKey</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">The feature cell key<br /><br /></td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>incoming?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/state-input-type"
                    >StateInputType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                The raw incoming payload submitted to the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                through replace or merge operations. This is the source input
                used by resolve and merge behaviors to compute next-state
                values.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>lastSnapshot</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/shapes/state-snapshot-shape"
                    >StateSnapshotShape</a
                  >
                </p>
              </td>
              <td class="column-auto">
                The last snapshow of the state<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>operation</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/operation-type"
                    >OperationType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Indicates whether the current pipeline action is a
                &quot;replace&quot; or &quot;merge&quot; operation. Merge
                behaviors rely on this to apply correct semantics.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>options</strong>

                <p class="type">type: unknown</p>
              </td>
              <td class="column-auto">
                Optional behavior-specific configuration supplied for the
                current operation.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>reset$?</strong>

                <p class="type">type: Observable</p>
              </td>
              <td class="column-auto">
                Emits when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is reset. Behaviors may use this to restore internal state or
                deferred work.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>resolveType?</strong>

                <p class="type">
                  type:
                  <a href="/docs/references/types/resolve-type">ResolveType</a>
                </p>
              </td>
              <td class="column-auto">
                Identifies the resolve mode for the current operation. This is
                set by resolve behaviors during the resolve stage.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state</strong>

                <p class="type">type: Readonly&gt;</p>
              </td>
              <td class="column-auto">
                Immutable snapshot of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state at the start of the operation. Used by merge, reducer,
                filter, and operator behaviors to read the current state without
                mutating it.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>state$</strong>

                <p class="type">type: Subject</p>
              </td>
              <td class="column-auto">
                Emits when the state of the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is updated.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>traceId</strong>

                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                The traceId for Devtools debugging and tracking Assigned by the
                orchestrator<br /><br />
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class BehaviorContextComponent {}
