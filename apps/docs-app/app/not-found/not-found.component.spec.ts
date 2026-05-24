import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { NotFoundComponent } from './not-found.component';

describe('Component: NotFound', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);

    fixture.detectChanges();
  });

  it('should render the page', () => {
    const span = fixture.nativeElement.querySelector('.title');
    expect(span.textContent.trim()).toBe('404 - Page Not Found');
  });

  it('should render the injected catchPhrase', () => {
    const span = fixture.nativeElement.querySelector('.logo-block');
    expect(span.textContent.trim()).toBe('Mock CP');
  });
});
