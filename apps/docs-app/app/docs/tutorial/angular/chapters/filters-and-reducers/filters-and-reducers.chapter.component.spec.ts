import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FiltersAndReducersChapterComponent } from './filters-and-reducers.chapter.component';

describe('Component: FiltersAndReducersChapterComponent', () => {
  let fixture: ComponentFixture<FiltersAndReducersChapterComponent>;
  let component: FiltersAndReducersChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersAndReducersChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersAndReducersChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 6: Filters and Reducers',
          id: 'filters-and-reducers',
          exampleName: 'filters-and-reducers-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the filter-stage files for the chapter example', () => {
    expect(component.filterFiles()).toEqual([
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'serviceSpec',
        fileName: 'example.service.spec.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'filter',
        fileName: 'example.filter.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });

  it('returns the reducer-stage files for the chapter example', () => {
    expect(component.reducerFiles()).toEqual([
      {
        type: 'service',
        fileName: 'example.service.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterDomain',
        fileName: 'example.character-domain.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterDomainSpec',
        fileName: 'example.character-domain.spec.ts',
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
      },
      {
        type: 'characterEditor',
        fileName: 'example.character-editor.ts',
        source: jasmine.any(String) as unknown as string
      },
      {
        type: 'characterEditorSpec',
        fileName: 'example.character-editor.spec.ts',
        source: jasmine.any(String) as unknown as string
      }
    ]);
  });
});
