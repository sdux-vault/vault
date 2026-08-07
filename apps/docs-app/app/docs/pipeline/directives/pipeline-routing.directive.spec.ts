import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PipelineRoutingDirective } from './pipeline-routing.directive';

describe('Component: PipelineRoutingDirective', () => {
  let fixture: ComponentFixture<PipelineRoutingDirectiveMock>;
  let component: PipelineRoutingDirectiveMock;

  @Component({
    selector: 'sdux-pipeline-routing-directive-mock',
    standalone: true,
    template: ''
  })
  class PipelineRoutingDirectiveMock extends PipelineRoutingDirective {}

  function createComponent(params: Record<string, string>, data = {}) {
    TestBed.configureTestingModule({
      imports: [PipelineRoutingDirectiveMock],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap(params)),
            fragment: of(),
            snapshot: { data }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(PipelineRoutingDirectiveMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should expose category and type route parameters', () => {
    createComponent({ category: 'encrypt', type: 'aes' });

    expect(component.type).toBe('aes');
    expect(component.category).toBe('encrypt');
  });

  it('should default missing route parameters to empty strings', () => {
    createComponent({});

    expect(component.category).toBe('');
    expect(component.type).toBe('');
  });

  it('should prefer route data over route parameters', () => {
    createComponent(
      { category: 'parameter-category', type: 'parameter-type' },
      { category: 'data-category', type: 'data-type' }
    );

    expect(component.category).toBe('data-category');
    expect(component.type).toBe('data-type');
  });
});
