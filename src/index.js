import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
