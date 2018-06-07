import { render } from "inferno";
import Button from ".";

it("Matches the snapshot", () => {
  const div = document.createElement("div");

  expect(render(<Button label={"test label"} />, div).dom).toMatchSnapshot();
});
