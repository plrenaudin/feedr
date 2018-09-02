import { observable, action, toJS, configure, reaction } from "mobx";
import db, { EMPTY_RECORD } from "./db";
import { shortFormatDate } from "./formatter";
import addDays from "date-fns/add_days";
import { DAY, MONTH, WEEK } from "./dateRangeEnum";
import { startOfWeek, getDaysInMonth, startOfMonth } from "date-fns";

configure({ enforceActions: "always" });

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

  enableAutosave() {
    this.autoSave = reaction(() => Object.keys(this.day).map(i => this.day[i]), () => this.save());
  }

  disableAutosave() {
    this.autoSave && this.autoSave();
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
    this.day[meal] = this.day[meal].concat({ name: data.trim(), categories: [] });
  });

  removeItem = action((meal, index) => {
    const copy = [...this.day[meal]];
    copy.splice(index, 1);
    this.day[meal] = copy;
  });

  editItemCategory = action((meal, index, data) => {
    const copy = [...this.day[meal]];
    copy[index].categories = data;
    this.day[meal] = copy;
  });

  editNotes = action(notes => {
    this.day.notes = notes.trim();
  });

  nextDay() {
    this.load(shortFormatDate(addDays(this.day.date, 1)));
  }

  previousDay() {
    this.load(shortFormatDate(addDays(this.day.date, -1)));
  }

  load = action(date => {
    this.disableAutosave();
    return db
      .get(date)
      .then(data => {
        this.set(data || { date });
        this.enableAutosave();
      })
      .catch(e => console.error(e));
  });

  fetch(dates) {
    return db.get(dates);
  }

  getDatesFromDateRange(dateRange) {
    let dates;
    let firstDayOfWeek;
    let firstDayOfMonth;
    switch (dateRange) {
      case DAY:
        dates = this.day.date;
        break;
      case WEEK:
        firstDayOfWeek = startOfWeek(this.day.date, { weekStartsOn: 1 });
        dates = Array.from(Array(7).keys()).map(i => shortFormatDate(addDays(firstDayOfWeek, i)));
        break;
      case MONTH:
        firstDayOfMonth = startOfMonth(this.day.date);
        dates = Array.from(Array(getDaysInMonth(this.day.date)).keys()).map(i =>
          shortFormatDate(addDays(firstDayOfMonth, i))
        );
        break;
    }
    return dates;
  }

  fetchStats(dateRange = DAY) {
    return this.fetch(this.getDatesFromDateRange(dateRange))
      .then(data => this.extractStatsData(data))
      .catch(e => console.error(e));
  }

  extractStatsData(stats) {
    let data = [];
    if (Array.isArray(stats)) {
      data = [].concat(...stats.map(i => this.extractDayData(i)));
    } else {
      data = this.extractDayData(stats);
    }
    return data.sort();
  }

  extractDayData(day) {
    let data = [];
    for (const meal of MEALS) {
      data = (day && day[meal] && data.concat(...day[meal].map(i => i.categories))) || [];
    }
    return data;
  }

  save() {
    return db.set(this.day.date, toJS(this.day)).catch(e => console.error(e));
  }
}
