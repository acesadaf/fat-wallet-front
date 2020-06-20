import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main/Main";


class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Main />
        
      </div>
    );
  }
}

export default App;
