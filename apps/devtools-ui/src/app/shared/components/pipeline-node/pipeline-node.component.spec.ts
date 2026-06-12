import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipelineNodeComponent } from './pipeline-node.component';

describe('Component: PipelineNode', () => {
  let fixture: ComponentFixture<PipelineNodeComponent>;
  let component: PipelineNodeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineNodeComponent, MatTooltipModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PipelineNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('displayLabel', () => {
    it('should render explicit label when provided', () => {
      fixture.componentRef.setInput('label', 'TestLabel');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-label')?.textContent?.trim()).toBe(
        'TestLabel'
      );
    });

    it('should derive label from behavior key when no label is provided', () => {
      fixture.componentRef.setInput('behavior', {
        key: 'SDUX::Behavior::Core::Value',
        type: 'behavior'
      });
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-label')?.textContent?.trim()).toBe(
        'Value'
      );
    });
  });

  describe('vaultKeyName', () => {
    it('should extract name from a 4-segment key', () => {
      expect(
        component.vaultKeyName('SDUX::Controller::Policy::CoreAbstain')
      ).toBe('CoreAbstain');
    });

    it('should return the full key when format is unexpected', () => {
      expect(component.vaultKeyName('unexpected-key')).toBe('unexpected-key');
    });
  });

  describe('detail', () => {
    it('should not render pipeline-count when detail is empty', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-count')).toBeNull();
    });

    it('should render pipeline-count when detail is provided', () => {
      fixture.componentRef.setInput('detail', '5.0 ms');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-count')?.textContent?.trim()).toBe(
        '5.0 ms'
      );
    });
  });

  describe('license badge', () => {
    it('should not render license badge by default', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-licensed')).toBeNull();
    });

    it('should not render license badge when behavior has no license', () => {
      fixture.componentRef.setInput('behavior', {
        key: 'SDUX::Behavior::Core::Value',
        type: 'behavior'
      });
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-licensed')).toBeNull();
    });

    it('should render license badge when behavior needs license', () => {
      fixture.componentRef.setInput('behavior', {
        key: 'SDUX::Behavior::Core::Value',
        type: 'behavior',
        needsLicense: true,
        licenseId: 'LIC-123'
      });
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement;
      expect(el.querySelector('.pipeline-licensed')).toBeTruthy();
      expect(el.querySelector('.vault-icon')).toBeTruthy();
    });
  });
});
