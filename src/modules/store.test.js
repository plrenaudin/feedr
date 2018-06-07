import store, { data } from "../../test/fixture/store";

it("loads data correctly", () => {
  store.load("2018-06-07");
  expect(store.day).toEqual(data["2018-06-07"]);
});

it("goes to next and previous day correctly", () => {
  store.load("2018-06-07");
  store.nextDay();
  expect(store.day).toEqual(data["2018-06-08"]);
  store.previousDay();
  expect(store.day).toEqual(data["2018-06-07"]);
});
