import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MaterialTable from "material-table";
import { Spinner } from "react-bootstrap";
import Stats from "./Stats";

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.printData = this.printData.bind(this);
    this.state = {
      columns: [{ title: "Category", field: "category" }],
      data: [],
      currentUser: props.username,
      userMap: { Entertainment: "General" },
    };
  }

  printData(data) {
    console.log(data);
  }

  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  componentWillMount() {
    console.log("mounting...");

    fetch("http://127.0.0.1:8000/category_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.currentUser,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        let tableContents = [];
        let uMap = {};
        var i;
        for (i = 0; i < resData.length; i++) {
          tableContents[i] = {
            category: resData[i].category,
          };
          uMap[resData[i].category] = resData[i].username;
        }

        var n = tableContents.length;
        var i;
        for (i = 0; i < n; i++) {
          if (uMap[tableContents[i]] != "General") {
            var value = tableContents[i];
            tableContents.splice(i, 1);
            tableContents.splice(0, 0, value);
          }
        }

        this.setState({ data: tableContents, userMap: uMap });
      });

  }

  render() {
    if (this.state.data.length > 0) {
      return (
        <div style={{ width: "80vw", maxWidth: "700px" }}>
          <Stats user = {this.state.currentUser}/>
          <button
            style={{ background: "#fcda4f", color: "black", border: "#fcda4f" }}
            type="button"
            className="btn btn-primary btn-block"
            onClick={this.handleClick}
          >
            Back
          </button>
          <MuiThemeProvider>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            ></link>
            <MaterialTable
              style={{
                background: "#fcda4f",
              }}
              title="Categories"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                isEditable: (rowData) =>
                  this.state.userMap[rowData.category] != "General",
                isDeletable: (rowData) =>
                  this.state.userMap[rowData.category] != "General",
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                        fetch("http://127.0.0.1:8000/category_edit", {
                          method: "post",
                          headers: { "Content-type": "application/json" },
                          body: JSON.stringify({
                            name: this.state.currentUser,
                            old: oldData.category,
                            new: newData.category,
                          }),
                        })
                          .then((response) => response.text())
                          .then((responseText) => {
                            console.log(responseText);
                          });
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
                        console.log(oldData.category);
                        return { ...prevState, data };
                      });
                      fetch("http://127.0.0.1:8000/category_delete", {
                        method: "post",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                          name: this.state.currentUser,
                          category: oldData.category,
                        }),
                      })
                        .then((response) => response.text())
                        .then((responseText) => {
                          console.log(responseText);
                          // this.setState({updated: !this.state.updated})
                        });
                    }, 600);
                  }),

                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      fetch("http://127.0.0.1:8000/category_submit", {
                        method: "post",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                          name: this.state.currentUser,
                          category: newData.category,
                        }),
                      })
                        .then((response) => response.text())
                        .then((responseText) => {
                          if (responseText == "Category Added") {
                            this.setState((prevState) => {
                              const data = [...prevState.data];
                              data.push(newData);
                              return { ...prevState, data };
                            });
                          } else {
                            alert("Error");
                            this.setState((prevState) => {
                              const data = [...prevState.data];
                              return { ...prevState, data };
                            });
                          }

                          // this.setState({updated: !this.state.updated})
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

export default EditCategory;

// function MaterialTableDemo() {
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Name', field: 'name' },
//       { title: 'Amount', field: 'amount', type: 'numeric' },
//       { title: 'Date of Expense', field: 'dateOfExpense', type: 'date' },
//       { title: 'Category', field: 'category' },
//       {
//         title: 'Description',
//         field: 'description',
//       //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//       },
//     ],
//     data: [
//       { name: 'Mehmet', amount: 100, dateOfExpense: "12/11/2020", category: 'Food',  description: "adasdasdasdasd"},
//       { name: 'hmet', amount: 100, dateOfExpense: "2020-10-10", category: 'Food',  description: "adasdasdasdasd"},
//     ],
//   })
// }

// onRowAdd: newData =>
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     this.setState(
//       { data: [...this.state.data, newData]});

//       resolve();
//   }, 1000);
//   }),
