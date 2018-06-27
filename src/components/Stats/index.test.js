import { render } from "inferno";
import Stats from ".";
import store from "../../../test/fixture/store";
import { Provider } from "inferno-mobx";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  const rendered = render(
    <Provider store={store}>
      <Stats />
    </Provider>,
    div
  );
  expect(rendered.props.children.dom).toMatchSnapshot();
});
