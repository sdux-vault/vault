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

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-async-input.tutorial.zip'
    );
  });

  const file = (type: string, fileName: string) =>
    jasmine.objectContaining({ type, fileName });

  it('returns the Angular StackBlitz metadata for the async input example', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 9: Async Input',
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
      file('hydrateSpec', 'example.hydrate.spec.ts')
    ]);
  });

  it('returns the service teaching files', () => {
    expect(component.serviceFiles()).toEqual([
      file('service', 'example.service.ts'),
      file('serviceSpec', 'example.service.spec.ts')
    ]);
  });

  it('returns the Promise teaching files', () => {
    expect(component.promiseFiles()).toEqual([
      file('promise', 'example.promise.ts')
    ]);
  });

  it('returns the Observable teaching files', () => {
    expect(component.observableFiles()).toEqual([
      file('observable', 'example.observable.ts')
    ]);
  });

  it('returns the Promise teaching files', () => {
    expect(component.promiseFiles()).toEqual([
      file('promise', 'example.promise.ts')
    ]);
  });

  it('returns the Observable teaching files', () => {
    expect(component.observableFiles()).toEqual([
      file('observable', 'example.observable.ts')
    ]);
  });

  it('returns the HTTP Resource teaching files', () => {
    expect(component.httpResourceFiles()).toEqual([
      file('httpResource', 'example.http-resource.ts')
    ]);
  });

  it('returns the HTML teaching files', () => {
    expect(component.htmlFiles()).toEqual([
      file('html', 'example.component.html')
    ]);
  });

  it('returns the complete async input source files', () => {
    expect(component.componentFiles()).toEqual([
      file('component', 'example.component.ts'),
      file('componentSpec', 'example.component.spec.ts')
    ]);
  });

  it('returns the all source files', () => {
    expect(component.allFilesSource).toEqual([
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('component', 'example.component.ts'),
      file('componentSpec', 'example.component.spec.ts')
    ]);
  });
});
