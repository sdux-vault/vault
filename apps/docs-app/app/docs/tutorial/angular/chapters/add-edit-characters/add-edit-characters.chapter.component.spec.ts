import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AddEditCharactersChapterComponent } from './add-edit-characters.chapter.component';

describe('Component: AddEditCharactersChapterComponent', () => {
  let fixture: ComponentFixture<AddEditCharactersChapterComponent>;
  let component: AddEditCharactersChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCharactersChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditCharactersChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
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
    expect(component.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated service files for the chapter example', () => {
    expect(component.serviceFiles()).toEqual([
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
    expect(component.componentFiles()).toEqual([
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
