import Meal from "../Meal";
import { inject, observer } from "inferno-mobx";
import { longFormatDate } from "../../modules/formatter";
import { linkEvent } from "inferno";

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
        <span class="fa-layers fa-fw">
          <i class="fas fa-circle" data-fa-transform="grow-6" />
          <i class="fas fa-edit" data-fa-transform="shrink-4" />
        </span>
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
