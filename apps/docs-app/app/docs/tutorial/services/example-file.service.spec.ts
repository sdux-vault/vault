import { TestBed } from '@angular/core/testing';
import type { ExampleFileShape } from '../shape/example-file.shape';
import { ExampleFileService } from './example-file.service';

describe('Service: ExampleFileService', () => {
  let service: ExampleFileService;

  const files: readonly ExampleFileShape[] = [
    {
      type: 'component',
      fileName: 'example.component.ts',
      source: 'export class ExampleComponent {}'
    },
    {
      type: 'service',
      fileName: 'example.service.ts',
      source: 'export class ExampleService {}'
    },
    {
      type: 'html',
      fileName: 'example.component.html',
      source: '<section></section>'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleFileService]
    });

    service = TestBed.inject(ExampleFileService);
  });

  it('returns the matching example file object for the requested type', () => {
    expect(service.getFile(files, 'service')).toEqual(
      Object({
        type: 'service',
        fileName: 'example.service.ts',
        source: 'export class ExampleService {}'
      })
    );
  });

  it('returns undefined when the requested type is not present', () => {
    expect(service.getFile(files, 'scss')).toEqual(Object({}));
  });
});
