import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { Timer } from './timer';
import { TimerOneComponent } from './timer-one/timer-one.component';
import { TimerTwoComponent } from './timer-two/timer-two.component';
import { TimerService } from './timer.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        TimerOneComponent,
        TimerTwoComponent,
      ],
      imports: [MatIconModule, MatToolbarModule],
      providers: [{ provide: Timer, useClass: TimerService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
