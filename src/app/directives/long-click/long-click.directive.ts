import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { fromEvent, merge } from 'rxjs';
import {
  delay,
  delayWhen,
  filter,
  map,
  repeat,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Position } from 'src/app/interface';

export const DELAY = 300;

type EventType = MouseEvent | TouchEvent;

function getClientPosition(event: EventType) {
  if (event instanceof TouchEvent) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if (event instanceof MouseEvent) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  console.warn('Unsupported event type');

  return { x: 0, y: 0 };
}

function calcOffset(start: EventType, end: EventType) {
  const { x: endX, y: endY } = getClientPosition(end);
  const { x: startX, x: startY } = getClientPosition(start);
  return {
    x: Math.abs(endX - startX),
    y: Math.abs(endY - startY),
  };
}

function isOverThreshold(offset: Position, threshold: Position) {
  return !!(
    (threshold?.x && offset.x > threshold.x) ||
    (threshold?.y && offset.y > threshold.y)
  );
}

@Directive({
  selector: '[ngLongClick]',
  standalone: true,
})
export class LongClickDirective implements AfterViewInit {
  @Input()
  get delay(): number {
    return this._delay;
  }
  set delay(value: NumberInput) {
    this._delay = coerceNumberProperty(value, 0);
  }
  private _delay = DELAY;

  moveThreshold: Position = { x: 20, y: 20 };

  @Output() ngClick = new EventEmitter<EventType>();
  @Output() ngLongClick = new EventEmitter<EventType>();

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit(): void {
    const mouseDown$ = fromEvent<MouseEvent>(
      this.hostElement.nativeElement,
      'mousedown'
    );
    const mouseUp$ = fromEvent<MouseEvent>(
      this.hostElement.nativeElement,
      'mouseup'
    );
    const mouseMove$ = fromEvent<MouseEvent>(
      this.hostElement.nativeElement,
      'mousemove'
    );
    const mouseLeave$ = fromEvent<MouseEvent>(
      this.hostElement.nativeElement,
      'mouseleave'
    );
    const touchStart$ = fromEvent<TouchEvent>(
      this.hostElement.nativeElement,
      'touchstart'
    );
    const touchEnd$ = fromEvent<TouchEvent>(
      this.hostElement.nativeElement,
      'touchend'
    );
    const touchMove$ = fromEvent<TouchEvent>(
      this.hostElement.nativeElement,
      'touchmove'
    );

    const start$ = merge(mouseDown$, touchStart$);
    const move$ = merge(mouseMove$, touchMove$);
    const end$ = merge(mouseUp$, touchEnd$);

    const overThreshold$ = start$.pipe(
      switchMap((start) => move$.pipe(map((move) => calcOffset(start, move)))),
      filter((offset) => isOverThreshold(offset, this.moveThreshold)),
      takeUntil(end$),
      repeat()
    );

    const abort$ = merge(mouseLeave$, overThreshold$);

    const longClick$ = start$.pipe(
      delay(this.delay),
      takeUntil(merge(end$, abort$)),
      repeat()
    );

    const click$ = start$.pipe(
      delayWhen(() => end$),
      takeUntil(merge(longClick$, abort$)),
      repeat()
    );

    click$.subscribe((event) => {
      this.ngClick.emit(event);
    });

    longClick$.subscribe((event) => {
      this.ngLongClick.emit(event);
    });
  }
}
