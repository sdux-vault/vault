import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DelayChapterComponent } from './delay.chapter.component';

describe('Component: DelayChapterComponent', () => {
  let fixture: ComponentFixture<DelayChapterComponent>;
  let component: DelayChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DelayChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-10-delay.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata for the delay tutorial', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 10: Delay Controller',
          id: 'delay-tutorial',
          exampleName: 'delay-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the appConfig files', () => {
    expect(component.appConfigFile()).toEqual([
      {
        type: 'appConfig',
        fileName: 'app.config.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the timing files', () => {
    expect(component.timingFiles()).toEqual([
      {
        type: 'timer',
        fileName: 'example.elapsed-timer.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'timerSpec',
        fileName: 'example.elapsed-timer.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the service files', () => {
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

  it('returns the component files', () => {
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

  it('returns the html files', () => {
    expect(component.htmlFiles()).toEqual([
      {
        type: 'html',
        fileName: 'example.component.html',
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
        type: 'timer',
        fileName: 'example.elapsed-timer.ts',
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
        type: 'timerSpec',
        fileName: 'example.elapsed-timer.spec.ts',
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
