import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { PackageNameComponent } from './package-name.component';

describe('Component: PackageName', () => {
  let fixture: ComponentFixture<PackageNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageNameComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PackageNameComponent);
    fixture.detectChanges();
  });

  it('should render the injected package name', () => {
    const span = fixture.nativeElement.querySelector('.package-name');
    expect(span.textContent).toContain('Mock PN');
  });

  it('should render trademark by default', () => {
    const sup = fixture.nativeElement.querySelector('.package-trademark');
    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.package-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockPN');
  });

  it('should omit the package suffix when the optional input is not provided', () => {
    expect(fixture.componentInstance.getPackage()).toBe('');

    const span = fixture.nativeElement.querySelector('.package-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockPN');
  });

  it('should render the optional package suffix', () => {
    fixture.componentRef.setInput('package', 'addons');
    fixture.detectChanges();

    expect(fixture.componentInstance.getPackage()).toBe('/addons');

    const span = fixture.nativeElement.querySelector('.package-name');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockPN/addons');
  });

  it('should omit the package suffix when the optional input is empty', () => {
    fixture.componentRef.setInput('package', '');
    fixture.detectChanges();

    expect(fixture.componentInstance.getPackage()).toBe('');
  });
});
