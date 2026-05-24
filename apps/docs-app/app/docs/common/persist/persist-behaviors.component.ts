import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-persist-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isCookie()) {
      <div class="table-title">Cookie Storage</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <strong
                  ><a
                    href="/docs/pipeline/addons/with-cookie-storage-persist-behavior"
                    >withCookieStoragePersistBehavior</a
                  ></strong
                >
              </p>
              <p>input: current</p>
              <p>type: document.cookie</p>
            </td>
            <td>
              <p>
                Persists state into <code>document.cookie</code> using a
                feature-scoped, namespaced key. A strict
                <strong>4000-byte</strong> payload limit is enforced to remain
                safely below browser cookie limits (~4096 bytes). Oversized
                payloads are rejected without writing.
              </p>

              <p>
                When the state value is <em>undefined</em>, the cookie is
                removed. Persisted values are serialized with
                <code>JSON.stringify</code>, URL-encoded via
                <code>encodeURIComponent</code>, and decoded and parsed on load.
              </p>

              <p>
                All serialization, write, and read errors are caught and
                swallowed to preserve fail-safe pipeline execution.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isLocal()) {
      <div class="table-title">Local Storage</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <strong
                  ><a
                    href="/docs/pipeline/addons/with-local-storage-persist-behavior"
                    >withLocalStoragePersistBehavior</a
                  ></strong
                >
              </p>
              <p>input: current</p>
              <p>type: localStorage (persistent browser storage)</p>
            </td>
            <td>
              <p>
                Persists state into <code>localStorage</code> using a
                feature-scoped, namespaced key. This mechanism offers
                significantly more capacity than cookies (typically
                <strong>5–10&nbsp;MB</strong> per origin) and is the preferred
                persistence strategy for most applications.
              </p>

              <p>
                When the state value is <em>undefined</em>, the stored entry is
                removed. Otherwise, the value is serialized using
                <code>JSON.stringify</code> and written directly to storage.
              </p>

              <p>
                All serialization, read, and write errors are caught and
                swallowed to preserve fail-safe pipeline execution. Failed reads
                return <em>undefined</em> without interrupting pipeline flow.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }

    @if (isSession()) {
      <div class="table-title">Session Storage</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>
                <strong
                  ><a
                    href="/docs/pipeline/addons/with-session-storage-persist-behavior"
                    >withSessionStoragePersistBehavior</a
                  ></strong
                >
              </p>
              <p>input: current</p>
              <p>type: sessionStorage (tab-scoped browser storage)</p>
            </td>
            <td>
              <p>
                Persists state into <code>sessionStorage</code> using a
                feature-scoped, namespaced key. Stored data is scoped to the
                lifetime of a single browser tab and is cleared automatically
                when the tab is closed.
              </p>

              <p>
                This behavior is ideal for transient UI flows such as wizards,
                progress tracking, or ephemeral state that must not survive a
                full browser restart.
              </p>

              <p>
                When the state value is <em>undefined</em>, the stored entry is
                removed. Otherwise, the value is serialized using
                <code>JSON.stringify</code> and written directly. All
                serialization, read, and write errors are caught and swallowed
                to preserve fail-safe pipeline execution. Failed reads return
                <em>undefined</em>.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultPersistBehaviorsCommonComponent {
  type = input<string>('all');

  isCookie = computed(() => {
    return this.type() === 'all' || this.type() === 'cookie';
  });

  isLocal = computed(() => {
    return this.type() === 'all' || this.type() === 'local';
  });

  isSession = computed(() => {
    return this.type() === 'all' || this.type() === 'session';
  });
}
