import { render } from "inferno";
import Meal from ".";
import store from "../../../test/fixture/store";
import { Provider } from "inferno-mobx";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  const rendered = render(
    <Provider store={store}>
      <Meal meal="evening" />
    </Provider>,
    div
  );
  expect(rendered.props.children.dom).toMatchSnapshot();
});
