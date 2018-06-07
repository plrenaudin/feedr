import { render } from "inferno";
import InputField from ".";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  expect(render(<InputField placeholder={"test value"} />, div).dom).toMatchSnapshot();
});

it("Matches the snapshot when disabled", () => {
  const div = document.createElement("div");
  expect(render(<InputField placeholder={"test value"} disabled={true} />, div).dom).toMatchSnapshot();
});
