import {
  computed,
  Directive,
  effect,
  HostListener,
  inject,
  signal
} from '@angular/core';
import { MobileLayoutService } from '@sdux-vault/ui/web-components';
import { NavigationService } from '../service/navigation.service';

/**
 * Base class for all SDuX docs navigation components.
 *
 * Provides:
 * - mobile/desktop mode logic
 * - persisted sidenav open/close state
 * - resize awareness
 * - shared close/toggle helpers used across multiple menus
 */
@Directive()
export abstract class NavigationDirective {
  protected readonly mobile = inject(MobileLayoutService);
  protected readonly navigationService = inject(NavigationService);

  /** Whether the sidenav is currently expanded */
  readonly isExpanded = signal<boolean>(this.restoreSidenavState());

  /** Mobile/desktop mode ("over" vs "side") */
  readonly mode = computed(() => (this.mobile.isMobile() ? 'over' : 'side'));

  /** Internal helper signal */
  protected readonly isMobile = computed(() => this.mobile.isMobile());

  /** The constructor */
  constructor() {
    // If no saved state, default based on initial screen width
    if (localStorage.getItem('Vault-sidenav') === null) {
      this.isExpanded.set(window.innerWidth >= 1200);
    }

    // Sync with NavigationService so multi-panel behavior is consistent
    effect(() => {
      this.isExpanded.set(this.navigationService.isOpen());
    });
  }

  /** Toggles the sidenav and persists state */
  toggleSidenav(): void {
    this.navigationService.updateExpanded();
  }

  closeSidenav(override = false): void {
    if (this.isMobile() || override) {
      this.toggleSidenav();
    }
  }

  /** Explicit closing triggered by escape key, backdrop click, etc. */
  closing(): void {
    this.navigationService.updateExpanded(false);
  }

  /** Resize handler to auto-collapse on smaller screens */
  @HostListener('window:resize')
  onResize(): void {
    if (localStorage.getItem('Vault-sidenav') === null) {
      this.isExpanded.set(window.innerWidth >= 1200);
    }
  }

  /** Loads any stored sidenav state from local storage */
  private restoreSidenavState(): boolean {
    const saved = localStorage.getItem('Vault-sidenav');
    return saved ? JSON.parse(saved) : window.innerWidth >= 1200;
  }
}
