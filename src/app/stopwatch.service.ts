import { Injectable } from '@angular/core';
import { Stopwatch } from './utils';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
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

  start() {
    this._stopwatch.start();
  }

  stop() {
    this._stopwatch.stop();
  }
}
