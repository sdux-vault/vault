// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter')
    ],
    client: {
      jasmine: {
        random: false
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '..', '..', 'coverage'),
      subdir: 'core',
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      watermarks: {
        statements: [90, 100],
        functions: [90, 100],
        branches: [90, 100],
        lines: [90, 100]
      },
      check: {
        emitWarning: false,
        global: {
          statements: 100,
          branches: 100,
          lines: 100,
          functions: 100,
          excludes: []
        }
      }
    },
    reportSlowerThan: 1000,
    reporters: ['progress', 'kjhtml'],
    // reporters: ['progress', 'kjhtml', 'spec'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};
