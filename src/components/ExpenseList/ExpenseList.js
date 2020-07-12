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

  componentWillMount() {
    if (localStorage.getItem("expenseTableVal") !== null){
      var table = JSON.parse(localStorage.getItem("expenseTableVal"));
      this.setState({data: table});
    }
    else{
      fetch("http://127.0.0.1:8000/expense_data", {
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
          };
        }
        localStorage.setItem("expenseTableVal", JSON.stringify(tableContents));
        this.setState({ data: tableContents });
      });
    }

    
  }

  render() {
    if (this.state.data.length > 0) {
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
                background: "#fcda4f",
              }}
              title="Expense History"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
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
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                          fetch("http://127.0.0.1:8000/expense_edit", {
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
                    setTimeout(() => {
                      resolve();
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                      fetch("http://127.0.0.1:8000/expense_delete", {
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
