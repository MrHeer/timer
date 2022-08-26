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
import { Position } from 'src/app/interface';

export const DELAY = 300;

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
      .pipe(delay(this.delay), takeUntil(merge(mouseUp$, touchEnd$)), repeat())
      .subscribe((event) => {
        this.ngLongClick.emit(event);
      });
  }
}
