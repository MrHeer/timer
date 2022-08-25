import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, skip, Subject, takeUntil } from 'rxjs';
import { StopwatchService } from './stopwatch.service';
import { State } from './utils/stopwatch';

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

  constructor(private stopwatchService: StopwatchService) {
    this.buttonText$ = stopwatchService.state$.pipe(map(mapStateToText));
    this.log();
  }

  private log() {
    this.stopwatchService.time$
      .pipe(takeUntil(this.destroy$))
      .pipe(skip(1))
      .pipe(filter((time) => time % 5000 === 0))
      .subscribe((time) => {
        console.log(
          `系统时间: ${new Date().toTimeString()}, 秒表计时: ${time / 1000}s`
        );
      });
  }

  start() {
    if (this.stopwatchService.state === 'stop') {
      this.stopwatchService.start();
    }
  }

  stop() {
    if (this.stopwatchService.state === 'running') {
      this.stopwatchService.stop();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
