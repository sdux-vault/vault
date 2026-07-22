import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { exampleHttpResource } from './example.http-resource';

describe('exampleHttpResource', () => {
  const apiUrl = 'https://swapi.info/api/people';

  let httpTesting: HttpTestingController;
  let injector: Injector;
  let resource: ReturnType<typeof exampleHttpResource.getResource> | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    httpTesting = TestBed.inject(HttpTestingController);
    injector = TestBed.inject(Injector);
  });

  afterEach(() => {
    resource?.destroy();
    httpTesting.verify();
  });

  it('should fetch and adapt selected SWAPI people into character State', async () => {
    resource = exampleHttpResource.getResource(injector);

    expect(resource.value()).toBeUndefined();
    expect(resource.isLoading()).toBeTrue();

    await TestBed.tick();

    const request = httpTesting.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');

    request.flush([
      {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14/'
      },
      {
        name: 'Yoda',
        url: 'https://swapi.info/api/people/20/'
      },
      {
        name: 'Lando Calrissian',
        url: 'https://swapi.info/api/people/25/'
      },
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.info/api/people/1/'
      }
    ]);

    await TestBed.tick();

    expect(resource.isLoading()).toBeFalse();
    expect(resource.error()).toBeUndefined();
    expect(resource.value()).toEqual([
      {
        id: 14,
        name: 'Han',
        lastName: 'Solo',
        faction: 'Rebel Alliance',
        isForceSensitive: false
      },
      {
        id: 20,
        name: 'Yoda',
        lastName: 'unknown',
        faction: 'Jedi Order',
        isForceSensitive: true
      },
      {
        id: 25,
        name: 'Lando',
        lastName: 'Calrissian',
        faction: 'Rebel Alliance',
        isForceSensitive: false
      }
    ]);
  });

  it('should reject a response that is not a people collection', async () => {
    resource = exampleHttpResource.getResource(injector);
    await TestBed.tick();

    httpTesting.expectOne(apiUrl).flush({ name: 'Han Solo' });
    await TestBed.tick();

    expect(resource.isLoading()).toBeFalse();
    expect(resource.error()?.message).toBe(
      'The SWAPI people response must be an array.'
    );
  });

  it('should reject an incomplete people collection', async () => {
    resource = exampleHttpResource.getResource(injector);
    await TestBed.tick();

    httpTesting.expectOne(apiUrl).flush([
      {
        name: 'Han Solo',
        url: 'https://swapi.info/api/people/14/'
      },
      {
        name: 'Yoda',
        url: 'https://swapi.info/api/people/20/'
      }
    ]);
    await TestBed.tick();

    expect(resource.isLoading()).toBeFalse();
    expect(resource.error()?.message).toBe(
      'The SWAPI response is missing Lando Calrissian.'
    );
  });

  it('should expose HTTP failures through the resource error signal', async () => {
    resource = exampleHttpResource.getResource(injector);
    await TestBed.tick();

    httpTesting.expectOne(apiUrl).flush('Unavailable', {
      status: 503,
      statusText: 'Service Unavailable'
    });
    await TestBed.tick();

    expect(resource.isLoading()).toBeFalse();
    expect(resource.error()?.message).toContain('503 Service Unavailable');
  });
});
