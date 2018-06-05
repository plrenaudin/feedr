import { observable, action, toJS, configure } from "mobx";
import db, { EMPTY_RECORD } from "./db";
import { shortFormatDate } from "./formatter";
import addDays from "date-fns/add_days";

configure({ enforceActions: true });

export default class Store {
  day = observable({ ...EMPTY_RECORD, date: shortFormatDate() });
  constructor() {
    this.load(shortFormatDate());
  }

  set = action(({ date = shortFormatDate(), morning = [], noon = [], evening = [] }) => {
    this.day.date = date;
    this.day.morning = morning;
    this.day.noon = noon;
    this.day.evening = evening;
  });

  addItem = action((meal, data) => {
    this.day[meal].push(data);
    this.save();
  });

  removeItem = action((meal, index) => {
    this.day[meal].splice(index, 1);
    this.save();
  });

  nextDay() {
    this.load(shortFormatDate(addDays(this.day.date, 1)));
  }

  previousDay() {
    this.load(shortFormatDate(addDays(this.day.date, -1)));
  }

  load = action(date => {
    return db.get(date).then(data => {
      this.set(data || { date });
    });
  });

  save() {
    return db.set(this.day.date, toJS(this.day));
  }
}
