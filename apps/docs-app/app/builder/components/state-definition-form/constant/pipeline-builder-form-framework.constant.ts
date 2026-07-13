import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';

export const PIPELINE_BUILDER_FORM_FRAMEWORK_CONSTANT = [
  StateFrameworkTypes.Angular,
  StateFrameworkTypes.React,
  StateFrameworkTypes.Vue,
  StateFrameworkTypes.Svelte
].sort((a, b) => a.localeCompare(b));
