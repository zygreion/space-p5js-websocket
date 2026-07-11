// This file is a modified version of https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
// using p5js functions

// Mapping from the pointerId to the current finger position
const ongoingTouches = new Map();

function handleStart(event) {
  event.preventDefault();

  for (const changedTouch of event.changedTouches) {
    const touch = normTouch(changedTouch);
    ongoingTouches.set(changedTouch.identifier, touch);

    // Filler
    drawGfx.line(touch.pageX, touch.pageY, touch.pageX, touch.pageY);
  }
}

function handleEnd(event) {
  event.preventDefault();

  for (const changedTouch of event.changedTouches) {
    const touch = ongoingTouches.get(changedTouch.identifier);
    if (!touch) {
      console.error(`End: Could not find touch ${changedTouch.identifier}`);
      continue;
    }

    const normChangedTouch = normTouch(changedTouch);

    // Filler
    drawGfx.line(
      touch.pageX,
      touch.pageY,
      normChangedTouch.pageX,
      normChangedTouch.pageY,
    );

    ongoingTouches.delete(changedTouch.identifier);
  }
}

function handleCancel(event) {
  event.preventDefault();

  for (const changedTouch of event.changedTouches) {
    if (!ongoingTouches.has(changedTouch.identifier)) {
      console.error(`Cancel: Could not find touch ${changedTouch.identifier}`);
      continue;
    }
    ongoingTouches.delete(changedTouch.identifier);
  }
}

function handleMove(event) {
  event.preventDefault();

  for (const changedTouch of event.changedTouches) {
    const touch = ongoingTouches.get(changedTouch.identifier);

    if (!touch) {
      console.error(`Move: Could not find touch ${changedTouch.identifier}`);
      continue;
    }

    const normChangedTouch = normTouch(changedTouch);

    // Filler
    drawGfx.line(
      touch.pageX,
      touch.pageY,
      normChangedTouch.pageX,
      normChangedTouch.pageY,
    );

    const newTouch = normChangedTouch;
    ongoingTouches.set(changedTouch.identifier, newTouch);
  }
}

// Normalize touch position relative to the canvas starting position
// This also accounts for scrolling
function normTouch(touch) {
  const { x: canvasX, y: canvasY } = canvas.elt.getBoundingClientRect();
  return {
    pageX: touch.pageX - canvasX - window.scrollX,
    pageY: touch.pageY - canvasY - window.scrollY,
  };
}
