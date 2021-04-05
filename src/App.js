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
    

      <Switch>
        <Route path="/">
          <MenuAppBar />
          <NavTabs />
        </Route>
      </Switch>
    
  );
}
