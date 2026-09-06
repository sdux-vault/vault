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

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-add-edit-characters.tutorial.zip'
    );
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

  it('returns the generated character domain file for the chapter example', () => {
    expect(component.characterDomainFile()).toEqual({
      type: 'characterDomain',
      fileName: 'example.character-domain.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated service file for the chapter example', () => {
    expect(component.serviceFile()).toEqual({
      type: 'service',
      fileName: 'example.service.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated character editor file for the chapter example', () => {
    expect(component.characterEditorFile()).toEqual({
      type: 'characterEditor',
      fileName: 'example.character-editor.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated component file for the chapter example', () => {
    expect(component.componentFile()).toEqual({
      type: 'component',
      fileName: 'example.component.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated html file for the chapter example', () => {
    expect(component.htmlFile()).toEqual({
      type: 'html',
      fileName: 'example.component.html',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns all files for the chapter example', () => {
    expect(component.allFiles()).toEqual([
      {
        type: 'appConfig',
        fileName: 'app.config.ts',
        source: jasmine.any(String) as unknown as string
      },
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
      },
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
