import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, takeUntil, timer } from 'rxjs';
import { State } from './interface';
import { Timer } from './timer';

@Injectable()
export class TimerService extends Timer {
  private _state$ = new BehaviorSubject<State>('stop');
  private _time$ = new BehaviorSubject(0);

  constructor() {
    super();
    const running$ = this.state$.pipe(filter((state) => state === 'running'));
    const stop$ = this.state$.pipe(filter((state) => state === 'stop'));
    running$.subscribe(() => {
      timer(0, 10)
        .pipe(
          map((time) => time * 10),
          takeUntil(stop$)
        )
        .subscribe((time) => this._time$.next(time));
    });
  }

  get state$() {
    return this._state$.asObservable();
  }

  get state() {
    return this._state$.getValue();
  }

  get time$() {
    return this._time$.asObservable();
  }

  get time() {
    return this._time$.getValue();
  }

  start() {
    this._state$.next('running');
  }

  stop() {
    this._state$.next('stop');
  }
}
