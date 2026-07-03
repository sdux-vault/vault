import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-encrypt-licensing-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Licensing and Encrypt Behaviors</div>

      <div class="section-body">
        <p>
          Encrypt behaviors are part of the
          <strong><sdux-vault-brand-name /></strong> offering and are designed
          for applications that require durable, production-grade protection of
          persisted state. To use encrypt behaviors, a valid
          <sdux-brand-name /> Vault license is required.
        </p>

        <p>
          This licensing boundary reflects the role encryption plays in the
          <sdux-brand-name /> ecosystem. Encrypt behaviors are not convenience
          utilities; they are security-critical infrastructure components
          responsible for protecting sensitive data at rest, enforcing correct
          cryptographic usage, and integrating safely with persistence and
          error-handling lifecycles.
        </p>

        <p>
          By placing encryption within the licensed Vault layer,
          <sdux-brand-name /> ensures that applications relying on encrypted
          persistence benefit from:
        </p>

        <ul>
          <li>Audited, production-hardened cryptographic behavior</li>
          <li>
            Strict lifecycle guarantees around persistence and rehydration
          </li>
          <li>
            Deterministic error handling that prevents corrupted or partial
            writes
          </li>
          <li>
            Long-term compatibility and upgrade stability for encrypted data
          </li>
          <li>
            Clear operational boundaries between core state management and
            security concerns
          </li>
        </ul>

        <p>
          Applications that do not require encrypted persistence continue to
          operate fully using the open
          <sdux-brand-name /> core. When encryption is needed—such as for
          credentials, tokens, regulated data, or user-sensitive information—the
          Vault license unlocks a robust, fully integrated encryption pipeline
          without compromising the simplicity or predictability of
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          state.
        </p>

        <p>
          This approach allows <sdux-brand-name /> to remain lightweight and
          accessible for everyday state management, while providing a clear
          upgrade path to enterprise-grade security features when application
          requirements demand them.
        </p>

        <a href="/sdux/vault">Learn how to license Vault</a>
      </div>
    </section>
  `,

  styleUrls: ['../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [BrandNameComponent, VaultBrandNameComponent]
})
export class VaultEncryptLicensingCommonComponent {}
