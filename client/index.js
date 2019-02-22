import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Root from "./components/Root";
import "../public/src/main.css";

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Root />
    </Provider>
  </div>,
  document.getElementById("app")
);
