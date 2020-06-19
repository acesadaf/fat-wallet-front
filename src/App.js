import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
