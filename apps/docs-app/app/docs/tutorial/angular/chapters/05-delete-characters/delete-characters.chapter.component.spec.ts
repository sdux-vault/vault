import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DeleteCharactersChapterComponent } from './delete-characters.chapter.component';

describe('Component: DeleteCharactersChapterComponent', () => {
  let fixture: ComponentFixture<DeleteCharactersChapterComponent>;
  let component: DeleteCharactersChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCharactersChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCharactersChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-05-delete-characters.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 5: Delete Characters',
          id: 'delete-characters',
          exampleName: 'delete-characters-example',
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
      }
    ]);
  });

  it('returns the generated html file for the chapter example', () => {
    expect(component.htmlFile()).toEqual({
      type: 'html',
      fileName: 'example.component.html',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns all files for the chapter example', () => {
    expect(component.allFilesSource).toEqual([
      {
        type: 'component',
        fileName: 'example.component.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: jasmine.any(String) as any
      },
      {
        type: 'scss',
        fileName: 'example.component.scss',
        source: jasmine.any(String) as any
      },
      {
        type: 'main',
        fileName: 'main.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'appConfig',
        fileName: 'app.config.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'constant',
        fileName: 'star-wars-character.constant.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'shape',
        fileName: 'star-wars-character.shape.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'componentSpec',
        fileName: 'example.component.spec.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'serviceSpec',
        fileName: 'example.service.spec.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'characterDomain',
        fileName: 'example.character-domain.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'characterDomainSpec',
        fileName: 'example.character-domain.spec.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'characterEditor',
        fileName: 'example.character-editor.ts',
        source: jasmine.any(String) as any
      },
      {
        type: 'characterEditorSpec',
        fileName: 'example.character-editor.spec.ts',
        source: jasmine.any(String) as any
      }
    ]);
  });
});
