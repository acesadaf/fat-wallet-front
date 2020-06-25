import React, { Component } from "react";
import Graph from "../Graphs/Graph";
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
          flexWrap: "wrap",
          flexShrink: 2,
        }}
      >
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Graph />
        {/* </div> */}
        {/* <div
          className="px-5"
          style={{ display: "flex", justifyContent: "flex-end" }}
        > */}
        <AddExpense />
        {/* </div> */}
      </div>
    );
  }
}

export default Main;
