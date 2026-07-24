import { Component, computed, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MobileLayoutService
} from '@sdux-vault/ui/web-components';
import { environment as appEnvironment } from '../../environments/environment';
import { EnvironmentTypes } from '../../environments/types/environment.type';

/**
 * The Footer Component
 */
@Component({
  selector: 'sdux-footer',
  imports: [BrandNameComponent, MatTooltipModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  #mobileService = inject(MobileLayoutService);

  /** Identifies the Angular environment represented by the current build. */
  readonly environment = appEnvironment.environment;

  /** Exposes non-sensitive environment configuration for the environment banner. */
  readonly environmentDetails = Object.entries(appEnvironment)
    .filter(([key]) => key !== 'license')
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
    .map(([key, value]) => ({ key, value: String(value) }));

  /** Whether the production enterprise build should omit the environment banner. */
  readonly isEnterprise = this.environment === EnvironmentTypes.Enterprise;

  public isMobile = computed(() => {
    return this.#mobileService.isMobile();
  });
}
