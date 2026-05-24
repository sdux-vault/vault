import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-persist-licensing-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Persistence, Encryption, and Licensing</div>

      <div class="section-body">
        <p>
          Persist behaviors are part of the
          <strong><sdux-vault-brand-name /></strong> offering and are not
          available in the open <sdux-brand-name /> core. Persistence is a
          durability concern that directly affects data integrity, application
          correctness, and user trust, and therefore requires the same
          operational guarantees as encryption.
        </p>

        <p>
          The Persist stage is responsible for writing finalized
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          state into browser storage mechanisms such as cookies,
          <code>localStorage</code>, or <code>sessionStorage</code>. Incorrect
          persistence behavior can result in data loss, corrupted restores,
          inconsistent hydration, or silent failures across application
          lifecycles.
        </p>

        <p>
          For this reason, persistence is a licensed capability provided by
          <strong><sdux-vault-brand-name /></strong>. Using persist behaviors
          requires a valid <sdux-brand-name /> Vault license.
        </p>

        <p>
          This licensing boundary reflects the role persistence plays in the
          SDuX pipeline. Persist behaviors are not convenience utilities; they
          are infrastructure components responsible for:
        </p>

        <ul>
          <li>Durable and deterministic state storage</li>
          <li>Safe, fail-tolerant read and write semantics</li>
          <li>Correct interaction with encryption and reset lifecycles</li>
          <li>Predictable restoration of state during application startup</li>
          <li>Clear guarantees around clearing, resetting, and rehydration</li>
        </ul>

        <p>
          Encryption and persistence are designed to work together as part of
          the Vault pipeline. When encryption is configured, state is encrypted
          before persistence and decrypted on restore. Both stages operate under
          the same Vault lifecycle guarantees and error-handling model.
        </p>

        <p>
          By placing persistence within the Vault layer, SDuX ensures that
          applications relying on persisted state do so safely, intentionally,
          and with clear operational boundaries. Applications that do not
          require persistence continue to operate fully using in-memory
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          state without any storage side effects.
        </p>
        <a href="/sdux-vault">Learn how to license Vault</a>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [BrandNameComponent, VaultBrandNameComponent]
})
export class VaultPersistLicensingCommonComponent {}
