/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(
  type: string,
  x: number = 0,
  y: number = 0
): MouseEvent {
  const event = new MouseEvent(type, {
    clientX: x,
    clientY: y,
  });

  return event;
}

/** Creates a browser TouchEvent with the specified pointer coordinates. */
export function createTouchEvent(
  type: string,
  pageX: number = 0,
  pageY: number = 0
): UIEvent {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = new TouchEvent(type, { detail: 0, view: window });
  const touchDetails = { pageX, pageY, clientX: pageX, clientY: pageY };

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: { value: [touchDetails] },
    targetTouches: { value: [touchDetails] },
    changedTouches: { value: [touchDetails] },
  });

  return event;
}
