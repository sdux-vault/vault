import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipelineCollapsibleComponent } from './pipeline-collapsible.component';

describe('Component: PipelineCollapsible', () => {
  let fixture: ComponentFixture<PipelineCollapsibleComponent>;
  let component: PipelineCollapsibleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineCollapsibleComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PipelineCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('label', () => {
    it('should accept a required label input', () => {
      expect(component.label()).toBe('Test Label');
    });
  });

  describe('tooltip', () => {
    it('should default tooltip to empty string', () => {
      expect(component.tooltip()).toBe('');
    });

    it('should accept a tooltip input', () => {
      fixture.componentRef.setInput('tooltip', 'Hover text');
      expect(component.tooltip()).toBe('Hover text');
    });
  });

  describe('expanded', () => {
    it('should default to collapsed', () => {
      expect(component.expanded()).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should expand when toggled from collapsed', () => {
      component.toggle();
      expect(component.expanded()).toBe(true);
    });

    it('should collapse when toggled from expanded', () => {
      component.toggle();
      component.toggle();
      expect(component.expanded()).toBe(false);
    });
  });
});
