import { render } from "inferno";
import Icon from ".";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  expect(render(<Icon name="price-tag" />, div).dom).toMatchSnapshot();
});
