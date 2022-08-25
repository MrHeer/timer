import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Stopwatch } from 'src/app/utils';
import { LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let target: Element;
  let stopwatch: Stopwatch;
  let directive: LongClickDirective;

  const mouseDown = () => {
    const mouseDownEvent = new MouseEvent('mousedown');
    target.dispatchEvent(mouseDownEvent);
  };

  const mouseUp = () => {
    const mouseUpEvent = new MouseEvent('mouseup');
    target.dispatchEvent(mouseUpEvent);
    target.dispatchEvent(mouseUpEvent);
  };

  beforeEach(() => {
    target = document.createElement('button');
    const targetRef = new ElementRef(target);
    directive = new LongClickDirective(targetRef);
    stopwatch = new Stopwatch();
    directive.longClick.subscribe(() => {
      stopwatch.stop();
    });
    directive.ngAfterViewInit();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should cancel emit event when mouseup', fakeAsync(() => {
    const delay = 200;
    mouseDown();
    stopwatch.start();
    tick(delay / 2);
    mouseUp();
    tick(delay / 2);
    expect(stopwatch.state).toBe('running');
    stopwatch.stop();
  }));

  it('should emit long click event delay 200ms', fakeAsync(() => {
    const delay = 200;
    mouseDown();
    stopwatch.start();
    tick(delay);
    expect(stopwatch.state).toBe('stop');
  }));

  it('should emit long click event delay 2000ms', fakeAsync(() => {
    const delay = 2000;
    directive.clickDelayMs = delay;
    mouseDown();
    stopwatch.start();
    tick(delay);
    expect(stopwatch.state).toBe('stop');
  }));
});
