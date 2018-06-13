import { render } from "inferno";
import FoodCategoryPicker from ".";
import store from "../../../test/fixture/store";
import { Provider } from "inferno-mobx";

it("Matches the snapshot", () => {
  const div = document.createElement("div");
  expect(
    render(
      <Provider store={store}>
        <FoodCategoryPicker meal="morning" index={0} />
      </Provider>,
      div
    ).props.children.dom
  ).toMatchSnapshot();
});
