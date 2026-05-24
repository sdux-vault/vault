import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  WritableSignal
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { VAULT_LICENSE_ID } from '@sdux-vault/engine';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { ContactService } from '../service/contact.service';
import { ContactShape } from '../shape/contact.shape';
import { LicensePayloadShape } from '../shape/license-payload.shape';
import { LicenseRuntimeShape } from '../shape/license-runtime.shape';
import { LicenseShape } from '../shape/license.shape';
import {
  LicenseStatusType,
  LicenseStatusTypes
} from '../types/license-status.type';
import { LicenseType } from '../types/license.type';

@Component({
  selector: 'sdux-license-card',
  imports: [
    CommonModule,
    MatTooltip,
    MatIcon,
    BrandNameComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MatTabsModule
  ],
  standalone: true,
  templateUrl: './license-card.component.html',
  styleUrls: ['./license-card.component.scss']
})
export class LicenseCardComponent {
  /**
   * Signal input
   */
  readonly license = input.required<LicenseShape>();
  readonly #contactService = inject(ContactService);

  readonly copySuccess = signal(false);
  readonly hasError = signal<boolean>(false);
  readonly isActive = computed<boolean>(
    () => this.license().status === LicenseStatusTypes.Active
  );

  readonly contact = computed<ContactShape | undefined>(() =>
    this.#contactService.adminContact.value()
  );

  readonly isInvalid = computed<boolean>(
    () => this.hasError() || !this.isActive()
  );
  readonly status = computed<LicenseStatusType>(() =>
    this.hasError() ? LicenseStatusTypes.Error : this.license().status
  );

  readonly licenseObject = computed<LicenseRuntimeShape>(() => {
    return {
      licenseId: VAULT_LICENSE_ID,
      payload: this.license().licenseKey
    };
  });

  /**
   * Snack bar service used for showing success/error notifications
   * when copying source code to the clipboard.
   */
  private readonly snackBar = inject(MatSnackBar);

  isExpanded: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Pure computed (NO side effects)
   */
  readonly licensePayload = signal<Partial<LicensePayloadShape>>(
    {} as LicensePayloadShape
  );

  readonly #decodePayload = computed<LicensePayloadShape | null>(() => {
    try {
      const [encoded] = this.license().licenseKey.split('.');
      return JSON.parse(atob(encoded));
    } catch {
      return null;
    }
  });

  /**
   * Effect handles side effects
   */
  constructor() {
    effect(() => {
      const payload = this.#decodePayload();
      if (!payload) {
        this.licensePayload.set({
          organization: 'Unknown (invalid payload)',
          domain: this.license().domain,
          licenseType: this.license().licenseType as LicenseType,
          expires: this.license().expires
        } as Partial<LicensePayloadShape>);
        this.hasError.set(true);
      } else {
        this.hasError.set(false);
        this.licensePayload.set(payload);
      }
    });
  }

  /**
   * Helpers
   */
  formatLicenseDate(date?: Date | string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  /**
   * Actions
   */
  copyLicense() {
    this.copyCode(JSON.stringify(this.licenseObject()), 'License Key copied');
  }

  copyFingerprint() {
    this.copyCode(this.license().fingerprint, 'License Fingerprint', true);
  }

  downloadLicense() {
    const blob = new Blob([JSON.stringify(this.licenseObject(), null, 2)], {
      type: 'application/json'
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `license-${this.license().domain}.json`;
    a.rel = 'noopener';
    a.click();

    URL.revokeObjectURL(url);

    this.#openSnackBar('License file downloaded');
  }

  #openSnackBar(sourceLabel: string): void {
    this.snackBar.open(`${sourceLabel}!`, '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  copyCode(
    textToCopy: string,
    sourceLabel: string,
    isFingerPrint = false
  ): void {
    // Flip UI state
    if (isFingerPrint) {
      this.copySuccess.set(true);
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        if (isFingerPrint) {
          setTimeout(() => this.copySuccess.set(false), 2000);
        } else {
          this.#openSnackBar(sourceLabel);
        }
      })
      .catch(() => {
        this.#openSnackBar('Copy failed');
      });
  }

  toggle(): void {
    this.isExpanded.update((value) => !value);
  }

  getAngularEmbeddedExample(): string {
    return `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideVault({ 
      licenses: [
        {
          licenseId: '${VAULT_LICENSE_ID}',
          payload: '${this.license().licenseKey}'
        }
      ]
    })
  ]
};`;
  }

  getFileExample(): string {
    return `// sdux-vault.license.ts

import { VaultLicensingShape } from '@sdux-vault/shared';

export const sduxVaultLicense: VaultLicensingShape = {
  licenseId: '${VAULT_LICENSE_ID}',
  payload: '${this.license().licenseKey}'
};`;
  }

  getEmbeddedExample(): string {
    return `Vault({ 
  licenses: [
    {
      licenseId: '${VAULT_LICENSE_ID}',
      payload: '${this.license().licenseKey}'
    }
  ]
});`;
  }
}
