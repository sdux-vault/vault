import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-tab-sync-privacy-common',
  standalone: true,
  template: `
    <!-- Updated 2026-05-12 -->
    <section class="section">
      <div class="section-title">Privacy and Client-Side Storage</div>
      <div class="section-body">
        <p>
          The Tab Sync system uses two browser storage mechanisms for cross-tab
          coordination. Neither mechanism stores user data, application state,
          or personally identifiable information.
        </p>

        <h4>sessionStorage</h4>
        <p>
          A single session-scoped tab identifier is stored in
          <code>sessionStorage</code> under the key
          <code>sdux-vault:tab-id</code>. This value is a random UUID generated
          once per browser tab session. It is not transmitted to any server, is
          not linked to user identity, and is automatically cleared when the tab
          closes.
        </p>

        <h4>localStorage</h4>
        <p>
          The Tab Sync Controller maintains a tab registry in
          <code>localStorage</code> under keys prefixed with
          <code>sdux-vault:tab-registry:</code> followed by the feature cell
          key. Each registry entry contains a tab identifier and a heartbeat
          timestamp. The registry is used exclusively for deterministic peer
          detection — it does not store application state, user data, or
          snapshots.
        </p>

        <p>
          Registry entries are automatically pruned when they exceed the stale
          threshold, and each tab removes its own entry on
          <code>beforeunload</code> or <code>destroy</code>. In the event of a
          browser crash or force-quit, stale entries are cleaned up by the next
          tab that reads the registry.
        </p>

        <h4>Regulatory Considerations</h4>
        <p>
          Under the EU <strong>ePrivacy Directive</strong>, all client-side
          storage mechanisms — including <code>sessionStorage</code> and
          <code>localStorage</code> — are subject to consent requirements.
          However, storage that is <em>strictly necessary</em> for the service
          the user requested is exempt. A tab identifier and a peer-detection
          registry used exclusively for cross-tab synchronization fall squarely
          within that exemption and do not require a consent banner. The storage
          should still be disclosed in the application's privacy policy as a
          technical mechanism.
        </p>
        <p>
          Under the California <strong>CCPA/CPRA</strong>, a random UUID that is
          not linked to a user profile is generally not classified as personal
          information. Similarly, a registry of tab identifiers and timestamps
          contains no user-correlated data. Similar principles apply under
          Brazil's <strong>LGPD</strong> and Canada's <strong>PIPEDA</strong>:
          anonymous technical identifiers for application functionality are
          typically exempt from consent requirements but should be documented.
        </p>

        <h4>Guidance for Regulated Environments</h4>
        <p>
          Applications operating in regulated industries — finance, healthcare,
          or government — may have internal policies that require disclosure of
          all client-side storage. To support compliance audits:
        </p>
        <ul>
          <li>
            The storage key <code>sdux-vault:tab-id</code> is named to be
            self-describing and easily identifiable during audits.
          </li>
          <li>
            The storage key prefix
            <code>sdux-vault:tab-registry:</code> is named to be self-describing
            and easily identifiable during audits.
          </li>
          <li>
            The stored values are random UUIDs and numeric timestamps with no
            user correlation.
          </li>
          <li>
            The tab identifier is scoped to <code>sessionStorage</code> and does
            not persist beyond the browser tab session.
          </li>
          <li>
            The tab registry is scoped to <code>localStorage</code> and is
            automatically pruned. Entries do not persist beyond their stale
            threshold.
          </li>
        </ul>

        <div class="callout callout-warning">
          <strong>Legal Disclaimer</strong>
          <p>
            <strong>
              This documentation is provided for informational purposes only and
              does not constitute legal advice. It is the sole responsibility of
              each development team and their organization to consult qualified
              legal counsel regarding client-side storage disclosure
              obligations, regulatory compliance, and privacy requirements
              applicable to their jurisdiction and industry.
            </strong>
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: []
})
export class VaultTabSyncPrivacyCommonComponent {}
