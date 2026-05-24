import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineBuilderSourceCodeExplanationComponent } from './pipeline-builder-source-code-explanation.component';

describe('Component: PipelineBuilderSourceCodeExplanation', () => {
  let fixture: ComponentFixture<PipelineBuilderSourceCodeExplanationComponent>;
  let component: PipelineBuilderSourceCodeExplanationComponent;

  let mockService: jasmine.SpyObj<PipelineBuilderService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<PipelineBuilderService>(
      'PipelineBuilderService',
      ['getStateFramework']
    );

    await TestBed.configureTestingModule({
      imports: [PipelineBuilderSourceCodeExplanationComponent],
      providers: [
        { provide: PipelineBuilderService, useValue: mockService },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      PipelineBuilderSourceCodeExplanationComponent
    );
    component = fixture.componentInstance;
  });

  describe('isAngular', () => {
    it('should return true when framework is Angular', () => {
      mockService.getStateFramework.and.returnValue(
        StateFrameworkTypes.Angular
      );

      expect(component.isAngular()).toBeTrue();
    });

    it('should return false when framework is not Angular', () => {
      mockService.getStateFramework.and.returnValue('react' as any);

      expect(component.isAngular()).toBeFalse();
    });
  });
});
