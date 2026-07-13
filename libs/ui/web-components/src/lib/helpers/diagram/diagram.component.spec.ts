import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { ImageComponent } from '../image/image.component';
import { DiagramComponent } from './diagram.component';
import { DiagramDialogService } from './service/diagram.dialog.service';

describe('Component: Diagram', () => {
  let fixture: ComponentFixture<DiagramComponent>;
  let dialogService: jasmine.SpyObj<DiagramDialogService>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    dialogService = jasmine.createSpyObj('DiagramDialogService', ['open']);
    analyticsService = jasmine.createSpyObj('AnalyticsService', [
      'trackDiagramInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        DiagramComponent,
        ImageComponent,
        CommonModule,
        sduxTestingModule
      ],
      providers: [
        { provide: DiagramDialogService, useValue: dialogService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramComponent);
  });

  // --------------------------------------------------------------------------
  // TESTS
  // --------------------------------------------------------------------------

  describe('Input set', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('image', 'diagrams/test.svg');
      fixture.componentRef.setInput('tooltip', 'My Diagram');
      fixture.detectChanges();
    });

    it('should pass the correct image and tooltip to <sdux-image>', () => {
      const img = fixture.debugElement.query(By.directive(ImageComponent));
      expect(img).toBeTruthy();

      const imgCmp = img.componentInstance as ImageComponent;

      expect(imgCmp.image()).toBe('diagrams/test.svg');
      expect(imgCmp.tooltip()).toBe('My Diagram -- Click to Zoom');
      expect(imgCmp.height()).toBe(175); // maxHeight
      expect(imgCmp.width()).toBe('auto'); // hard-coded in template
    });

    it('should call DiagramDialogService.open() when clicked', () => {
      const fakeImg = {
        naturalWidth: 800,
        naturalHeight: 600,
        onload: null as (() => void) | null,
        src: ''
      };
      spyOn(globalThis, 'Image').and.returnValue(
        fakeImg as unknown as HTMLImageElement
      );

      const wrapper = fixture.debugElement.query(By.css('.diagram-wrapper'));
      wrapper.triggerEventHandler('click');
      fakeImg.onload!();

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'diagrams/test.svg',
        800,
        600,
        'My Diagram'
      );
      expect(analyticsService.trackDiagramInteraction).toHaveBeenCalledOnceWith(
        {
          diagramId: 'diagrams/test.svg',
          action: 'click'
        }
      );
    });

    it('should not track the diagram before its image loads', () => {
      const fakeImg = {
        naturalWidth: 800,
        naturalHeight: 600,
        onload: null as (() => void) | null,
        src: ''
      };
      spyOn(globalThis, 'Image').and.returnValue(
        fakeImg as unknown as HTMLImageElement
      );

      const wrapper = fixture.debugElement.query(By.css('.diagram-wrapper'));
      wrapper.triggerEventHandler('click');

      expect(analyticsService.trackDiagramInteraction).not.toHaveBeenCalled();
    });
  });

  describe('Input not set', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('image', 'diagrams/test.svg');
    });

    it('should call dialog open with default tooltip if not set', () => {
      const fakeImg = {
        naturalWidth: 800,
        naturalHeight: 600,
        onload: null as (() => void) | null,
        src: ''
      };
      spyOn(globalThis, 'Image').and.returnValue(
        fakeImg as unknown as HTMLImageElement
      );

      const wrapper = fixture.debugElement.query(By.css('.diagram-wrapper'));
      wrapper.triggerEventHandler('click');
      fakeImg.onload!();

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'diagrams/test.svg',
        800,
        600,
        'Diagram'
      );
      expect(analyticsService.trackDiagramInteraction).toHaveBeenCalledOnceWith(
        {
          diagramId: 'diagrams/test.svg',
          action: 'click'
        }
      );
    });
  });
});
