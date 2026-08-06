import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { SeoService } from '../services/seo/seo.service';
import { LoadingSpinnerComponent } from '../spinner/loading-spinner.component';
import { ThemeService } from '../theme/theme.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'sdux-root',
  standalone: true,
  imports: [
    ToolbarComponent,
    NavigationComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  #themeService = inject(ThemeService);
  #analyticsService = inject(AnalyticsService);
  #seoService = inject(SeoService);

  constructor() {
    this.#themeService.restorePreferences();
    this.#analyticsService.initialize();
    this.#seoService.initialize();
  }
}
