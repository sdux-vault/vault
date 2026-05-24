import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-config-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-26 -->
    <div class="table-title">
      <a href="/docs/references/config/vault-config">VaultConfig</a>
    </div>
    <table>
      <thead>
        <tr>
          <th class="column-250">Property</th>
          <th class="column-auto">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>devMode?: boolean</td>
          <td>
            Enables development-mode diagnostics and additional internal
            validation checks. When enabled, Vault emits more verbose warnings
            and validation errors.
          </td>
        </tr>

        <tr>
          <td>logLevel?: LogLevel</td>
          <td>
            Controls the verbosity of internal framework logging. Common values
            include 'debug', 'info', 'warn', 'error', and 'none'.
          </td>
        </tr>

        <tr>
          <td>
            licenses?:
            <a href="/docs/references/shapes/vault-licensing-shape"
              >VaultLicensingShape</a
            >[]
          </td>
          <td>
            Optional array of pre-registered license payloads. Vault stores
            these payloads in memory at startup and makes them retrievable via
            <code>getLicensePayload(licenseId)</code>. Vault does not validate
            or interpret the payload — vendors are responsible for license
            validation logic.
          </td>
        </tr>

        <tr>
          <td>licenseTimeoutMs?: number</td>
          <td>
            Maximum time, in milliseconds, Vault will wait for a required
            license to be validated before marking it as timed out. If
            validation does not occur within this window, the associated
            <a href="/docs/references/functions/feature-cell">FeatureCell</a> is
            denied. Defaults to <strong>15000</strong> ms. Set to
            <code>0</code> to disable timeout enforcement.
          </td>
        </tr>

        <tr>
          <td>bypassLicensing?: boolean</td>
          <td>
            Skips license enforcement during development. Only honored when
            <code>devMode</code> is <code>true</code>. When both
            <code>devMode</code> and <code>bypassLicensing</code> are
            <code>true</code>, Vault allows unlicensed extensions to initialize
            without a valid license token. Defaults to <code>true</code> when
            <code>devMode</code> is enabled. Set to <code>false</code> with
            <code>devMode: true</code> to exercise license validation against
            the development public key in integration tests. Ignored entirely
            when <code>devMode</code> is <code>false</code> (production) —
            licensing is always enforced with the production key regardless of
            this flag.
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaultConfigCommonComponent {}
