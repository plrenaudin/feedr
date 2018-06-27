import { Component } from "inferno";
import Day from "./components/Day";
import { inject } from "inferno-mobx";
import ExportImport from "./components/ExportImport";
import Swipeable from "./components/Swipeable";
import appContext from "./modules/context";
import ArrowNavigation from "./components/ArrowNavigation";
import Overlay from "./components/Overlay";
import Stats from "./components/Stats";
import Icon from "./components/Icon";

class App extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  getChildContext() {
    return appContext;
  }

  onRightSwipe = () => {
    this.store.previousDay();
  };
  onLeftSwipe = () => {
    this.store.nextDay();
  };

  render() {
    return (
      <Swipeable onLeftSwipe={this.onLeftSwipe} onRightSwipe={this.onRightSwipe}>
        <ArrowNavigation onLeft={this.onRightSwipe} onRight={this.onLeftSwipe} />
        <Overlay button={<Icon name="pie-chart" />} class="stats">
          <Stats />
          <ExportImport />
        </Overlay>
        <section class="content">
          <Day />
        </section>
      </Swipeable>
    );
  }
}

export default inject("store")(App);
