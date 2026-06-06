import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpsellNoticeComponent } from './upsell-notice.component';

describe('UpsellNoticeComponent', () => {
  let component: UpsellNoticeComponent;
  let fixture: ComponentFixture<UpsellNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsellNoticeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UpsellNoticeComponent);
    fixture.componentRef.setInput('headline', 'Unlock this feature with a');
    fixture.componentRef.setInput('body', 'Description of the feature.');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the headline', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Unlock this feature with a');
  });

  it('should render the body', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Description of the feature.');
  });

  it('should render the buy now link', () => {
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.buy-now-btn');
    expect(link).toBeTruthy();
    expect(link.href).toContain('sdux-vault.com/dashboard');
    expect(link.target).toBe('_blank');
  });
});
