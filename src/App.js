import { Component } from "inferno";
import Day from "./components/Day";
import { inject } from "inferno-mobx";
import swiper from "./modules/swiper";

class App extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  onClick() {
    //db.get(["2018-05-31", "2018-06-01", "2018-06-02"]).then(values => console.log("coucou", values));
  }

  onTouchStart = e => {
    swiper.init(e);
  };

  onTouchEnd = e => {
    switch (swiper.evaluate(e)) {
      case "RIGHT":
        this.store.previousDay();
        break;
      case "LEFT":
        this.store.nextDay();
        break;
    }
  };

  componentDidMount() {
    if (!this.rootDiv) return;
    this.rootDiv.addEventListener("touchstart", this.onTouchStart, false);
    this.rootDiv.addEventListener("touchend", this.onTouchEnd, false);
  }

  componentWillUnmount() {
    this.rootDiv.removeEventListener("touchstart", this.touchStart);
    this.rootDiv.removeEventListener("touchend", this.touchEnd);
  }

  render() {
    return (
      <div class="content" ref={rootDiv => (this.rootDiv = rootDiv)}>
        <Day />
      </div>
    );
  }
}

export default inject("store")(App);
