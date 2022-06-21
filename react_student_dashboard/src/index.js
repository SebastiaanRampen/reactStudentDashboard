import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
// import reportWebVitals from "./reportWebVitals";
import store from "./Redux/Store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
// https://www.codingdeft.com/posts/react-use-effect-running-twice/
