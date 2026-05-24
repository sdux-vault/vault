import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { PipelineStepService } from './pipeline-step.service';

describe('Service: PipelineStep', () => {
  let service: PipelineStepService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [PipelineStepService]
    }).compileComponents();

    service = TestBed.inject(PipelineStepService);
  });

  it('should handle toggle instruction', async () => {
    expect(service.isExpanded()).toBeTrue();
    service.toggleInstructions();
    expect(service.isExpanded()).toBeFalse();
    service.toggleInstructions();
    expect(service.isExpanded()).toBeTrue();
  });

  it('should handle a start event', async () => {
    expect(service.isExpanded()).toBeTrue();
    expect(service.displayStartButton()).toBeTrue();
    service.start();

    expect(service.isExpanded()).toBeFalse();
    expect(service.displayStartButton()).toBeFalse();
  });

  it('should have step instructions', () => {
    const stepInstructions = service.stepInstructions;
    expect(stepInstructions).toEqual([
      'Describe your state',
      'Choose how it behaves',
      'Preview the generated code',
      'Copy. Paste. Done!'
    ]);

    stepInstructions[0] = 'changed';

    expect(stepInstructions[0]).toBe('changed');

    expect(service.stepInstructions[0]).toBe('Describe your state');
  });

  it('should get step instructions', () => {
    expect(service.getStepInstruction(1)).toEqual(
      'Step 1: Describe your state'
    );

    expect(service.getStepInstruction(2)).toEqual(
      'Step 2: Choose how it behaves'
    );

    expect(service.getStepInstruction(3)).toEqual(
      'Step 3: Preview the generated code'
    );

    expect(service.getStepInstruction(4)).toEqual('Step 4: Copy. Paste. Done!');
  });

  it('should handle isEndStep', () => {
    expect(service.isEndStep(1)).toBeFalse();
    expect(service.isEndStep(2)).toBeFalse();
    expect(service.isEndStep(3)).toBeTrue();
    expect(service.isEndStep(4)).toBeTrue();
    expect(service.isEndStep(5)).toBeTrue();
  });

  it('should handle isBasicMode', () => {
    expect(service.builderMode()).toBe('basic');
    service.setBuilderMode(FileBuilderModeTypes.Advanced);
    expect(service.builderMode()).toBe('advanced');
  });
});
