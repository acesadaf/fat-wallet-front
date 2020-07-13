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
      totExp: 0,
      expCat: "",
    };
    //this.child = React.createRef();
    console.log(props.location.state);
    console.log("Current user is: " + this.state.currentUser);
    this.refreshCards = this.refreshCards.bind(this);
  }

  // fetchBar() {
  //   return fetch("http://127.0.0.1:8000/monthly_user_data", {
  //     method: "post",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       username: this.state.currentUser,
  //       duration: 5,
  //       month_or_week: 1,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((resData) => {
  //       console.log(resData);
  //       let tableContents = [];
  //       for (var key in resData) {
  //         tableContents.push({
  //           name: key,
  //           value: resData[key],
  //         });
  //       }
  //       console.log(tableContents);
  //       localStorage.setItem("barVal", JSON.stringify(tableContents));
  //       this.setState({ data: tableContents }, () =>
  //         console.log(this.state.data)
  //       );
  //     });
  // }

  // fetchPie() {
  //   return fetch("http://127.0.0.1:8000/category_wise_user_data", {
  //     method: "post",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       username: this.state.currentUser,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((resData) => {
  //       console.log(resData);
  //       let tableContents = [];
  //       for (var key in resData) {
  //         tableContents.push({
  //           name: key,
  //           value: resData[key],
  //         });
  //       }
  //       console.log(tableContents);
  //       localStorage.setItem("pieVal", JSON.stringify(tableContents));
  //       this.setState({ data: tableContents }, () =>
  //         console.log(this.state.data)
  //       );
  //     });
  // }

  // fetchBarAndPie() {
  //   return Promise.all([this.fetchBar(), this.fetchPie()]);
  // }
  //this.refs.child.triggerUpdate()
  expenseUpdate = (amount, date, category) => {
    this.refs.child.triggerUpdate(amount, date, category);
    this.refreshCards(amount);

    //this.fetchBarAndPie().then(([bar, pie]) => console.log("fetch"));
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

  refreshCards(amount) {
    var lst = JSON.parse(localStorage.getItem("statistics"));
    var total = parseFloat(lst[0]) + parseFloat(amount);
    var most = lst[1];

    var statistics = [];
    statistics[0] = total.toString();
    statistics[1] = most;

    localStorage.setItem("statistics", JSON.stringify(statistics));
    var lst = JSON.parse(localStorage.getItem("statistics"));
    this.setState({ totExp: lst[0], expCat: lst[1] });
  }

  componentDidMount() {
    if (localStorage.getItem("eoc") === "false") {
      this.setState({ expenseOrCategory: false });
    }
    //console.log(JSON.parse(localStorage.getItem("statistics"))[0]);
    if (
      localStorage.getItem("statistics") !== null &&
      JSON.parse(localStorage.getItem("statistics"))[0] != "0"
    ) {
      var lst = JSON.parse(localStorage.getItem("statistics"));
      console.log("stats existtttttttttt");
      this.setState({ totExp: lst[0], expCat: lst[1] }, () => {
        console.log("here");
        console.log(this.state.totExp);
      });
    } else {
      console.log("inside stats");
      fetch("http://127.0.0.1:8000/stats_data", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.currentUser,
        }),
      })
        .then((response) => response.json())
        .then((resData) => {
          var statistics = [];
          statistics[0] = resData[0];
          statistics[1] = resData[1];
          localStorage.setItem("statistics", JSON.stringify(statistics));
          this.setState({ totExp: resData[0], expCat: resData[1] });
        });
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
          totExp={this.state.totExp}
          expCat={this.state.expCat}
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

function Switcher({ totExp, expCat, eoc, func1, func2, func3, user }) {
  console.log("abc");
  console.log(user);
  if (eoc === true) {
    console.log("cda");
    return (
      <AddExpense
        totExp={totExp}
        expCat={expCat}
        username={user}
        callbackFromParent={func1}
        informUpdate={func3}
      />
    );
  } else {
    return (
      <EditCategory
        totExp={totExp}
        expCat={expCat}
        username={user}
        callbackFromParent={func2}
      />
    );
  }
}

export default Main;
