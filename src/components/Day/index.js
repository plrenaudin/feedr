import Meal from "../Meal";
import { inject, observer } from "inferno-mobx";
import { longFormatDate } from "../../modules/formatter";
import { linkEvent } from "inferno";
import Icon from "../Icon";

const editNotes = (store, event) => {
  store.editNotes(event.target.value);
};
const Day = ({ store }) => {
  const notes = store.day.notes;
  return (
    <section class="day">
      <h2>{longFormatDate(store.day.date)}</h2>
      <Meal meal="morning" />
      <Meal meal="noon" />
      <Meal meal="snack" />
      <Meal meal="evening" />
      <h3>
        <Icon class="circle-icon" name="pencil" />
        Notes
      </h3>
      <textarea
        onChange={linkEvent(store, editNotes)}
        ref={input => input && (input.value = notes)}
      />
    </section>
  );
};

export default inject("store")(observer(Day));
