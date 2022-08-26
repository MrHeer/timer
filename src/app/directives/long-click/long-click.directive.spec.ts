import { Component } from '@angular/core';
import {
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'src/app/utils';
import { DELAY, LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let target: Node;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [LongClickDirective],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    target = fixture.debugElement.query(
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
    dispatchMouseEvent(target, 'mousedown');
    tick(DELAY / 2);
    dispatchMouseEvent(target, 'mouseup');
    expect(component.click).toHaveBeenCalledTimes(1);
  }));

  it('should cancel emit event when mouseup', fakeAsync(() => {
    dispatchMouseEvent(target, 'mousedown');
    tick(DELAY / 2);
    dispatchMouseEvent(target, 'mouseup');
    tick(DELAY / 2);
    expect(component.longClick).toHaveBeenCalledTimes(0);
  }));

  it('should emit long click event delay 300ms', fakeAsync(() => {
    dispatchMouseEvent(target, 'mousedown');
    tick(DELAY);
    dispatchMouseEvent(target, 'mouseup');

    expect(component.longClick).toHaveBeenCalledTimes(1);
  }));

  it('should not emit click event after long click', fakeAsync(() => {
    dispatchMouseEvent(target, 'mousedown');
    tick(DELAY);
    dispatchMouseEvent(target, 'mouseup');
    expect(component.click).toHaveBeenCalledTimes(0);
    expect(component.longClick).toHaveBeenCalledTimes(1);
  }));

  it('should not emit event when over the threshold', fakeAsync(() => {
    dispatchMouseEvent(target, 'mousedown', 0, 0);
    dispatchMouseEvent(target, 'mousemove', 50, 50);
    tick(DELAY);
    dispatchMouseEvent(target, 'mouseup', 50, 50);
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
    const target = fixture.debugElement.query(
      By.directive(LongClickDirective)
    ).nativeElement;
    spyOn(component, 'click');
    spyOn(component, 'longClick');
    fixture.detectChanges();

    const delay = 2000;
    dispatchMouseEvent(target, 'mousedown');
    tick(delay / 2);
    expect(component.longClick).toHaveBeenCalledTimes(0);
    tick(delay / 2);
    dispatchMouseEvent(target, 'mouseup');
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
