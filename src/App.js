import React, { useState, useMemo } from "react";
import "./App.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import SignIn from './components/SignIn'
import ExperimentDetail from './components/ExperimentDetail'
import Register from './components/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/Home";
import {UserContext} from './UserContext';

export default function App() {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerValue}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <MenuAppBar />
          <Home />
        </Route>
        <Route path="/:uid/propose">
          <MenuAppBar />
          <NavTabs />
        </Route>
        <Route exact path="/:uid/review">
          <MenuAppBar />
          <NavTabs />
        </Route>
        <Route path="/:uid/review/:type/:id">
          <MenuAppBar />
          <ExperimentDetail />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}
