import React from "react";
import NavBar from "./components/navigation/navBar";
import Main from "./components/Main/Main";
import Signin from "./components/Signin/Signin";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
            rel="stylesheet"
            type="text/css"
          ></link>
          <Switch>
            <Route path="/" exact component={Signin} />
            <Route
              path="/home"
              render={(props) => {
                if (typeof props.location.state != "undefined") {
                  return (
                    <div>
                      <NavBar {...props} />
                      <Main {...props} />
                    </div>
                  );
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: "/home",
                        state: { name: localStorage.getItem("fatWalletUser") },
                      }}
                    />
                  );
                }
              }}
            />

            <Route
              path="/expenses"
              render={(props) => {
                if (typeof props.location.state != "undefined") {
                  return (
                    <div>
                      <NavBar {...props} />
                      <ExpenseList {...props} />
                    </div>
                  );
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: "/expenses",
                        state: { name: localStorage.getItem("fatWalletUser") },
                      }}
                    />
                  );
                }
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
