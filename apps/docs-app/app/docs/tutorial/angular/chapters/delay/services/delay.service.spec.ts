import { DelayService } from './delay.service';

describe('Service: Delay Controller', () => {
  it('returns the chapter metadata for the delay tutorial', () => {
    expect(new DelayService().chapters()).toEqual({
      id: 9,
      label: 'Delay',
      route: 'chapter-9',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★★',
        estimatedTime: '30–45 min'
      },
      steps: [
        { id: 1, label: 'Configure Delay Controller' },
        { id: 2, label: 'Observe Delayed Execution' },
        { id: 3, label: 'Complete Delay Tutorial' }
      ]
    });
  });
});
