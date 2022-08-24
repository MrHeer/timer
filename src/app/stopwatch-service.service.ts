import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stopwatch } from './utils';

type State = 'stop' | 'running';

@Injectable({
  providedIn: 'root',
})
export class StopwatchServiceService {
  private _duration$ = new BehaviorSubject(0);
  private _state$ = new BehaviorSubject<State>('stop');
  private _stopwatch = new Stopwatch();

  constructor() {
    requestAnimationFrame(() => this._duration$.next(this._stopwatch.duration));
  }

  get state$() {
    return this._state$.asObservable();
  }

  get duration$() {
    return this._duration$.asObservable();
  }

  start() {
    this._stopwatch.reset();
    this._state$.next('running');
    this._stopwatch.start();
  }

  stop() {
    this._state$.next('stop');
    this._stopwatch.stop();
  }
}
