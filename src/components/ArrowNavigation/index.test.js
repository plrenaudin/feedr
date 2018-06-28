import { render } from "inferno";
import ArrowNavigation from ".";

it("Matches the snapshot", () => {
  const div = document.createElement("div");

  expect(
    render(<ArrowNavigation onLeft={() => {}} onRight={() => {}} />, div).dom
  ).toMatchSnapshot();
});
