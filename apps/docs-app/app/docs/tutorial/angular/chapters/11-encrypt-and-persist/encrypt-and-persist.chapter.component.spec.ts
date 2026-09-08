import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { EncryptAndPersistChapterComponent } from './encrypt-and-persist.chapter.component';

describe('Component: EncryptAndPersistChapterComponent', () => {
  let fixture: ComponentFixture<EncryptAndPersistChapterComponent>;
  let component: EncryptAndPersistChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncryptAndPersistChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EncryptAndPersistChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-11-encrypt-and-persist.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 11: Encrypt and Persist',
          id: 'encrypt-and-persist-tutorial',
          exampleName: 'encrypt-and-persist-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the app config files for the chapter example', () => {
    expect(component.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the service files for the chapter example', () => {
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

  it('returns the generated html file for the chapter example', () => {
    expect(component.htmlFiles()).toEqual([
      {
        type: 'html',
        fileName: 'example.component.html',
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

  it('returns all files for the chapter example', () => {
    expect(component.allSourceFiles).toEqual([
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
        type: 'filter',
        fileName: 'example.filter.ts',
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
