import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MobileLayoutService
} from '@sdux-vault/ui/web-components';

/**
 * The Footer Component
 */
@Component({
  selector: 'sdux-footer',
  imports: [BrandNameComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  #mobileService = inject(MobileLayoutService);

  public isMobile = computed(() => {
    return this.#mobileService.isMobile();
  });
}
