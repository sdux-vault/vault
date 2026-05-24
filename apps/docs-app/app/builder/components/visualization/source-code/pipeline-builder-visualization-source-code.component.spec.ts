import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipelineFileBuilderService } from 'apps/docs-app/app/builder/services/files/pipeline-file-builder.service';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { GeneratedFileShape } from 'apps/docs-app/app/builder/shapes/file-builder/generated-file.shape';
import { FileTypes } from 'apps/docs-app/app/builder/types/file-builder/file.type';
import { PipelineBuilderSourceCodeVisualizationComponent } from './pipeline-builder-visualization-source-code.component';

describe('Component: PipelineBuilderSourceCodeVisualization', () => {
  const mockFiles: GeneratedFileShape[] = [
    { type: FileTypes.Simple } as GeneratedFileShape,
    { type: FileTypes.Advanced } as GeneratedFileShape,
    { type: FileTypes.FromStream } as GeneratedFileShape,
    { type: FileTypes.AiAssist } as GeneratedFileShape,
    { type: FileTypes.All } as GeneratedFileShape
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineBuilderSourceCodeVisualizationComponent],
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
  });

  function createComponent() {
    const fixture = TestBed.createComponent(
      PipelineBuilderSourceCodeVisualizationComponent
    );
    return fixture;
  }

  describe('Generated files', () => {
    it('should return only All files', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.All);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(4);
      expect(result[0].type).toBe(FileTypes.Simple);
    });

    it('should return only Simple files', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.Simple);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(2);
      expect(result[0].type).toBe(FileTypes.Simple);
    });

    it('should return only Advanced files', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.Advanced);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(2);
      expect(result[0].type).toBe(FileTypes.Advanced);
    });

    it('should return only FromStream files', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.FromStream);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(2);
      expect(result[0].type).toBe(FileTypes.FromStream);
    });

    it('should return only AiAssist files', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.AiAssist);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(1);
      expect(result[0].type).toBe(FileTypes.AiAssist);
    });

    it('should return all files except AiAssist when type is All', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.All);

      const result = fixture.componentInstance.generatedFiles();

      expect(result.length).toBe(4);
      expect(result.some((f) => f.type === FileTypes.AiAssist)).toBeFalse();
    });
  });
  describe('displayGeneratedExampleFiles', () => {
    it('should return false when type is not AiAssist', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.AiAssist);

      expect(
        fixture.componentInstance.displayGeneratedExampleFiles()
      ).toBeFalse();
    });

    it('should return true when type is not AiAssist', () => {
      const fixture = createComponent();

      fixture.componentRef.setInput('type', FileTypes.Simple);

      expect(
        fixture.componentInstance.displayGeneratedExampleFiles()
      ).toBeTrue();
    });
  });
});
