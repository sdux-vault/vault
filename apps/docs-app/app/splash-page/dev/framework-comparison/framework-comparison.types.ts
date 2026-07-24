export type ComparisonSourceFile = {
  readonly type:
    'typescript' | 'html' | 'scss' | 'json' | 'markdown' | 'svelte' | 'vue';
  readonly fileName: string;
  readonly source: string;
  readonly numberedSource: string;
};

export type FrameworkComparisonImplementation = {
  readonly frameworkLabel: string;
  readonly libraryLabel: string;
  readonly files: readonly ComparisonSourceFile[];
  readonly usesSduxBrandName?: boolean;
};

export type FrameworkComparisonPair = {
  readonly id: string;
  readonly selectorLabel: string;
  readonly sharedSetupFileNames?: readonly string[];
  readonly left: FrameworkComparisonImplementation;
  readonly right: FrameworkComparisonImplementation;
};
