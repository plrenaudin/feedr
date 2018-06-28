import { inject } from "inferno-mobx";
import { Component } from "inferno";
import Pie from "../Pie";
import { DAY, MONTH, WEEK } from "../../modules/dateRangeEnum";

const defaultState = () => ({ data: [], selected: DAY });

class Stats extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = defaultState();
  }

  fetchStats = range => () => {
    this.store.fetchStats(range).then(data =>
      this.setState({
        data,
        selected: range
      })
    );
  };

  componentDidMount() {
    this.fetchStats(DAY)();
  }

  componentWillUnmount() {
    this.setState(defaultState());
  }

  render() {
    return (
      <section class="stats">
        <ul class="control">
          <li class={this.state.selected === DAY && "selected"} onClick={this.fetchStats(DAY)}>
            Day
          </li>
          <li class={this.state.selected === WEEK && "selected"} onClick={this.fetchStats(WEEK)}>
            Week
          </li>
          <li class={this.state.selected === MONTH && "selected"} onClick={this.fetchStats(MONTH)}>
            Month
          </li>
        </ul>
        <Pie categories={this.state.data} />
      </section>
    );
  }
}

export default inject("store")(Stats);
