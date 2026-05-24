import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {
  CatchPhraseComponent,
  ImageComponent,
  MobileLayoutService
} from '@sdux-vault/ui/web-components';
import { AuthenticationService } from '../dashboard/service/authentication.service';
import { NavigationService } from '../navigation/service/navigation.service';
import { SearchComponent } from '../search/search.component';
import { ThemeService } from '../theme/theme.service';

/**
 * Application Toolbar Component
 * -----------------------------
 * Provides global UI controls such as:
 * - Theme switching (light/dark)
 * - Text direction switching (LTR/RTL)
 * - Mobile navigation drawer trigger
 * - Branding/logo display
 *
 * This toolbar reacts to layout changes using `MobileLayoutService`,
 * updates its visual state through computed Angular signals, and
 * delegates theme and navigation actions to their respective services.
 *
 * The displayed brand image automatically adapts between mobile and
 * desktop layouts.
 */
@Component({
  selector: 'sdux-toolbar',
  standalone: true,
  imports: [
    CatchPhraseComponent,
    ImageComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterLink,
    SearchComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /** Inject required services */
  #themeService = inject(ThemeService);
  #navigationService = inject(NavigationService);
  #mobileService = inject(MobileLayoutService);
  #authenticationService = inject(AuthenticationService);

  readonly isAuthenticated = computed(() =>
    this.#authenticationService.isAuthenticated()
  );

  /** Whether the viewport is in a mobile breakpoint */
  public isMobile = computed(() => this.#mobileService.isMobile());

  /** Branding image based on layout (compact icon for mobile, landscape logo for desktop) */
  public image = computed(() =>
    this.#mobileService.isMobile()
      ? 'brand/sdux/brand.svg'
      : 'brand/sdux/brand-landscape-dark.svg'
  );

  /** Current theme mode ("light" | "dark") */
  readonly theme = computed(() => this.#themeService.theme());

  /** Current document direction ("ltr" | "rtl") */
  readonly direction = computed(() => this.#themeService.direction());

  /** Icon used for theme switching button */
  readonly themeIcon = computed(() =>
    this.theme() === 'light' ? 'dark_mode' : 'light_mode'
  );

  /** Label used for theme switching button */
  readonly themeLabel = computed(() =>
    this.theme() === 'light' ? 'Dark Mode' : 'Light Mode'
  );

  /** Icon used for LTR/RTL switching button */
  readonly dirIcon = computed(() =>
    this.direction() === 'ltr'
      ? 'format_textdirection_r_to_l'
      : 'format_textdirection_l_to_r'
  );

  /** Label used for LTR/RTL switching button */
  readonly dirLabel = computed(() =>
    this.direction() === 'ltr' ? 'Switch to RTL' : 'Switch to LTR'
  );

  openDocumentation(): void {
    this.#navigationService.show();
  }

  /** Toggles between light and dark themes */
  toggleTheme(): void {
    this.#themeService.toggleTheme();
  }

  /** Toggles between LTR and RTL layouts */
  toggleDirection(): void {
    this.#themeService.toggleDirection();
  }

  logout(): void {
    this.#authenticationService.logout();
  }
}
