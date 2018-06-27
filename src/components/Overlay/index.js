import { Component } from "inferno";

class Overlay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      opened: false
    };
  }

  openPicker = () => {
    this.setState({ opened: true });
    this.context.isSwipable = false;
  };

  closePicker = () => {
    this.setState({ opened: false });
    this.context.isSwipable = true;
    this.props.onClose && this.props.onClose();
  };

  render() {
    return (
      <div class="food-type-picker">
        <a role="button" onClick={this.openPicker}>
          {this.props.button}
        </a>
        {this.state.opened && (
          <div class="picker">
            <div class="picker-overlay" onClick={this.closePicker} />
            <div class="picker-content">{this.props.children}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Overlay;
