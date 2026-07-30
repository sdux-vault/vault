import { ElapsedTimer } from './example.elapsed-timer';

describe('ElapsedTimer', () => {
  let animationFrame: FrameRequestCallback;
  let currentTime: number;
  let cancelAnimationFrameSpy: jasmine.Spy;
  let requestAnimationFrameSpy: jasmine.Spy;

  beforeEach(() => {
    currentTime = 100;
    spyOn(performance, 'now').and.callFake(() => currentTime);
    requestAnimationFrameSpy = spyOn(
      window,
      'requestAnimationFrame'
    ).and.callFake((callback: FrameRequestCallback) => {
      animationFrame = callback;
      return 42;
    });
    cancelAnimationFrameSpy = spyOn(window, 'cancelAnimationFrame');
  });

  describe('running state', () => {
    it('should publish elapsed milliseconds on animation frames', () => {
      const elapsedValues: number[] = [];
      const timer = new ElapsedTimer((milliseconds) =>
        elapsedValues.push(milliseconds)
      );

      timer.start();

      expect(timer.running).toBeTrue();
      expect(timer.elapsed).toBe(0);
      expect(elapsedValues).toEqual([0]);
      expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);

      currentTime = 1_350.75;
      animationFrame(0);

      expect(timer.elapsed).toBe(1_250.75);
      expect(elapsedValues).toEqual([0, 1_250.75]);
      expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);
    });

    it('should ignore repeated starts and reset the active timer', () => {
      const onChange = jasmine.createSpy('onChange');
      const timer = new ElapsedTimer(onChange);

      timer.start();
      timer.start();

      expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);

      timer.reset();

      expect(timer.running).toBeFalse();
      expect(timer.elapsed).toBe(0);
      expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(42);
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe('stopped state', () => {
    it('should cancel future frames without clearing the elapsed value', () => {
      const timer = new ElapsedTimer(() => {});

      timer.start();
      currentTime = 600;
      animationFrame(0);
      timer.stop();

      expect(timer.running).toBeFalse();
      expect(timer.elapsed).toBe(500);
      expect(cancelAnimationFrameSpy).toHaveBeenCalledOnceWith(42);
    });

    it('should ignore a queued frame that runs after the timer stops', () => {
      const onChange = jasmine.createSpy('onChange');
      const timer = new ElapsedTimer(onChange);

      timer.start();
      onChange.calls.reset();
      requestAnimationFrameSpy.calls.reset();
      timer.stop();

      currentTime = 900;
      animationFrame(0);

      expect(onChange).not.toHaveBeenCalled();
      expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
      expect(timer.elapsed).toBe(0);
    });
  });
});
