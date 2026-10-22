import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector:
    'sdux-blog-chapter-11-encrypt-and-persist-feature-state-without-polluting-application-code',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    FeatureCellBrandNameComponent,
    MultiFrameworkExampleComponent,
    RouterModule
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  template: `
    <sdux-blog-layout
      id="chapter-11-encrypt-and-persist-feature-state-without-polluting-application-code"
      title="Chapter 11 — Encrypt and Persist Feature State Without Polluting Application Code"
      date="2026-10-22"
      pillar="SP"
      readingTime="10">
      <header class="docs-header">
        <p class="lead">
          Browser persistence should not force your application code to handle
          ciphertext, storage envelopes, or reload restoration. Chapter 11 shows
          how AES-256-GCM encrypts finalized Feature State at the persistence
          boundary while the
          <sdux-feature-cell [tm]="true" />
          continues to work with plain in-memory values.
        </p>
        <p>
          This is also a security boundary lesson. Encryption and persistence
          are Pro capabilities: development evaluation can use the documented
          licensing bypass, but production use requires a valid Pro license and
          must not rely on that bypass. The chapter also makes clear what
          browser-side encryption does not provide: authorization, XSS
          protection, secret confidentiality, or cross-device recovery.
        </p>
        <div class="callout callout-info">
          <p>
            <strong>Lab starting point:</strong> Begin with the completed
            Chapter 7 project. Chapter 11 adds the Pro Encrypt and Persist
            behaviors, a stable teaching salt, and tab-scoped Session Storage
            persistence.
          </p>
        </div>
      </header>

      <section class="section">
        <div class="section-title">
          Why Persistence Needs a Deliberate Threat Model
        </div>
        <div class="section-body">
          <p>
            Keeping a local workspace across a reload is useful. It can preserve
            non-sensitive preferences, a draft, or a short-lived session view
            without making the user rebuild the same context every time. But
            persistence gives data a longer life than the current page, so the
            storage lifetime and the value of the data have to justify each
            other.
          </p>
          <p>
            Chapter 11 places encryption where it belongs: between finalized
            application State and the persistence mechanism. The application
            continues to read and write ordinary values through its
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            boundary. The persisted envelope is encrypted before it reaches
            Session Storage, and the value is decrypted before it returns to the
            application.
          </p>
          <p>
            That boundary protects the confidentiality and integrity of the
            persisted envelope when an attacker obtains storage alone but does
            not have the key-derived secret. It does not turn browser JavaScript
            into a confidential key store. A successful same-origin script, XSS,
            malicious extension, or compromised browser runtime can still read
            plain in-memory State and any secret available to the client.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Pro feature and production boundary:</strong> Encryption
              and Persistence behaviors require a valid Pro license for
              production use. The tutorial uses
              <span class="code">devMode: true</span> with
              <span class="code">bypassLicensing: true</span> only for local
              development evaluation. Do not carry that bypass into production,
              and do not paste production secrets or sensitive user data into
              the teaching example.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Register Encrypt and Persist at the Pipeline Boundary
        </div>
        <div class="section-body">
          <p>
            The application configuration registers the two Pro behaviors beside
            the existing collection behavior. The tutorial's behavior list is
            intentionally visible, but declaration order does not redefine the
            behaviors' fixed pipeline stages. Encryption transforms the
            finalized outbound value before Persist writes its envelope.
          </p>
          <sdux-multi-framework-example
            description="Register the Pro Encrypt and Persist behaviors">
            <ng-template #angular>
              <pre class="code-inline"><code class="language-ts">import &#123;
  withAes256EncryptBehavior,
  withArrayByIdMergeBehavior,
  withSessionStoragePersistBehavior
&#125; from '&#64;sdux-vault/addons';
import &#123; provideFeatureCell, provideVault &#125; from '&#64;sdux-vault/angular';

provideVault(&#123;
  devMode: true,
  bypassLicensing: true
&#125;),

provideFeatureCell(
  ExampleService,
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [
    withArrayByIdMergeBehavior,
    withAes256EncryptBehavior,
    withSessionStoragePersistBehavior
  ]
);</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';
import &#123;
  withAes256EncryptBehavior,
  withArrayByIdMergeBehavior,
  withSessionStoragePersistBehavior
&#125; from '&#64;sdux-vault/addons';

export const characterCell = FeatureCell&lt;readonly StarWarsCharacter[]&gt;(
  &#123;
    key: 'star-wars-character',
    initialState: STAR_WARS_CHARACTERS
  &#125;,
  [
    withArrayByIdMergeBehavior,
    withAes256EncryptBehavior,
    withSessionStoragePersistBehavior
  ]
);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The bypass is an evaluation convenience, not a licensing model for
            shipped software. In production, the Pro behaviors need a valid
            license. That distinction belongs in the setup instructions because
            developers should know whether they are exploring a capability or
            configuring a production application.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Keep Plain State Inside the FeatureCell</div>
        <div class="section-body">
          <p>
            Encryption is useful here because it stays out of the feature's
            domain logic. The service still configures its filters, reducers,
            collection identity, and initialization. It also supplies the secret
            configuration before initialization. Nothing in the component has to
            serialize a character, assemble an envelope, or decrypt a reload
            result.
          </p>
          <sdux-multi-framework-example
            description="Configure the AES-256 secret before initialization">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">export const EXAMPLE_AES256_SALT = new Uint8Array([
  0x53, 0x44, 0x75, 0x58, 0x2d, 0x56, 0x61, 0x75, 0x6c, 0x74, 0x2d, 0x54, 0x75,
  0x74, 0x6f, 0x72
]);

this.#vault.setAes256Secret?.(&#123;
  aes256Secret: 'sdux-vault-tutorial-only-secret',
  salt: EXAMPLE_AES256_SALT,
  iterations: 250_000
&#125;);

this.#vault.initialize();</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">const EXAMPLE_AES256_SALT = new Uint8Array([
  0x53, 0x44, 0x75, 0x58, 0x2d, 0x56, 0x61, 0x75, 0x6c, 0x74, 0x2d, 0x54, 0x75,
  0x74, 0x6f, 0x72
]);

characterCell
  .setAes256Secret(&#123;
    aes256Secret: 'sdux-vault-tutorial-only-secret',
    salt: EXAMPLE_AES256_SALT,
    iterations: 250_000
  &#125;)
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>
          <p>
            The call to
            <span class="code">setAes256Secret()</span> belongs before
            <span class="code">initialize()</span>. The stable 16-byte salt in
            the tutorial makes the exercise repeatable, but it is not a password
            or a confidential key. A stable salt supports key derivation for
            ciphertext that must be read later; it does not solve production key
            management.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Learning example only:</strong> In production, supply the
              salt dynamically from a secure, durable source that your
              application controls. The stable salt shown here exists to make
              the lesson repeatable and the reload behavior easy to see; it is
              not a production secret-management strategy. Keep the salt stable
              for data that must be decrypted later, protect the secret that
              derives the encryption key, and choose storage and key-management
              policies that match your threat model.
            </p>
          </div>
          <div class="concept-box">
            <p>
              <strong>Plain in memory, protected at rest:</strong> Trusted
              application code continues to receive plain Feature State. The
              encryption behavior protects the value at the persistence boundary
              rather than forcing every consumer to understand storage format.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Stable Salt, Reload Restoration, and Initial State Priority
        </div>
        <div class="section-body">
          <p>
            A stable salt matters because the persisted ciphertext must be
            decryptable after the page reloads. The tutorial also uses a stable
            storage key so the same
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            can find its Session Storage envelope again. The AES-GCM
            initialization vector is generated for encryption and stored in the
            envelope; it is not a replacement for the stable salt.
          </p>
          <p>
            On startup, persisted State takes priority over
            <span class="code">initialState</span>. That is the behavior users
            expect from restoration: the initial characters seed a feature that
            has never been persisted, but they should not overwrite a valid
            session snapshot on every reload. The
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            still presents the restored value as ordinary State after
            decryption.
          </p>
          <table aria-label="Encrypt and Persist responsibility boundaries">
            <thead>
              <tr>
                <th scope="col" class="column-150">Concern</th>
                <th scope="col" class="column-250">Owner</th>
                <th scope="col" class="column-auto">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feature State</td>
                <td>
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >
                </td>
                <td>Expose plain values to trusted application code.</td>
              </tr>
              <tr>
                <td>Encryption</td>
                <td>AES-256 Encrypt behavior</td>
                <td>Protect the finalized value before persistence.</td>
              </tr>
              <tr>
                <td>Storage lifetime</td>
                <td>Session Storage Persist behavior</td>
                <td>
                  Restore the encrypted envelope across reloads in the current
                  tab.
                </td>
              </tr>
              <tr>
                <td>Threat model</td>
                <td>Application team</td>
                <td>
                  Choose data, secrets, retention, authorization, and recovery
                  policies.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Session Storage Is Tab-Scoped, Not Cross-Device Recovery
        </div>
        <div class="section-body">
          <p>
            Session Storage gives this tutorial a clear and limited persistence
            story. Reload the page in the current browser tab and the encrypted
            envelope can be restored. Open another tab and it does not become a
            shared source of truth. Close the tab and the session normally ends,
            although browser crash recovery and session-restoration features can
            affect that lifetime.
          </p>
          <p>
            That scope is often a good fit for temporary local work, but it is
            not a substitute for a server, an account-backed data model, or a
            cross-device recovery plan. Encryption also does not provide
            authorization, server security, data minimization, or a retention
            policy. Those are separate application decisions.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Do not overclaim the protection:</strong> A secret bundled
              into browser JavaScript is available to the browser runtime. Use
              the tutorial secret and salt to learn the boundary, not as a
              production secret-management strategy.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          What Client-Side Encryption Does Not Protect
        </div>
        <div class="section-body">
          <p>
            The most valuable part of Chapter 11 is its list of non-goals. The
            encrypted envelope is not the same thing as an encrypted application
            runtime. If hostile code executes successfully in the same origin,
            it can observe plain State before encryption or use any client-
            available secret. If the feature needs authorization, the server and
            identity boundary must provide it.
          </p>
          <p>
            The chapter's recovery path is similarly intentional. Malformed
            storage data should not become partial application State. A failed
            decryption should be normalized and the relevant storage key
            cleared, followed by a fresh authoritative load. Recovery is a new
            decision, not a reason to silently trust corrupted or
            unauthenticated data.
          </p>
          <ul>
            <li>Encryption does not prevent XSS or malicious extensions.</li>
            <li>
              Encryption does not hide plain State from trusted application
              code.
            </li>
            <li>
              Encryption does not create authorization or server security.
            </li>
            <li>
              Session Storage does not provide cross-tab or cross-device
              recovery.
            </li>
            <li>
              A tutorial secret and salt are not production key management.
            </li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Chapter 11 is a practical lesson in keeping persistence concerns at
            the boundary. Read the
            <a href="/docs/tutorial/angular/chapters/11-encrypt-and-persist"
              >Encrypt and Persist tutorial chapter</a
            >
            for the complete Angular walkthrough, source tabs, and StackBlitz
            project. Before using the Pro behaviors in production, replace the
            tutorial licensing bypass with a valid Pro license and make the
            secret, storage lifetime, authorization, retention, and recovery
            decisions appropriate for your data.
          </p>
          <!-- StackBlitz: encrypt-and-persist-tutorial -->
        </div>
      </section>
    </sdux-blog-layout>
  `
})
export class BlogChapter11EncryptAndPersistFeatureStateWithoutPollutingApplicationCodeComponent {}
