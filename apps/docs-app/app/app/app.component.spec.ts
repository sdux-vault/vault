import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../theme/theme.service';
import { AppComponent } from './app.component';

// Dummy stubs for the imported standalone components
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FooterComponent } from '../footer/footer.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { LoadingSpinnerComponent } from '../spinner/loading-spinner.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

describe('Component: App', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let themeService: ThemeService;

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
      providers: [ThemeService]
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    spyOn(themeService, 'restorePreferences'); // 👈 Spy before component creation

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be truthy', () => {
    expect(component).toBeTruthy();
  });

  it('should call ThemeService.restorePreferences once on initialization', () => {
    expect(themeService.restorePreferences).toHaveBeenCalledTimes(1);
  });
});
