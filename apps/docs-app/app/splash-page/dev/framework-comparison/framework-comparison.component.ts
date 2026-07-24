import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input
} from '@angular/core';
import { VaultBrandNameComponent } from '@sdux-vault/ui/web-components';
import Prism from 'prismjs';
import {
  ComparisonSourceFile,
  FrameworkComparisonImplementation,
  FrameworkComparisonPair
} from './framework-comparison.types';

const DEFAULT_SHARED_SETUP_FILE_NAMES = ['main.ts', 'app.config.ts'];

@Component({
  selector: 'sdux-framework-comparison',
  standalone: true,
  imports: [VaultBrandNameComponent],
  templateUrl: './framework-comparison.component.html',
  styleUrls: ['./framework-comparison.component.scss']
})
export class FrameworkComparisonComponent {
  readonly comparison = input.required<FrameworkComparisonPair>();

  readonly #elementRef = inject(ElementRef<HTMLElement>);

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
    leftFile: ComparisonSourceFile | undefined,
    rightFile: ComparisonSourceFile | undefined
  ): string {
    return [
      this.comparison().id,
      index,
      leftFile?.fileName ?? 'empty-left',
      rightFile?.fileName ?? 'empty-right'
    ].join(':');
  }

  protected getCodeLanguage(type: ComparisonSourceFile['type']): string {
    switch (type) {
      case 'html':
      case 'svelte':
      case 'vue':
        return 'language-markup';
      case 'scss':
        return 'language-css';
      case 'json':
        return 'language-json';
      case 'markdown':
        return 'language-markdown';
      default:
        return 'language-typescript';
    }
  }

  protected shouldRenderSduxBrandName(
    implementation: FrameworkComparisonImplementation
  ): boolean {
    return implementation.usesSduxBrandName ?? false;
  }

  protected countSharedSetupFiles(
    files: readonly ComparisonSourceFile[]
  ): number {
    const sharedSetupFileNames = new Set(
      this.comparison().sharedSetupFileNames ?? DEFAULT_SHARED_SETUP_FILE_NAMES
    );

    return files.filter((file) => sharedSetupFileNames.has(file.fileName))
      .length;
  }
}
