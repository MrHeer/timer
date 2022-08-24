import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stopwatch } from './utils';

type State = 'stop' | 'running';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private _state$ = new BehaviorSubject<State>('stop');
  private _stopwatch = new Stopwatch();

  get state$() {
    return this._state$.asObservable();
  }

  get state() {
    return this._state$.getValue();
  }

  get time$() {
    return this._stopwatch.time$;
  }

  start() {
    this._state$.next('running');
    this._stopwatch.start();
  }

  stop() {
    this._state$.next('stop');
    this._stopwatch.stop();
  }
}
