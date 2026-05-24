import { inject, Injectable } from '@angular/core';
import StackBlitz from '@stackblitz/sdk';
import { PipelineFileBuilderService } from '../../../services/files/pipeline-file-builder.service';
import { PipelineBuilderService } from '../../../services/pipeline-builder.service';
import { StackBlitzProjectShape } from '../../../shapes/stack-blitz/stack-blitz-project.shape';
import { StackblitzFileTypes } from '../../../types/file-builder/stackblitz-file.type';
import { StateFrameworkTypes } from '../../../types/state-framework.type';
import { ANGULAR_JSON_FILE } from '../files/angular/stackblitz-angular.json';
import { INDEX_HTML_FILE } from '../files/angular/stackblitz-index.html';
import { MAIN_TS_FILE } from '../files/angular/stackblitz-main';
import { PACKAGE_JSON_FILE } from '../files/angular/stackblitz-package.json';
import { TSCONFIG_FILE } from '../files/angular/stackblitz-tsconfig';
import { REACT_INDEX_HTML_FILE } from '../files/react/stackblitz-index.html';
import { REACT_PACKAGE_JSON_FILE } from '../files/react/stackblitz-package.json';
import { REACT_TSCONFIG_FILE } from '../files/react/stackblitz-tsconfig';
import { REACT_VITE_CONFIG_FILE } from '../files/react/stackblitz-vite.config';
import { SVELTE_INDEX_HTML_FILE } from '../files/svelte/stackblitz-index.html';
import { SVELTE_PACKAGE_JSON_FILE } from '../files/svelte/stackblitz-package.json';
import { SVELTE_CONFIG_FILE } from '../files/svelte/stackblitz-svelte.config';
import { SVELTE_TSCONFIG_FILE } from '../files/svelte/stackblitz-tsconfig';
import { SVELTE_VITE_CONFIG_FILE } from '../files/svelte/stackblitz-vite.config';
import { VUE_ENV_DTS_FILE } from '../files/vue/stackblitz-env-dts';
import { VUE_INDEX_HTML_FILE } from '../files/vue/stackblitz-index.html';
import { VUE_PACKAGE_JSON_FILE } from '../files/vue/stackblitz-package.json';
import { VUE_TSCONFIG_FILE } from '../files/vue/stackblitz-tsconfig';
import { VUE_VITE_CONFIG_FILE } from '../files/vue/stackblitz-vite.config';

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {
  #sdk: typeof StackBlitz;
  readonly #fileBuilderService = inject(PipelineFileBuilderService);
  readonly #pipelineBuilderService = inject(PipelineBuilderService);
  readonly #generatedFiles = this.#fileBuilderService.generatedFiles();

  constructor() {
    this.#sdk = StackBlitz;
  }

  buildProject(): void {
    const getStateFramework = this.#pipelineBuilderService.getStateFramework;
    let project: StackBlitzProjectShape = {
      title: `SDuX Pipeline Builder - ${getStateFramework()} Demo`,
      template: 'node',
      files: {}
    };

    if (getStateFramework() === StateFrameworkTypes.Angular) {
      project.files = {
        'package.json': JSON.stringify(PACKAGE_JSON_FILE, null, 2),
        'angular.json': JSON.stringify(ANGULAR_JSON_FILE, null, 2),
        'tsconfig.json': JSON.stringify(TSCONFIG_FILE, null, 2),
        'src/styles.scss': '',
        'src/main.ts': MAIN_TS_FILE,
        'src/index.html': INDEX_HTML_FILE,
        'src/app/app.config.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.AngularAppConfig
        ),
        'src/app/example.component.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.AngularComponent
        ),
        'src/app/example.service.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.AngularService
        )
      };
    }

    if (getStateFramework() === StateFrameworkTypes.React) {
      project.files = {
        'package.json': JSON.stringify(REACT_PACKAGE_JSON_FILE, null, 2),
        'tsconfig.json': JSON.stringify(REACT_TSCONFIG_FILE, null, 2),
        'vite.config.ts': REACT_VITE_CONFIG_FILE,
        'index.html': REACT_INDEX_HTML_FILE,
        'src/styles.css': '',
        'src/main.tsx': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.ReactMain
        ),
        'src/app/example.cell.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.ReactCell
        ),
        'src/app/ExampleView.tsx': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.ReactComponent
        )
      };
    }

    if (getStateFramework() === StateFrameworkTypes.Svelte) {
      project.files = {
        'package.json': JSON.stringify(SVELTE_PACKAGE_JSON_FILE, null, 2),
        'tsconfig.json': JSON.stringify(SVELTE_TSCONFIG_FILE, null, 2),
        'vite.config.ts': SVELTE_VITE_CONFIG_FILE,
        'svelte.config.js': SVELTE_CONFIG_FILE,
        'index.html': SVELTE_INDEX_HTML_FILE,
        'src/styles.css': '',
        'src/main.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.SvelteMain
        ),
        'src/app/example.cell.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.SvelteCell
        ),
        'src/app/ExampleView.svelte': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.SvelteComponent
        )
      };
    }

    if (getStateFramework() === StateFrameworkTypes.Vue) {
      project.files = {
        'package.json': JSON.stringify(VUE_PACKAGE_JSON_FILE, null, 2),
        'tsconfig.json': JSON.stringify(VUE_TSCONFIG_FILE, null, 2),
        'vite.config.ts': VUE_VITE_CONFIG_FILE,
        'index.html': VUE_INDEX_HTML_FILE,
        'src/env.d.ts': VUE_ENV_DTS_FILE,
        'src/styles.css': '',
        'src/main.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.VueMain
        ),
        'src/app/example.cell.ts': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.VueCell
        ),
        'src/app/ExampleView.vue': this.#findFileByStackBlitzTypeContents(
          StackblitzFileTypes.VueComponent
        )
      };
    }

    this.#sdk.openProject(project, { newWindow: true });
  }

  #findFileByStackBlitzTypeContents(stackBlitzFileType: string): string {
    // istanbul ignore next - This is not reachable based on the calling method
    return (
      this.#generatedFiles.find(
        (file) => file.stackBlitzFileType === stackBlitzFileType
      )?.contents || ''
    );
  }
}
