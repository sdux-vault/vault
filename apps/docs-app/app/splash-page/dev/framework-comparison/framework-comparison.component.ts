import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input
} from '@angular/core';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import { StackblitzLanguageExampleComponent } from 'apps/docs-app/app/docs/stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import Prism from 'prismjs';
import { StackblitzExampleService } from '../../../docs/stack-blitz/services/stackblitz-example.service';
import { StackBlitzExampleLanguageShape } from '../../../docs/stack-blitz/shapes/stackblitz-example.language.shape';
import { StackBlitzExampleShape } from '../../../docs/stack-blitz/shapes/stackblitz-example.shape';
import type { FrameworkComparisonImplementationShape } from '../shapes/framework-comparison-implementation.shape';
import { FrameworkComparisonPairShape } from '../shapes/framework-comparison-pair.shape';
import type { FrameworkComparisonSourceFileShape } from '../shapes/framework-comparison-source-file.shape';

const DEFAULT_SHARED_SETUP_FILE_NAMES = ['main.ts', 'app.config.ts'];

@Component({
  selector: 'sdux-framework-comparison',
  standalone: true,
  imports: [
    VaultBrandNameComponent,
    StackblitzLanguageExampleComponent,
    CommonModule
  ],
  templateUrl: './framework-comparison.component.html',
  styleUrls: ['./framework-comparison.component.scss']
})
export class FrameworkComparisonComponent {
  readonly comparison = input.required<FrameworkComparisonPairShape>();

  readonly #elementRef = inject(ElementRef<HTMLElement>);

  readonly #stackblitzService = inject(StackblitzExampleService);

  readonly example = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('comparison') ??
      ({} as StackBlitzExampleShape)
  );

  readonly lang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.example()?.languages?.find(
        (lang) => lang.key === this.comparison()?.id
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  constructor() {
    effect(() => {
      this.comparison();

      queueMicrotask(() => {
        Prism.highlightAllUnder(this.#elementRef.nativeElement);
      });
    });
  }

  protected readonly sharedSetupFileCount = computed(() =>
    this.countSharedSetupFiles(this.comparison().right.files)
  );

  protected readonly sduxFeatureFileCount = computed(
    () => this.comparison().right.files.length - this.sharedSetupFileCount()
  );

  protected readonly leftOnlySupportFileCount = computed(() =>
    Math.max(
      this.comparison().left.files.length -
        this.comparison().right.files.length,
      0
    )
  );

  protected readonly rows = computed(() => {
    const comparison = this.comparison();
    const rowCount = Math.max(
      comparison.left.files.length,
      comparison.right.files.length
    );

    return Array.from({ length: rowCount }, (_, index) => ({
      leftFile: comparison.left.files[index],
      rightFile: comparison.right.files[index]
    }));
  });

  protected getRowTrackKey(
    index: number,
    leftFile: FrameworkComparisonSourceFileShape | undefined,
    rightFile: FrameworkComparisonSourceFileShape | undefined
  ): string {
    return [
      this.comparison().id,
      index,
      leftFile?.fileName ?? 'empty-left',
      rightFile?.fileName ?? 'empty-right'
    ].join(':');
  }

  protected getCodeLanguage(
    type: FrameworkComparisonSourceFileShape['type']
  ): string {
    switch (type) {
      case 'html':
      case 'svelte':
      case 'vue':
        return 'language-markup';
      default:
        return 'language-typescript';
    }
  }

  protected shouldRenderSduxBrandName(
    implementation: FrameworkComparisonImplementationShape
  ): boolean {
    return implementation.usesSduxBrandName ?? false;
  }

  protected countSharedSetupFiles(
    files: readonly FrameworkComparisonSourceFileShape[]
  ): number {
    const sharedSetupFileNames = new Set(
      this.comparison().sharedSetupFileNames ?? DEFAULT_SHARED_SETUP_FILE_NAMES
    );

    return files.filter((file) => sharedSetupFileNames.has(file.fileName))
      .length;
  }
}
