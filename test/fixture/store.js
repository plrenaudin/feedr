import Store from "../../src/modules/store";

const data = {
  "2018-06-07": {
    date: "2018-06-07",
    evening: ["evening Meal 1", "evening Meal 2"],
    morning: ["morning Meal 1"],
    noon: []
  },
  "2018-06-08": {
    date: "2018-06-08",
    evening: ["evening Meal 1"],
    morning: [],
    noon: ["noon Meal 1"]
  }
};

const store = new Store();
store.load = date => store.set(data[date] || { date });
store.save = jest.fn();
store.load("2018-06-07");

export default store;
export { data };
