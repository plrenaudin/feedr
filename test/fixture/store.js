import Store from "../../src/modules/store";

const data = {
  "2018-06-07": {
    date: "2018-06-07",
    evening: [{ name: "evening Meal 1" }, { name: "evening Meal 2" }],
    morning: [{ name: "morning Meal 1" }],
    noon: [],
    notes: ""
  },
  "2018-06-08": {
    date: "2018-06-08",
    evening: [{ name: "evening Meal 1" }],
    morning: [],
    noon: [{ name: "noon Meal 1" }],
    notes: ""
  }
};

const store = new Store();
store.load = date => store.set(data[date] || { date });
store.save = jest.fn();
store.load("2018-06-07");

export default store;
export { data };
