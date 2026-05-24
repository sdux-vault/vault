import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { BrandNameComponent } from './brand-name.component';

describe('Component: BrandName', () => {
  let fixture: ComponentFixture<BrandNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandNameComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandNameComponent);
    fixture.detectChanges();
  });

  it('should render the injected brand name', () => {
    const span = fixture.nativeElement.querySelector('.brand-name');
    expect(span.textContent).toContain('Mock BN');
  });

  it('should render trademark by default', () => {
    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.brand-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockBN');
  });

  it('should not render trademark when trademark input is false', async () => {
    fixture.componentRef.setInput('tm', false);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeNull();
  });

  it('should render trademark when trademark input is true', async () => {
    fixture.componentRef.setInput('tm', true);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeTruthy();
    expect(sup.textContent).toBe('™');

    const span = fixture.nativeElement.querySelector('.brand-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockBN™');
  });
});
