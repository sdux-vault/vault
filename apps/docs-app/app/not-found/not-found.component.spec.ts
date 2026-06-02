import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { NotFoundComponent } from './not-found.component';

describe('Component: NotFound', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, sduxTestingModule]
    }).compileComponents();

    meta = TestBed.inject(Meta);
    fixture = TestBed.createComponent(NotFoundComponent);

    fixture.detectChanges();
  });

  afterEach(() => {
    meta.removeTag('name="robots"');
  });

  it('should render the page', () => {
    const span = fixture.nativeElement.querySelector('.title');
    expect(span.textContent.trim()).toBe('404 - Page Not Found');
  });

  it('should render the injected catchPhrase', () => {
    const span = fixture.nativeElement.querySelector('.logo-block');
    expect(span.textContent.trim()).toBe('Mock CP');
  });

  it('should add a noindex robots meta tag on init', () => {
    const tag = meta.getTag('name="robots"');
    expect(tag).toBeTruthy();
    expect(tag?.getAttribute('content')).toBe('noindex');
  });

  it('should remove the robots meta tag on destroy', () => {
    fixture.destroy();
    const tag = meta.getTag('name="robots"');
    expect(tag).toBeNull();
  });
});
