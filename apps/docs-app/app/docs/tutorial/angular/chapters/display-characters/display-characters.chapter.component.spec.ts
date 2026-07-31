import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharactersChapterComponent } from './display-characters.chapter.component';

describe('Component: DisplayCharactersChapterComponent', () => {
  let fixture: ComponentFixture<DisplayCharactersChapterComponent>;
  let component: DisplayCharactersChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCharactersChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCharactersChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 2: Display Characters',
          id: 'display-characters',
          exampleName: 'display-characters-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the generated component, html, and spec files for the chapter example', () => {
    expect(component.files()).toEqual([
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
