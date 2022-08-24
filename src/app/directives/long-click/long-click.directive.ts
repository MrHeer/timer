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
import { delay, repeat, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[longClick]',
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
  private _clickDelayMs = 500;

  @Output() longClick = new EventEmitter<MouseEvent | TouchEvent>();

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
        tap(() => console.time('test')),
        delay(this.clickDelayMs),
        tap(() => console.timeEnd('test')),
        takeUntil(merge(mouseUp$, touchEnd$)),
        repeat()
      )
      .subscribe((val) => this.longClick.emit(val));
  }
}
