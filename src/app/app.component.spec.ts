import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LongClickDirective } from './directives';
import { Timer } from './timer';
import { TimerOneComponent } from './timer-one/timer-one.component';
import { TimerTwoComponent } from './timer-two/timer-two.component';
import { TimerService } from './timer.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { dispatchMouseEvent } from './utils';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let button: Node;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        TimerOneComponent,
        TimerTwoComponent,
      ],
      imports: [MatIconModule, MatToolbarModule, LongClickDirective],
      providers: [{ provide: Timer, useClass: TimerService }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    button = fixture.debugElement.query(
      By.directive(LongClickDirective)
    ).nativeNode;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should start timer', () => {
    expect(button.textContent).toContain('开始');
    dispatchMouseEvent(button, 'mousedown');
    dispatchMouseEvent(button, 'mouseup');
    fixture.detectChanges();
    expect(button.textContent).toContain('停止');
  });

  it('should stop timer', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    dispatchMouseEvent(button, 'mouseup');
    fixture.detectChanges();
    expect(button.textContent).toContain('停止');
    dispatchMouseEvent(button, 'mousedown');
    tick(3000);
    dispatchMouseEvent(button, 'mouseup');
    fixture.detectChanges();
    expect(button.textContent).toContain('开始');
  }));
});
