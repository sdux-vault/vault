import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import StackBlitzSDK from '@stackblitz/sdk';
import { PipelineFileBuilderService } from '../../../services/files/pipeline-file-builder.service';
import { PipelineBuilderService } from '../../../services/pipeline-builder.service';
import { GeneratedFileShape } from '../../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../../types/file-builder/file.type';
import { StackblitzFileTypes } from '../../../types/file-builder/stackblitz-file.type';
import { StackBlitzService } from './stackblitz.service';

describe('Service: StackBlitz', () => {
  let service: StackBlitzService;
  let expectedProject: any;
  let options: any;
  const mockFiles: GeneratedFileShape[] = [
    Object({
      type: FileTypes.Simple,
      stackBlitzFileType: StackblitzFileTypes.AngularAppConfig,
      contents: 'appConfig'
    }),
    Object({
      type: FileTypes.Simple,
      stackBlitzFileType: StackblitzFileTypes.AngularService,
      contents: 'angular service'
    }),
    Object({
      type: FileTypes.Simple,
      stackBlitzFileType: StackblitzFileTypes.AngularComponent,
      contents: 'angular component'
    })
  ];

  describe('Angular', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(mockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('Angular')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - Angular Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files['package.json'].replace(/\n|\s/g, '')).toBe(
        `{"name":"SDuXAngularPipelineBuilderDemo","version":"1.0.0","private":true,"scripts":{"start":"ngserve--host0.0.0.0--port4200"},"dependencies":{"@angular/cdk":"21.2.5","@angular/cli":"21.2.5","@angular/common":"21.2.8","@angular/compiler":"21.2.8","@angular/core":"21.2.8","@angular/platform-browser":"21.2.8","@sdux-vault/angular":"latest","rxjs":"~7.8.0","tslib":"^2.3.0"},"devDependencies":{"@angular/build":"^21.2.6","@angular/compiler-cli":"21.2.8","typescript":"~5.9.2"}}`
      );

      expect(expectedProject.files['angular.json'].replace(/\n|\s/g, '')).toBe(
        '{"$schema":"./node_modules/@angular/cli/lib/config/schema.json","version":1,"newProjectRoot":"projects","projects":{"angular-demo-1":{"projectType":"application","schematics":{"@schematics/angular:component":{"style":"scss"}},"root":"./","sourceRoot":"./src","prefix":"example","architect":{"build":{"builder":"@angular/build:application","options":{"browser":"./src/main.ts","tsConfig":"./tsconfig.json","index":"./src/index.html","inlineStyleLanguage":"scss","assets":[{"glob":"**/*","input":"./public"}],"styles":["./src/styles.scss"]},"configurations":{"development":{"optimization":false,"extractLicenses":false,"sourceMap":true}},"defaultConfiguration":"development"},"serve":{"builder":"@angular/build:dev-server","configurations":{"development":{"buildTarget":"angular-demo-1:build:development"}},"defaultConfiguration":"development"}}}}}'
      );

      expect(expectedProject.files['tsconfig.json'].replace(/\n|\s/g, '')).toBe(
        '{"compileOnSave":false,"compilerOptions":{"baseUrl":"./","outDir":"./dist/out-tsc","strict":true,"noImplicitOverride":true,"noPropertyAccessFromIndexSignature":false,"noImplicitReturns":true,"forceConsistentCasingInFileNames":true,"noFallthroughCasesInSwitch":true,"skipLibCheck":true,"isolatedModules":true,"experimentalDecorators":true,"importHelpers":true,"target":"ES2022","module":"preserve"},"angularCompilerOptions":{"enableI18nLegacyMessageIdFormat":false,"strictInjectionParameters":true,"strictInputAccessModifiers":true,"typeCheckHostBindings":true,"strictTemplates":true},"include":["src/**/*.ts"],"exclude":["src/**/*.spec.ts"]}'
      );

      expect(expectedProject.files['src/styles.scss']).toBe('');

      expect(expectedProject.files['src/main.ts'].replace(/\n|\s/g, '')).toBe(
        `import{bootstrapApplication}from'@angular/platform-browser';import{appConfig}from'./app/app.config';import{ExampleComponent}from'./app/example.component';bootstrapApplication(ExampleComponent,appConfig).catch((err)=>console.error(err));`
      );

      expect(
        expectedProject.files['src/index.html'].replace(/\n|\s/g, '')
      ).toBe(
        '<!doctypehtml><htmllang="en"><head><metacharset="utf-8"/><title>SDuXAngularPipelineBuilderDemo</title><basehref="/"/><metaname="viewport"content="width=device-width,initial-scale=1"/><linkrel="icon"type="image/x-icon"href="favicon.ico"/></head><body><example-view></example-view></body></html>'
      );

      expect(expectedProject.files['src/app/app.config.ts']).toBe('appConfig');

      expect(expectedProject.files['src/app/example.service.ts']).toBe(
        'angular service'
      );

      expect(expectedProject.files['src/app/example.component.ts']).toBe(
        'angular component'
      );

      expect(
        Object.entries(expectedProject.files).map(([fileName]) => fileName)
      ).toEqual([
        'package.json',
        'angular.json',
        'tsconfig.json',
        'src/styles.scss',
        'src/main.ts',
        'src/index.html',
        'src/app/app.config.ts',
        'src/app/example.component.ts',
        'src/app/example.service.ts'
      ]);
    });
  });

  describe('React', () => {
    const reactMockFiles: GeneratedFileShape[] = [
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.ReactCell,
        contents: 'react cell'
      }),
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.ReactComponent,
        contents: 'react component'
      }),
      Object({
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.ReactMain,
        contents: 'react main'
      })
    ];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(reactMockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('React')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - React Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files['package.json'].replace(/\n|\s/g, '')).toBe(
        `{"name":"SDuXReactPipelineBuilderDemo","version":"1.0.0","private":true,"type":"module","scripts":{"start":"vite","dev":"vite","build":"tsc&&vitebuild","preview":"vitepreview"},"dependencies":{"@sdux-vault/react":"latest","react":"^19.1.0","react-dom":"^19.1.0","rxjs":"~7.8.0"},"devDependencies":{"@types/react":"^19.1.2","@types/react-dom":"^19.1.2","@vitejs/plugin-react":"^4.4.1","typescript":"~5.9.2","vite":"^6.3.3"}}`
      );

      expect(expectedProject.files['tsconfig.json'].replace(/\n|\s/g, '')).toBe(
        '{"compilerOptions":{"target":"ES2022","module":"ESNext","moduleResolution":"bundler","jsx":"react-jsx","strict":true,"noImplicitReturns":true,"forceConsistentCasingInFileNames":true,"noFallthroughCasesInSwitch":true,"skipLibCheck":true,"isolatedModules":true,"esModuleInterop":true},"include":["src","vite.config.ts"]}'
      );

      expect(
        expectedProject.files['vite.config.ts'].replace(/\n|\s/g, '')
      ).toBe(
        `importreactfrom'@vitejs/plugin-react';import{defineConfig}from'vite';exportdefaultdefineConfig({plugins:[react()]});`
      );

      expect(expectedProject.files['index.html'].replace(/\n|\s/g, '')).toBe(
        '<!doctypehtml><htmllang="en"><head><metacharset="utf-8"/><title>SDuXReactPipelineBuilderDemo</title><metaname="viewport"content="width=device-width,initial-scale=1"/></head><body><divid="root"></div><scripttype="module"src="/src/main.tsx"></script></body></html>'
      );

      expect(expectedProject.files['src/styles.css']).toBe('');

      expect(expectedProject.files['src/main.tsx']).toBe('react main');

      expect(expectedProject.files['src/app/example.cell.ts']).toBe(
        'react cell'
      );

      expect(expectedProject.files['src/app/ExampleView.tsx']).toBe(
        'react component'
      );

      expect(
        Object.entries(expectedProject.files).map(([fileName]) => fileName)
      ).toEqual([
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'index.html',
        'src/styles.css',
        'src/main.tsx',
        'src/app/example.cell.ts',
        'src/app/ExampleView.tsx'
      ]);
    });
  });

  describe('Vue', () => {
    const vueMockFiles: GeneratedFileShape[] = [
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.VueCell,
        contents: 'vue cell'
      }),
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.VueComponent,
        contents: 'vue component'
      }),
      Object({
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.VueMain,
        contents: 'vue main'
      })
    ];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(vueMockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('Vue')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - Vue Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files['package.json'].replace(/\n|\s/g, '')).toBe(
        `{"name":"SDuXVuePipelineBuilderDemo","version":"1.0.0","private":true,"type":"module","scripts":{"start":"vite","dev":"vite","build":"vue-tsc&&vitebuild","preview":"vitepreview"},"dependencies":{"@sdux-vault/vue":"latest","vue":"^3.5.13","rxjs":"~7.8.0"},"devDependencies":{"@vitejs/plugin-vue":"^5.2.3","typescript":"~5.9.2","vite":"^6.3.3","vue-tsc":"^2.2.8"}}`
      );

      expect(expectedProject.files['tsconfig.json'].replace(/\n|\s/g, '')).toBe(
        '{"compilerOptions":{"target":"ES2022","module":"ESNext","moduleResolution":"bundler","jsx":"preserve","strict":true,"noImplicitReturns":true,"forceConsistentCasingInFileNames":true,"noFallthroughCasesInSwitch":true,"skipLibCheck":true,"isolatedModules":true,"esModuleInterop":true},"include":["src/**/*.ts","src/**/*.vue","vite.config.ts"]}'
      );

      expect(
        expectedProject.files['vite.config.ts'].replace(/\n|\s/g, '')
      ).toBe(
        `importvuefrom'@vitejs/plugin-vue';import{defineConfig}from'vite';exportdefaultdefineConfig({plugins:[vue()]});`
      );

      expect(expectedProject.files['index.html'].replace(/\n|\s/g, '')).toBe(
        '<!doctypehtml><htmllang="en"><head><metacharset="utf-8"/><title>SDuXVuePipelineBuilderDemo</title><metaname="viewport"content="width=device-width,initial-scale=1"/></head><body><divid="app"></div><scripttype="module"src="/src/main.ts"></script></body></html>'
      );

      expect(expectedProject.files['src/env.d.ts'].replace(/\n|\s/g, '')).toBe(
        `///<referencetypes="vite/client"/>declaremodule'*.vue'{importtype{DefineComponent}from'vue';constcomponent:DefineComponent<object,object,unknown>;exportdefaultcomponent;}`
      );

      expect(expectedProject.files['src/styles.css']).toBe('');

      expect(expectedProject.files['src/main.ts']).toBe('vue main');

      expect(expectedProject.files['src/app/example.cell.ts']).toBe('vue cell');

      expect(expectedProject.files['src/app/ExampleView.vue']).toBe(
        'vue component'
      );

      expect(
        Object.entries(expectedProject.files).map(([fileName]) => fileName)
      ).toEqual([
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'index.html',
        'src/env.d.ts',
        'src/styles.css',
        'src/main.ts',
        'src/app/example.cell.ts',
        'src/app/ExampleView.vue'
      ]);
    });
  });

  describe('Svelte', () => {
    const svelteMockFiles: GeneratedFileShape[] = [
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.SvelteCell,
        contents: 'svelte cell'
      }),
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.SvelteComponent,
        contents: 'svelte component'
      }),
      Object({
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.SvelteMain,
        contents: 'svelte main'
      })
    ];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(svelteMockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('Svelte')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - Svelte Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files['package.json'].replace(/\n|\s/g, '')).toBe(
        `{"name":"SDuXSveltePipelineBuilderDemo","version":"1.0.0","private":true,"type":"module","scripts":{"start":"vite","dev":"vite","build":"vitebuild","preview":"vitepreview"},"dependencies":{"@sdux-vault/core":"latest","svelte":"^5.28.2","rxjs":"~7.8.0"},"devDependencies":{"@sveltejs/vite-plugin-svelte":"^5.0.3","typescript":"~5.9.2","vite":"^6.3.3"}}`
      );

      expect(expectedProject.files['tsconfig.json'].replace(/\n|\s/g, '')).toBe(
        '{"compilerOptions":{"target":"ES2022","module":"ESNext","moduleResolution":"bundler","strict":true,"noImplicitReturns":true,"forceConsistentCasingInFileNames":true,"noFallthroughCasesInSwitch":true,"skipLibCheck":true,"isolatedModules":true,"esModuleInterop":true,"verbatimModuleSyntax":true},"include":["src","vite.config.ts"]}'
      );

      expect(
        expectedProject.files['vite.config.ts'].replace(/\n|\s/g, '')
      ).toBe(
        `import{svelte}from'@sveltejs/vite-plugin-svelte';import{defineConfig}from'vite';exportdefaultdefineConfig({plugins:[svelte()]});`
      );

      expect(
        expectedProject.files['svelte.config.js'].replace(/\n|\s/g, '')
      ).toBe(
        `import{vitePreprocess}from'@sveltejs/vite-plugin-svelte';exportdefault{preprocess:vitePreprocess()};`
      );

      expect(expectedProject.files['index.html'].replace(/\n|\s/g, '')).toBe(
        '<!doctypehtml><htmllang="en"><head><metacharset="utf-8"/><title>SDuXSveltePipelineBuilderDemo</title><metaname="viewport"content="width=device-width,initial-scale=1"/></head><body><divid="app"></div><scripttype="module"src="/src/main.ts"></script></body></html>'
      );

      expect(expectedProject.files['src/styles.css']).toBe('');

      expect(expectedProject.files['src/main.ts']).toBe('svelte main');

      expect(expectedProject.files['src/app/example.cell.ts']).toBe(
        'svelte cell'
      );

      expect(expectedProject.files['src/app/ExampleView.svelte']).toBe(
        'svelte component'
      );

      expect(
        Object.entries(expectedProject.files).map(([fileName]) => fileName)
      ).toEqual([
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'svelte.config.js',
        'index.html',
        'src/styles.css',
        'src/main.ts',
        'src/app/example.cell.ts',
        'src/app/ExampleView.svelte'
      ]);
    });
  });

  describe('TypeScript', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(mockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('TypeScript')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - TypeScript Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files).toEqual(Object({}));
    });
  });

  describe('Other', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles: signal(mockFiles)
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('Other')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should open the stackblitz project', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      service.buildProject();

      const convertedProject = structuredClone(expectedProject);
      delete convertedProject.files;

      expect(convertedProject).toEqual(
        Object({
          title: 'SDuX Pipeline Builder - Other Demo',
          template: 'node'
        })
      );

      expect(options).toEqual(
        Object({
          newWindow: true
        })
      );

      expect(expectedProject.files).toEqual(Object({}));
    });
  });

  describe('Regression: reads generated files fresh on each build', () => {
    const generatedFiles = signal<GeneratedFileShape[]>([
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.VueCell,
        contents: 'stale vue cell'
      }),
      Object({
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.VueComponent,
        contents: 'stale vue component'
      }),
      Object({
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.VueMain,
        contents: 'stale vue main'
      })
    ]);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule],
        providers: [
          {
            provide: PipelineFileBuilderService,
            useValue: {
              generatedFiles
            }
          },
          {
            provide: PipelineBuilderService,
            useValue: {
              getStateFramework: signal('Vue')
            }
          }
        ]
      }).compileComponents();

      service = TestBed.inject(StackBlitzService);
    });

    it('should use files updated after the service is constructed', () => {
      spyOn(StackBlitzSDK, 'openProject').and.callFake(
        (inputProject, inputOptions) => {
          expectedProject = inputProject;
          options = inputOptions;
        }
      );

      // Update the computed AFTER StackBlitzService has been constructed. A
      // stale one-time snapshot of generatedFiles() would still emit the
      // original 'stale ...' contents here.
      generatedFiles.set([
        Object({
          type: FileTypes.Simple,
          stackBlitzFileType: StackblitzFileTypes.VueCell,
          contents: 'fresh vue cell'
        }),
        Object({
          type: FileTypes.Simple,
          stackBlitzFileType: StackblitzFileTypes.VueComponent,
          contents: 'fresh vue component'
        }),
        Object({
          type: FileTypes.All,
          stackBlitzFileType: StackblitzFileTypes.VueMain,
          contents: 'fresh vue main'
        })
      ]);

      service.buildProject();

      expect(expectedProject.files['src/main.ts']).toBe('fresh vue main');

      expect(expectedProject.files['src/app/example.cell.ts']).toBe(
        'fresh vue cell'
      );

      expect(expectedProject.files['src/app/ExampleView.vue']).toBe(
        'fresh vue component'
      );
    });
  });
});
