import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { StopwatchService } from '../stopwatch.service';

@Component({
  selector: 'timer-two',
  templateUrl: './timer-two.component.html',
  styleUrls: ['./timer-two.component.scss'],
})
export class TimerTwoComponent {
  timer$: Observable<Date>;

  constructor(stopwatchService: StopwatchService) {
    this.timer$ = stopwatchService.time$.pipe(
      filter((value) => value % 1000 === 0),
      map((value) => new Date(value))
    );
  }
}
