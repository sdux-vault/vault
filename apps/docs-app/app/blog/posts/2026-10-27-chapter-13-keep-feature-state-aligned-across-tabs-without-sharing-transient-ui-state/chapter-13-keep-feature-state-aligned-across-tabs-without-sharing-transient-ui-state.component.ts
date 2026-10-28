import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-13-keep-feature-state-aligned-across-tabs-without-sharing-transient-ui-state',
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
      id="chapter-13-keep-feature-state-aligned-across-tabs-without-sharing-transient-ui-state"
      title="Chapter 13 — Keep Feature State Aligned Across Tabs Without Sharing Transient UI State"
      date="2026-10-27"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          Opening the same application in multiple tabs should not require every
          form, loading flag, or selection to become shared state. Chapter 13
          shows how Tab Sync keeps finalized
          <sdux-feature-cell [tm]="true" />
          State aligned across same-origin tabs while transient presentation
          state remains local.
        </p>
        <p>
          You will configure the Tab Sync behavior and controller once, open a
          second browser tab, and observe committed character State move between
          tabs. The boundary is deliberate: this is browser coordination, not
          server-authoritative collaboration, cross-device synchronization, or
          conflict-resolution infrastructure.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Begin with the completed
            Chapter 7 project. Chapter 13 changes configuration, presentation,
            and tests; the existing service and component do not add their own
            cross-tab messaging code.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Shared Feature State Should Not Mean Shared Forms
        </div>
        <div class="section-body">
          <p>
            People often open the same application twice: a preference changes
            in one tab, a draft remains open in another, or an administrative
            view needs the latest committed record. The useful question is not
            whether every piece of UI should be synchronized. It is which values
            belong to the feature boundary and which values belong only to the
            page that is currently presenting it.
          </p>
          <p>
            Tab Sync shares finalized Feature State while each tab retains its
            own selection, form, loading, and error experience. That lets a
            second tab see a committed character collection without inheriting
            an unfinished edit from the first tab.
          </p>
          <table aria-label="Shared and local Tab Sync state">
            <thead>
              <tr>
                <th scope="col" class="column-300">State surface</th>
                <th scope="col" class="column-auto">Tab Sync decision</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Finalized
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                  value
                </td>
                <td>Shared with matching same-origin tabs.</td>
              </tr>
              <tr>
                <td>Selection and unsaved form values</td>
                <td>Remain local to the tab where they are being edited.</td>
              </tr>
              <tr>
                <td>Loading and error presentation</td>
                <td>Remain local transient UI state.</td>
              </tr>
              <tr>
                <td>Server authority and cross-device recovery</td>
                <td>Not provided by browser Tab Sync.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Configure Tab Sync at the FeatureCell Boundary
        </div>
        <div class="section-body">
          <p>
            Tab Sync is a pair: the behavior broadcasts finalized snapshots to
            other browser tabs, and the controller coordinates initial snapshot
            negotiation when a new tab opens. Register both on the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            key. The behavior belongs in the behaviors array, while the
            controller belongs in the controllers array.
          </p>
          <p>
            The service and component keep their original responsibilities. The
            configuration owns cross-tab coordination, so the feature does not
            need a second messaging service or a collection of tab-specific
            event handlers.
          </p>
          <sdux-multi-framework-example
            description="Synchronize FeatureCell State Across Tabs">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts

import &#123; ApplicationConfig &#125; from '&#64;angular/core';
import &#123; provideVault, provideFeatureCell &#125; from '&#64;sdux-vault/angular';
import &#123; withTabSyncStateBehavior, withTabSyncController &#125; from '&#64;sdux-vault/core';
import &#123; EmployeeService &#125; from './employee.service';

