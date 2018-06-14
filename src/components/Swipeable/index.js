import { Component } from "inferno";
import swiper from "../../modules/swiper";

export const animationDurationSeconds = 0.5;
const screenSize = { width: screen.width, height: screen.height };

class Swipeable extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = { transition: "none", transform: "none" };
  }

  onTouchStart = e => {
    swiper.init(e);
  };

  onTouchEnd = e => {
    const transition = `transform ${animationDurationSeconds * 0.5}s ease-out`;
    switch (swiper.evaluateSwipe(e).direction) {
      case "RIGHT":
        this.props.onRightSwipe();
        this.setState({
          transition,
          transform: `translateX(${screenSize.width}px)`
        });
        setTimeout(() => {
          this.setState({ transition: "none", transform: `translateX(-${screenSize.width}px)` });
        }, animationDurationSeconds * 0.25 * 1000);

        break;
      case "LEFT":
        this.props.onLeftSwipe();
        this.setState({
          transition,
          transform: `translateX(-${screenSize.width}px)`
        });
        setTimeout(() => {
          this.setState({ transition: "none", transform: `translateX(${screenSize.width}px)` });
        }, animationDurationSeconds * 0.25 * 1000);
        break;
    }

    setTimeout(() => {
      this.setState({
        transition,
        transform: "none"
      });
    }, animationDurationSeconds * 0.5 * 1000);
    setTimeout(() => {
      this.setState({
        transition: "none"
      });
    }, animationDurationSeconds * 1000);
  };

  onTouchMove = e => {
    const trans = swiper.evaluateSwipeTranslation(e);
    this.setState({ transform: trans });
  };

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
