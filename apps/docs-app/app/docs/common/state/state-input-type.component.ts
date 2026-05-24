import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-state-input-type-common',
  standalone: true,
  template: `
    <!-- Updated 2026-02-19 -->
    <div class="table-title">
      <a href="/docs/references/types/state-input-type">StateInputType</a
      >&lt;T&gt;
    </div>
    <table>
      <thead>
        <tr class="column-250">
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong
              ><a href="/docs/references/shapes/state-input-shape"
                >StateInputShape</a
              >&lt;T&gt;</strong
            >
          </td>
          <td>
            Structured state packet containing optional <code>loading</code>,
            <code>value</code>, and <code>error</code> fields.
          </td>
        </tr>

        <tr>
          <td><strong>T (raw value)</strong></td>
          <td>
            A direct value of type <code>T</code>. Internally normalized into a
            <code>StateInputShape</code> with the <code>value</code> field
            populated.
          </td>
        </tr>

        <tr>
          <td>
            <strong
              ><a href="/docs/references/types/deferred-type">DeferredType</a
              >&lt;T&gt;</strong
            >
          </td>
          <td>
            A function that returns a value or a Promise. Evaluated during the
            Resolve stage.
          </td>
        </tr>

        <tr>
          <td>
            <strong
              ><a href="/docs/references/types/deferred-factory"
                >DeferredFactory</a
              >&lt;T&gt;</strong
            >
          </td>
          <td>
            Partial structured input whose <code>value</code> field is a
            <code>DeferredType</code>.
          </td>
        </tr>

        <tr>
          <td><strong>Observable&lt;T&gt;</strong></td>
          <td>
            RxJS Observable source. Resolved according to the configured Resolve
            behavior.
          </td>
        </tr>

        <tr>
          <td>
            <strong
              ><a href="/docs/references/shapes/http-resource-ref-shape"
                >HttpResourceRefShape</a
              >&lt;T&gt;</strong
            >
          </td>
          <td>
            HTTP resource reference type handled by the HttpResource resolve
            behavior.
          </td>
        </tr>

        <tr>
          <td><strong>undefined</strong></td>
          <td>
            Treated as a concrete replacement payload. The committed state will
            become
            <code>undefined</code> unless suppressed by downstream pipeline
            stages.
          </td>
        </tr>

        <tr>
          <td><strong>null</strong></td>
          <td>
            Explicit <code>null</code> payload. Replaces the current committed
            state with <code>null</code>.
          </td>
        </tr>

        <tr>
          <td>
            <strong>Promise&lt;T&gt;</strong><br />
            <p class="not-supported">
              <em>Not Supported</em>
            </p>
            <p>Throws Error</p>
          </td>
          <td>
            Direct <code>Promise</code> values are not allowed as state inputs.
            Promises are eager and may resolve or reject outside the pipeline
            lifecycle, which prevents deterministic state reporting and proper
            Vault error handling. Supplying a raw <code>Promise</code> results
            in a usage error. <br /><br />
            Use a <code>DeferredType</code> to ensure asynchronous resolution
            occurs within the Resolve stage.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateInputTypeCommonComponent {}
