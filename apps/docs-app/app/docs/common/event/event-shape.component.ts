import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-event-shape-common',
  standalone: true,
  template: `
    <div class="table-title">
      <a href="/docs/references/shapes/event-shape">EventShape</a>
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
            id: string
            <p>required</p>
          </td>
          <td>Unique identifier for the emitted pipeline event.</td>
        </tr>

        <tr>
          <td>
            behaviorKey: string
            <p>required</p>
          </td>
          <td>The behavior key responsible for producing the event.</td>
        </tr>

        <tr>
          <td>
            cell: string
            <p>required</p>
          </td>
          <td>
            The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            key associated with the emitted event.
          </td>
        </tr>

        <tr>
          <td>
            name: string
            <p>required</p>
          </td>
          <td>
            The lifecycle or execution event name describing the pipeline
            transition that occurred.
          </td>
        </tr>

        <tr>
          <td>
            timestamp: number
            <p>required</p>
          </td>
          <td>Wall-clock timestamp indicating when the event occurred.</td>
        </tr>

        <tr>
          <td>
            payload?: unknown
            <p>optional</p>
          </td>
          <td>Optional payload associated with the event emission.</td>
        </tr>

        <tr>
          <td>
            state?: Partial&lt;<a
              href="/docs/references/shapes/state-snapshot-shape"
              >StateSnapshotShape</a
            >&gt;
            <p>optional</p>
          </td>
          <td>
            Optional partial snapshot of
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            state captured at the time of event emission.
          </td>
        </tr>

        <tr>
          <td>
            source?: string
            <p>optional</p>
          </td>
          <td>
            Identifier describing the origin of the event, such as UI
            interaction, timers, or internal pipeline activity.
          </td>
        </tr>

        <tr>
          <td>
            error?: unknown
            <p>optional</p>
          </td>
          <td>
            Optional error information associated with a pipeline failure or
            exception event.
          </td>
        </tr>

        <tr>
          <td>
            traceId?: string
            <p>optional</p>
          </td>
          <td>
            Trace identifier used to correlate related pipeline events within
            the same execution trace.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXEventShapeCommonComponent {}
