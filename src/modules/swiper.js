let start;
const SWIPE_THRESHOLD = 30;

export default {
  init: e => {
    const touchInfo = e.changedTouches[0];
    start = { x: touchInfo.screenX, y: touchInfo.screenY };
  },
  evaluate: e => {
    const touchInfo = e.changedTouches[0];
    if (start.x > touchInfo.screenX + SWIPE_THRESHOLD) {
      return "LEFT";
    } else if (start.x + SWIPE_THRESHOLD < touchInfo.screenX) {
      return "RIGHT";
    } else if (start.y + SWIPE_THRESHOLD < touchInfo.screenY) {
      return "DOWN";
    } else if (start.y > touchInfo.screenY + SWIPE_THRESHOLD) {
      return "UP";
    }
  }
};
