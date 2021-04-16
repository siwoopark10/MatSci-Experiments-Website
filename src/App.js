import React from "react";
import "./App.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import ApproveExperiments from './components/ApproveExperiments';
import ProposedExperiment from './components/ProposedExperiment';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  return (
    

      <Switch>
        <Route exact path="/">
          <MenuAppBar />
          <Home />
        </Route>
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
    
  );
}
