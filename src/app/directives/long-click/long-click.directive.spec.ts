import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let target: HTMLElement;
  let directive: LongClickDirective;
  let clickSpy: jasmine.Spy;
  let longClickSpy: jasmine.Spy;

  const mouseDown = () => {
    const mouseDownEvent = new MouseEvent('mousedown');
    target.dispatchEvent(mouseDownEvent);
  };

  const mouseUp = () => {
    const mouseUpEvent = new MouseEvent('mouseup');
    target.dispatchEvent(mouseUpEvent);
  };

  beforeEach(() => {
    target = document.createElement('button');
    const targetRef = new ElementRef(target);
    directive = new LongClickDirective(targetRef);
    clickSpy = spyOn(directive.ngClick, 'emit');
    longClickSpy = spyOn(directive.ngLongClick, 'emit');
    directive.ngAfterViewInit();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should cancel emit event when mouseup', fakeAsync(() => {
    const delay = 200;
    mouseDown();
    tick(delay / 2);
    mouseUp();
    tick(delay / 2);
    expect(clickSpy).toHaveBeenCalledTimes(0);
  }));

  it('should emit long click event delay 200ms', fakeAsync(() => {
    const delay = 200;
    mouseDown();
    tick(delay);
    mouseUp();
    expect(longClickSpy).toHaveBeenCalled();
  }));

  it('should emit long click event delay 2000ms', fakeAsync(() => {
    const delay = 2000;
    mouseDown();
    tick(delay);
    mouseUp();
    expect(longClickSpy).toHaveBeenCalled();
  }));

  it('should not emit click event after long click', fakeAsync(() => {
    // TODO
  }));

  it('should not emit long click when over the threshold', fakeAsync(() => {
    // TODO
  }));
});
