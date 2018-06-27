import { inject } from "inferno-mobx";
import { Component } from "inferno";
import Pie from "../Pie";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = { data: [] };
  }
  componentDidMount() {
    this.store.fetchStats().then(data =>
      this.setState({
        data
      })
    );
  }
  componentWillUnmount() {
    this.setState({ data: [] });
  }
  render() {
    return (
      <section class="stats">
        <Pie categories={this.state.data} />
      </section>
    );
  }
}

export default inject("store")(Stats);
