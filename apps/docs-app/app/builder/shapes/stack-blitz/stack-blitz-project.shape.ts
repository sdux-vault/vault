import type { ProjectFiles, ProjectTemplate } from '@stackblitz/sdk';

export interface StackBlitzProjectShape {
  /** Stable identifier */
  title: string;
  template: ProjectTemplate;
  files: ProjectFiles;
}
