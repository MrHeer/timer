import { BehaviorSubject } from 'rxjs';
import { IntervalTicker, Ticker } from './ticker';

export class Stopwatch {
  private _time = 0;
  private _time$ = new BehaviorSubject(0);
  private stopped = true;

  constructor(private ticker: Ticker = new IntervalTicker()) {}

  start = () => {
    this._time = 0;
    this.stopped = false;
    this._time$.next(this.time);
    this.ticker.start(this.tick);
  };

  stop = () => {
    this.ticker.stop();
    this.stopped = true;
  };

  private tick = (step: number) => {
    this._time = this._time + step;
    this._time$.next(this.time);
  };

  get time() {
    return this._time;
  }

  get time$() {
    return this._time$.asObservable();
  }

  isStart = () => {
    return this.stopped === false;
  };

  isStop = () => {
    return this.stopped === true;
  };
}
