export const FrameworkFileTypes = {
  TypeScript: 'typescript',
  HTML: 'html',
  SCSS: 'scss',
  JSON: 'json',
  Markdown: 'markdown',
  Svelte: 'svelte',
  Vue: 'vue'
};

export type FrameworkFileType =
  (typeof FrameworkFileTypes)[keyof typeof FrameworkFileTypes];
