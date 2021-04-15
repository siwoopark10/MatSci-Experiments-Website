import React from "react";
import "./styles.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import ApproveExperiments from './components/ApproveExperiments';
import ProposedExperiment from './components/ProposedExperiment';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    
    <div>
      <Switch>
        <Route path="/propose">
          <MenuAppBar />
          <NavTabs />
        </Route>
        <Route exact path="/approve">
          <MenuAppBar />
          <ApproveExperiments />
        </Route>
        <Route path="/approve/:id">
          <MenuAppBar />
          <ProposedExperiment />
        </Route>
      </Switch>
    </div>
  );
}
