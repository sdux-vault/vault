import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { provideVaultTesting } from '@sdux-vault/angular';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { NavigationService } from '../../navigation/service/navigation.service';
import { DevSplashPageComponent } from './dev-splash-page.component';

describe('Component: Dev Splash Page', () => {
  let component: DevSplashPageComponent;
  let fixture: ComponentFixture<DevSplashPageComponent>;
  let router: Router;
  let navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        DevSplashPageComponent,
        sduxTestingModule
      ],
      providers: [provideVaultTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevSplashPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigationService = TestBed.inject(NavigationService);
    fixture.detectChanges();

    spyOn(router, 'navigate');
    spyOn(navigationService, 'show');
  });

  it('should default to the Angular comparison', () => {
    expect((component as any).activeComparison().id).toBe('angular');
  });

  it('should switch to the React comparison', () => {
    component.selectComparisonFramework('react');
    fixture.detectChanges();

    expect((component as any).activeComparison().id).toBe('react');
  });

  it('should switch to the Vue comparison', () => {
    component.selectComparisonFramework('vue');
    fixture.detectChanges();

    expect((component as any).activeComparison().id).toBe('vue');
  });

  it('should switch to the Svelte comparison', () => {
    component.selectComparisonFramework('svelte');
    fixture.detectChanges();

    expect((component as any).activeComparison().id).toBe('svelte');
  });

  describe('openMenu', () => {
    it('should call navigationService.show', () => {
      component.openMenu();
      expect(navigationService.show).toHaveBeenCalled();
    });
  });

  describe('openTesting', () => {
    it('should navigate to the testing page', () => {
      component.openTesting();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/welcome/testing']);
    });
  });

  describe('viewExamples', () => {
    it('should navigate to the stackblitz page with a fragment', () => {
      component.viewExamples('counter-pipeline');
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'counter-pipeline'
      });
    });
  });

  describe('viewStackblitz', () => {
    it('should not navigate to the stackblitz page without an example', () => {
      component.viewStackblitz('counter-pipeline');
      expect(navigationService.show).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to the stackblitz page with an angular fragment', () => {
      component.viewStackblitz('Angular', true);
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'web'
      });
    });

    it('should navigate to the stackblitz page with a react fragment', () => {
      component.viewStackblitz('React', true);
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'web'
      });
    });

    it('should navigate to the stackblitz page with a svelte fragment', () => {
      component.viewStackblitz('Svelte', true);
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'web'
      });
    });

    it('should navigate to the stackblitz page with a vue fragment', () => {
      component.viewStackblitz('Vue', true);
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'web'
      });
    });

    it('should navigate to the stackblitz page with a deno fragment', () => {
      component.viewStackblitz('Deno', true);
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz'], {
        fragment: 'deno'
      });
    });
  });
});
