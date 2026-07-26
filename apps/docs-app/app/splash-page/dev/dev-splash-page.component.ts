import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import Prism from 'prismjs';
import { SupportedLanguagesConstants } from '../../docs/top-tier/supported-languages/constants/supported-languages.constant';
import { NavigationService } from '../../navigation/service/navigation.service';
import { FrameworkComparisonRegistryConstant } from './constants/framework-comparison-registry.constant';
import { FrameworkComparisonConstant } from './constants/framework-comparison.constant';
import { FrameworkComparisonComponent } from './framework-comparison/framework-comparison.component';
import { ComparisonFrameworkType } from './type/comparison-framework.type';

@Component({
  selector: 'sdux-dev-splash-page',
  standalone: true,
  imports: [
    MatIconModule,
    FrameworkComparisonComponent,
    MatTooltip,
    VaultBrandNameComponent
  ],
  templateUrl: './dev-splash-page.component.html',
  styleUrls: [
    '../splash-page.component.scss',
    './dev-splash-page.component.scss'
  ]
})
export class DevSplashPageComponent implements AfterViewInit {
  protected readonly comparisonFrameworks = FrameworkComparisonConstant;

  protected readonly selectedComparisonFramework =
    signal<ComparisonFrameworkType>('angular');

  protected readonly activeComparison = computed(
    () =>
      FrameworkComparisonRegistryConstant[this.selectedComparisonFramework()]
  );
  protected readonly frameworkLanguages = SupportedLanguagesConstants.filter(
    (lang) => lang.showInFrameworkTiles
  );

  #elementRef = inject(ElementRef);
  #navigationService = inject(NavigationService);
  #router = inject(Router);

  protected readonly isDocsOpen = this.#navigationService.isOpen;

  ngAfterViewInit(): void {
    Prism.highlightAllUnder(this.#elementRef.nativeElement);
  }

  openTesting() {
    this.openMenu();
    this.#router.navigate(['/docs/welcome/testing']);
  }

  viewStackblitz(fragment: string, hasStackblitzExample?: boolean): void {
    if (hasStackblitzExample) {
      if (fragment.match(/^(angular|react|svelte|vue)$/i)) {
        fragment = 'web';
      }

      this.openMenu();
      this.#router.navigate(['/docs/stackblitz'], {
        fragment: fragment.toLowerCase()
      });
    }
  }

  viewExamples(fragment: string): void {
    this.openMenu();
    this.#router.navigate(['/docs/stackblitz'], { fragment });
  }

  openMenu() {
    this.#navigationService.show();
  }

  selectComparisonFramework(frameworkType: ComparisonFrameworkType): void {
    this.selectedComparisonFramework.set(frameworkType);
  }
}
