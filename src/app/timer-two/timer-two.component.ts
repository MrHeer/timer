import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { StopwatchService } from '../stopwatch.service';

@Component({
  selector: 'timer-two',
  templateUrl: './timer-two.component.html',
  styleUrls: ['./timer-two.component.scss'],
})
export class TimerTwoComponent {
  timer$: Observable<number>;

  constructor(stopwatchService: StopwatchService) {
    this.timer$ = stopwatchService.time$.pipe(
      filter((value) => value % 1000 === 0)
    );
  }
}
