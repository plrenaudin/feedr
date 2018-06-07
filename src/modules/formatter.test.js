import { shortFormatDate, longFormatDate } from "./formatter";

it("uses shortFormat correctly", () => {
  expect(shortFormatDate(new Date(1562440223056))).toEqual("2019-07-06");
});

it("uses longFormat correctly", () => {
  expect(longFormatDate("2018-07-25")).toEqual("Wednesday 25th July");
});
