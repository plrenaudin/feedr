let start;
const SWIPE_THRESHOLD = 30;
const limit = Math.tan(25 * 1.5 / 180 * Math.PI);

const init = e => {
  const touchInfo = e.changedTouches[0];
  start = { x: touchInfo.screenX, y: touchInfo.screenY };
};

const evaluateSwipe = e => {
  const touchInfo = e.changedTouches[0];
  let x = touchInfo.screenX - start.x;
  let y = touchInfo.screenY - start.y;
  let xy = Math.abs(x / y);
  let yx = Math.abs(y / x);
  if (Math.abs(x) > SWIPE_THRESHOLD || Math.abs(y) > SWIPE_THRESHOLD) {
    if (yx <= limit) {
      if (x < 0) {
        return { direction: "LEFT", x: touchInfo.screenX - start.x };
      } else {
        return { direction: "RIGHT", x: touchInfo.screenX - start.x };
      }
    }
    if (xy <= limit) {
      if (y < 0) {
        return { direction: "UP", y: touchInfo.screenY - start.y };
      } else {
        return { direction: "DOWN", y: touchInfo.screenY - start.y };
      }
    }
  }
  return { direction: "NONE" };
};

const evaluateSwipeTranslation = e => {
  let transform;
  const swipe = evaluateSwipe(e) || {};
  switch (swipe.direction) {
    case "LEFT":
    case "RIGHT":
      transform = `translateX(${swipe.x}px)`;
      break;
    default:
      break;
  }
  return transform;
};

export default { init, evaluateSwipeTranslation, evaluateSwipe };
