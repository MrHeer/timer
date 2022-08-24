import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { Stopwatch } from './utils';

type State = 'stop' | 'running';

const step = 10;

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  private _duration$ = new BehaviorSubject(0);
  private _state$ = new BehaviorSubject<State>('stop');
  private _stopwatch = new Stopwatch();

  constructor() {
    let sub: Subscription | null;
    this._state$.subscribe((state) => {
      if (state === 'running') {
        sub = timer(0, step).subscribe(() => {
          const duration = this._stopwatch.duration;
          this._duration$.next(Math.round(duration / step) * step);
        });
      } else {
        sub?.unsubscribe();
      }
    });
  }

  get state$() {
    return this._state$.asObservable();
  }

  get state() {
    return this._state$.getValue();
  }

  get duration$() {
    return this._duration$.asObservable();
  }

  start() {
    this._state$.next('running');
    this._stopwatch.reset();
    this._stopwatch.start();
  }

  stop() {
    this._state$.next('stop');
    this._stopwatch.stop();
  }
}
