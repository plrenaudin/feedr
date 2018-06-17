import { Component, linkEvent } from "inferno";
import { inject } from "inferno-mobx";
import { FOOD_TYPES } from "../../modules/store";
import Icon from "../Icon";

class FoodCategoryPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.meal = props.meal;
    this.mealItemIndex = props.index;
    this.store = props.store;
    this.state = {
      opened: false,
      selected: this.store.day[this.meal][this.mealItemIndex].categories || []
    };
  }

  openPicker(instance) {
    instance.setState({ opened: true });
    instance.context.isSwipable = false;
  }

  closePicker(instance) {
    instance.setState({ opened: false });
    instance.context.isSwipable = true;
    instance.store.editItemCategory(instance.meal, instance.mealItemIndex, instance.state.selected);
  }

  toggleItem(key) {
    return instance => {
      const idx = instance.state.selected.indexOf(key);
      if (idx > -1) {
        const copy = instance.state.selected.slice();
        copy.splice(idx, 1);
        instance.setState({ selected: copy });
      } else {
        instance.setState({ selected: instance.state.selected.concat(key) });
      }
    };
  }

  render() {
    return (
      <div class="food-type-picker">
        <a role="button" onClick={linkEvent(this, this.openPicker)}>
          <Icon name="price-tag" />
        </a>
        {this.state.opened && (
          <div class="picker">
            <div class="picker-overlay" onClick={linkEvent(this, this.closePicker)} />
            <div class="picker-content">
              <ul $HasKeyedChildren>
                {Object.keys(FOOD_TYPES).map(key => (
                  <li
                    key={key}
                    class={`color${key} ${this.state.selected.includes(key) && "selected"}`}
                    onClick={linkEvent(this, this.toggleItem(key))}
                  >
                    {FOOD_TYPES[key]}
                    <span class="check">
                      <Icon name="checkmark" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default inject("store")(FoodCategoryPicker);
