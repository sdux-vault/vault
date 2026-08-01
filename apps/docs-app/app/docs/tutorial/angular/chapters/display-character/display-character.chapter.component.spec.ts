import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharacterChapterComponent } from './display-character.chapter.component';

describe('Component: DisplayCharacterChapterComponent', () => {
  let fixture: ComponentFixture<DisplayCharacterChapterComponent>;
  let component: DisplayCharacterChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCharacterChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCharacterChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-display-character.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 1: Display Character',
          id: 'display-character',
          exampleName: 'display-character-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the main source file for the chapter example', () => {
    expect(component.mainSourceFile()).toEqual({
      type: 'main',
      fileName: 'main.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the star wars character shape file for the chapter example', () => {
    expect(component.starWarsCharacterFile()).toEqual({
      type: 'shape',
      fileName: 'star-wars-character.shape.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the registered feature cell component file for the chapter example', () => {
    expect(component.registeredFeatureCellService()).toEqual({
      type: 'service',
      fileName: 'example.service.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the initial service source for the chapter example', () => {
    expect(component.initialServiceSource()).toContain('example.service.ts');
  });

  it('returns the initial app config source for the chapter example', () => {
    expect(component.initialAppConfigSource()).toContain('app.config.ts');
  });

  it('returns the initial app config source for the chapter example', () => {
    expect(component.initialAppConfigSource()).toContain('app.config.ts');
  });

  it('returns the generated component, html, and spec files for the chapter example', () => {
    expect(component.initialComponentAndHtmlFiles()).toEqual([
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
        type: 'scss',
        fileName: 'example.component.scss',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'componentSpec',
        fileName: 'example.component.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the generated component, html, and spec files for the chapter example', () => {
    expect(component.displayCharacterSource).toEqual([
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
