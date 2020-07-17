import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MaterialTable from "material-table";
import { Spinner } from "react-bootstrap";
import "./ExpenseList.css";
class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Amount", field: "amount", type: "numeric" },
        { title: "Date of Expense", field: "dateOfExpense", type: "date" },
        { title: "Category", field: "category" },
        { title: "Description", field: "description" },
      ],
      data: [],
      currentUser: props.location.state.name,
    };
    console.log(props.location.state);
  }

  componentDidMount() {
    //console.log("eList checking...", localStorage.getItem("eList"));
    if (
      localStorage.getItem("expenseTableVal") !== null &&
      localStorage.getItem("eList") === "false"
    ) {
      var table = JSON.parse(localStorage.getItem("expenseTableVal"));
      var len = JSON.parse(localStorage.getItem("expenseTableLength"));
      this.setState({ data: table });
      this.setState({ tableState: len });
    } else {
      fetch("https://upper-inukshuk-26953.herokuapp.com/expense_data", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.currentUser,
        }),
      })
        .then((response) => response.json())
        .then((resData) => {
          let tableContents = [];
          var i;
          for (i = 0; i < resData.length; i++) {
            tableContents[i] = {
              name: resData[i].name,
              amount: resData[i].amount,
              dateOfExpense: resData[i].date,
              category: resData[i].category_name,
              description: resData[i].description,
              id: resData[i].id,
              tableState: -1,
            };
          }
          localStorage.setItem(
            "expenseTableVal",
            JSON.stringify(tableContents)
          );
          localStorage.setItem(
            "expenseTableLength",
            JSON.stringify(this.state.data.length)
          );
          localStorage.setItem("eList", "false");
          this.setState({ data: tableContents });
          this.setState({ tableState: this.state.data.length });
          console.log(this.state.tableState);
        });
    }
  }

  render() {
    if (this.state.tableState >= 0) {
      return (
        <div
          style={{
            padding: "5%",
          }}
        >
          <MuiThemeProvider>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            ></link>
            <MaterialTable
              style={{
                background: "#FFAC9E",
              }}
              title="Expense History"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    var lst = JSON.parse(localStorage.getItem("statistics"));
                    var newAmount =
                      parseFloat(lst[0]) + (oldData.amount - newData.amount);
                    var statistics = [];
                    statistics[0] = newAmount.toString();
                    statistics[1] = lst[1];
                    localStorage.setItem(
                      "statistics",
                      JSON.stringify(statistics)
                    );
                    localStorage.setItem("eCard", "true");
                    localStorage.setItem("eBar", "true");
                    localStorage.setItem("ePie", "true");
                    localStorage.setItem("eList", "true");
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        var flag = false;
                        if (
                          newData.name === "" ||
                          newData.category === "" ||
                          newData.description === "" ||
                          newData.amount === ""
                        ) {
                          flag = true;
                        }
                        if (flag) {
                          alert("Empty field!");
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            return { ...prevState, data };
                          });
                        } else {
                          this.setState(
                            (prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                            },
                            () => {
                              localStorage.setItem(
                                "expenseTableVal",
                                JSON.stringify(this.state.data)
                              );
                              localStorage.setItem(
                                "expenseTableLength",
                                JSON.stringify(this.state.data.length)
                              );
                            }
                          );
                          fetch("https://upper-inukshuk-26953.herokuapp.com/expense_edit", {
                            method: "post",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({
                              username: this.state.currentUser,
                              id: oldData.id,
                              date: newData.dateOfExpense,
                              amount: newData.amount,
                              category: newData.category,
                              description: newData.description,
                            }),
                          })
                            .then((response) => response.text())
                            .then((responseText) => {
                              console.log(responseText);
                            });
                        }
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    var lst = JSON.parse(localStorage.getItem("statistics"));
                    var newAmount = parseFloat(lst[0]) - oldData.amount;
                    var statistics = [];
                    statistics[0] = newAmount.toString();
                    statistics[1] = lst[1];
                    localStorage.setItem(
                      "statistics",
                      JSON.stringify(statistics)
                    );
                    localStorage.setItem("eCard", "true");
                    localStorage.setItem("eBar", "true");
                    localStorage.setItem("ePie", "true");

                    setTimeout(() => {
                      resolve();
                      this.setState(
                        (prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        },
                        () => {
                          localStorage.setItem(
                            "expenseTableVal",
                            JSON.stringify(this.state.data)
                          );
                          localStorage.setItem(
                            "expenseTableLength",
                            JSON.stringify(this.state.data.length)
                          );
                        }
                      );

                      fetch("https://upper-inukshuk-26953.herokuapp.com/expense_delete", {
                        method: "post",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                          id: oldData.id,
                        }),
                      })
                        .then((response) => response.text())
                        .then((responseText) => {
                          console.log(responseText);
                        });
                    }, 600);
                  }),
              }}
            />
          </MuiThemeProvider>
        </div>
      );
    } else {
      return (
        <Spinner className="centered" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
  }
}

export default ExpenseList;
