import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { VaultBrandNameComponent } from './vault-brand-name.component';

describe('Component: VaultBrandName', () => {
  let fixture: ComponentFixture<VaultBrandNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultBrandNameComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultBrandNameComponent);
    fixture.detectChanges();
  });

  it('should render the injected brand names', () => {
    const span = fixture.nativeElement.querySelector('.vault-brand-name');
    expect(span.textContent).toContain('Mock VBN');
  });

  it('should render trademark by default', () => {
    const sup = fixture.nativeElement.querySelector('.trademark');

    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.vault-brand-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockVBN');
  });

  it('should not render trademark when tm input is false', () => {
    fixture.componentRef.setInput('tm', false);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.vault-brand-name');
    expect(span.textContent.trim()).toBe('Mock VBN');
  });

  it('should render trademark when tm input is set to true explicitly', () => {
    fixture.componentRef.setInput('tm', true);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeTruthy();
    expect(sup.textContent).toBe('™');

    const span = fixture.nativeElement.querySelector('.vault-brand-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockVBN™');
  });
});
