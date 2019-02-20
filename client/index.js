import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./app";
import "../public/src/main.css";

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById("app")
);
