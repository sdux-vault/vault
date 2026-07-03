import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-serialized-feature-cell-shape',
  standalone: true,
  template: `
    <div class="table-title">
      <a href="/docs/references/shapes/serialized-feature-cell-shape"
        >SerializedFeatureCellShape</a
      >
    </div>

    <table>
      <thead>
        <tr>
          <th class="column-275">Property</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            key: string
            <p>required</p>
          </td>
          <td>
            Unique identifier of the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            registered within the Vault runtime.
          </td>
        </tr>

        <tr>
          <td>
            behaviorsRegistered: boolean
            <p>required</p>
          </td>
          <td>
            Indicates whether pipeline behaviors have been successfully
            registered for the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </td>
        </tr>

        <tr>
          <td>
            controllersRegistered: boolean
            <p>required</p>
          </td>
          <td>
            Indicates whether pipeline controllers have been successfully
            registered for the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </td>
        </tr>

        <tr>
          <td>
            fluentApis: any | null
            <p>required</p>
          </td>
          <td>
            Serialized representation of fluent configuration APIs applied to
            the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            during initialization.
          </td>
        </tr>

        <tr>
          <td>
            behaviors: any[]
            <p>required</p>
          </td>
          <td>
            List of registered pipeline behaviors associated with the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </td>
        </tr>

        <tr>
          <td>
            controllers: any[]
            <p>required</p>
          </td>
          <td>
            List of registered pipeline controllers associated with the
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SerializedFeatureCellShapeComponent {}
