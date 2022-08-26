import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Timer } from '../timer';

@Component({
  selector: 'timer-one',
  templateUrl: './timer-one.component.html',
  styleUrls: ['./timer-one.component.scss'],
})
export class TimerOneComponent {
  time$: Observable<number>;

  constructor(timer: Timer) {
    this.time$ = timer.time$;
  }
}
