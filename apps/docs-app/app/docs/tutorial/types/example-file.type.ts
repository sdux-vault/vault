/**
 * Enumerates the generated tutorial source file categories supported by the docs application.
 */
export const ExampleFileTypes = {
  AppConfig: 'appConfig',
  Component: 'component',
  ComponentSpec: 'componentSpec',
  Constant: 'constant',
  Filter: 'filter',
  Html: 'html',
  HttpResource: 'httpResource',
  HttpResourceSpec: 'httpResourceSpec',
  Hydrate: 'hydrate',
  Observable: 'observable',
  ObservableSpec: 'observableSpec',
  Promise: 'promise',
  PromiseSpec: 'promiseSpec',
  Scss: 'scss',
  Service: 'service',
  ServiceSpec: 'serviceSpec',
  Shape: 'shape'
} as const;

/**
 * Represents the allowed generated tutorial source file category values.
 */
export type ExampleFileType =
  (typeof ExampleFileTypes)[keyof typeof ExampleFileTypes];
