import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MaterialTable from 'material-table'

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.printData = this.printData.bind(this);
    this.state = {
        columns: [
            { title: 'Category', field: 'category' },
          ],
          data: [
            { category: "first"},
            {  category: "second"},
          ],
    };
  }

  printData(data){
      console.log(data)
  }

  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  render() {
    return (
      <div style={{width: "80vw", maxWidth: "900px"}}>
          <button
          style={{ background: "#fcda4f", color: "black", border: "#fcda4f"}}
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.handleClick}
        >
          Back
        </button>
        <MuiThemeProvider>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MaterialTable
                style = {{
                    background: "#fcda4f"
                }}
                title="Expense History"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                onRowUpdate: (newData, oldData) =>{
                  this.printData(newData);
                  new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                          
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                        });
                        }
                    }, 600);
                    })
                },
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                        });
                    }, 600);
                    }),

                    onRowAdd: (newData) => 
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          return { ...prevState, data };
                        });
                      fetch("http://127.0.0.1:8000/category_submit", {
                        method: "post",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                          category: newData.category,
                        }),
                      })
                      .then((response) => response.text())
                      .then((responseText) => {
                        console.log(responseText);
                     });
                      }, 600);
                    }
                    ),


                }}
            />
            
        </MuiThemeProvider>
        

        

        </div>
    );
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