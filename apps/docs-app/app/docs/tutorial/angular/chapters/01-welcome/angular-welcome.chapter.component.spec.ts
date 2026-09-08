import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AngularWelcomeChapterComponent } from './angular-welcome.chapter.component';

describe('Component: AngularWelcomeChapter', () => {
  let fixture: ComponentFixture<AngularWelcomeChapterComponent>;
  let component: AngularWelcomeChapterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularWelcomeChapterComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AngularWelcomeChapterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('exposes the verifiedEnvironment', () => {
    expect(component['verifiedEnvironment']).toEqual(Object({}));
  });
});
