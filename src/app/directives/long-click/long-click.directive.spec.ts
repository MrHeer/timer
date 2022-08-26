import { Component } from '@angular/core';
import {
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent, dispatchTouchEvent } from 'src/app/utils';
import { DELAY, LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let button: Node;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [LongClickDirective],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(
      By.directive(LongClickDirective)
    ).nativeNode;
    spyOn(component, 'click');
    spyOn(component, 'longClick');
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should emit click event when click', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    tick(DELAY / 2);
    dispatchMouseEvent(button, 'mouseup');
    expect(component.click).toHaveBeenCalledTimes(1);
  }));

  it('should cancel emit event when mouseup', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    tick(DELAY / 2);
    dispatchMouseEvent(button, 'mouseup');
    tick(DELAY / 2);
    expect(component.longClick).toHaveBeenCalledTimes(0);
  }));

  it('should emit long click event delay 300ms', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    tick(DELAY);
    dispatchMouseEvent(button, 'mouseup');

    expect(component.longClick).toHaveBeenCalledTimes(1);
  }));

  it('should not emit click event after long click', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    tick(DELAY);
    dispatchMouseEvent(button, 'mouseup');
    expect(component.click).toHaveBeenCalledTimes(0);
    expect(component.longClick).toHaveBeenCalledTimes(1);
  }));

  it('should not emit event when over the threshold', fakeAsync(() => {
    dispatchMouseEvent(button, 'mousedown');
    dispatchMouseEvent(button, 'mousemove', 50, 50);
    tick(DELAY);
    dispatchMouseEvent(button, 'mouseup');
    expect(component.click).toHaveBeenCalledTimes(0);
    expect(component.longClick).toHaveBeenCalledTimes(0);
  }));
});

@Component({
  template: `
    <button (ngLongClick)="longClick()" (ngClick)="click()"></button>
  `,
})
class TestComponent {
  click() {}
  longClick() {}
}

describe('Custom LongClickDirective', () => {
  it('should emit long click event delay 2000ms', fakeAsync(() => {
    const fixture = TestBed.configureTestingModule({
      declarations: [TestComponentCustomDelay],
      imports: [LongClickDirective],
    }).createComponent(TestComponentCustomDelay);
    const component = fixture.componentInstance;
    const button = fixture.debugElement.query(
      By.directive(LongClickDirective)
    ).nativeElement;
    spyOn(component, 'click');
    spyOn(component, 'longClick');
    fixture.detectChanges();

    const delay = 2000;
    dispatchTouchEvent(button, 'touchstart', 10, 10);
    dispatchTouchEvent(button, 'touchmove', 10, 10);
    tick(delay / 2);
    expect(component.longClick).toHaveBeenCalledTimes(0);
    tick(delay / 2);
    dispatchTouchEvent(button, 'touchend');
    expect(component.longClick).toHaveBeenCalledTimes(1);
  }));
});

@Component({
  template: `
    <button
      (ngLongClick)="longClick()"
      (ngClick)="click()"
      delay="2000"
    ></button>
  `,
})
class TestComponentCustomDelay {
  click() {}
  longClick() {}
}
