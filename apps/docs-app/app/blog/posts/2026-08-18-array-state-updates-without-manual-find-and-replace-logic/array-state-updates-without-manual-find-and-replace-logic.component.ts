import { Component, ViewEncapsulation } from '@angular/core';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';
import { StackBlitzTryItLiveComponent } from 'apps/docs-app/app/docs/stack-blitz/try-it-live/stack-blitz-try-it-live.component';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-array-state-updates-without-manual-find-and-replace-logic',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    PackageNameComponent,
    StackBlitzTryItLiveComponent
  ],
  template: `
    <sdux-blog-layout
      id="array-state-updates-without-manual-find-and-replace-logic">
      <header class="docs-header">
        <p class="lead">
          Updating collection state should not mean rebuilding the same
          find-and-replace code in every feature.
          <strong
            ><a
              href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
              >withArrayByIdMergeBehavior</a
            ></strong
          >, included in the
          <span class="code"><sdux-package-name [package]="'addons'" /></span>
          (version 1.1.0 or later) package, gives an
          <sdux-feature-cell [tm]="true" /> one explicit rule for replacing,
          appending, and deleting entities by identifier during the Merge Stage.
        </p>
        <p>
          The result is not a new abstraction around your array. Your state
          stays an array, and your update names the entity value that should be
          merged. Configure the identifier once, then let the active Merge
          Behavior evaluate each merge-style update consistently.
        </p>
        <div class="callout callout-info">
          <strong>Key takeaway:</strong>
          <a href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
            >withArrayByIdMergeBehavior</a
          >
          <ul>
            <li>replaces matching entities</li>
            <li>appends entities with new identifiers</li>
            <li>
              removes matching entities when an update enables
              <span class="code">isDelete</span>
            </li>
          </ul>
        </div>
      </header>

      <section class="section">
        <div class="section-title">The Problem With Manual Array Updates</div>
        <div class="section-body">
          <p>
            Entity arrays have a familiar set of rules: replace an employee if
            the identifier already exists, append one if it does not, and remove
            one when a delete arrives. Repeating those rules at each update
            point makes collection semantics easy to drift. One feature can
            accidentally append a duplicate while another forgets to handle
            deletion.
          </p>
          <p>
            <a
              href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
              >withArrayByIdMergeBehavior</a
            >
            moves that policy into the Merge Stage. The stage receives the
            current committed state and the resolved incoming value, then
            returns a merged state value for the remaining pipeline stages. It
            does not commit or expose state itself.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Configuration requirement:</strong> a
              <span class="code">idKey</span> is required before the
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              is initialized. Exactly one Merge Behavior is active for a
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              at a time.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Configure withArrayByIdMergeBehavior Once
        </div>
        <div class="section-body">
          <p>
            Register
            <span class="code"
              ><a
                href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
                >withArrayByIdMergeBehavior</a
              ></span
            >
            with the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>,
            then configure the property that identifies each entity. The
            FluentApi call happens before initialization, so every later
            merge-style update uses the same identifier rule.
          </p>
          <sdux-multi-framework-example
            description="Configure withArrayByIdMergeBehavior in a FeatureCell">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">// app.config.ts
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
        // Explicitly attach the Array By ID merge behavior
        withArrayByIdMergeBehavior
      ]
    )
  ]
&#125;;

&#64;FeatureCell&lt;Employee[]&gt;('employees')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class EmployeeService &#123;
  readonly vault = injectVault&lt;Employee[]&gt;(EmployeeService);

  constructor() &#123;
    this.vault
      .withArrayMergeId(&#123; idKey: 'id' &#125;)
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">export const employeeCell = FeatureCell&lt;Employee[]&gt;(
  &#123;
    key: 'employees',
    initialState: []
  &#125;,
  [withArrayByIdMergeBehavior]
);

employeeCell
  .withArrayMergeId(&#123; idKey: 'id' &#125;)
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            Here, <span class="code">id</span> is the entity identifier. A
            different property name is valid when it is the stable identifier
            for the state your feature owns.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Update, Append, or Delete by Identifier</div>
        <div class="section-body">
          <p>
            A merge-style update with an existing identifier updates that
            entity. A new identifier appends an entity to the array. Supplying
            <span class="code">isDelete: true</span> changes the update into a
            request to remove matching identifiers from the current array.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Example: Update and Delete Entities by Identifier'">
              <pre
                class="code-inline"><code class="language-ts">employeeCell.mergeState(&#123;
  value: &#123; id: 1, name: 'Grace Hopper' &#125;
&#125;);

employeeCell.mergeState(
  &#123; value: &#123; id: 2 &#125; &#125;,
  &#123; isDelete: true &#125;
);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The first update replaces the entity whose
            <span class="code">id</span> is <span class="code">1</span>. The
            second identifies the entity to remove; it does not require the full
            entity value.
          </p>
          <div class="table-title">Identifier-Based Results</div>
          <table aria-label="withArrayByIdMergeBehavior outcomes">
            <thead>
              <tr>
                <th class="column-250" scope="col">Incoming value</th>
                <th class="column-auto" scope="col">Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>An entity with a matching identifier</td>
                <td>The matching entity is updated in the current array.</td>
              </tr>
              <tr>
                <td>An entity with a new identifier</td>
                <td>The incoming entity is appended to the current array.</td>
              </tr>
              <tr>
                <td>
                  An entity with <span class="code">isDelete</span> enabled
                </td>
                <td>The matching entity is removed from the current array.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Keep Undefined Updates Explicit</div>
        <div class="section-body">
          <p>
            An incoming <span class="code">undefined</span> value has its own
            merge configuration. By default, the current state is preserved. Set
            <span class="code">clearUndefined</span> on the merge-style update
            when the incoming undefined value should clear the current state
            instead. That choice belongs to the individual update, not to the
            identifier configuration.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the
            <a
              href="/docs/pipeline/addons/merge/with-array-by-id-merge-behavior"
              >withArrayByIdMergeBehavior documentation</a
            >
            for configuration details and examples, then use the
            <a href="/docs/references/options/array-by-id-merge-options"
              >ArrayByIdMergeOptions reference</a
            >
            to verify the available identifier option.
          </p>
        </div>
      </section>
      <sdux-stack-blitz-try-it-live [id]="'array-by-id-merge'">
      </sdux-stack-blitz-try-it-live>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogArrayStateUpdatesWithoutManualFindAndReplaceLogicComponent {}
