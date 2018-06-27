import { render } from "inferno";
import Overlay from ".";
import Icon from "../Icon";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  expect(
    render(<Overlay button={<Icon name="price-tag" />}>Child content</Overlay>, div).dom
  ).toMatchSnapshot();
});
