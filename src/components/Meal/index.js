import InputField from "../InputField";
import { inject, observer } from "inferno-mobx";

const addItem = (store, meal) => value => {
  store.addItem(meal, value);
};

const Meal = ({ meal, store }) => (
  <div class="meal">
    <ul>{store.day[meal].map(i => <li>{i}</li>)}</ul>
    <InputField onChange={addItem(store, meal)} />
  </div>
);

export default inject("store")(observer(Meal));
