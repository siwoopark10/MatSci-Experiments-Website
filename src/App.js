import React from "react";
import "./styles.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";

export default function App() {
  return (
    <div>
      <MenuAppBar />
      <div className="App">
      </div>
      <NavTabs />
    </div>
  );
}
