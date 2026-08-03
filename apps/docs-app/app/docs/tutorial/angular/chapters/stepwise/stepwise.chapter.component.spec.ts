import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { StepwiseChapterComponent } from './stepwise.chapter.component';

describe('Component: StepwiseChapterComponent', () => {
  let fixture: ComponentFixture<StepwiseChapterComponent>;
  let component: StepwiseChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepwiseChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StepwiseChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-stepwise.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 14: Stepwise Pipeline',
          id: 'stepwise-tutorial',
          exampleName: 'stepwise-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the generated app.config file for the chapter example', () => {
    expect(component.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated service file for the chapter example', () => {
    expect(component.serviceFiles()).toEqual([
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'component',
        fileName: 'example.component.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the complete chapter files for the tutorial source viewer', () => {
    expect(component.chapterFiles()).toEqual([
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
        type: 'serviceSpec',
        fileName: 'example.service.spec.ts',
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
