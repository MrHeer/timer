import { Injectable } from '@angular/core';
import { Timer } from './timer';
import { Stopwatch } from './utils';

@Injectable()
export class StopwatchService extends Timer {
  private _stopwatch = new Stopwatch();

  get state$() {
    return this._stopwatch.state$;
  }

  get state() {
    return this._stopwatch.state;
  }

  get time$() {
    return this._stopwatch.time$;
  }

  get time() {
    return this._stopwatch.time;
  }

  start() {
    this._stopwatch.start();
  }

  stop() {
    this._stopwatch.stop();
  }
}