export const appConfig: ApplicationConfig = &#123;
  providers: [
    provideVault(&#123; logLevel: 'off' &#125;),

    provideFeatureCell(
      EmployeeService,
      &#123;
        key: 'employees',
        initialState: []
      &#125;,
      [
        // Enable cross-tab state synchronization
        withTabSyncStateBehavior
      ],
      [
        // Tab Sync Controller handles initial negotiation
        withTabSyncController
      ]
    )
  ]
&#125;;

// employee.service.ts

import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';
import &#123; Employee &#125; from './employee.shape';

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault.initialize();
  &#125;

  addEmployee(): void &#123;
    // State is committed locally and broadcast to other tabs
    this.vault.mergeState(&#123;
      value: [&#123; id: 1, name: 'Jane Doe' &#125;]
    &#125;);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';
import &#123; withTabSyncStateBehavior, withTabSyncController &#125; from '&#64;sdux-vault/core';
import &#123; Employee &#125; from './employee.shape';

export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    initialState: [],
  &#125;,
  [
    // Enable cross-tab state synchronization
    withTabSyncStateBehavior
  ],
  [
    // Tab Sync Controller handles initial negotiation
    withTabSyncController
  ]
);

// Initialize the FeatureCell
employeeCell.initialize();

// State is committed locally and broadcast to other tabs
employeeCell.mergeState(&#123;
  value: [&#123; id: 1, name: 'Jane Doe' &#125;]
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-warning">
            <p>
              <strong>Pro capability:</strong> Tab Sync requires a valid Pro
              license for production use. The tutorial's development
              configuration is an evaluation convenience, not a production
              licensing model.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Verify Finalized State Across Same-Origin Tabs
        </div>
        <div class="section-body">
          <p>
            A same-origin tab is one using the same scheme, host, and port. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            key also has to match. Once those boundaries line up, one tab can
            commit a character update and the other tabs can observe the
            resulting State without any component-to-component messaging.
          </p>
          <p>
            The new tab also performs initial snapshot negotiation. If a peer
            has a committed snapshot, the new tab can adopt it rather than
            presenting only its bootstrap value. That negotiation is separate
            from the ongoing propagation of later finalized State changes.
          </p>
          <sdux-multi-framework-example description="Receive Cross-Tab State">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// Tab A commits state
this.vault.mergeState(&#123;
  value: [&#123; id: 1, name: 'Jane Doe' &#125;]
&#125;);

// Tab B automatically receives the updated snapshot
this.vault.state$.subscribe(snapshot =&gt; &#123;
  console.info(snapshot.value);
  // → [&#123; id: 1, name: 'Jane Doe' &#125;]
&#125;);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">// Tab A commits state
employeeCell.mergeState(&#123;
  value: [&#123; id: 1, name: 'Jane Doe' &#125;]
&#125;);

// Tab B automatically receives the updated snapshot
employeeCell.state$.subscribe(snapshot =&gt; &#123;
  console.info(snapshot.value);
  // → [&#123; id: 1, name: 'Jane Doe' &#125;]
&#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <div class="callout callout-info">
            <p>
              <strong>What to look for:</strong> committed
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              State values are preserved and updated between tabs, including
              shared resets. Forms, selection, loading, errors, and other page
              interactions remain local to the tab where they occur. A failed
              pipeline attempt does not update a peer tab.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Keep Selection and Unsaved Forms Local</div>
        <div class="section-body">
          <p>
            The most useful Tab Sync test is a stale-form exercise. Leave an
            unsaved edit open in Tab B, commit a change in Tab A, and return to
            Tab B. The committed collection should update, but Tab B's transient
            form should remain under Tab B's control.
          </p>
          <p>
            This separation keeps a peer's committed data fresh without
            pretending that the peer intended to submit your local edit. Cancel
            the stale form before continuing, then repeat the exercise with a
            deliberate save so the application can demonstrate its normal
            record-level update rules.
          </p>
          <table aria-label="Tab Sync verification steps">
            <thead>
              <tr>
                <th scope="col" class="column-125">Step</th>
                <th scope="col" class="column-auto">Observation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tab A</td>
                <td>Commit an add, edit, delete, or reset.</td>
              </tr>
              <tr>
                <td>Tab B</td>
                <td>Observe the committed collection update.</td>
              </tr>
              <tr>
                <td>Tab B form</td>
                <td>
                  Confirm an unsaved edit remains local and is not overwritten.
                </td>
              </tr>
              <tr>
                <td>Failed attempt</td>
                <td>Confirm a peer tab remains unchanged.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Tab Sync Does Not Provide</div>
        <div class="section-body">
          <p>
            Tab Sync is same-origin browser coordination. It is useful when
            several open tabs need the same committed feature value, but it does
            not turn browser tabs into a transactional collaboration system.
          </p>
          <ul>
            <li>It does not provide server authority or authorization.</li>
            <li>It does not synchronize State across devices.</li>
            <li>
              It does not provide offline reconciliation or audit history.
            </li>
            <li>It does not resolve every collaborative editing conflict.</li>
            <li>It does not make transient form state globally shared.</li>
          </ul>
          <p>
            Environment support also matters. If the browser does not provide
            the required storage or messaging mechanism, Tab Sync degrades to
            ordinary single-tab Core State. The same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            configuration can therefore run in SSR, Node.js, Deno, or web
            workers without application code adding conditional feature
            detection.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Scope boundary:</strong> use Tab Sync for same-origin
              coordination. Choose a server-authoritative design when the
              application needs identity, authorization, cross-device recovery,
              audit history, or durable conflict resolution.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Chapter 13 Round-up</div>
        <div class="section-body">
          <p>
            Your Tab Sync example is complete when the behavior and controller
            are registered together in <span class="code">app.config.ts</span>
            and the View Tab Sync action lets you observe committed character
            State moving between tabs. The existing service and component
            continue to own their original responsibilities.
          </p>
          <ul>
            <li>
              Cross-tab coordination is structural configuration, not component
              or service logic.
            </li>
            <li>
              Each tab keeps its local form and presentation State while sharing
              the finalized
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              value.
            </li>
            <li>
              The same
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              key identifies the State that participates in synchronization.
            </li>
          </ul>
          <p>
            Read the
            <a href="/docs/pipeline/controllers/components/tab-sync"
              >Tab Sync Controller documentation</a
            >, the
            <a href="/docs/pipeline/behaviors/components/tab-sync"
              >Tab Sync Behavior documentation</a
            >, and the
            <a href="/docs/pipeline/controllers/with-tab-sync-controller"
              >withTabSyncController reference</a
            >
            for the complete configuration and environment notes.
          </p>
          <!-- StackBlitz: chapter-13-tab-sync -->
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter13KeepFeatureStateAlignedAcrossTabsWithoutSharingTransientUiStateComponent {}
