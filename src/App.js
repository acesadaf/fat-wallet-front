import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main/Main";
import ExpenseList from "./components/ExpenseList/ExpenseList";


class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Main />
        {/* <ExpenseList/> */}
      </div>
    );
  }
}

export default App;
