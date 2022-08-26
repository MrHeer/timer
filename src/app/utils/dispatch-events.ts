/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { createMouseEvent, createTouchEvent } from './event-objects';

/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(
  node: Node,
  type: string,
  x?: number,
  y?: number,
  event: MouseEvent = createMouseEvent(type, x, y)
): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}

/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(
  node: Node,
  type: string,
  x?: number,
  y?: number
): TouchEvent {
  return dispatchEvent(node, createTouchEvent(type, x, y)) as TouchEvent;
}
