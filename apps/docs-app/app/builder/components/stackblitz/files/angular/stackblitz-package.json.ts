export const PACKAGE_JSON_FILE = {
  name: 'SDuX Angular Pipeline Builder Demo',
  version: '1.0.0',
  private: true,
  scripts: {
    start: 'ng serve --host 0.0.0.0 --port 4200'
  },
  dependencies: {
    '@angular/cdk': '21.2.5',
    '@angular/cli': '21.2.5',
    '@angular/common': '21.2.8',
    '@angular/compiler': '21.2.8',
    '@angular/core': '21.2.8',
    '@angular/platform-browser': '21.2.8',
    '@sdux-vault/angular': 'latest',
    rxjs: '~7.8.0',
    tslib: '^2.3.0'
  },
  devDependencies: {
    '@angular/build': '^21.2.6',
    '@angular/compiler-cli': '21.2.8',
    typescript: '~5.9.2'
  }
};
