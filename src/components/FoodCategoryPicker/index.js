import { Component } from "inferno";
import { inject } from "inferno-mobx";
import { FOOD_TYPES } from "../../modules/store";
import Icon from "../Icon";
import Overlay from "../Overlay";

class FoodCategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.meal = props.meal;
    this.mealItemIndex = props.index;
    this.store = props.store;
    this.state = {
      selected: this.store.day[this.meal][this.mealItemIndex].categories || []
    };
  }

  save = () => {
    this.store.editItemCategory(this.meal, this.mealItemIndex, this.state.selected);
  };

  toggleItem = key => {
    return () => {
      const idx = this.state.selected.indexOf(key);
      if (idx > -1) {
        const copy = this.state.selected.slice();
        copy.splice(idx, 1);
        this.setState({ selected: copy });
      } else {
        this.setState({ selected: this.state.selected.concat(key) });
      }
    };
  };

  render() {
    return (
      <Overlay button={<Icon name="price-tag" />} onClose={this.save} class="food-type-picker">
        <ul $HasKeyedChildren>
          {Object.keys(FOOD_TYPES).map(key => (
            <li
              key={key}
              class={`color${key} ${this.state.selected.includes(key) && "selected"}`}
              onClick={this.toggleItem(key)}
            >
              {FOOD_TYPES[key]}
              <span class="check">
                <Icon name="checkmark" />
              </span>
            </li>
          ))}
        </ul>
      </Overlay>
    );
  }
}

export default inject("store")(FoodCategoryPicker);
