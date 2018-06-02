import Meal from "../Meal";
import { inject, observer } from "inferno-mobx";

const Day = props => (
  <section class="day">
    <h2>{props.store.day.date}</h2>
    <h2>Morning</h2>
    <Meal meal="morning" />
    <h2>Noon</h2>
    <Meal meal="noon" />
    <h2>Evening</h2>
    <Meal meal="evening" />
  </section>
);

export default inject("store")(observer(Day));
