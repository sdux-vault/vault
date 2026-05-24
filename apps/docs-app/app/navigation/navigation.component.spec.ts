import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { NavigationComponent } from './navigation.component';

// --- Begin Tests ---
describe('Component: NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have a brandname', () => {
    expect(component.brandName).toBe('Mock BN');
  });

  it('should have a vault brandname', () => {
    expect(component.vaultBrandName).toBe('Mock VBN');
  });
});
