import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { ErrorsChapterComponent } from './errors.chapter.component';

describe('Component: ErrorsChapterComponent', () => {
  let fixture: ComponentFixture<ErrorsChapterComponent>;
  let component: ErrorsChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorsChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorsChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-errors.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 7: Errors',
          id: 'errors-tutorial',
          exampleName: 'errors-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the app config file for the chapter example', () => {
    expect(component.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the service and filter files for the chapter example', () => {
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

  it('returns the component files for the chapter example', () => {
    expect(component.componentFiles()).toEqual([
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
