import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, skip, Subject, takeUntil } from 'rxjs';
import { State } from './interface';
import { Timer } from './timer';

function mapStateToText(state: State) {
  switch (state) {
    case 'running':
      return '停止';
    case 'stop':
      return '开始';
    default:
      return '开始';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  buttonText$: Observable<string>;
  destroy$ = new Subject();

  constructor(private timer: Timer) {
    this.buttonText$ = timer.state$.pipe(map(mapStateToText));
    this.log();
  }

  private log() {
    this.timer.time$
      .pipe(
        takeUntil(this.destroy$),
        skip(1),
        filter((time) => time % 5000 === 0)
      )
      .subscribe((time) => {
        console.log(
          `系统时间: ${new Date().toTimeString()}, 秒表计时: ${time / 1000}s`
        );
      });
  }

  start() {
    if (this.timer.state === 'stop') {
      this.timer.start();
    }
  }

  stop() {
    if (this.timer.state === 'running') {
      this.timer.stop();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
