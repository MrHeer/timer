/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(
  type: string,
  x: number = 0,
  y: number = 0,
  button: number = 0
): MouseEvent {
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(
    type,
    true /* canBubble */,
    false /* cancelable */,
    window /* view */,
    0 /* detail */,
    x /* screenX */,
    y /* screenY */,
    x /* clientX */,
    y /* clientY */,
    false /* ctrlKey */,
    false /* altKey */,
    false /* shiftKey */,
    false /* metaKey */,
    button /* button */,
    null /* relatedTarget */
  );

  // `initMouseEvent` doesn't allow us to pass the `buttons` and
  // defaults it to 0 which looks like a fake event.
  Object.defineProperty(event, 'buttons', { get: () => 1 });

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
  const event = new UIEvent(type, { detail: 0, view: window });
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
