import { Component } from "inferno";
import swiper from "../../modules/swiper";

export const animationDurationSeconds = 0.5;
const screenSize = { width: screen.width, height: screen.height };

class Swipeable extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
    this.state = { transition: "none", transform: "none" };
  }

  onTouchStart = e => this.context.isSwipable && swiper.init(e);

  translateRight = () => `translateX(${screenSize.width}px)`;

  translateLeft = () => `translateX(-${screenSize.width}px)`;

  onTouchEnd = e => {
    if (!this.context.isSwipable) return;
    const transition = `transform ${animationDurationSeconds * 0.5}s ease-out`;
    let callback;
    switch (swiper.evaluateSwipe(e).direction) {
      case "RIGHT":
        callback = this.props.onRightSwipe;
        this.setState({
          transition,
          transform: this.translateRight()
        });
        setTimeout(() => {
          this.setState({ transition: "none", transform: this.translateLeft() });
        }, animationDurationSeconds * 0.25 * 1000);

        break;
      case "LEFT":
        callback = this.props.onLeftSwipe;
        this.setState({
          transition,
          transform: this.translateLeft()
        });
        setTimeout(() => {
          this.setState({ transition: "none", transform: this.translateRight() });
        }, animationDurationSeconds * 0.25 * 1000);
        break;
    }

    setTimeout(() => {
      this.setState({
        transition,
        transform: "none"
      });
      callback && callback();
    }, animationDurationSeconds * 0.5 * 1000);
    setTimeout(() => {
      this.setState({
        transition: "none"
      });
    }, animationDurationSeconds * 1000);
  };

  onTouchMove = e =>
    this.context.isSwipable && this.setState({ transform: swiper.evaluateSwipeTranslation(e) });

  componentDidMount() {
    if (!this.rootDiv) return;
    this.rootDiv.addEventListener("touchstart", this.onTouchStart, false);
    this.rootDiv.addEventListener("touchend", this.onTouchEnd, false);
    this.rootDiv.addEventListener("touchmove", this.onTouchMove, false);
  }

  componentWillUnmount() {
    this.rootDiv.removeEventListener("touchstart", this.touchStart);
    this.rootDiv.removeEventListener("touchend", this.touchEnd);
    this.rootDiv.removeEventListener("touchmove", this.onTouchMove);
  }

  render() {
    return (
      <div class="swipeable" style={{ ...this.state }} ref={rootDiv => (this.rootDiv = rootDiv)}>
        {this.props.children}
      </div>
    );
  }
}

export default Swipeable;
