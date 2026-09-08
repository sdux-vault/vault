import { DelayService } from './delay.service';

describe('Service: Delay Controller', () => {
  it('returns the chapter metadata for the delay tutorial', () => {
    expect(new DelayService().chapters()).toEqual({
      id: 10,
      label: 'Delay',
      route: 'chapter-10',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Configure Delay Controller' },
        { id: 2, label: 'Observe Delayed Execution' },
        { id: 3, label: 'Complete Delay Tutorial' },
        { id: 4, label: 'Chapter Round-up' },
        { id: 5, label: 'Stackblitz & Downloadable Archive' }
      ]
    });
  });
});
