import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharactersChapterComponent } from './display-characters.chapter.component';

describe('Component: DisplayCharactersChapterComponent', () => {
  let fixture: ComponentFixture<DisplayCharactersChapterComponent>;
  let component: DisplayCharactersChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCharactersChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCharactersChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-03-display-characters.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 3: Display Characters',
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
    expect(component.files()).toEqual([
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
      }
    ]);
  });
});
