import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-entity-access-behaviors-common',
  standalone: true,
  template: `
    <!-- Query Behavior -->

    <!-- Lookup Behavior -->

    @if (isLookup()) {
      <div class="table-title">
        <a href="/docs/pipeline/addons/entity-access/with-lookup-behavior"
          >Lookup Behavior</a
        >
      </div>

      <table>
        <thead>
          <tr>
            <th class="column-300">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p>
                <strong>
                  <a
                    href="/docs/pipeline/addons/entity-access/with-lookup-behavior"
                    >withLookupBehavior</a
                  >
                </strong>
              </p>

              <p>Layer: Post-Processing</p>
              <p>type: extension behavior</p>
            </td>

            <td>
              <p>
                Enables identifier-based entity lookup through the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                pipeline.
              </p>

              <p>
                When an entity is not present in finalized state, the lookup
                triggers pipeline resolution using the configured fetch
                strategy. Concurrent lookups for the same identifier are
                coordinated and resolved together when pipeline execution
                completes.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isQuery()) {
      <div class="table-title">
        <a href="/docs/pipeline/addons/entity-access/with-query-behavior"
          >Query Behavior</a
        >
      </div>

      <table>
        <thead>
          <tr>
            <th class="column-300">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p>
                <strong>
                  <a
                    href="/docs/pipeline/addons/entity-access/with-query-behavior"
                    >withQueryBehavior</a
                  >
                </strong>
              </p>

              <p>Layer: Extension</p>
              <p>type: extension behavior</p>
            </td>

            <td>
              <p>
                Enables identifier-based entity querying for entities already
                present in
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                state.
              </p>

              <p>
                The query cache is derived from finalized pipeline emissions and
                does not initiate resolution work. Queries resolve synchronously
                from locally indexed entities.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    <!-- State Cache Behavior -->

    @if (isCache()) {
      <div class="table-title">
        <a href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
          >State Cache Behavior</a
        >
      </div>

      <table>
        <thead>
          <tr>
            <th class="column-300">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <p>
                <strong>
                  <a
                    href="/docs/pipeline/addons/entity-access/with-state-cache-behavior"
                    >withStateCacheBehavior</a
                  >
                </strong>
              </p>

              <p>stage: Post-Cache</p>
              <p>type: extension behavior</p>
            </td>

            <td>
              <p>
                Enables TTL-based entity caching for a
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >. Cached entities are indexed by a configured identifier key
                and refreshed through controlled pipeline resolution.
              </p>

              <p>
                Cache misses and refresh operations trigger state merges using
                the configured fetch strategy. All cached values originate from
                finalized state emissions.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntityAccessBehaviorsCommonComponent {
  type = input<string>('all');

  isQuery = computed(() => {
    return this.type() === 'all' || this.type() === 'query';
  });

  isLookup = computed(() => {
    return this.type() === 'all' || this.type() === 'lookup';
  });

  isCache = computed(() => {
    return this.type() === 'all' || this.type() === 'cache';
  });
}
