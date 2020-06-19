import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main";
import { render } from "@testing-library/react";

function App() {
  return (
    <div
      style={{
        background: "#add8e6",
      }}
    >
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
