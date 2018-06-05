import Meal from "../Meal";
import { inject, observer } from "inferno-mobx";
import { longFormatDate } from "../../modules/formatter";

const Day = ({ store }) => (
  <section class="day">
    <h2>{longFormatDate(store.day.date)}</h2>
    <Meal meal="morning" />
    <Meal meal="noon" />
    <Meal meal="evening" />
  </section>
);

export default inject("store")(observer(Day));
