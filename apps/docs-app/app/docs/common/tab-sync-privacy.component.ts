import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-tab-sync-privacy-common',
  standalone: true,
  template: `
    <!-- Updated 2026-06-27 -->
    <section class="section">
      <div class="section-title">Privacy and Client-Side Storage</div>
      <div class="section-body">
        <p>
          The Tab Sync system uses one browser storage mechanism for cross-tab
          coordination. It does not store user data, application state, or
          personally identifiable information.
        </p>

        <h4>Tab Identifier (In-Memory)</h4>
        <p>
          Each
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          instance generates a unique tab identifier via
          <code>crypto.randomUUID()</code> at construction time. This value
          exists only in memory for the lifetime of the page — it is never
          written to any browser storage API or persistent mechanism. It is not
          transmitted to any server and is not linked to user identity. When the
          tab is closed, reloaded, or duplicated, a new identifier is generated
          automatically.
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
          Under the EU <strong>ePrivacy Directive</strong>,
          <code>localStorage</code> is subject to consent requirements. However,
          storage that is <em>strictly necessary</em> for the service the user
          requested is exempt. A peer-detection registry used exclusively for
          cross-tab synchronization falls squarely within that exemption and
          does not require a consent banner. The storage should still be
          disclosed in the application's privacy policy as a technical
          mechanism. The in-memory tab identifier is not subject to storage
          consent requirements because it is never persisted.
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
            The storage key prefix
            <code>sdux-vault:tab-registry:</code> is named to be self-describing
            and easily identifiable during audits.
          </li>
          <li>
            The stored values are random UUIDs and numeric timestamps with no
            user correlation.
          </li>
          <li>
            The tab identifier exists only in memory and is never persisted to
            any storage mechanism.
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
