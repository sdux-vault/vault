import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-tab-sync-licensing-common',
  standalone: true,
  template: `
    <!-- Updated 2026-05-08 -->
    <section class="section" id="licensing-and-tab-sync">
      <div class="section-title">Licensing and Tab Sync</div>

      <div class="section-body">
        <p>
          Tab Sync is part of the
          <strong><sdux-vault-brand-name /></strong> offering and is designed
          for applications that require real-time, cross-tab state
          synchronization. To use the Tab Sync behavior, a valid
          <sdux-vault-brand-name /> license is required.
        </p>

        <p>
          This licensing boundary reflects the role cross-tab synchronization
          plays in the <sdux-brand-name /> ecosystem. Tab Sync is not a
          convenience utility; it is a coordination infrastructure component
          responsible for broadcasting finalized state across browser tabs,
          enforcing message integrity, and integrating safely with the pipeline
          lifecycle.
        </p>

        <p>
          By placing Tab Sync within the licensed Vault layer,
          <sdux-brand-name /> ensures that applications relying on cross-tab
          state coordination benefit from:
        </p>

        <ul>
          <li>Deterministic broadcast and receive semantics</li>
          <li>
            Strict lifecycle guarantees around channel management and teardown
          </li>
          <li>Safe handling of tab-local events that must not propagate</li>
          <li>
            Long-term compatibility and upgrade stability for multi-tab
            architectures
          </li>
          <li>
            Clear operational boundaries between core state management and
            cross-tab coordination
          </li>
        </ul>

        <p>
          Applications that do not require cross-tab synchronization continue to
          operate fully using the open
          <sdux-brand-name /> core. When real-time state coordination across
          tabs is needed—such as for session state, shared preferences, or
          collaborative workflows—the Vault license unlocks a robust, fully
          integrated synchronization pipeline without compromising the
          simplicity or predictability of
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          state.
        </p>

        <p>
          This approach allows <sdux-brand-name /> to remain lightweight and
          accessible for everyday state management, while providing a clear
          upgrade path to enterprise-grade multi-tab features when application
          requirements demand them.
        </p>

        <p>
          <a routerLink="/dashboard" class="sdux-button cta-button"
            >Purchase Pro License</a
          >
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [BrandNameComponent, VaultBrandNameComponent]
})
export class VaultTabSyncLicensingCommonComponent {}
