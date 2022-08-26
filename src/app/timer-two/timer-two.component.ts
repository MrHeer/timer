import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Timer } from '../timer';

@Component({
  selector: 'timer-two',
  templateUrl: './timer-two.component.html',
  styleUrls: ['./timer-two.component.scss'],
})
export class TimerTwoComponent {
  time$: Observable<number>;

  constructor(timer: Timer) {
    this.time$ = timer.time$.pipe(filter((time) => time % 1000 === 0));
  }
}
