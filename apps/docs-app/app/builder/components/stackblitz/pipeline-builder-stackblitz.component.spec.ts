import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipelineFileBuilderService } from '../../services/files/pipeline-file-builder.service';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../types/file-builder/file.type';
import { PipelineBuilderStackBlitzComponent } from './pipeline-builder-stackblitz.component';
import { StackBlitzService } from './service/stackblitz.service';

describe('Component: PipelineBuilderStackBlitz', () => {
  let component: PipelineBuilderStackBlitzComponent;
  const mockFiles: GeneratedFileShape[] = [
    { type: FileTypes.Simple } as GeneratedFileShape,
    { type: FileTypes.Advanced } as GeneratedFileShape,
    { type: FileTypes.FromStream } as GeneratedFileShape,
    { type: FileTypes.AiAssist } as GeneratedFileShape,
    { type: FileTypes.All } as GeneratedFileShape
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineBuilderStackBlitzComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: PipelineFileBuilderService,
          useValue: {
            generatedFiles: signal(mockFiles)
          }
        },
        {
          provide: PipelineBuilderService,
          useValue: {
            getStateFramework: signal('angular')
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(PipelineBuilderStackBlitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle a viewOnStackBlitz event', () => {
    const stackBlitzService = TestBed.inject(StackBlitzService);
    spyOn(stackBlitzService, 'buildProject');
    component.viewOnStackBlitz();
    expect(stackBlitzService.buildProject).toHaveBeenCalledWith();
  });
});
