let start;
const SWIPE_THRESHOLD = 30;
const limit = Math.tan(25 * 1.5 / 180 * Math.PI);

export default {
  init: e => {
    const touchInfo = e.changedTouches[0];
    start = { x: touchInfo.screenX, y: touchInfo.screenY };
  },
  evaluate: e => {
    const touchInfo = e.changedTouches[0];
    let x = touchInfo.screenX - start.x;
    let y = touchInfo.screenY - start.y;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > SWIPE_THRESHOLD || Math.abs(y) > SWIPE_THRESHOLD) {
      if (yx <= limit) {
        if (x < 0) {
          return "LEFT";
        } else {
          return "RIGHT";
        }
      }
      if (xy <= limit) {
        if (y < 0) {
          return "UP";
        } else {
          return "DOWN";
        }
      }
    }
  }
};
