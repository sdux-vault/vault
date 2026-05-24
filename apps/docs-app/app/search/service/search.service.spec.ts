import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { SearchService } from './search.service';

describe('Service: Search', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;
  let mockDocs: any;
  let mockIndex: any;

  beforeEach(() => {
    mockDocs = [
      {
        id: 'function:FeatureCell',
        title: 'FeatureCell',
        kind: 'function',
        project: 'core',
        docLink: 'functions',
        relativePath: 'path',
        symbols: ['FeatureCell'],
        content: 'FeatureCell function docs'
      },
      {
        id: 'class:FeatureCellService',
        title: 'FeatureCellService',
        kind: 'class',
        project: 'core',
        docLink: 'classes',
        relativePath: 'path',
        symbols: ['FeatureCellService'],
        content: 'service docs'
      },
      {
        id: 'controller:VaultController',
        title: 'VaultController',
        kind: 'controller',
        project: 'core',
        docLink: 'controllers',
        relativePath: 'path',
        symbols: ['VaultController'],
        content: 'controller docs'
      },
      {
        id: 'behavior:withThrottle',
        title: 'withThrottle',
        kind: 'behavior',
        project: 'addons',
        docLink: 'behaviors',
        relativePath: 'path',
        symbols: ['withThrottle'],
        content: 'throttle interceptor'
      }
    ];

    mockIndex = { documents: mockDocs };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SearchService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // -----------------------------------------------------
  // TESTS
  // -----------------------------------------------------

  it('should return empty array for blank query', async () => {
    const result = await service.search('');
    expect(result).toEqual([]);
  });

  it('should initialize by loading search-index.json', async () => {
    const promise = service.search('feature');

    const req = httpMock.expectOne('assets/search-index/search-index.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockIndex);

    const result = await promise;

    // should match FeatureCell
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('FeatureCellService');
  });

  it('should search across fields (symbols, content, title)', async () => {
    const promise = service.search('throttle');

    const req = httpMock.expectOne('assets/search-index/search-index.json');
    req.flush(mockIndex);

    const result = await promise;

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('behavior:withThrottle');
  });

  it('should search and not find a result)', async () => {
    const promise = service.search('no-result');

    const req = httpMock.expectOne('assets/search-index/search-index.json');
    req.flush(mockIndex);

    const result = await promise;

    expect(result.length).toBe(0);
  });

  it('should not run initialization twice', async () => {
    spyOn<any>(service, 'loadAndBuildIndex').and.callThrough();

    // First call triggers initialization
    const p1 = service.search('feature');
    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush(mockIndex);
    await p1;

    // Second call should NOT call loadAndBuildIndex again
    const p2 = service.search('feature');
    await p2;

    expect((service as any).loadAndBuildIndex).toHaveBeenCalledTimes(1);
  });

  it('should return empty array if no matches', async () => {
    const promise = service.search('nomatch');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush(mockIndex);

    const result = await promise;

    expect(result).toEqual([]);
  });

  it('should handle not finding the search-index in assets', async () => {
    delete mockIndex.documents;
    const promise = service.search('throttle');

    const req = httpMock.expectOne('assets/search-index/search-index.json');
    req.flush(mockIndex);

    const result = await promise;

    expect(result.length).toBe(0);
  });

  it('should rank behaviors above all other kinds', async () => {
    const promise = service.search('feature');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush(mockIndex);

    const result = await promise;

    expect(result[0].kind).toBe('class');
  });

  it('should rank controllers above classes and functions when all match', async () => {
    // make all kinds match the same query
    mockDocs.forEach((d: any) => (d.content = 'vault'));

    const promise = service.search('vault');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush({ documents: mockDocs });

    const result = await promise;
    const kinds = result.map((r) => r.kind);

    expect(kinds.indexOf('controller')).toBeGreaterThan(-1);
    expect(kinds.indexOf('class')).toBeGreaterThan(-1);
    expect(kinds.indexOf('function')).toBeGreaterThan(-1);

    expect(kinds.indexOf('controller')).toBeLessThan(kinds.indexOf('class'));
    expect(kinds.indexOf('controller')).toBeLessThan(kinds.indexOf('function'));
  });

  it('should rank classes above functions', async () => {
    const promise = service.search('feature');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush(mockIndex);

    const result = await promise;

    const kinds = result.map((r) => r.kind);

    expect(kinds.indexOf('class')).toBeLessThan(kinds.indexOf('function'));
  });

  it('should rank unknown kinds last', async () => {
    mockDocs.push({
      id: 'misc:WeirdThing',
      title: 'WeirdThing',
      kind: 'weird',
      project: 'core',
      docLink: 'misc',
      relativePath: 'path',
      symbols: ['WeirdThing'],
      content: 'weird docs'
    });

    const promise = service.search('weird');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush({ documents: mockDocs });

    const result = await promise;

    expect(result[result.length - 1].kind).toBe('weird');
  });

  it('should prioritize kind ranking over original search order', async () => {
    const promise = service.search('throttle');

    httpMock
      .expectOne('assets/search-index/search-index.json')
      .flush(mockIndex);

    const result = await promise;

    expect(result[0]).toEqual(
      jasmine.objectContaining({
        kind: 'behavior',
        title: 'withThrottle'
      })
    );
  });
});
