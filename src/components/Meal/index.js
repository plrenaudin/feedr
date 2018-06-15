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
  snack: "Snack",
  evening: "Diner"
};

const MealItem = ({ index, item, meal, store }) => (
  <li>
    <span>{item.name}</span>
    <div class="actions">
      <FoodCategoryPicker {...{ meal, index }} />
      <a role="button" onClick={removeItem(store, meal, index)}>
        <i class="far fa-trash-alt" />
      </a>
    </div>
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
      <ul $HasKeyedChildren>
        {store.day[meal].map((item, index) => (
          <MealItem key={store.day.date + index} {...{ index, item, meal, store }} />
        ))}
      </ul>
      <InputField
        onChange={addItem(store, meal)}
        placeholder={store.day[meal].length === 0 ? "What did you eat?" : "What else...?"}
      />
    </div>
  </div>
);

export default inject("store")(observer(Meal));
