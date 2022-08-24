import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTwoComponent } from './timer-two.component';

describe('TimerTwoComponent', () => {
  let component: TimerTwoComponent;
  let fixture: ComponentFixture<TimerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
