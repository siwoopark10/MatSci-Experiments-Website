import React from "react";
import "./styles.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

      <Switch>
        <Route path="/about">
          <MenuAppBar />
        </Route>
        <Route path="/users">
        </Route>
        <Route path="/">
          <MenuAppBar />
          <NavTabs />
        </Route>
      </Switch>
    </div>
  );
}
