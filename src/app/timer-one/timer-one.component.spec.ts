import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timer } from '../timer';
import { TimerService } from '../timer.service';

import { TimerOneComponent } from './timer-one.component';

describe('TimerOneComponent', () => {
  let component: TimerOneComponent;
  let fixture: ComponentFixture<TimerOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerOneComponent],
      providers: [{ provide: Timer, useClass: TimerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TimerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
