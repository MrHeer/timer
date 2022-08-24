import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, skip, Subject, takeUntil } from 'rxjs';
import { StopwatchService } from './stopwatch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  buttonText$: Observable<string>;
  destroy$ = new Subject();

  constructor(private stopwatchService: StopwatchService) {
    this.buttonText$ = stopwatchService.state$.pipe(
      map((value) => {
        switch (value) {
          case 'running':
            return '停止';
          case 'stop':
            return '开始';
          default:
            return '开始';
        }
      })
    );

    stopwatchService.time$
      .pipe(takeUntil(this.destroy$))
      .pipe(skip(1))
      .pipe(filter((value) => value % 5000 === 0))
      .subscribe((value) => {
        console.log(
          `系统时间: ${new Date().toTimeString()}, 秒表计时: ${value / 1000}s`
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
