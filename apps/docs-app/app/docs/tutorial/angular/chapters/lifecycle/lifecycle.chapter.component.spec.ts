import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { LifecycleChapterComponent } from './lifecycle.chapter.component';

describe('Component: LifecycleChapterComponent', () => {
  let fixture: ComponentFixture<LifecycleChapterComponent>;
  let component: LifecycleChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 5: Lifecycle',
          id: 'lifecycle',
          exampleName: 'lifecycle-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
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
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });
});
