import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent
} from '@sdux-vault/ui/web-components';
import Prism from 'prismjs';
import { SupportedLanguagesConstants } from '../../docs/top-tier/supported-languages/constants/supported-languages.constant';
import { NavigationService } from '../../navigation/service/navigation.service';
import { SplashPageExampleComponent } from '../splash-page-example/splash-page-example.component';

@Component({
  selector: 'sdux-dev-splash-page',
  standalone: true,
  imports: [
    MatIconModule,
    BrandNameComponent,
    CatchPhraseComponent,
    SplashPageExampleComponent
  ],
  templateUrl: './dev-splash-page.component.html',
  styleUrls: ['./dev-splash-page.component.scss']
})
export class DevSplashPageComponent implements AfterViewInit {
  protected readonly supportedLanguages = SupportedLanguagesConstants.filter(
    (lang) => lang.showInEcosystemStrip
  );
  protected readonly frameworkLanguages = SupportedLanguagesConstants.filter(
    (lang) => lang.showInFrameworkTiles
  );

  #elementRef = inject(ElementRef);
  #navigationService = inject(NavigationService);
  #router = inject(Router);

  ngAfterViewInit(): void {
    Prism.highlightAllUnder(this.#elementRef.nativeElement);
  }

  openBuilder() {
    this.openMenu();
    this.#router.navigate(['/docs/pipeline/builder']);
  }

  openTesting() {
    this.openMenu();
    this.#router.navigate(['/docs/welcome/testing']);
  }

  openMigration() {
    this.openMenu();
    this.#router.navigate(['/docs/migration']);
  }

  openArchitecture() {
    this.openMenu();
    this.#router.navigate(['/docs/pipeline/pipeline-architecture']);
  }

  openFeatureCells() {
    this.openMenu();
    this.#router.navigate(['/docs/pipeline/apis/feature-cells']);
  }

  openComparisons() {
    this.openMenu();
    this.#router.navigate(['/docs/welcome/sdux-redux-similarities']);
  }

  openStackBlitz() {
    this.openMenu();
    this.#router.navigate(['/docs/stackblitz']);
  }

  viewExamples(fragment: string) {
    this.openMenu();
    this.#router.navigate(['/docs/stackblitz'], { fragment });
  }

  openControllers() {
    this.#openBehavior('controllers');
  }

  openInterceptors() {
    this.#openBehavior('interceptors');
  }

  openResolvers() {
    this.#openBehavior('resolve');
  }

  openFilters() {
    this.#openBehavior('filters');
  }

  openReducers() {
    this.#openBehavior('reducers');
  }

  openTaps() {
    this.#openBehavior('taps');
  }

  #openBehavior(route: string) {
    this.openMenu();
    this.#router.navigate([`/docs/pipeline/behaviors/${route}`]);
  }

  openExtensions() {
    this.#openBehavior('persist');
  }

  openEnterprise() {
    this.openMenu();
    this.#router.navigate(['/sdux/enterprise']);
  }

  openStartHere() {
    this.openMenu();
    this.#router.navigate(['/docs/welcome/getting-started']);
  }

  openMenu() {
    this.#navigationService.show();
  }
}
