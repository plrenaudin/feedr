import InputField from "../InputField";
import { inject, observer } from "inferno-mobx";
import FoodCategoryPicker from "../FoodCategoryPicker";
import Icon from "../Icon";
import Pie from "../Pie";

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

const MealItem = observer(({ index, item, meal, store }) => (
  <li>
    <Pie
      categories={
        store.day[meal].length >= index + 1 &&
        store.day[meal][index] &&
        store.day[meal][index].categories
      }
    />
    <span class="meal-item-name">{item.name}</span>
    <div class="actions">
      <FoodCategoryPicker {...{ meal, index }} />
      <a role="button" onClick={removeItem(store, meal, index)}>
        <Icon name="bin" />
      </a>
    </div>
  </li>
));

const Meal = ({ meal, store }) => (
  <div class="meal">
    <h3>
      {meal === "snack" ? (
        <Icon name="mug" class="circle-icon" />
      ) : (
        <Icon name="spoon-knife" class="circle-icon" />
      )}
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
