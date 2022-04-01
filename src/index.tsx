import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";

const theStore = configureStore({
  reducer: rootReducer,
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={theStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
