import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DistinctUntilChangedChapterComponent } from './distinct-until-changed.chapter.component';

describe('Component: DistinctUntilChangedChapterComponent', () => {
  let component: DistinctUntilChangedChapterComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistinctUntilChangedChapterComponent, sduxTestingModule]
    }).compileComponents();
    const fixture: ComponentFixture<DistinctUntilChangedChapterComponent> =
      TestBed.createComponent(DistinctUntilChangedChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('exposes the tutorial metadata and source files', () => {
    expect(component.downloadUrl).toBe(
      '/assets/tutorial/sdux-distinct-until-changed.tutorial.zip'
    );
    expect(component.stackblitz().example.id).toBe(
      'distinct-until-changed-tutorial'
    );
    expect(component.serviceFiles().map((file) => file.type)).toEqual([
      'service',
      'serviceSpec'
    ]);
    expect(component.componentFiles().map((file) => file.type)).toEqual([
      'component',
      'html',
      'componentSpec'
    ]);
  });
});
