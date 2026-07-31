import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StackblitzExampleService } from '../../../../../stack-blitz/services/stackblitz-example.service';
import { StackBlitzExampleLanguageShape } from '../../../../../stack-blitz/shapes/stackblitz-example.language.shape';
import { StackBlitzExampleShape } from '../../../../../stack-blitz/shapes/stackblitz-example.shape';
import { ExampleFileService } from '../../../../services/example-file.service';
import { ExampleFileShape } from '../../../../shape/example-file.shape';
import { ExampleFileTypes } from '../../../../types/example-file.type';
import { DisplayCharactersService } from './display-characters.service';

describe('Service: DisplayCharactersService', () => {
  let service: DisplayCharactersService;
  let stackblitzServiceSpy: jasmine.SpyObj<StackblitzExampleService>;
  let exampleFileServiceSpy: jasmine.SpyObj<ExampleFileService>;

  beforeEach(() => {
    stackblitzServiceSpy = jasmine.createSpyObj<StackblitzExampleService>(
      'StackblitzExampleService',
      ['getExample']
    );
    exampleFileServiceSpy = jasmine.createSpyObj<ExampleFileService>(
      'ExampleFileService',
      ['getFile']
    );

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        DisplayCharactersService,
        { provide: StackblitzExampleService, useValue: stackblitzServiceSpy },
        { provide: ExampleFileService, useValue: exampleFileServiceSpy }
      ]
    });

    service = TestBed.inject(DisplayCharactersService);
  });

  it('returns the chapter metadata for the display-characters tutorial', () => {
    expect(service.getChapter()).toEqual({
      id: 2,
      label: 'Multi-select Chapter',
      fragment: 'chapter-2',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ]
    });
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    const example: StackBlitzExampleShape = {
      title: 'Display Characters',
      id: 'display-characters',
      exampleName: 'display-characters',
      description: 'A multi-select read example.',
      displayCopyIcon: true,
      languages: [
        { name: 'React', key: 'react' },
        { name: 'Angular', key: 'angular' }
      ]
    };

    stackblitzServiceSpy.getExample.and.returnValue(example);

    expect(service.displayCharactersStackblitz()).toEqual({
      example,
      language: { name: 'Angular', key: 'angular' }
    });
    expect(stackblitzServiceSpy.getExample).toHaveBeenCalledOnceWith(
      'display-characters'
    );
  });

  it('falls back to an empty language object when the example has no angular language', () => {
    const example: StackBlitzExampleShape = {
      title: 'Display Characters',
      id: 'display-characters',
      exampleName: 'display-characters',
      description: 'A multi-select read example.',
      displayCopyIcon: true,
      languages: [{ name: 'Vue', key: 'vue' }]
    };

    stackblitzServiceSpy.getExample.and.returnValue(example);

    const stackblitz = service.displayCharactersStackblitz();

    expect(stackblitz.example).toEqual(example);
    expect(stackblitz.language).toEqual({} as StackBlitzExampleLanguageShape);
  });

  it('falls back to empty StackBlitz metadata when no example is registered', () => {
    stackblitzServiceSpy.getExample.and.returnValue(undefined);

    const stackblitz = service.displayCharactersStackblitz();

    expect(stackblitz.example).toEqual({} as StackBlitzExampleShape);
    expect(stackblitz.language).toEqual({} as StackBlitzExampleLanguageShape);
  });

  it('returns the generated component, html, and spec files for the chapter example', () => {
    const componentFile: ExampleFileShape = {
      type: 'component',
      fileName: 'example.component.ts',
      source: 'component source'
    };
    const htmlFile: ExampleFileShape = {
      type: 'html',
      fileName: 'example.component.html',
      source: 'html source'
    };
    const specFile: ExampleFileShape = {
      type: 'componentSpec',
      fileName: 'example.component.spec.ts',
      source: 'spec source'
    };

    exampleFileServiceSpy.getFile.and.returnValues(
      componentFile,
      htmlFile,
      specFile
    );

    expect(service.displayCharactersFiles()).toEqual([
      componentFile,
      htmlFile,
      specFile
    ]);
    expect(exampleFileServiceSpy.getFile.calls.allArgs()).toEqual([
      [jasmine.any(Array), ExampleFileTypes.Component],
      [jasmine.any(Array), ExampleFileTypes.Html],
      [jasmine.any(Array), ExampleFileTypes.ComponentSpec]
    ]);
  });
});
