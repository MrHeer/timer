import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timer } from '../timer';
import { TimerService } from '../timer.service';

import { TimerTwoComponent } from './timer-two.component';

describe('TimerTwoComponent', () => {
  let component: TimerTwoComponent;
  let fixture: ComponentFixture<TimerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerTwoComponent],
      providers: [{ provide: Timer, useClass: TimerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TimerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
