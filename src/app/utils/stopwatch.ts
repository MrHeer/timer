import { BehaviorSubject } from 'rxjs';
import { State } from '../interface';
import { IntervalTicker, Ticker } from './ticker';

export class Stopwatch {
  private _time$ = new BehaviorSubject(0);
  private _state$ = new BehaviorSubject<State>('stop');

  constructor(private ticker: Ticker = new IntervalTicker()) {}

  start = () => {
    this._time$.next(0);
    this._state$.next('running');
    this.ticker.start(this.tick);
  };

  stop = () => {
    this._state$.next('stop');
    this.ticker.stop();
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
