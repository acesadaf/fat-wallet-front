import React, { Component } from "react";
import Graph from "../Graphs/Graph";
import AddExpense from "../Form/AddExpense";
import EditCategory from "../Form/EditCategory";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseOrCategory: true,
      currentUser: props.location.state.name,
    };
    console.log(props.location.state);
    console.log("Current user is: " + this.state.currentUser);
  }

  expenseCallBack = (dataFromExpense) => {
    this.setState({
      expenseOrCategory: false,
    });
    localStorage.setItem("eoc", "false");
  };

  categoryCallBack = (dataFromCategory) => {
    this.setState({
      expenseOrCategory: true,
    });
    localStorage.setItem("eoc", "true");
  };

  componentWillMount() {
    if (localStorage.getItem("eoc") === "false") {
      this.setState({ expenseOrCategory: false });
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexdirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Graph />
        <Switcher
          eoc={this.state.expenseOrCategory}
          func1={this.expenseCallBack}
          func2={this.categoryCallBack}
        />
      </div>
    );
  }
}

function Switcher({ eoc, func1, func2 }) {
  console.log("abc");
  if (eoc === true) {
    console.log("cda");
    return <AddExpense callbackFromParent={func1} />;
  } else {
    return <EditCategory callbackFromParent={func2} />;
  }
}

export default Main;
