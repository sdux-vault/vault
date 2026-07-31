import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharactersService } from './display-characters.service';

describe('Service: DisplayCharactersService', () => {
  let service: DisplayCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DisplayCharactersService]
    });

    service = TestBed.inject(DisplayCharactersService);
  });

  it('returns the chapter metadata for the display-characters tutorial', () => {
    expect(service.chapters()).toEqual({
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
    expect(service.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 2: Display Characters',
          id: 'display-characters',
          exampleName: 'display-characters-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the generated component, html, and spec files for the chapter example', () => {
    expect(service.displayCharactersFiles()).toEqual([
      {
        type: 'component',
        fileName: 'example.component.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'componentSpec',
        fileName: 'example.component.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });
});
