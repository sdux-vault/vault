import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AsyncInputChapterComponent } from './async-input.chapter.component';

describe('Component: AsyncInputChapterComponent', () => {
  let fixture: ComponentFixture<AsyncInputChapterComponent>;
  let component: AsyncInputChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncInputChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncInputChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  const file = (type: string, fileName: string) =>
    jasmine.objectContaining({ type, fileName });

  it('returns the Angular StackBlitz metadata for the async input example', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 8: Async Input',
          id: 'async-input-tutorial',
          exampleName: 'async-input-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the hydration teaching files', () => {
    expect(component.hydrationFiles()).toEqual([
      file('hydrate', 'example.hydrate.ts'),
      file('service', 'example.service.ts'),
      file('component', 'example.component.ts')
    ]);
  });

  it('returns the Promise teaching files', () => {
    expect(component.promiseFiles()).toEqual([
      file('promise', 'example.promise.ts'),
      file('service', 'example.service.ts'),
      file('component', 'example.component.ts'),
      file('html', 'example.component.html')
    ]);
  });

  it('returns the Observable teaching files', () => {
    expect(component.observableFiles()).toEqual([
      file('observable', 'example.observable.ts'),
      file('service', 'example.service.ts'),
      file('component', 'example.component.ts'),
      file('html', 'example.component.html')
    ]);
  });

  it('returns the HTTP Resource teaching files', () => {
    expect(component.httpResourceFiles()).toEqual([
      file('httpResource', 'example.http-resource.ts'),
      file('service', 'example.service.ts'),
      file('component', 'example.component.ts'),
      file('html', 'example.component.html')
    ]);
  });

  it('returns the complete async input source files', () => {
    expect(component.componentFiles()).toEqual([
      file('httpResource', 'example.http-resource.ts'),
      file('httpResourceSpec', 'example.http-resource.spec.ts'),
      file('observable', 'example.observable.ts'),
      file('observableSpec', 'example.observable.spec.ts'),
      file('promise', 'example.promise.ts'),
      file('promiseSpec', 'example.promise.spec.ts'),
      file('hydrate', 'example.hydrate.ts'),
      file('hydrateSpec', 'example.hydrate.spec.ts'),
      file('service', 'example.service.ts'),
      file('serviceSpec', 'example.service.spec.ts'),
      file('component', 'example.component.ts'),
      file('componentSpec', 'example.component.spec.ts'),
      file('html', 'example.component.html')
    ]);
  });
});
