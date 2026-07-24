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
import { ANGULAR_REDUX_OUTPUT } from './examples/angular/redux/redux-output';
import { ANGULAR_SDUX_OUTPUT } from './examples/angular/sdux/sdux-output';
import { REACT_REDUX_OUTPUT } from './examples/react/redux/redux-output';
import { REACT_SDUX_OUTPUT } from './examples/react/sdux/sdux-output';
import { SVELTE_SDUX_OUTPUT } from './examples/svelte/sdux/sdux-output';
import { SVELTE_STORES_OUTPUT } from './examples/svelte/stores/stores-output';
import { VUE_PINIA_OUTPUT } from './examples/vue/pinia/pinia-output';
import { VUE_SDUX_OUTPUT } from './examples/vue/sdux/sdux-output';
import { FrameworkComparisonComponent } from './framework-comparison/framework-comparison.component';
import { FrameworkComparisonPair } from './framework-comparison/framework-comparison.types';

type ComparisonFrameworkId = 'angular' | 'react' | 'svelte' | 'vue';

const COMPARISON_FRAMEWORKS: readonly {
  readonly id: ComparisonFrameworkId;
  readonly label: string;
}[] = [
  { id: 'angular', label: 'Angular' },
  { id: 'react', label: 'React' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'vue', label: 'Vue' }
];

@Component({
  selector: 'sdux-dev-splash-page',
  standalone: true,
  imports: [
    MatIconModule,
    VaultBrandNameComponent,
    FrameworkComparisonComponent,
    MatTooltip
  ],
  templateUrl: './dev-splash-page.component.html',
  styleUrls: [
    '../splash-page.component.scss',
    './dev-splash-page.component.scss'
  ]
})
export class DevSplashPageComponent implements AfterViewInit {
  protected readonly comparisonFrameworks = COMPARISON_FRAMEWORKS;
  protected readonly comparisonRegistry: Record<
    ComparisonFrameworkId,
    FrameworkComparisonPair
  > = {
    angular: {
      id: 'angular',
      selectorLabel: 'Angular',
      sharedSetupFileNames: ['main.ts', 'app.config.ts'],
      left: {
        frameworkLabel: 'Angular',
        libraryLabel: 'Redux',
        files: ANGULAR_REDUX_OUTPUT
      },
      right: {
        frameworkLabel: 'Angular',
        libraryLabel: 'SDuX',
        usesSduxBrandName: true,
        files: ANGULAR_SDUX_OUTPUT
      }
    },
    react: {
      id: 'react',
      selectorLabel: 'React',
      sharedSetupFileNames: ['main.tsx'],
      left: {
        frameworkLabel: 'React',
        libraryLabel: 'Redux',
        files: REACT_REDUX_OUTPUT
      },
      right: {
        frameworkLabel: 'React',
        libraryLabel: 'SDuX',
        usesSduxBrandName: true,
        files: REACT_SDUX_OUTPUT
      }
    },
    svelte: {
      id: 'svelte',
      selectorLabel: 'Svelte',
      sharedSetupFileNames: ['main.ts', 'App.svelte'],
      left: {
        frameworkLabel: 'Svelte',
        libraryLabel: 'Stores',
        files: SVELTE_STORES_OUTPUT
      },
      right: {
        frameworkLabel: 'Svelte',
        libraryLabel: 'SDuX',
        usesSduxBrandName: true,
        files: SVELTE_SDUX_OUTPUT
      }
    },
    vue: {
      id: 'vue',
      selectorLabel: 'Vue',
      sharedSetupFileNames: ['main.ts', 'App.vue'],
      left: {
        frameworkLabel: 'Vue',
        libraryLabel: 'Pinia',
        files: VUE_PINIA_OUTPUT
      },
      right: {
        frameworkLabel: 'Vue',
        libraryLabel: 'SDuX',
        usesSduxBrandName: true,
        files: VUE_SDUX_OUTPUT
      }
    }
  };
  protected readonly selectedComparisonFramework =
    signal<ComparisonFrameworkId>('angular');
  protected readonly activeComparison = computed(
    () => this.comparisonRegistry[this.selectedComparisonFramework()]
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

  selectComparisonFramework(frameworkId: ComparisonFrameworkId): void {
    this.selectedComparisonFramework.set(frameworkId);
  }
}
