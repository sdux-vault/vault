import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  BrandNameComponent,
  VaultBrandNameComponent,
  WINDOW
} from '@sdux-vault/ui/web-components';

import { MatTooltip } from '@angular/material/tooltip';
import { LicenseCardComponent } from './license-card/license-card.component';
import { AuthenticationService } from './service/authentication.service';
import { LicenseService } from './service/license.service';
import { StripeService } from './service/stripe.service';

@Component({
  selector: 'sdux-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltip,
    MatInputModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    LicenseCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  #licenseService = inject(LicenseService);
  #stripeService = inject(StripeService);
  #authenticationService = inject(AuthenticationService);
  #window = inject(WINDOW);
  #route = inject(ActivatedRoute);

  #queryParams = toSignal(this.#route.queryParamMap);

  readonly showSuccess = computed(
    () => this.#queryParams()?.get('success') === 'true'
  );

  readonly showCancel = computed(
    () => this.#queryParams()?.get('cancel') === 'true'
  );

  /**
   * domain input
   */
  readonly domain = signal<string>('');

  readonly domainError = computed(() => {
    const value = this.domain().trim();
    if (!value) {
      return 'Domain is required.';
    }
    if (value.length > 255) {
      return 'Domain must not exceed 255 characters.';
    }
    return null;
  });

  /**
   * licenses
   */
  readonly #licensesRaw = toSignal(this.#licenseService.getLicenses(), {
    initialValue: []
  });

  readonly licenses = computed(() =>
    [...this.#licensesRaw()].sort((a, b) => a.domain.localeCompare(b.domain))
  );

  fullName = this.#authenticationService.fullName;
  organizationName = this.#authenticationService.organizationName;

  /**
   * buyLicense
   *
   * Calls backend to create Stripe checkout session
   * and redirects the user to Stripe.
   */
  buyLicense(): void {
    if (this.domainError()) {
      return;
    }

    const domain = this.domain().trim();

    this.#stripeService.createCheckoutSession(domain).subscribe((url) => {
      this.#window?.location.assign(url);
    });
  }

  /**
   * updateDomain
   */
  updateDomain(value: string): void {
    this.domain.set(value);
  }
}
