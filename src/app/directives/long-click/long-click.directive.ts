import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NumberInput, coerceNumberProperty } from '@angular/cdk/coercion';
import { fromEvent, merge, Observable } from 'rxjs';
import { delay, repeat, takeUntil } from 'rxjs/operators';

type MoveThreshold = { x?: number; y?: number };

@Directive({
  selector: '[ngLongClick]',
  standalone: true,
})
export class LongClickDirective implements AfterViewInit {
  @Input()
  get clickDelayMs(): number {
    return this._clickDelayMs;
  }
  set clickDelayMs(value: NumberInput) {
    this._clickDelayMs = coerceNumberProperty(value, 0);
  }
  private _clickDelayMs = 200;

  moveThreshold: MoveThreshold = { x: 20, y: 20 };

  @Output() ngClick = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() ngLongClick = new EventEmitter<MouseEvent | TouchEvent>();

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit(): void {
    const mouseDown$: Observable<MouseEvent> = fromEvent(
      this.hostElement.nativeElement,
      'mousedown'
    );
    const mouseUp$: Observable<MouseEvent> = fromEvent(
      this.hostElement.nativeElement,
      'mouseup'
    );
    const touchStart$: Observable<TouchEvent> = fromEvent(
      this.hostElement.nativeElement,
      'touchstart'
    );
    const touchEnd$: Observable<TouchEvent> = fromEvent(
      this.hostElement.nativeElement,
      'touchend'
    );

    merge(mouseDown$, touchStart$)
      .pipe(
        delay(this.clickDelayMs),
        takeUntil(merge(mouseUp$, touchEnd$)),
        repeat()
      )
      .subscribe((event) => {
        this.ngLongClick.emit(event);
      });
  }
}
