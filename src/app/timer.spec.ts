import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StopwatchService } from './stopwatch.service';
import { TimerService } from './timer.service';
import { Timer } from './timer';

const services = {
  TimerService: TimerService,
  StopwatchService: StopwatchService,
};

Object.entries(services).forEach(([serviceName, timerService]) => {
  describe(`${serviceName}`, () => {
    let service: Timer;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: Timer, useClass: timerService }],
      });
      service = TestBed.inject(Timer);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should be work', fakeAsync(() => {
      service.start();
      expect(service.state).toBe('running');

      tick(200);
      expect(service.time).toBe(200);
      tick(500);
      expect(service.time).toBe(700);

      service.stop();
      expect(service.state).toBe('stop');

      service.start();
      expect(service.state).toBe('running');
      expect(service.time).toBe(0);
      tick(200);
      expect(service.time).toBe(200);
      service.stop();
    }));
  });
});
