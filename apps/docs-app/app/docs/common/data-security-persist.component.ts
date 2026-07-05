import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-data-security-persist-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title warning">Data Security</div>

      <div class="section-body">
        <p>
          Persist behaviors write
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          state into browser-accessible storage mechanisms such as
          <code>document.cookie</code>, <code>localStorage</code>, and
          <code>sessionStorage</code>. These storage mechanisms are designed for
          convenience and durability—not security—and their contents are
          inherently readable by the executing JavaScript context and, in some
          cases, by external tools or browser extensions.
        </p>

        <p>
          For this reason,
          <strong
            >persisted state should be treated as plaintext by default</strong
          >. Persist behaviors do not provide encryption, obfuscation, or access
          control on their own. Any sensitive, user-specific, or
          security-adjacent data written to persistence without encryption must
          be assumed readable at rest.
        </p>

        <p>
          To mitigate this risk, it is
          <strong>strongly recommended</strong> that applications enable
          <strong><sdux-brand-name /> encryption</strong> when using
          persistence. When encryption is configured, state is encrypted
          automatically during the pipeline's <em>Encryption stage</em> before
          reaching the Persist stage and is decrypted transparently during
          restoration. This ensures that persisted data remains protected
          without changing persist behavior semantics or application logic.
        </p>

        <p>As a rule of thumb:</p>
        <ul>
          <li>
            Use encryption for any persisted state containing user data,
            preferences, identifiers, or derived values.
          </li>
          <li>
            Avoid persisting secrets, credentials, or raw authentication
            material entirely.
          </li>
          <li>
            Prefer session-scoped persistence for short-lived or transitional
            data when possible.
          </li>
        </ul>

        <p>
          <sdux-brand-name /> treats encryption and persistence as distinct,
          composable concerns. This separation ensures that persistence remains
          predictable and fail-safe, while encryption provides the necessary
          security guarantees for data at rest. When in doubt, enable
          encryption—its cost is minimal compared to the risk of unintentionally
          exposing persisted state.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [BrandNameComponent]
})
export class VaultDataSecurityPersistCommonComponent {}
