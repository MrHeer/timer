import { BehaviorSubject } from 'rxjs';
import { IntervalTicker, Ticker } from './ticker';

type State = 'stop' | 'running';

export class Stopwatch {
  private _time$ = new BehaviorSubject(0);
  private _state$ = new BehaviorSubject<State>('stop');

  constructor(private ticker: Ticker = new IntervalTicker()) {}

  start = () => {
    this._time$.next(0);
    this.ticker.start(this.tick);
    this._state$.next('running');
  };

  stop = () => {
    this.ticker.stop();
    this._state$.next('stop');
  };

  private tick = (step: number) => {
    this._time$.next(this.time + step);
  };

  get time() {
    return this._time$.getValue();
  }

  get time$() {
    return this._time$.asObservable();
  }

  get state() {
    return this._state$.getValue();
  }

  get state$() {
    return this._state$.asObservable();
  }
}
