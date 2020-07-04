import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main/Main";
import Signin from "./components/Signin/Signin";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Signin} />
            <Route
              path="/home"
              render={(props) => (
                <div>
                  <NavBar />
                  <Main {...props} />
                </div>
              )}
            />

            <Route
              path="/expenses"
              render={(props) => (
                <div>
                  <NavBar />
                  <ExpenseList {...props} />
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
