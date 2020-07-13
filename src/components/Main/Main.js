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
    //this.child = React.createRef();
    console.log(props.location.state);
    console.log("Current user is: " + this.state.currentUser);
  }

  fetchBar() {
    return fetch("http://127.0.0.1:8000/monthly_user_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.currentUser,
        duration: 5,
        month_or_week: 1,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        let tableContents = [];
        for (var key in resData) {
          tableContents.push({
            name: key,
            value: resData[key],
          });
        }
        console.log(tableContents);
        localStorage.setItem("barVal", JSON.stringify(tableContents));
        this.setState({ data: tableContents }, () =>
          console.log(this.state.data)
        );
      });
  }

  fetchPie() {
    return fetch("http://127.0.0.1:8000/category_wise_user_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.currentUser,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        let tableContents = [];
        for (var key in resData) {
          tableContents.push({
            name: key,
            value: resData[key],
          });
        }
        console.log(tableContents);
        localStorage.setItem("pieVal", JSON.stringify(tableContents));
        this.setState({ data: tableContents }, () =>
          console.log(this.state.data)
        );
      });
  }

  fetchBarAndPie() {
    return Promise.all([this.fetchBar(), this.fetchPie()]);
  }

  expenseUpdate = (updatedExpense) => {
    this.fetchBarAndPie().then(([bar, pie]) => this.refs.child.triggerUpdate());
  };

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
        <Graph ref="child" username={this.state.currentUser} />
        <Switcher
          eoc={this.state.expenseOrCategory}
          func1={this.expenseCallBack}
          func2={this.categoryCallBack}
          func3={this.expenseUpdate}
          user={this.state.currentUser}
        />
      </div>
    );
  }
}

function Switcher({ eoc, func1, func2, func3, user }) {
  console.log("abc");
  console.log(user);
  if (eoc === true) {
    console.log("cda");
    return (
      <AddExpense
        username={user}
        callbackFromParent={func1}
        informUpdate={func3}
      />
    );
  } else {
    return <EditCategory username={user} callbackFromParent={func2} />;
  }
}

export default Main;
