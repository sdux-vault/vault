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
        { id: 2, label: 'Delay Component' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ]
    });
  });
});
