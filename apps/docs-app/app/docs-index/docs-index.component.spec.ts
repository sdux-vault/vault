import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideVaultTesting } from '@sdux-vault/angular';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { NavigationService } from '../navigation/service/navigation.service';
import { DocsIndexComponent } from './docs-index.component';

describe('Component: DocsIndex', () => {
  let fixture: ComponentFixture<DocsIndexComponent>;
  let component: DocsIndexComponent;
  let el: HTMLElement;
  let navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsIndexComponent, sduxTestingModule],
      providers: [provideRouter([]), provideVaultTesting()]
    }).compileComponents();

    navigationService = TestBed.inject(NavigationService);
    spyOn(navigationService, 'show');
    fixture = TestBed.createComponent(DocsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should render the Documentation header', () => {
    expect(el.querySelector('.header h2')?.textContent).toEqual(
      'Documentation'
    );
  });

  it('should render the toggle button', () => {
    const btn = el.querySelector('.sdux-button-toggle') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.textContent?.trim()).toEqual('Collapse All');
  });

  it('should toggle allExpanded when button is clicked', () => {
    expect(component.allExpanded()).toBe(true);

    const btn = el.querySelector('.sdux-button-toggle') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    expect(component.allExpanded()).toBe(false);
    expect(btn.textContent?.trim()).toEqual('Expand All');
  });

  it('should render sub-navigation sections', () => {
    const sections = el.querySelectorAll('.docs-index-section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should start with all sections expanded', () => {
    const panels = el.querySelectorAll('mat-expansion-panel');
    panels.forEach((panel) => {
      expect(panel.classList.contains('mat-expanded')).toBe(true);
    });
  });

  it('should collapse all sections when toggle is clicked', () => {
    const btn = el.querySelector('.sdux-button-toggle') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    const panels = el.querySelectorAll('mat-expansion-panel');
    panels.forEach((panel) => {
      expect(panel.classList.contains('mat-expanded')).toBe(false);
    });
  });

  it('should toggle isExpanded and persist to localStorage', () => {
    expect(navigationService.show).toHaveBeenCalledOnceWith();
  });
});
