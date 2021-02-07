import React from "react";
import "./styles.css";
import MenuAppBar from "./components/MenuAppBar";
import NavTabs from "./components/NavTabs";
import ParameterTextBox from "./components/ParameterTextBox";

export default function App() {
  return (
    <div>
      <MenuAppBar />
      <div className="App">
      
      </div>
      <NavTabs />
      <ParameterTextBox/>
      <Slider />
    </div>
  );
}
