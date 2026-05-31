import { EVENTS_SUCCESS_ARTIFACTS } from '../../widget/artifacts/events.success.artifact';
import {
  createDebugDump,
  downloadAiAssistFile,
  downloadDebugDump,
  downloadTraceDump,
  reportGithubIssue
} from './debug-widget.dump';

import { DevMode } from '@sdux-vault/shared';
import { REGISTRY_SUCCESS_ARTIFACT } from '../../widget/artifacts/registry.success.artifact';
import { resetDebugEngineForTesting } from '../../widget/debug-widget.engine';
import { STATS_DUMP_EXPECTED } from '../artifacts/expected/dump/stats-dump.expected';

describe('debug-widget.dump', () => {
  let clickSpy: jasmine.Spy;
  let createObjectURLSpy: jasmine.Spy;
  let revokeObjectURLSpy: jasmine.Spy;

  beforeEach(() => {
    spyOnProperty(DevMode, 'active', 'get').and.returnValue(true);
    clickSpy = jasmine.createSpy('click');

    spyOn(document, 'createElement').and.callFake((): any => {
      return {
        href: '',
        download: '',
        click: clickSpy
      };
    });

    createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue(
      'blob:mock'
    );
    revokeObjectURLSpy = spyOn(URL, 'revokeObjectURL');

    spyOn(window, 'open');

    (globalThis as any).sdux = {
      getRegistry: (): any => {
        return REGISTRY_SUCCESS_ARTIFACT;
      },
      debugWidget: {
        versions: {
          '@sdux-vault/test': '1.0.0'
        }
      }
    };
  });

  afterEach(() => {
    delete (globalThis as any).sdux;
    resetDebugEngineForTesting();
  });

  // ------------------------------------------------
  // downloadDump
  // ------------------------------------------------

  it('should download dump JSON file', () => {
    const dump: any = { foo: 'bar' };

    downloadDebugDump(dump);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock');
  });

  // ------------------------------------------------
  // downloadAiAssistFile
  // ------------------------------------------------

  it('should download AI assist markdown file', () => {
    downloadAiAssistFile();

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock');
  });

  // ------------------------------------------------
  // createDump
  // ------------------------------------------------

  it('should create a debug dump using DebugWidgetEngine', () => {
    spyOnProperty(window as any, 'performance', 'get').and.returnValue({
      now: () => 123,
      timeOrigin: 1000,
      getEntriesByType: (type: string) => {
        if (type === 'navigation') {
          return [
            {
              type: 'reload',
              domComplete: 10,
              loadEventEnd: 12
            }
          ];
        }

        if (type === 'longtask') {
          return [
            { startTime: 1, duration: 20 },
            { startTime: 2, duration: 10 }
          ];
        }

        return [];
      }
    });

    const actual = createDebugDump(EVENTS_SUCCESS_ARTIFACTS as any);

    expect(actual.events?.length).toBe(96);
    if (actual.stats.pipelineFlamegraph) {
      expect(actual.stats.pipelineFlamegraph?.length).toBe(1);
      if (actual.stats.pipelineFlamegraph[0].stages) {
        expect(actual.stats.pipelineFlamegraph[0].stages.length).toBe(12);

        actual.stats.pipelineFlamegraph[0].stages.length = 0;
      }
    }

    delete actual.events;

    expect(actual.environment).toEqual(jasmine.any(Object));

    expect(actual.stats).toEqual(STATS_DUMP_EXPECTED);

    expect(actual.registry).toEqual(
      Object({
        licenseSummary: Object({
          valid: 0,
          pending: 0,
          revoked: 0,
          timeout: 0,
          notRequired: 17
        }),
        totalFeatureCells: 1,
        featureCells: [
          Object({
            key: 'pipeline-builder',
            behaviorsRegistered: true,
            controllersRegistered: true,
            fluentApis: Object({
              filters: 0,
              reducers: 0,
              beforeTaps: 0,
              afterTaps: 0,
              emitStateCallbacks: 0,
              errorCallbacks: 0
            }),
            controllers: [
              Object({
                key: 'SDUX::Controller::Policy::CoreAbstain',
                type: 'coreAbstain',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Controller::Policy::CoreLicense',
                type: 'license',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Controller::Policy::CoreError',
                type: 'error',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              })
            ],
            behaviors: [
              Object({
                key: 'SDUX::Behavior::Core::AfterTap',
                type: 'coreAfterTap',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::BeforeTap',
                type: 'coreBeforeTap',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Error',
                type: 'coreError',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Filter',
                type: 'filter',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::FromObservable',
                type: 'fromObservable',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::FromPromise',
                type: 'fromPromise',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::FromStream',
                type: 'fromStream',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Observable',
                type: 'resolve',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Promise',
                type: 'resolve',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Reducer',
                type: 'reduce',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::Value',
                type: 'resolve',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Core::State',
                type: 'coreState',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Merge::Deep',
                type: 'merge',
                critical: true,
                needsLicense: false,
                validLicense: 'not-required'
              }),
              Object({
                key: 'SDUX::Behavior::Persist::SessionStorage',
                type: 'persist',
                critical: false,
                needsLicense: false,
                validLicense: 'not-required'
              })
            ]
          })
        ]
      })
    );
  });

  it('should handle missing performance gracefully', () => {
    const fakeEvents: any[] = [];

    const dump = createDebugDump(fakeEvents);

    expect(dump.events).toEqual([]);
  });

  // ------------------------------------------------
  // reportGithubIssue
  // ------------------------------------------------

  it('should download a dump and open a GitHub issue', () => {
    const fakeEvents: any[] = [];

    reportGithubIssue(fakeEvents);

    // dump file downloaded
    expect(clickSpy).toHaveBeenCalled();

    // GitHub page opened
    expect(window.open).toHaveBeenCalled();
  });

  it('should download a Chrome trace JSON file', () => {
    const traceData = JSON.stringify({
      traceEvents: [{ name: 'test', ph: 'I', ts: 1 }]
    });

    downloadTraceDump(traceData);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock');
  });
});
