import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StopwatchService } from '../stopwatch.service';

@Component({
  selector: 'timer-one',
  templateUrl: './timer-one.component.html',
  styleUrls: ['./timer-one.component.scss'],
})
export class TimerOneComponent {
  timer$: Observable<number>;

  constructor(stopwatchService: StopwatchService) {
    this.timer$ = stopwatchService.time$;
  }
}
