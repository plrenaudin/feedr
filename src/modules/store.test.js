import store, { data } from "../../test/fixture/store";
import { DAY, WEEK, MONTH } from "./dateRangeEnum";

it("loads data correctly", () => {
  expect(store.day).toEqual(data["2018-06-07"]);
});

it("goes to next and previous day correctly", () => {
  store.nextDay();
  expect(store.day).toEqual(data["2018-06-08"]);
  store.previousDay();
  expect(store.day).toEqual(data["2018-06-07"]);
});

it("gets date from daterange correctly", () => {
  expect(store.getDatesFromDateRange(DAY)).toEqual("2018-06-07");
  expect(store.getDatesFromDateRange(WEEK)).toEqual([
    "2018-06-04",
    "2018-06-05",
    "2018-06-06",
    "2018-06-07",
    "2018-06-08",
    "2018-06-09",
    "2018-06-10"
  ]);
  expect(store.getDatesFromDateRange(MONTH)).toEqual([
    "2018-06-01",
    "2018-06-02",
    "2018-06-03",
    "2018-06-04",
    "2018-06-05",
    "2018-06-06",
    "2018-06-07",
    "2018-06-08",
    "2018-06-09",
    "2018-06-10",
    "2018-06-11",
    "2018-06-12",
    "2018-06-13",
    "2018-06-14",
    "2018-06-15",
    "2018-06-16",
    "2018-06-17",
    "2018-06-18",
    "2018-06-19",
    "2018-06-20",
    "2018-06-21",
    "2018-06-22",
    "2018-06-23",
    "2018-06-24",
    "2018-06-25",
    "2018-06-26",
    "2018-06-27",
    "2018-06-28",
    "2018-06-29",
    "2018-06-30"
  ]);
});
