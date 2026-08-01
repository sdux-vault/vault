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
      '/assets/tutorial/sdux-delay.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata for the delay tutorial', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 9: Delay Controller',
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

  it('returns the configuration files', () => {
    expect(component.configurationFiles()).toEqual([
      {
        type: 'timer',
        fileName: 'example.elapsed-timer.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'appConfig',
        fileName: 'app.config.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the timing files', () => {
    expect(component.timingFiles()).toEqual([
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
      }
    ]);
  });

  it('returns the completed example files', () => {
    expect(component.completedFiles().map(({ type }) => type)).toEqual([
      'timer',
      'timerSpec',
      'appConfig',
      'service',
      'serviceSpec',
      'component',
      'componentSpec',
      'html'
    ]);
  });
});
