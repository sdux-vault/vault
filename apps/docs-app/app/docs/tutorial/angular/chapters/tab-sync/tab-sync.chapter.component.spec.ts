import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { TabSyncChapterComponent } from './tab-sync.chapter.component';

describe('Component: TabSyncChapterComponent', () => {
  let fixture: ComponentFixture<TabSyncChapterComponent>;
  let component: TabSyncChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSyncChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabSyncChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the tutorial download URL', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-tab-sync.tutorial.zip'
    );
  });

  it('returns the angular StackBlitz metadata when the example includes an angular language', () => {
    expect(component.stackblitz()).toEqual(
      Object({
        example: Object({
          title: 'Chapter 12: Tab Sync',
          id: 'tab-sync-tutorial',
          exampleName: 'tab-sync-tutorial-example',
          displayCopyIcon: false,
          languages: [{ name: 'Angular', key: 'angular' }],
          description: jasmine.any(String) as unknown as string
        }),
        language: Object({ name: 'Angular', key: 'angular' })
      })
    );
  });

  it('returns the app configuration file for the chapter example', () => {
    expect(component.appConfigFile()).toEqual({
      type: 'appConfig',
      fileName: 'app.config.ts',
      source: jasmine.any(String) as unknown as string
    });
  });

  it('returns the generated component files for the chapter example', () => {
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
