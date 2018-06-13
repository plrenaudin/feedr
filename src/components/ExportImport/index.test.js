import { render } from "inferno";
import ExportImport from ".";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  expect(render(<ExportImport />, div).dom).toMatchSnapshot();
});
