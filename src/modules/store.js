import { observable, action, toJS, configure } from "mobx";
import db, { EMPTY_RECORD } from "./db";
import { shortFormatDate } from "./formatter";
import addDays from "date-fns/add_days";

configure({ enforceActions: true });

export const FOOD_TYPES = {
  1: "Fruits",
  2: "Vegetables",
  3: "Grains",
  4: "Proteins",
  5: "Dairy"
};

export const MEALS = ["morning", "noon", "snack", "evening"];

export default class Store {
  day = observable({ ...EMPTY_RECORD, date: shortFormatDate() });
  constructor() {
    this.load(shortFormatDate());
  }

  set = action(
    ({
      date = shortFormatDate(),
      morning = [],
      noon = [],
      evening = [],
      snack = [],
      notes = ""
    }) => {
      this.day.date = date;
      this.day.morning = morning;
      this.day.noon = noon;
      this.day.snack = snack;
      this.day.evening = evening;
      this.day.notes = notes;
    }
  );

  addItem = action((meal, data) => {
    this.day[meal].push({ name: data.trim(), categories: [] });
    this.save();
  });

  removeItem = action((meal, index) => {
    this.day[meal].splice(index, 1);
    this.save();
  });

  editItemCategory = action((meal, index, data) => {
    this.day[meal][index].categories = data;
    this.save();
  });

  editNotes = action(notes => {
    this.day.notes = notes.trim();
    this.save();
  });

  nextDay() {
    this.load(shortFormatDate(addDays(this.day.date, 1)));
  }

  previousDay() {
    this.load(shortFormatDate(addDays(this.day.date, -1)));
  }

  load = action(date => {
    return db
      .get(date)
      .then(data => {
        this.set(data || { date });
      })
      .catch(e => console.error(e));
  });

  fetch(dates) {
    return db.get(dates);
  }

  fetchStats(dates = this.day.date) {
    return this.fetch(dates)
      .then(data => this.extractDayData(data))
      .catch(e => console.error(e));
  }

  extractDayData(day) {
    let data = [];
    for (const meal of MEALS) {
      data = (day && day[meal] && data.concat(...day[meal].map(i => i.categories))) || [];
    }
    return data.sort();
  }

  save() {
    return db.set(this.day.date, toJS(this.day)).catch(e => console.error(e));
  }
}
