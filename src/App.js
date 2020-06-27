import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main/Main";
import Signin from "./components/Signin/Signin";
import ExpenseList from "./components/ExpenseList/ExpenseList";


class App extends React.Component {
  render() {
    return (
      <div>
        <Signin />
        {/* <NavBar/>
        <Main /> */}
        {/* <ExpenseList/> */}
      </div>
    );
  }
}

export default App;
