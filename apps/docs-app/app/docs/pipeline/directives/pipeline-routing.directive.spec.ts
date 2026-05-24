import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { of } from 'rxjs';
import { PipelineBehaviorLandingComponent } from '../behaviors/pipeline-behavior-landingpage.component';
import { PipelineRoutingDirective } from './pipeline-routing.directive';

describe('Component: PipelineRoutingDirective', () => {
  let fixture: ComponentFixture<PipelineRoutingDirectiveMock>;
  let component: PipelineRoutingDirective;

  @Component({
    selector: 'sdux-pipeline-routing-directive-mock',
    standalone: true,
    imports: [],
    template: ``,
    styles: ``
  })
  class PipelineRoutingDirectiveMock extends PipelineRoutingDirective {
    constructor() {
      super();
    }
  }

  describe('paramMap emits a value', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [sduxTestingModule, PipelineRoutingDirectiveMock],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'encrypt',
                  type: 'aes'
                })
              ),
              fragment: of()
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should trigger markForCheck when paramMap emits', () => {
      expect(component.type).toBe('aes');
      expect(component.category).toBe('encrypt');
    });
  });

  describe('paramMap emits null', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap({})),
              fragment: of()
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should default type to "errors" when route param is null', () => {
      expect(component.category).toBe('');
      expect(component.type).toBe('');
    });
  });

  describe('paramMap emits - unknown type', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'stepwise',
                  type: 'unknown-type'
                })
              ),
              fragment: of()
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should fall back to "Resolve Examples" when type is unknown', () => {
      expect(component.category).toBe('stepwise');
      expect(component.type).toBe('unknown-type');
    });
  });

  describe('paramMap emits - unknown category', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PipelineBehaviorLandingComponent, sduxTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(
                convertToParamMap({
                  category: 'unknown-type',
                  type: 'resolve'
                })
              ),
              fragment: of()
            }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should fall back to "Resolve Examples" when type is unknown', () => {
      expect(component.category).toBe('unknown-type');
      expect(component.type).toBe('resolve');
    });
  });
});
