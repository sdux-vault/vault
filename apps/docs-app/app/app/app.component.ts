import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../analytics/analytics.service';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
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

  constructor() {
    this.#themeService.restorePreferences();
    this.#analyticsService.initialize();
  }
}
