import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AddEditCharactersService } from './add-edit-characters.service';

describe('Service: AddEditCharactersService', () => {
  let service: AddEditCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), AddEditCharactersService]
    });

    service = TestBed.inject(AddEditCharactersService);
  });

  it('returns the chapter metadata for the add-edit-characters tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 3,
      label: 'Add/Edit Chapter',
      fragment: 'chapter-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ]
    });
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(service.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 3: Add/Edit Characters',
          id: 'add-edit-characters',
          exampleName: 'add-edit-characters-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the appConfig files for the chapter example', () => {
    expect(service.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated service files for the chapter example', () => {
    expect(service.serviceFiles()).toEqual([
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'serviceSpec',
        fileName: 'example.service.spec.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterDomain',
        fileName: 'example.character-domain.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterDomainSpec',
        fileName: 'example.character-domain.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the generated component files for the chapter example', () => {
    expect(service.componentFiles()).toEqual([
      {
        type: 'component',
        fileName: 'example.component.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'componentSpec',
        fileName: 'example.component.spec.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterEditor',
        fileName: 'example.character-editor.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterEditorSpec',
        fileName: 'example.character-editor.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });
});
