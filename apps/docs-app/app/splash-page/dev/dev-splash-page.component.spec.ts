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

  it('should create the component', () => {
    expect(component).toBeTruthy();
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

  describe('openBuilder', () => {
    it('should navigate to the pipeline builder', () => {
      component.openBuilder();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/pipeline/builder']);
    });
  });

  describe('openTesting', () => {
    it('should navigate to the testing page', () => {
      component.openTesting();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/welcome/testing']);
    });
  });

  describe('openMigration', () => {
    it('should navigate to the migration page', () => {
      component.openMigration();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/migration']);
    });
  });

  describe('openArchitecture', () => {
    it('should navigate to the pipeline architecture page', () => {
      component.openArchitecture();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/pipeline-architecture'
      ]);
    });
  });

  describe('openFeatureCells', () => {
    it('should navigate to the feature cells page', () => {
      component.openFeatureCells();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/apis/feature-cells'
      ]);
    });
  });

  describe('openComparisons', () => {
    it('should navigate to the sdux redux similarities page', () => {
      component.openComparisons();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/welcome/sdux-redux-similarities'
      ]);
    });
  });

  describe('openStackBlitz', () => {
    it('should navigate to the stackblitz page', () => {
      component.openStackBlitz();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/docs/stackblitz']);
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

  describe('openControllers', () => {
    it('should navigate to the controllers behavior page', () => {
      component.openControllers();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/controllers'
      ]);
    });
  });

  describe('openInterceptors', () => {
    it('should navigate to the interceptors behavior page', () => {
      component.openInterceptors();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/interceptors'
      ]);
    });
  });

  describe('openResolvers', () => {
    it('should navigate to the resolve behavior page', () => {
      component.openResolvers();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/resolve'
      ]);
    });
  });

  describe('openFilters', () => {
    it('should navigate to the filters behavior page', () => {
      component.openFilters();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/filters'
      ]);
    });
  });

  describe('openReducers', () => {
    it('should navigate to the reducers behavior page', () => {
      component.openReducers();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/reducers'
      ]);
    });
  });

  describe('openTaps', () => {
    it('should navigate to the taps behavior page', () => {
      component.openTaps();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/taps'
      ]);
    });
  });

  describe('openExtensions', () => {
    it('should navigate to the persist behavior page', () => {
      component.openExtensions();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/pipeline/behaviors/persist'
      ]);
    });
  });

  describe('openEnterprise', () => {
    it('should navigate to the enterprise page', () => {
      component.openEnterprise();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/sdux/enterprise']);
    });
  });

  describe('openStartHere', () => {
    it('should navigate to the getting started page', () => {
      component.openStartHere();
      expect(navigationService.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        '/docs/welcome/getting-started'
      ]);
    });
  });
});
