import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../theme/theme.service';
import { AppComponent } from './app.component';

// Dummy stubs for the imported standalone components
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { LoadingSpinnerComponent } from '../spinner/loading-spinner.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SeoService } from '../services/seo/seo.service';

describe('Component: App', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let themeService: ThemeService;
  let seoService: SeoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ToolbarComponent,
        NavigationComponent,
        FooterComponent,
        LoadingSpinnerComponent,
        sduxTestingModule
      ],
      providers: [ThemeService, SeoService]
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    seoService = TestBed.inject(SeoService);
    spyOn(themeService, 'restorePreferences'); // 👈 Spy before component creation
    spyOn(seoService, 'initialize');

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be truthy', () => {
    expect(component).toBeTruthy();
  });

  it('should call ThemeService.restorePreferences once on initialization', () => {
    expect(themeService.restorePreferences).toHaveBeenCalledTimes(1);
  });

  it('should initialize SeoService once on application startup', () => {
    expect(seoService.initialize).toHaveBeenCalledTimes(1);
  });
});
