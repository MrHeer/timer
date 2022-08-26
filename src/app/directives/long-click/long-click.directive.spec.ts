import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Position } from 'src/app/interface';
import { DELAY, LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let target: HTMLElement;
  let clickSpy: jasmine.Spy;
  let longClickSpy: jasmine.Spy;

  const mouseDown = () => {
    const mouseDownEvent = new MouseEvent('mousedown', {
      clientX: 0,
      clientY: 0,
    });
    target.dispatchEvent(mouseDownEvent);
    fixture.detectChanges();
  };

  const mouseUp = () => {
    const mouseUpEvent = new MouseEvent('mouseup', { clientX: 0, clientY: 0 });
    target.dispatchEvent(mouseUpEvent);
    fixture.detectChanges();
  };

  const mouseMove = (to: Position) => {
    const mouseUpEvent = new MouseEvent('mouseup', {
      clientX: to.x,
      clientY: to.y,
    });
    target.dispatchEvent(mouseUpEvent);
    fixture.detectChanges();
  };

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [LongClickDirective],
    }).createComponent(TestComponent);
    clickSpy = spyOn(fixture.componentInstance, 'click');
    longClickSpy = spyOn(fixture.componentInstance, 'longClick');
    target = fixture.nativeElement;
    fixture.detectChanges(); // initial binding
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should emit click event when click', fakeAsync(() => {
    mouseDown();
    tick(DELAY);
    mouseUp();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  }));

  it('should cancel emit event when mouseup', fakeAsync(() => {
    mouseDown();
    tick(DELAY / 2);
    mouseUp();
    tick(DELAY / 2);
    expect(longClickSpy).toHaveBeenCalledTimes(0);
  }));

  it('should emit long click event delay 200ms', fakeAsync(() => {
    const DELAY = 200;
    mouseDown();
    tick(DELAY);
    mouseUp();
    expect(longClickSpy).toHaveBeenCalledTimes(1);
  }));

  it('should emit long click event delay 2000ms', fakeAsync(() => {
    const delay = 2000;
    mouseDown();
    tick(delay / 2);
    expect(longClickSpy).toHaveBeenCalledTimes(0);
    tick(delay / 2);
    expect(longClickSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not emit click event after long click', fakeAsync(() => {
    mouseDown();
    tick(DELAY);
    mouseUp();
    expect(clickSpy).toHaveBeenCalledTimes(0);
    expect(longClickSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not emit event when over the threshold', fakeAsync(() => {
    mouseDown();
    mouseMove({ x: 50, y: 50 });
    tick(DELAY);
    mouseUp();
    expect(clickSpy).toHaveBeenCalledTimes(0);
    expect(longClickSpy).toHaveBeenCalledTimes(0);
  }));
});

@Component({
  template: `
    <button
      (ngLongClick)="longClick()"
      (ngClick)="click()"
      delay="delay"
    ></button>
  `,
})
export class TestComponent {
  delay = DELAY;
  click() {
    console.log('click');
  }
  longClick() {
    console.log('longClick');
  }
}
