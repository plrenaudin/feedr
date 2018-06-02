import { render } from "inferno";
import App from "./App";
import { Provider } from "inferno-mobx";
import Store from "./modules/store";
const store = new Store();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
