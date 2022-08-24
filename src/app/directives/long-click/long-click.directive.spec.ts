import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Stopwatch } from 'src/app/utils';
import { LongClickDirective } from './long-click.directive';

describe('LongClickDirective', () => {
  let target: Element;
  let stopwatch: Stopwatch;
  let directive: LongClickDirective;

  const mousedown = () => {
    const mousedownEvent = new MouseEvent('mousedown');
    target.dispatchEvent(mousedownEvent);
  };

  const mouseup = () => {
    const mouseupEvent = new MouseEvent('mouseup');
    target.dispatchEvent(mouseupEvent);
    target.dispatchEvent(mouseupEvent);
  };

  beforeEach(() => {
    target = document.createElement('button');
    const targetRef = new ElementRef(target);
    directive = new LongClickDirective(targetRef);
    stopwatch = new Stopwatch();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should cancel emit event when mouseup', fakeAsync(() => {
    const delay = 200;
    directive.longClick.subscribe(() => {
      stopwatch.stop();
      expect(stopwatch.duration).toBe(delay);
    });
    directive.ngAfterViewInit();
    mousedown();
    stopwatch.start();
    tick(delay / 2);
    mouseup();
    tick(delay);

    expect(stopwatch.isStop()).toBe(false);
  }));

  it('should emit long click event delay 500ms', fakeAsync(() => {
    const delay = 200;
    directive.longClick.subscribe(() => {
      stopwatch.stop();
      expect(stopwatch.duration).toBe(delay);
    });
    directive.ngAfterViewInit();
    mousedown();
    stopwatch.start();
    tick(delay);
  }));

  it('should emit long click event delay 2000ms', fakeAsync(() => {
    const delay = 2000;
    directive.clickDelayMs = delay;
    directive.longClick.subscribe(() => {
      stopwatch.stop();
      expect(stopwatch.duration).toBe(delay);
    });
    directive.ngAfterViewInit();
    mousedown();
    stopwatch.start();
    tick(delay);
  }));
});
