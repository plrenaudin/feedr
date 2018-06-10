import InputField from "../InputField";
import { inject, observer } from "inferno-mobx";
import FoodCategoryPicker from "../FoodCategoryPicker";

const addItem = (store, meal) => value => {
  store.addItem(meal, value);
};
const removeItem = (store, meal, idx) => () => {
  store.removeItem(meal, idx);
};

const labels = {
  morning: "Breakfast",
  noon: "Lunch",
  evening: "Diner"
};

const MealItem = ({ idx, item, meal, store }) => (
  <li>
    <span>{item.name}</span>
    <span class="actions">
      <FoodCategoryPicker {...{ meal, index: idx }} />
      <a role="button" onClick={removeItem(store, meal, idx)}>
        <i class="far fa-trash-alt" />
      </a>
    </span>
  </li>
);

const Meal = ({ meal, store }) => (
  <div class="meal">
    <h3>
      <span class="fa-layers fa-fw">
        <i class="fas fa-circle" data-fa-transform="grow-6" />
        <i class="fas fa-utensils" data-fa-transform="shrink-2" />
      </span>
      {labels[meal]}
    </h3>
    <div class="mealContent">
      <ul $HasNonKeyedChildren>
        {store.day[meal].map((item, idx) => <MealItem {...{ idx, item, meal, store }} />)}
      </ul>
      <InputField
        onChange={addItem(store, meal)}
        placeholder={store.day[meal].length === 0 ? "What did you eat?" : "What else...?"}
      />
    </div>
  </div>
);

export default inject("store")(observer(Meal));
