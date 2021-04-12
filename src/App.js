import React from "react";
import "./styles.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import ApproveExperiments from './components/ApproveExperiments';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    
    <div>
      <Switch>
        <Route path="/propose">
          <MenuAppBar />
          <NavTabs />
        </Route>
        <Route path="/approve">
          <MenuAppBar />
          <ApproveExperiments />
        </Route>
        <Route path="/approve/:id">
          <MenuAppBar />
        </Route>
      </Switch>
    </div>
  );
}
