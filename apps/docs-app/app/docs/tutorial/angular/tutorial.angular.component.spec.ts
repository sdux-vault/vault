import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { of } from 'rxjs';
import { TutorialAngularComponent } from './tutorial.angular.component';

describe('Component: TutorialAngularComponent', () => {
  let fixture: ComponentFixture<TutorialAngularComponent>;
  let component: TutorialAngularComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialAngularComponent, sduxTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: { fragment: of(null) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialAngularComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('expands the selected chapter and collapses the other chapters', () => {
    component.selectTutorialChapter(2);

    expect(component.isTutorialGroupExpanded(1)).toBeFalse();
    expect(component.isTutorialGroupExpanded(2)).toBeTrue();
    expect(component.isChapterExpanded(1)).toBeFalse();
    expect(component.isChapterExpanded(2)).toBeTrue();
  });
});
