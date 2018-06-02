import { Component } from "inferno";
import Button from "./components/Button";
import Day from "./components/Day";
import { inject } from "inferno-mobx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    //db.get(["2018-05-31", "2018-06-01", "2018-06-02"]).then(values => console.log("coucou", values));
  }

  render() {
    const { store } = this.props;
    return (
      <div class="content">
        <a onClick={() => store.previousDay()} role="button">
          Previous
        </a>
        <a onClick={() => store.nextDay()} role="button">
          Next
        </a>
        <Day />
        <br />
        <Button onClick={this.onClick} label="push" />
      </div>
    );
  }
}

export default inject("store")(App);
