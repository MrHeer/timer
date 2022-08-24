import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerOneComponent } from './timer-one.component';

describe('TimerOneComponent', () => {
  let component: TimerOneComponent;
  let fixture: ComponentFixture<TimerOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
