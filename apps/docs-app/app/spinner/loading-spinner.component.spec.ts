import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { LoadingSpinnerService } from './service/loading-spinner.service';

describe('Component: Loading Spinner', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent, MatProgressSpinnerModule],
      providers: [LoadingSpinnerService, provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reflect true when spinner service isLoading is true', () => {
    const spinnerService = TestBed.inject(LoadingSpinnerService);
    expect(component.isLoading()).toBeFalse();
    spinnerService.show();
    expect(component.isLoading()).toBeTrue();
    spinnerService.hide();
    expect(component.isLoading()).toBeFalse();
  });
});
