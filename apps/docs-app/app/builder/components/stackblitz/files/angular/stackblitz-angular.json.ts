export const ANGULAR_JSON_FILE = {
  $schema: './node_modules/@angular/cli/lib/config/schema.json',
  version: 1,
  newProjectRoot: 'projects',
  projects: {
    'angular-demo-1': {
      projectType: 'application',
      schematics: {
        '@schematics/angular:component': {
          style: 'scss'
        }
      },
      root: './',
      sourceRoot: './src',
      prefix: 'example',
      architect: {
        build: {
          builder: '@angular/build:application',
          options: {
            browser: './src/main.ts',
            tsConfig: './tsconfig.json',
            index: './src/index.html',
            inlineStyleLanguage: 'scss',
            assets: [
              {
                glob: '**/*',
                input: './public'
              }
            ],
            styles: ['./src/styles.scss']
          },
          configurations: {
            development: {
              optimization: false,
              extractLicenses: false,
              sourceMap: true
            }
          },
          defaultConfiguration: 'development'
        },
        serve: {
          builder: '@angular/build:dev-server',
          configurations: {
            development: {
              buildTarget: 'angular-demo-1:build:development'
            }
          },
          defaultConfiguration: 'development'
        }
      }
    }
  }
};
