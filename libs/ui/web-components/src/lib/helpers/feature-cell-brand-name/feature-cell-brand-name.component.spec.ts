import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { FeatureCellBrandNameComponent } from './feature-cell-brand-name.component';

describe('Component: FeatureCellBrandName', () => {
  let fixture: ComponentFixture<FeatureCellBrandNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCellBrandNameComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCellBrandNameComponent);
    fixture.detectChanges();
  });

  // ---------------------------------------------------------
  // Injection + Default Rendering
  // ---------------------------------------------------------

  it('should render injected feature cell brand name', () => {
    const span = fixture.nativeElement.querySelector(
      '.feature-cell-brand-name'
    );
    expect(span).toBeTruthy();
    expect(span.textContent).toContain('Mock FC');
  });

  // ---------------------------------------------------------
  // Default Branch (tm() === true)
  // ---------------------------------------------------------

  it('should render trademark by default', () => {
    const sup = fixture.nativeElement.querySelector('.trademark');

    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector(
      '.feature-cell-brand-name'
    );
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockFC');
  });

  // ---------------------------------------------------------
  // Else Branch (tm() === false)
  // ---------------------------------------------------------

  it('should not render trademark when tm input is false', () => {
    fixture.componentRef.setInput('tm', false);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector(
      '.feature-cell-brand-name'
    );
    expect(span.textContent.trim()).toBe('Mock FC');
  });

  // ---------------------------------------------------------
  // Explicit True (Signal Update Path Coverage)
  // ---------------------------------------------------------

  it('should render trademark when tm input is set to true explicitly', () => {
    fixture.componentRef.setInput('tm', true);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeTruthy();
    expect(sup.textContent).toBe('™');

    const span = fixture.nativeElement.querySelector(
      '.feature-cell-brand-name'
    );
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockFC™');
  });
});
