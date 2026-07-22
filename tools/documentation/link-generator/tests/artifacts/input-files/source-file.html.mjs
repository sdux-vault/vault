export const SOURCE_HTML = `<div>
  <p>
    FeatureCells are registered using provideFeatureCell.
  </p>

  <div class="table-title"><a href="/docs/references/interfaces/feature-cell-config">FeatureCellConfig</a></div>

  <pre>
    provideFeatureCell({ key: 'test' })
  </pre>

  <code>
    FeatureCellConfig
  </code>

  <h4>
    withDebounce 
  </h4>

  <td><a href="/docs/pipeline/interceptors/with-debounce">withDebounce</a></td>

  <strong>withDebounce</strong>

  Vault

  vault

  <h3>
    withReplayGlobalErrorController
  </h3>

  <em>withReplayGlobalErrorController</em>

  <a href="/docs/references/functions/provide-feature-cell">
    provideFeatureCell
  </a>

  <section class="diagram-section">
    <div class="section-body">
      <sdux-diagram
        image="diagrams/1.0/1.1-featurecell-lifecycle.svg"
        [tooltip]="'FeatureCell Lifecycle'"></sdux-diagram>
    </div>
  </section>

  <table aria-label="FeatureCellConfig">
    <thead><tr><th>Column</th></tr></thead>
  </table>

  <div aria-describedby="FeatureCellConfig">described</div>

  <img title="provideFeatureCell" />

  <img alt="withDebounce icon" />

  <sdux-multi-framework-example description="Creating a FeatureCell">
    <ng-template #angular>
      <pre class="code-inline"><code class="language-ts">provideFeatureCell({ key: 'test' })</code></pre>
    </ng-template>
    <ng-template #core>
      <pre class="code-inline"><code class="language-ts">FeatureCellConfig</code></pre>
    </ng-template>
  </sdux-multi-framework-example>

  <sdux-example-viewer-source
    [displayTabs]="false"
    [displayCopyPaste]="false">
    <sdux-example-viewer-tab
      [label]="'Reading committed snapshots off provideFeatureCell'">
      <pre class="code-inline"><code class="language-ts">provideFeatureCell({ key: 'safe-label' })</code></pre>
    </sdux-example-viewer-tab>
  </sdux-example-viewer-source>
</div>
`;
