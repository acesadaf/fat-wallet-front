import React, { Component } from "react";
import Graph from "../Graphs/Bar";
import AddExpense from "../Form/AddExpense";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexdirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", width: "100vh" }}
        >
          {/* <Graph/> */}
        </div>
        <div
          className="px-5"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <AddExpense />
        </div>
      </div>
    );
  }
}

export default Main;
