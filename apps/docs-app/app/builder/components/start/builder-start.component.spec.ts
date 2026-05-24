import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PipelineStepService } from '../../services/pipeline-step.service';
import { BuilderStartComponent } from './builder-start.component';

describe('Component: BuilderStart', () => {
  let fixture: ComponentFixture<BuilderStartComponent>;
  let component: BuilderStartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderStartComponent, sduxTestingModule],
      providers: [provideVaultTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderStartComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have handle a start event', () => {
    const service = TestBed.inject(PipelineStepService);
    spyOn(service, 'start');
    spyOn(component, 'closeSidenav');

    component.start();

    expect(service.start).toHaveBeenCalledWith();
    expect(component.closeSidenav).toHaveBeenCalledWith(true);
  });
});
